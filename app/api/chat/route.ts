import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateSession, updateSession } from '@/lib/session-store'
import { chatWithAI, sanitizeBriefUpdate } from '@/lib/openai'
import { deepMergeBrief, getChangedFields } from '@/lib/brief'
import type { Brief } from '@/lib/brief'
import { buildManagedSalesTurn, isReadyForHandoff } from '@/lib/sales-workflow'
import { consumeRateLimit, pruneRateLimitBuckets } from '@/lib/rate-limit'
import { isValidSessionId, normalizeUserMessage } from '@/lib/request-validation'
import { sendNewLead, sendBriefUpdate, sendReadyBrief } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, message, locale } = body as { sessionId?: string; message?: string; locale?: string }
    const normalizedLocale = locale === 'de' ? 'de' : 'ru'
    const normalizedMessage = normalizeUserMessage(message)

    if (!isValidSessionId(sessionId) || !normalizedMessage) {
      return NextResponse.json(
        { error: 'sessionId and message required' },
        { status: 400 }
      )
    }

    pruneRateLimitBuckets()
    const rateLimit = consumeRateLimit(`chat:${sessionId}`, 12, 60_000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: normalizedLocale === 'de' ? 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' : 'Слишком много запросов. Попробуйте снова примерно через минуту.' },
        { status: 429 }
      )
    }

    const session = getOrCreateSession(sessionId)
    const isNewSession = session.messages.length === 0

    const newMessages = [
      ...session.messages,
      { role: 'user' as const, content: normalizedMessage },
    ]

    const aiResponse = await chatWithAI(newMessages, session.brief, normalizedLocale)
    const oldBrief = session.brief
    const sanitizedUpdate = sanitizeBriefUpdate(aiResponse.brief_update)
    const inferredUpdate = inferBriefFromContext(session.messages, normalizedMessage, oldBrief)
    const mergedUpdate = mergeBriefUpdates(sanitizedUpdate, inferredUpdate)
    const newBrief = deepMergeBrief(oldBrief, mergedUpdate)
    const managedAssistant = buildManagedSalesTurn({
      brief: newBrief,
      previousMessages: session.messages,
      userMessage: normalizedMessage,
      locale: normalizedLocale,
    })
    const finalAssistant = managedAssistant ?? finalizeAssistantTurn(aiResponse, oldBrief, newBrief, normalizedLocale, session.messages, normalizedMessage)

    const changedFields = getChangedFields(oldBrief, newBrief)
    const hasUpdates = Object.keys(changedFields).length > 0

    const assistantMsg: { role: 'assistant'; content: string; options?: string[] } = {
      role: 'assistant',
      content: finalAssistant.reply,
    }
    if (finalAssistant.options?.length) assistantMsg.options = finalAssistant.options
    const updatedMessages = [...newMessages, assistantMsg]

    let newStatus = session.status
    if (isNewSession) {
      newStatus = 'NEW'
    } else if (hasUpdates && newStatus === 'NEW') {
      newStatus = 'IN_PROGRESS'
    }

    const hasContact = hasContactInfo(newBrief)
    const isReady = isReadyForHandoff(newBrief)
    if (hasContact && newStatus !== 'READY') {
      newStatus = isReady ? 'READY' : 'IN_PROGRESS'
    }

    updateSession(sessionId, {
      messages: updatedMessages,
      brief: newBrief,
      status: newStatus,
    })

    try {
      if (isNewSession) {
        await sendNewLead(sessionId, newBrief, updatedMessages)
      } else if (isReady && session.status !== 'READY') {
        await sendReadyBrief(sessionId, newBrief, updatedMessages)
      } else if (hasUpdates) {
        await sendBriefUpdate(sessionId, changedFields, newBrief, newStatus, updatedMessages)
      }
    } catch (tgErr) {
      console.error('[API /chat] Telegram notification failed:', tgErr)
    }

    return NextResponse.json({
      reply: finalAssistant.reply,
      brief: newBrief,
      status: newStatus,
      options: finalAssistant.options,
    })
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    console.error('[API /chat]', err.message, err)
    const cause = (err as { cause?: { code?: string } }).cause
    const isNetwork = cause?.code === 'ENETUNREACH' || cause?.code === 'ECONNREFUSED' || err.message.includes('fetch failed')
    let msg = err.message.startsWith('Превышен') || err.message.startsWith('Сервис')
      ? err.message
      : 'Ошибка при обработке. Попробуйте ещё раз.'
    if (isNetwork) msg = 'Нет связи с сервером. Проверьте интернет и попробуйте снова.'
    return NextResponse.json(
      { error: msg, details: err.message },
      { status: 500 }
    )
  }
}

function finalizeAssistantTurn(
  aiResponse: { reply: string; options?: string[] },
  oldBrief: { contact?: { name?: string; phone?: string; email?: string }; niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string } },
  newBrief: { contact?: { name?: string; phone?: string; email?: string }; niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string } },
  locale: 'ru' | 'de',
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
  userMessage: string
) {
  const lastAssistantMessage = [...previousMessages].reverse().find((msg) => msg.role === 'assistant')?.content ?? ''
  const name = newBrief.contact?.name?.trim()
  const nameJustCaptured = Boolean(name && !oldBrief.contact?.name?.trim())
  const phoneJustCaptured = Boolean(hasActualPhone(newBrief.contact?.phone) && !hasActualPhone(oldBrief.contact?.phone))
  const asksForEmail = /email|e-mail|почт/i.test(aiResponse.reply)
  const asksForServices = /какие услуги|какие услуги вы предлагаете|leistungen|angebote/i.test(aiResponse.reply)
  const deferredContact = isDeferredAnswer(userMessage) && isContactPrompt(lastAssistantMessage)

  if (deferredContact) {
    if (hasPendingBriefQuestions(newBrief)) {
      const nextQuestion = buildNextBriefQuestion(newBrief, locale)
      const nextKind = detectQuestionKind(nextQuestion)
      return {
        reply: withAcknowledgement(buildDeferredContactTransition(nextQuestion, locale), locale, userMessage, nextKind),
        options: buildNextBriefOptions(newBrief, locale),
      }
    }

    return {
      reply: locale === 'de'
        ? 'Verstanden. Dann klären wir den Kontakt jetzt zum Schluss. Wie erreichen wir Sie am besten?'
        : 'Понял. Тогда уточним контакт уже в конце. Как с вами удобнее всего связаться?',
      options: locale === 'de'
        ? ['WhatsApp', 'Telegram', 'E-Mail']
        : ['WhatsApp', 'Telegram', 'Электронная почта'],
    }
  }

  if (phoneJustCaptured && asksForEmail) {
    return {
      reply: withAcknowledgement(buildNextBriefQuestion(newBrief, locale), locale, userMessage, 'contact_phone'),
      options: buildNextBriefOptions(newBrief, locale),
    }
  }

  if (nameJustCaptured && /whatsapp|telegram/i.test(aiResponse.reply)) {
    return {
      reply: locale === 'de'
        ? `Danke, ${name}. Wo ist es für Sie bequemer, in Kontakt zu bleiben: über WhatsApp oder Telegram?`
        : `Спасибо, ${name}. Подскажите, где вам удобнее оставаться на связи: в WhatsApp или Telegram?`,
      options: locale === 'de'
        ? ['WhatsApp', 'Telegram', 'Schreibe ich in Nachricht']
        : ['WhatsApp', 'Telegram', 'Укажу в сообщении'],
    }
  }

  if (asksForServices) {
    return {
      reply: withAcknowledgement(applyFullNameInReply(aiResponse.reply, name), locale, userMessage, 'services'),
      options: getServiceOptions(inferServiceNiche(aiResponse.reply, newBrief.niche), locale),
    }
  }

  const questionKind = detectQuestionKind(aiResponse.reply)
  const repeatedKindCount = countAssistantQuestionsByKind(previousMessages, questionKind)
  const exactRepeatCount = countExactAssistantRepeats(previousMessages, aiResponse.reply)

  if (questionKind && (repeatedKindCount > 0 || exactRepeatCount > 0)) {
    return {
      reply: withAcknowledgement(
        applyFullNameInReply(buildQuestionVariant(questionKind, locale, Math.max(repeatedKindCount, exactRepeatCount)), name),
        locale,
        userMessage,
        questionKind
      ),
      options: buildOptionsForKind(questionKind, newBrief, locale),
    }
  }

  return {
    ...aiResponse,
    reply: withAcknowledgement(applyFullNameInReply(aiResponse.reply, name), locale, userMessage, questionKind),
  }
}

function inferBriefFromContext(
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
  userMessage: string,
  brief: {
    want_website?: string
    contact?: { name?: string; phone?: string; email?: string }
    niche?: string
    business?: { location?: string }
    site_status?: string
    goals?: string[]
    services?: string[]
    features?: string[]
    extra_features?: string[]
    target_audience?: string
    competitors?: string[]
    usp?: string
    pain_points?: string[]
    design?: { style?: string; references?: string[] }
    content?: { has_images?: boolean }
    materials?: string[]
    profiles?: string[]
    languages?: string[]
    budget?: { range?: string }
    deadline?: string
  }
) {
  const lastAssistantMessage = [...previousMessages].reverse().find((msg) => msg.role === 'assistant')?.content ?? ''
  const trimmed = userMessage.trim()
  const inferred: Partial<Brief> = {}
  const lastQuestionKind = detectQuestionKind(lastAssistantMessage)
  const currentContact = {
    name: brief.contact?.name ?? '',
    phone: brief.contact?.phone ?? '',
    email: brief.contact?.email ?? '',
  }

  if (!brief.want_website?.trim()) {
    if (/^(да,?\s*)?(хочу|нужен|нужна|нужно).*(сайт|лендинг|магазин)|^да, нужен сайт$/i.test(trimmed)) {
      inferred.want_website = 'Да, нужен сайт'
    } else if (/^(пока не уверен|не уверен|сначала есть вопрос|есть вопрос|пока смотрю)$/i.test(trimmed)) {
      inferred.want_website = trimmed
    }
  }

  if (!brief.contact?.name?.trim()) {
    const maybeName = extractName(trimmed)
    if (maybeName) inferred.contact = { ...currentContact, ...inferred.contact, name: maybeName }
  }

  if (!hasActualPhone(brief.contact?.phone)) {
    const maybePhone = extractPhone(trimmed)
    if (maybePhone) inferred.contact = { ...currentContact, ...inferred.contact, phone: maybePhone }
  }

  if (!brief.contact?.email?.trim()) {
    const maybeEmail = extractEmail(trimmed)
    if (maybeEmail) inferred.contact = { ...currentContact, ...inferred.contact, email: maybeEmail }
  }

  if (!isDeferredAnswer(trimmed)) {
    if (lastQuestionKind === 'niche' && !brief.niche?.trim()) inferred.niche = trimmed
    if (lastQuestionKind === 'region' && !brief.business?.location?.trim()) inferred.business = { type: '', description: '', location: trimmed }
    if (lastQuestionKind === 'site_status' && !brief.site_status?.trim()) inferred.site_status = trimmed
    if (lastQuestionKind === 'goals' && !brief.goals?.length) inferred.goals = [trimmed]
    if (lastQuestionKind === 'services' && !brief.services?.length) inferred.services = splitToItems(trimmed, 5)
    if (lastQuestionKind === 'features' && !brief.features?.length) inferred.features = splitToItems(trimmed, 5)
    if (lastQuestionKind === 'target_audience' && !brief.target_audience?.trim()) inferred.target_audience = trimmed
    if (lastQuestionKind === 'competitors' && !brief.competitors?.length) inferred.competitors = splitToItems(trimmed, 6)
    if (lastQuestionKind === 'usp' && !brief.usp?.trim()) inferred.usp = trimmed
    if (lastQuestionKind === 'competitor_advantages' && !brief.pain_points?.length) inferred.pain_points = splitToItems(trimmed, 4)
    if (lastQuestionKind === 'references' && !(brief.design?.references?.length ?? 0)) {
      inferred.design = {
        style: '',
        references: extractUrls(trimmed).length ? extractUrls(trimmed) : splitToItems(trimmed, 5),
      }
    }
    if (lastQuestionKind === 'extra_features' && !brief.extra_features?.length) inferred.extra_features = splitToItems(trimmed, 6)
    if (lastQuestionKind === 'languages' && !brief.languages?.length) inferred.languages = splitToItems(trimmed, 4)
    if (lastQuestionKind === 'brand_style' && !brief.design?.style?.trim()) {
      inferred.design = { style: trimmed, references: brief.design?.references ?? [] }
    }
    if (lastQuestionKind === 'media_assets' && !(brief.materials?.length ?? 0) && !brief.content?.has_images) {
      inferred.materials = splitToItems(trimmed, 4)
      if (/есть|имеются|готовы|yes|ja|have|photo|video|фото|видео/i.test(trimmed)) {
        inferred.content = { has_texts: false, has_images: true }
      }
    }
    if (lastQuestionKind === 'social_profiles' && !(brief.profiles?.length ?? 0)) {
      const urls = extractUrls(trimmed)
      inferred.profiles = urls.length ? urls : splitToItems(trimmed, 4)
    }
    if (lastQuestionKind === 'budget' && !brief.budget?.range?.trim()) inferred.budget = { range: trimmed }
    if (lastQuestionKind === 'deadline' && !brief.deadline?.trim()) inferred.deadline = trimmed
  }

  return inferred
}


function mergeBriefUpdates(...updates: Partial<Brief>[]) {
  const result: Partial<Brief> = {}

  for (const update of updates) {
    for (const [key, value] of Object.entries(update) as [keyof Brief, Brief[keyof Brief]][]) {
      if (value === undefined) continue

      const currentValue = result[key]
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof currentValue === 'object' &&
        currentValue !== null &&
        !Array.isArray(currentValue)
      ) {
        const mergedObject = { ...(currentValue as Record<string, unknown>) }
        for (const [nestedKey, nestedValue] of Object.entries(value as Record<string, unknown>)) {
          if (typeof nestedValue === 'string' && !nestedValue.trim()) continue
          if (Array.isArray(nestedValue)) {
            const prev = mergedObject[nestedKey]
            if (nestedValue.length === 0 && Array.isArray(prev) && prev.length > 0) continue
          }
          mergedObject[nestedKey] = nestedValue
        }
        ;(result as Record<string, unknown>)[key] = mergedObject
      } else {
        ;(result as Record<string, unknown>)[key] = value
      }
    }
  }

  return result
}

function splitToItems(text: string, max: number): string[] {
  return text
    .split(/[,;\n]+|\s[-•]\s|\sи\s|\sand\s/gi)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max)
}

function extractUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s,]+/gi) ?? []
  return Array.from(new Set(matches.map((url) => url.replace(/[)\]"'.,;:]+$/, ''))))
}

function asksForName(text: string) {
  return /как вас зовут|ваше имя|представьтесь|как я могу к вам обращаться|wie heißen sie|wie darf ich sie ansprechen|ihr name|хотя бы один контакт|mindestens einen kontakt|хотя бы имя/i.test(text)
}

function asksForPhoneNumber(text: string) {
  return /номер.*whatsapp|номер.*telegram|контакт.*whatsapp|контакт.*telegram|number.*whatsapp|number.*telegram|kontakt.*whatsapp|kontakt.*telegram/i.test(text)
}

function asksForEmail(text: string) {
  return /email|e-mail|почт/i.test(text)
}

function isContactPrompt(text: string) {
  return asksForName(text) || asksForPhoneNumber(text) || asksForEmail(text) || /хотя бы один контакт|mindestens einen kontakt/i.test(text)
}

function extractName(text: string) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return ''

  const introMatch = normalized.match(
    /(?:^|[,.!?\s])(?:меня зовут|зовут|это|i am|i'm|my name is|ich hei(?:ß|ss)e|mein name ist)\s+([\p{L}-]{2,40})/iu
  )
  const candidate = (introMatch?.[1] ?? normalized).trim()

  if (!/^[\p{L}\s-]{2,40}$/u.test(candidate)) return ''
  if (/whatsapp|telegram|email|e-mail|@/i.test(candidate)) return ''
  if (candidate.split(' ').length > 2) return ''
  if (/сайт|клиент|заявк|онлайн|термин|termin|google|maps|ремонт|юрид|салон|praxis|shop/i.test(candidate)) return ''
  if (isDeferredAnswer(candidate)) return ''

  return normalizePersonName(candidate)
}


function extractPhone(text: string) {
  if (isDeferredAnswer(text.trim())) return ''

  const telegramHandle = extractTelegramHandle(text)
  if (telegramHandle) return telegramHandle

  const normalized = text.replace(/[^\d+]/g, '')
  if (!/^\+?\d{7,20}$/.test(normalized)) return ''
  return normalized
}

function extractTelegramHandle(text: string) {
  const linkMatch = text.match(/(?:https?:\/\/)?(?:t\.me|telegram\.me)\/([a-zA-Z][a-zA-Z0-9_]{4,31})/i)
  if (linkMatch?.[1]) return `@${linkMatch[1]}`

  const handleMatch = text.match(/(?:^|[\s"'«(])@([a-zA-Z][a-zA-Z0-9_]{4,31})(?=$|[\s"'»).,!?;:])/)
  if (handleMatch?.[1]) return `@${handleMatch[1]}`

  return ''
}


function extractEmail(text: string) {
  if (isDeferredAnswer(text.trim())) return ''
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0] ?? ''
}

function isDeferredAnswer(text: string) {
  return /^(предпочту позже|укажу в сообщении|другое|напишу email сам|напишу e-?mail сам|schreibe ich in nachricht|anderes|lieber später|ich schreibe meine e-?mail selbst)$/i.test(
    text.trim()
  )
}

function hasPendingBriefQuestions(brief: { niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string }; deadline?: string }) {
  return !brief.niche?.trim() || !brief.site_status?.trim() || !brief.goals?.length || !brief.services?.length || !brief.features?.length || !brief.budget?.range?.trim() || !brief.deadline?.trim()
}

function buildDeferredContactTransition(nextQuestion: string, locale: 'ru' | 'de') {
  return locale === 'de'
    ? `Kein Problem, dann kommen wir später auf den Kontakt zurück. ${nextQuestion}`
    : `Без проблем, тогда вернемся к контакту ближе к концу. ${nextQuestion}`
}

function buildNextBriefQuestion(
  brief: { niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string }; deadline?: string },
  locale: 'ru' | 'de'
) {
  if (!brief.niche?.trim()) {
    return locale === 'de' ? 'In welcher Branche arbeiten Sie?' : 'В какой нише вы работаете?'
  }
  if (!brief.site_status?.trim()) {
    return locale === 'de' ? 'Haben Sie bereits eine Website oder brauchen Sie eine neue?' : 'У вас уже есть сайт или нужен новый?'
  }
  if (!brief.goals?.length) {
    return locale === 'de' ? 'Was soll die Website vor allem erreichen?' : 'Какие цели у сайта?'
  }
  if (!brief.services?.length) {
    return locale === 'de' ? 'Welche Leistungen oder Produkte bieten Sie an?' : 'Какие услуги или товары вы предлагаете?'
  }
  if (!brief.features?.length) {
    return locale === 'de' ? 'Welche Funktionen brauchen Sie auf der Website?' : 'Какие функции нужны на сайте?'
  }
  if (!brief.budget?.range?.trim()) {
    return locale === 'de' ? 'Welches Budget planen Sie ungefähr ein?' : 'Какой бюджет вы примерно планируете?'
  }
  if (!brief.deadline?.trim()) {
    return locale === 'de' ? 'Wann möchten Sie idealerweise starten?' : 'В какие сроки вам нужен запуск?'
  }

  return locale === 'de' ? 'Danke. Wir melden uns mit den nächsten Schritten.' : 'Спасибо. Мы свяжемся с вами и обсудим следующие шаги.'
}

function buildNextBriefOptions(
  brief: { niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string }; deadline?: string },
  locale: 'ru' | 'de'
) {
  if (!brief.niche?.trim()) {
    return locale === 'de'
      ? ['Friseursalon', 'Handwerk und Reparatur', 'Kfz-Werkstatt', 'Anwaltskanzlei']
      : ['Салон красоты', 'Строительство и ремонт', 'Автомастерская', 'Юридическая практика']
  }
  if (!brief.site_status?.trim()) {
    return locale === 'de'
      ? ['Website ist vorhanden, ich moechte sie aktualisieren', 'Noch keine Website, aber ich brauche eine', 'Bisher gibt es nur eine Idee']
      : ['Сайт уже есть, хочу обновить', 'Сайта еще нет, но он нужен', 'Пока есть только идея']
  }
  if (!brief.goals?.length) {
    return locale === 'de'
      ? ['Mehr Kunden gewinnen', 'Online verkaufen', 'Vertrauen staerken']
      : ['Привлечь клиентов', 'Продавать онлайн', 'Повысить доверие']
  }
  if (!brief.services?.length) {
    return getServiceOptions(brief.niche, locale)
  }
  if (!brief.features?.length) {
    return locale === 'de'
      ? ['Online-Buchung', 'Preisliste', 'Galerie']
      : ['Онлайн-запись', 'Прайс-лист', 'Галерея работ']
  }
  if (!brief.budget?.range?.trim()) {
    return locale === 'de'
      ? ['Bis 1000€', '1000-3000€', '3000€+', 'Noch nicht sicher']
      : ['До 1000€', '1000-3000€', '3000€+', 'Пока не знаю']
  }
  if (!brief.deadline?.trim()) {
    return locale === 'de'
      ? ['Dringend', '2–4 Wochen', '1–2 Monate', 'Flexibel']
      : ['Срочно', '2-4 недели', '1-2 месяца', 'Гибко']
  }
  return undefined
}

function detectQuestionKind(reply: string) {
  const text = reply.toLowerCase()
  if (/нужен сайт|вам нужен сайт|brauchen sie.*website/.test(text)) return 'want_website'
  if (/какую задачу|главная задача сайта|основная цель|что вы хотите достичь|цели у сайта|welches ziel|erreichen/.test(text)) return 'goals'
  if (/в какой нише|в какой сфере|чем именно вы занимаетесь|чем вы занимаетесь|branche|nische/.test(text)) return 'niche'
  if (/в каком городе|в каком регионе|stadt|region in deutschland|lokales seo/.test(text)) return 'region'
  if (/уже есть сайт|нужен новый|bereits eine website/.test(text)) return 'site_status'
  if (/какие услуги|leistungen|produkte bieten sie an/.test(text)) return 'services'
  if (/какие функции|какая практическая функция|наиболее важна|funktionen brauchen/.test(text)) return 'features'
  if (/идеальный клиент|портрет клиента|zielkunde|ideal customer/.test(text)) return 'target_audience'
  if (/уникальн|утп|usp/.test(text)) return 'usp'
  if (/чем конкуренты лучше|stärker als sie|was machen konkurrenten besser/.test(text)) return 'competitor_advantages'
  if (/сайтов конкурентов|референс|references|welche websites/.test(text)) return 'references'
  if (/назовите своих конкурентов|назовите конкурентов|важнейших конкурентов|wichtigsten wettbewerber|ihre wichtigsten wettbewerber/.test(text)) return 'competitors'
  if (/специфический функционал|личный кабинет|калькулятор|поиск по сайту|zusatzfunktionen|spezifische funktionen/.test(text)) return 'extra_features'
  if (/на скольких языках|сколько языков|wie viele sprachen/.test(text)) return 'languages'
  if (/фирменный стиль|брендбук|логотип|brand style|brandbook/.test(text)) return 'brand_style'
  if (/фото|видео|bild|foto|video/.test(text) && /есть|готов|haben sie|vorhanden/.test(text)) return 'media_assets'
  if (/соцсет|social|instagram|facebook|tiktok|linkedin/.test(text) && /ссыл|link/.test(text)) return 'social_profiles'
  if (/какой бюджет|в каком бюджете|budgetrahmen|welches budget/.test(text)) return 'budget'
  if (/в какие сроки|когда.*запуск|wann.*start|ideal.*start/.test(text)) return 'deadline'
  return ''
}


function countAssistantQuestionsByKind(messages: Array<{ role: 'user' | 'assistant'; content: string }>, kind: string) {
  if (!kind) return 0
  return messages.filter((msg) => msg.role === 'assistant' && detectQuestionKind(msg.content) === kind).length
}

function countExactAssistantRepeats(messages: Array<{ role: 'user' | 'assistant'; content: string }>, reply: string) {
  const normalizedReply = normalizeReplyText(reply)
  return messages.filter((msg) => msg.role === 'assistant' && normalizeReplyText(msg.content) === normalizedReply).length
}

function buildQuestionVariant(kind: string, locale: 'ru' | 'de', repeatCount: number) {
  const variantIndex = Math.min(repeatCount, 2)
  const variants = locale === 'de'
    ? {
        want_website: [
          'Brauchen Sie grundsätzlich eine Website?',
          'Vielleicht anders gefragt: Soll die Website bei Ihnen überhaupt eine Rolle spielen?',
          'Lassen Sie uns nicht am Wort Website hängen. Wäre so ein Tool für Ihr Ziel überhaupt sinnvoll?',
        ],
        goals: [
          'Dann lass es uns konkreter machen: Was möchten Sie mit der Website erreichen?',
          'Ich frage es mal aus Ergebnissicht: Was soll sich für Ihr Geschäft verbessern?',
          'Damit ich Sie sauber beraten kann: Was ist für Sie gerade wichtiger - neue Kunden, Online-Verkäufe oder mehr Vertrauen?',
        ],
        niche: [
          'In welcher Branche sind Sie tätig?',
          'Damit ich passende Beispiele nennen kann: Was genau machen Sie beruflich?',
          'Beschreiben Sie bitte kurz Ihr Geschäftsfeld.',
        ],
        site_status: [
          'Haben Sie schon eine Website oder starten wir neu?',
          'Arbeiten wir mit einer bestehenden Website weiter oder bauen wir von null?',
          'Gibt es schon eine Website, die wir überarbeiten, oder brauchen Sie einen kompletten Neustart?',
        ],
        services: [
          'Welche Leistungen bieten Sie konkret an?',
          'Was sollen Besucher auf der Website bei Ihnen sofort sehen?',
          'Nennen Sie bitte die wichtigsten Leistungen, die auf der Website stehen sollen.',
        ],
        features: [
          'Welche Funktionen brauchen Sie auf der Website?',
          'Was sollen Besucher direkt auf der Website tun können?',
          'Welche praktischen Funktionen sind für Sie wichtig - zum Beispiel Buchung, Preise oder Galerie?',
        ],
        budget: [
          'Welches Budget planen Sie ungefähr ein?',
          'In welchem Rahmen möchten Sie investieren?',
          'Welche Budgetspanne wäre für Sie realistisch?',
        ],
        deadline: [
          'Wann möchten Sie idealerweise starten?',
          'Bis wann soll die Website live gehen?',
          'Wie dringend ist das Projekt zeitlich?',
        ],
      }
    : {
        want_website: [
          'Вам в целом нужен сайт?',
          'Спрошу чуть иначе: сайт вообще должен участвовать в решении вашей задачи?',
          'Давайте не упираться в слово "сайт". Такой инструмент вам в принципе нужен для достижения цели?',
        ],
        goals: [
          'Тогда задам вопрос чуть точнее: что именно вы хотите получить с помощью сайта?',
          'Давайте оттолкнемся от результата: что должно измениться для вашего бизнеса?',
          'Чтобы я предложил правильное решение: что для вас сейчас важнее - новые клиенты, онлайн-продажи или больше доверия?',
        ],
        niche: [
          'В какой сфере вы работаете?',
          'Чтобы предложить подходящую структуру, подскажите, чем именно вы занимаетесь?',
          'Опишите коротко ваш бизнес или направление работы.',
        ],
        site_status: [
          'У вас уже есть сайт или будем делать новый?',
          'Мы говорим про доработку текущего сайта или про запуск с нуля?',
          'Есть ли уже сайт, который нужно обновить, или нужен полностью новый?',
        ],
        services: [
          'Какие услуги вы оказываете конкретно?',
          'Что клиент должен сразу увидеть у вас на сайте?',
          'Перечислите, пожалуйста, основные услуги, которые нужно показать на сайте.',
        ],
        features: [
          'Какие функции нужны на сайте?',
          'Что посетитель должен уметь сделать прямо на сайте?',
          'Какие практические функции для вас важны - запись, прайс, галерея, заявка?',
        ],
        budget: [
          'Какой бюджет вы примерно планируете?',
          'В каком диапазоне вам комфортно рассматривать проект?',
          'На какую сумму вы ориентируетесь по проекту?',
        ],
        deadline: [
          'В какие сроки вам нужен запуск?',
          'Когда для вас желательно выйти в запуск?',
          'Насколько срочный у вас проект по времени?',
        ],
      }

  const variantsForKind = variants[kind as keyof typeof variants]
  return variantsForKind?.[variantIndex] ?? variants.goals[0]
}

function buildOptionsForKind(
  kind: string,
  brief: { niche?: string; site_status?: string; goals?: string[]; services?: string[]; features?: string[]; budget?: { range?: string }; deadline?: string },
  locale: 'ru' | 'de'
) {
  switch (kind) {
    case 'niche':
      return locale === 'de'
        ? ['Friseursalon', 'Handwerk und Reparatur', 'Kfz-Werkstatt', 'Anwaltskanzlei']
        : ['Салон красоты', 'Строительство и ремонт', 'Автомастерская', 'Юридическая практика']
    case 'site_status':
      return locale === 'de'
        ? ['Website ist vorhanden, ich moechte sie aktualisieren', 'Noch keine Website, aber ich brauche eine', 'Bisher gibt es nur eine Idee']
        : ['Сайт уже есть, хочу обновить', 'Сайта еще нет, но он нужен', 'Пока есть только идея']
    case 'goals':
      return locale === 'de'
        ? ['Mehr Kunden gewinnen', 'Online verkaufen', 'Vertrauen staerken']
        : ['Привлечь клиентов', 'Продавать онлайн', 'Повысить доверие']
    case 'services':
      return buildNextBriefOptions({ ...brief, services: [] }, locale)
    case 'features':
      return locale === 'de'
        ? ['Online-Buchung', 'Preisliste', 'Galerie']
        : ['Онлайн-запись', 'Прайс-лист', 'Галерея работ']
    case 'budget':
      return locale === 'de'
        ? ['Bis 1000€', '1000-3000€', '3000€+', 'Noch nicht sicher']
        : ['До 1000€', '1000-3000€', '3000€+', 'Пока не знаю']
    case 'deadline':
      return locale === 'de'
        ? ['Dringend', '2–4 Wochen', '1–2 Monate', 'Flexibel']
        : ['Срочно', '2-4 недели', '1-2 месяца', 'Гибко']
    case 'want_website':
      return locale === 'de'
        ? ['Ja, ich möchte eine Website', 'Ich bin noch unsicher', 'Ich habe erst eine Frage']
        : ['Да, нужен сайт', 'Пока не уверен', 'Сначала есть вопрос']
    default:
      return undefined
  }
}

function normalizePersonName(name: string) {
  const normalizedName = name.replace(/\s+/g, ' ').trim()
  const key = normalizedName.toLowerCase()
  const dictionary: Record<string, string> = {
    'алеша': 'Алексей',
    'алёша': 'Алексей',
    'леша': 'Алексей',
    'лёша': 'Алексей',
    'саша': 'Александр',
    'вася': 'Василий',
    'женя': 'Евгений',
    'дима': 'Дмитрий',
    'миша': 'Михаил',
    'паша': 'Павел',
    'костя': 'Константин',
    'сережа': 'Сергей',
    'серёжа': 'Сергей',
    'андрюша': 'Андрей',
    'вова': 'Владимир',
  }

  if (dictionary[key]) return dictionary[key]

  return normalizedName
    .split(' ')
    .map((part) => part.split('-').map(capitalizeWord).join('-'))
    .join(' ')
}

function capitalizeWord(value: string) {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

function applyFullNameInReply(reply: string, fullName?: string) {
  if (!fullName) return reply

  const shortToFull: Record<string, string> = {
    'алеша': fullName,
    'алёша': fullName,
    'леша': fullName,
    'лёша': fullName,
    'саша': fullName,
    'вася': fullName,
    'женя': fullName,
    'дима': fullName,
    'миша': fullName,
    'паша': fullName,
    'костя': fullName,
    'сережа': fullName,
    'серёжа': fullName,
    'андрюша': fullName,
    'вова': fullName,
  }

  let nextReply = reply
  for (const [shortName, normalizedFullName] of Object.entries(shortToFull)) {
    nextReply = nextReply.replace(new RegExp(`\\b${shortName}\\b`, 'gi'), normalizedFullName)
  }

  return nextReply
}

function normalizeReplyText(reply: string) {
  return reply.replace(/\s+/g, ' ').trim().toLowerCase()
}

function withAcknowledgement(reply: string, locale: 'ru' | 'de', userMessage: string, questionKind: string) {
  const normalizedUserMessage = userMessage.trim().toLowerCase()
  if (!normalizedUserMessage) return reply
  if (/^\d+$/.test(normalizedUserMessage)) return reply
  if (/^(whatsapp|telegram)$/i.test(userMessage.trim())) return reply
  if (/^(да|yes|ja)$/i.test(userMessage.trim())) return reply
  if (/^(нет|no|nein)$/i.test(userMessage.trim())) return reply

  const prefixByLocale = locale === 'de'
    ? {
        goals: 'Verstanden. ',
        niche: 'Gut, dann frage ich etwas genauer. ',
        site_status: 'Klar. ',
        services: 'Gut. ',
        features: 'Verstanden. ',
        budget: 'Okay. ',
        default: 'Verstanden. ',
      }
    : {
        goals: 'Понял. ',
        niche: 'Хорошо, тогда уточню точнее. ',
        site_status: 'Ясно. ',
        services: 'Хорошо. ',
        features: 'Понял. ',
        budget: 'Понятно. ',
        default: 'Понял. ',
      }

  const prefix = prefixByLocale[questionKind as keyof typeof prefixByLocale] ?? prefixByLocale.default
  if (normalizeReplyText(reply).startsWith(normalizeReplyText(prefix))) return reply
  return `${prefix}${reply}`
}

function hasActualPhone(value?: string) {
  if (!value) return false
  const trimmed = value.trim()
  const isPhoneNumber = /^\+?\d{7,20}$/.test(trimmed)
  const isTelegramHandle = /^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(trimmed)
  const isTelegramLink = /^(?:https?:\/\/)?(?:t\.me|telegram\.me)\/[a-zA-Z][a-zA-Z0-9_]{4,31}$/i.test(trimmed)
  return isPhoneNumber || isTelegramHandle || isTelegramLink
}

function getServiceOptions(niche: string | undefined, locale: 'ru' | 'de') {
  const normalizedNiche = niche?.toLowerCase() ?? ''

  if (/авто|сто|мастерск|kfz|werkstatt|auto/.test(normalizedNiche)) {
    return locale === 'de'
      ? ['Fahrwerk-Reparatur', 'Karosserie-Reparatur', 'Motor-Reparatur', 'Getriebe-Reparatur']
      : ['Ремонт ходовой', 'Кузовной ремонт', 'Ремонт двигателя', 'Ремонт трансмиссии']
  }

  if (/парикмах|friseur|salon/.test(normalizedNiche)) {
    return locale === 'de'
      ? ['Haarschnitte', 'Coloration', 'Styling', 'Pflege']
      : ['Стрижки', 'Окрашивание', 'Укладка', 'Уход']
  }

  if (/юрист|anwalt|kanzlei/.test(normalizedNiche)) {
    return locale === 'de'
      ? ['Beratung', 'Vertragsrecht', 'Arbeitsrecht', 'Vertretung']
      : ['Консультации', 'Договорное право', 'Трудовые споры', 'Представительство']
  }

  return locale === 'de'
    ? ['Beratung', 'Verkauf', 'Service', 'Montage']
    : ['Консультации', 'Продажа', 'Сервис', 'Монтаж']
}

function inferServiceNiche(reply: string, briefNiche?: string) {
  if (briefNiche?.trim()) return briefNiche

  const text = reply.toLowerCase()
  if (/автомастерск|сто|автосервис|kfz|werkstatt|auto/.test(text)) return 'Автомастерская'
  if (/парикмах|салон|friseur|salon/.test(text)) return 'Парикмахерская'
  if (/юрист|адвокат|anwalt|kanzlei/.test(text)) return 'Юрист'
  if (/imbiss/.test(text)) return 'Imbiss'

  return briefNiche
}

function hasContactInfo(brief: { contact?: { name?: string; phone?: string; email?: string } }): boolean {
  const c = brief.contact
  if (!c || typeof c !== 'object') return false
  const hasName = Boolean(c.name?.trim())
  const hasContact = Boolean(c.phone?.trim() || c.email?.trim())
  return hasName && hasContact
}
