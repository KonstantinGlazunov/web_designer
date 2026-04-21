import type { Brief } from './brief'
import type { ChatMessage } from './session-store'
import { isClosingMessage } from './chat-utils'

const SYSTEM_PROMPT = `Ты — дружелюбный менеджер веб-студии.

Твоя задача: провести диалог, собрать контакты и заполнить бриф на разработку сайта.

СТРОГИЙ ПОРЯДОК ВОПРОСОВ:

1. Вам нужен сайт? (want_website) — если ещё не ответил.

2. СРАЗУ ПОСЛЕ "Да, хочу сайт" — сбор контактов ПЕРВЫМ ДЕЛОМ. Скажи:
   "Давайте я сразу запишу ваши координаты, чтобы мы имели возможность связаться с вами. А потом мы поговорим подробнее про ваш сайт. Как вас зовут?"
   Собери: имя (contact.name), затем "У вас есть WhatsApp или Telegram?" (contact.phone).
   Email (contact.email) спрашивай ТОЛЬКО если пользователь НЕ дал WhatsApp/Telegram.
   НЕ спрашивай "Какой у вас номер?" — спрашивай про WhatsApp/Telegram.
   Спрашивай по одному полю.
   Если клиент на ВСЕ вопросы по контакту ответил "Укажу в сообщении" и в brief до сих пор нет контактов — НЕ заканчивай диалог. Скажи вежливо: "Хорошо! Тогда напишите, пожалуйста, в сообщении хотя бы один контакт — имя, номер или email — чтобы наш разговор не прошел напрасно." Когда он напишет в сообщении — извлеки из текста имя/телефон/email и заполни brief_update.

3. ПОСЛЕ КОНТАКТОВ — заполняй бриф (по одному вопросу):
   • В какой нише вы работаете? (niche)
   • У вас уже есть сайт или нужен новый? (site_status)
   • Какие цели у сайта? (goals)
   • Какие услуги предлагаете? (services)
   • Какие функции нужны? (features: онлайн-запись, прайс, галерея работ)
   • Какой бюджет? (budget.range)
   Только когда есть контакты И хотя бы цели/услуги/бюджет — поблагодари и скажи, что свяжетесь.

Правила:
• Задавай ОДИН вопрос за раз
• На КАЖДЫЙ вопрос обязательно предлагай 2–4 варианта в options
• Веди диалог тепло и дружелюбно
• После контактов — сразу переходи к вопросу о целях, услугах или бюджете. НЕ говори "Спасибо, свяжемся" только из-за контактов — продолжай бриф!

ЭКСПЕРТНОСТЬ:
• После ответов пользователя давай короткий экспертный комментарий (1–2 предложения), показывающий понимание его бизнеса и ситуации.
• Комментарий должен быть конкретным по контексту ответа, а не общим.

ДИАГНОЗ:
• После 2–3 ответов пользователя сформулируй краткий вывод:
  - для DE: "Basierend auf Ihren Antworten sehe ich, dass ..."
  - для RU: "Судя по вашим ответам, вижу, что ..."
• После этого переходи к следующему уточняющему вопросу.

СБОР КОНТАКТОВ:
• Запрашивай контакты ТОЛЬКО после того, как:
  1) пользователь ответил минимум на 2 вопроса;
  2) ты уже дал экспертный комментарий или мини-анализ (диагноз).
• Не запрашивай контакты раньше этих условий.

ПЕРЕД КОНТАКТАМИ:
• Перед первым запросом контактов обязательно скажи:
  - для DE: "Ich kann Ihnen konkret zeigen, wie das für Ihr Unternehmen aussehen kann."
  - для RU: "Я могу конкретно показать, как это может выглядеть для вашего бизнеса."

КРИТИЧНО — НЕ СДАВАЙСЯ:
• НИКОГДА не говори "дайте знать, когда понадобится" или "обращайтесь, когда будете готовы"
• Твоя цель: контакты + хотя бы цели/услуги/бюджет. НЕ заканчивай только контактами — всегда продолжай с вопросами брифа (цели, услуги, функции, бюджет).
• Если клиент НЕ УВЕРЕН в нужности сайта ("не уверен", "подумаю", "пока нет", "в процессе") — НЕ повторяй вопрос "Вам нужен сайт?". Спроси: "А что вы вообще хотите достичь? Какую задачу решаете?" с options: ["Привлечь клиентов", "Продавать онлайн", "Повысить доверие"]. Когда он назовёт цель — скажи кратко, что сайт как раз для этого помогает, и переходи к следующему вопросу (ниша).
• Если клиент откладывает по другим вопросам (ниша) — мягко возвращай: "Понятно. А в какой нише вы работаете?" и т.д.
• Если клиент везде ответил "Укажу в сообщении" и контактов нет — вежливо попроси: "Хорошо! Тогда напишите, пожалуйста, в сообщении хотя бы один контакт — имя, номер или email — чтобы наш разговор не прошел напрасно." НЕ говори "Спасибо, свяжемся" без контактов.
• Если в brief уже есть contact.phone (WhatsApp или Telegram), больше НЕ спрашивай email и переходи к следующему вопросу брифа.
• Всегда задавай следующий вопрос, чтобы продвинуть к контактам или брифу

СТРОГО отвечай ТОЛЬКО валидным JSON. Никакого текста до или после JSON — только один JSON-объект:
{"reply": "текст ответа", "brief_update": { /* обновлённые поля */ }, "options": ["Вариант 1", "Вариант 2"]}

• reply — только вопрос или фраза. НЕ перечисляй варианты в reply — они показываются кнопками из options. Пример: "В какой нише вы работаете?" (без списка в тексте).
• brief_update — только изменённые поля. Примеры: contact: { name, phone, email }; goals: ["лиды"]; services: ["ремонт", "диагностика"]; features: ["онлайн-запись"]; budget: { range: "до 1000€" }
• options — варианты отображаются как КНОПКИ. ОБЯЗАТЕЛЬНО 2–4 варианта для вопросов.
  Для завершающих сообщений — options: [] или не включай.
  Для ниши: ["Парикмахерская", "Imbiss", "Автомастерская", "Юрист"]; для site_status — ["Уже есть, хочу обновить", "Еще нет, но нужен", "Пока есть только идея"]; для целей — ["Привлечь клиентов", "Продавать онлайн", "Повысить доверие"]; для услуг — подбирай под нишу (автомастерская: ремонт, диагностика, запчасти); для функций — ["Онлайн-запись", "Прайс", "Галерея работ"]; для бюджета — ["До 500€", "500–2000€", "2000€+", "Обсудим"]; для открытых — ["Укажу в сообщении", "Пропустить"].`

export interface AIResponse {
  reply: string
  brief_update: Partial<Brief>
  options?: string[]
}

export async function chatWithAI(
  messages: ChatMessage[],
  currentBrief: Brief,
  locale: 'ru' | 'de' = 'ru'
): Promise<AIResponse> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('[OpenAI] OPENAI_API_KEY not set')
    throw new Error('OpenAI API key not configured')
  }

  const languageInstruction = locale === 'de'
    ? '\n\nWICHTIG: Führe den gesamten Dialog auf Deutsch. Alle Fragen, Antworten und Texte müssen auf Deutsch sein.'
    : ''

  const briefContext = `Текущий бриф (JSON):\n${JSON.stringify(currentBrief, null, 2)}`

  const apiMessages = [
    { role: 'system' as const, content: SYSTEM_PROMPT + languageInstruction + '\n\n' + briefContext },
    ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60000)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId))

  if (!res.ok) {
    const err = await res.text()
    console.error('[OpenAI] API error:', res.status, err)
    if (res.status === 429) throw new Error('Превышен лимит запросов. Подождите минуту.')
    if (res.status >= 500) throw new Error('Сервис временно недоступен. Попробуйте позже.')
    throw new Error(`OpenAI API error: ${res.status}`)
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
  const content = data.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('Empty response from OpenAI')
  }

  return parseAIResponse(content, locale, messages, currentBrief)
}

export function sanitizeBriefUpdate(raw: unknown): Partial<Brief> {
  if (typeof raw !== 'object' || raw === null) return {}
  const obj = raw as Record<string, unknown>
  const sanitized: Record<string, unknown> = {}
  const toCleanString = (value: unknown) => String(value ?? '').trim()

  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) continue
    if (key === 'business' && typeof val === 'object' && val !== null) {
      const b = val as Record<string, unknown>
      const business = {
        type: toCleanString(b.type),
        description: toCleanString(b.description),
        location: toCleanString(b.location),
      }
      if (business.type || business.description || business.location) sanitized[key] = business
    } else if (key === 'design' && typeof val === 'object' && val !== null) {
      const d = val as Record<string, unknown>
      const references = Array.isArray(d.references) ? d.references.map((item) => String(item).trim()).filter(Boolean) : []
      const style = toCleanString(d.style)
      if (style || references.length) {
        sanitized[key] = {
          style,
          references,
        }
      }
    } else if (key === 'content' && typeof val === 'object' && val !== null) {
      const c = val as Record<string, unknown>
      sanitized[key] = {
        has_texts: Boolean(c.has_texts),
        has_images: Boolean(c.has_images),
      }
    } else if (key === 'tech' && typeof val === 'object' && val !== null) {
      const t = val as Record<string, unknown>
      sanitized[key] = {
        domain: Boolean(t.domain),
        hosting: Boolean(t.hosting),
      }
    } else if (key === 'seo' && typeof val === 'object' && val !== null) {
      const s = val as Record<string, unknown>
      sanitized[key] = {
        needed: Boolean(s.needed),
        ads: Boolean(s.ads),
      }
    } else if (key === 'budget' && typeof val === 'object' && val !== null) {
      const b = val as Record<string, unknown>
      const range = toCleanString(b.range)
      if (range) sanitized[key] = { range }
    } else if (key === 'contact' && typeof val === 'object' && val !== null) {
      const c = val as Record<string, unknown>
      const contact = {
        name: toCleanString(c.name),
        phone: toCleanString(c.phone),
        email: toCleanString(c.email),
      }
      if (contact.name || contact.phone || contact.email) sanitized[key] = contact
    } else if (['want_website', 'niche', 'site_status'].includes(key)) {
      const nextValue = toCleanString(val)
      if (nextValue) sanitized[key] = nextValue
    } else if (['goals', 'success_metrics', 'selection_criteria', 'business_barriers', 'services', 'competitors', 'traffic_sources', 'features', 'languages', 'pain_points'].includes(key)) {
      const nextArray = (Array.isArray(val) ? val.map(String) : [String(val)]).map((item) => item.trim()).filter(Boolean)
      if (nextArray.length) sanitized[key] = nextArray
    } else if (['target_audience', 'usp', 'sales_funnel', 'deadline', 'prior_experience'].includes(key)) {
      const nextValue = toCleanString(val)
      if (nextValue) sanitized[key] = nextValue
    }
  }

  return sanitized as Partial<Brief>
}

const FALLBACK_OPTIONS = { ru: ['Укажу в сообщении', 'Пропустить'], de: ['Schreibe in Nachricht', 'Überspringen'] } as const
const FALLBACK_NICHE_OPTIONS = {
  ru: ['Салон красоты', 'Строительство и ремонт', 'Автомастерская', 'Юридическая практика'],
  de: ['Friseursalon', 'Handwerk und Reparatur', 'Kfz-Werkstatt', 'Anwaltskanzlei'],
} as const
const FALLBACK_SITE_STATUS_OPTIONS = {
  ru: ['Сайт уже есть, хочу обновить', 'Сайта еще нет, но он нужен', 'Пока есть только идея'],
  de: ['Website ist vorhanden, ich moechte sie aktualisieren', 'Noch keine Website, aber ich brauche eine', 'Bisher gibt es nur eine Idee'],
} as const
const FALLBACK_GOALS_OPTIONS = {
  ru: ['Привлечь клиентов', 'Продавать онлайн', 'Повысить доверие'],
  de: ['Mehr Kunden gewinnen', 'Online verkaufen', 'Vertrauen staerken'],
} as const
const FALLBACK_SERVICES_OPTIONS = {
  ru: ['Ремонт', 'Консультации', 'Продажа'],
  de: ['Reparatur', 'Beratung', 'Verkauf'],
} as const
const FALLBACK_FEATURES_OPTIONS = {
  ru: ['Онлайн-запись', 'Прайс', 'Галерея работ'],
  de: ['Online-Buchung', 'Preisliste', 'Galerie'],
} as const
const FALLBACK_BUDGET_OPTIONS = {
  ru: ['До 1000€', '1000-3000€', '3000€+', 'Пока не знаю'],
  de: ['Bis 1000€', '1000-3000€', '3000€+', 'Noch nicht sicher'],
} as const

function normalizeOptionText(option: string): string {
  return option.replace(/\s+/g, ' ').trim()
}

function getQuestionKind(reply: string, locale: 'ru' | 'de', lastUserMessage?: string, brief?: Brief): string {
  const text = `${reply} ${lastUserMessage ?? ''}`.toLowerCase()
  const hasPhoneContact = Boolean(brief?.contact?.phone?.trim())

  if (locale === 'de') {
    if (/brauchen sie.*website|möchte.*website|möchten sie eine website/.test(text)) return 'want_website'
    if (/wie heißen sie|ihr name|wie ist ihr name/.test(text)) return 'contact_name'
    if (/whatsapp|telegram/.test(text)) return 'contact_phone'
    if (/e-?mail/.test(text) && !hasPhoneContact) return 'contact_email'
  } else {
    if (/нужен сайт|хочу сайт|вам нужен сайт/.test(text)) return 'want_website'
    if (/как вас зовут|ваше имя|представьтесь/.test(text)) return 'contact_name'
    if (/whatsapp|telegram/.test(text)) return 'contact_phone'
    if (/email|e-mail|почт/.test(text) && !hasPhoneContact) return 'contact_email'
  }

  if (hasPhoneContact && (/email|e-mail|почт|e-?mail/.test(text))) return 'goals'
  if (/ниш|сфер|направл|отрасл|бизнес|branche|nische/.test(text)) return 'niche'
  if (/уже есть|новый сайт|редизайн|обновить|bereits vorhanden|neu/.test(text)) return 'site_status'
  if (/цел|достичь|какую задачу|что вы хотите|ziel|erreichen|aufgabe/.test(text)) return 'goals'
  if (/услуг|предлагаете|товар|angebot|leistungen|services/.test(text)) return 'services'
  if (/функци|онлайн-запис|прайс|галере|funktion|buchung|galerie/.test(text)) return 'features'
  if (/бюджет|стоимость|цена|budget|preis|kosten/.test(text)) return 'budget'
  return 'generic'
}

function getCanonicalOptions(kind: string, locale: 'ru' | 'de', brief?: Brief): string[] | undefined {
  const normalizedNiche = brief?.niche?.toLowerCase() ?? ''
  const serviceOptions = locale === 'de'
    ? /kfz|werkstatt|auto/.test(normalizedNiche)
      ? ['Fahrwerk-Reparatur', 'Karosserie-Reparatur', 'Motor-Reparatur', 'Getriebe-Reparatur']
      : /friseur|salon/.test(normalizedNiche)
        ? ['Haarschnitte', 'Coloration', 'Styling', 'Pflege']
        : /anwalt|kanzlei/.test(normalizedNiche)
          ? ['Beratung', 'Vertragsrecht', 'Arbeitsrecht', 'Vertretung']
          : [...FALLBACK_SERVICES_OPTIONS.de]
    : /авто|сто|мастерск/.test(normalizedNiche)
      ? ['Ремонт ходовой', 'Кузовной ремонт', 'Ремонт двигателя', 'Ремонт трансмиссии']
      : /парикмах|салон/.test(normalizedNiche)
        ? ['Стрижки', 'Окрашивание', 'Укладка', 'Уход']
        : /юрист|адвокат|прав/.test(normalizedNiche)
          ? ['Консультации', 'Договорное право', 'Трудовые споры', 'Представительство']
          : [...FALLBACK_SERVICES_OPTIONS.ru]

  const optionsByLocale = locale === 'de'
    ? {
        want_website: ['Ja, ich möchte eine Website', 'Ich bin noch unsicher', 'Ich habe erst eine Frage'],
        contact_name: ['Ich schreibe meinen Namen selbst', 'Schreibe ich in Nachricht', 'Lieber später'],
        contact_phone: ['WhatsApp', 'Telegram', 'Schreibe ich in Nachricht'],
        contact_email: ['Ich schreibe meine E-Mail selbst', 'Schreibe ich in Nachricht', 'Lieber später'],
        niche: [...FALLBACK_NICHE_OPTIONS.de],
        site_status: [...FALLBACK_SITE_STATUS_OPTIONS.de],
        goals: [...FALLBACK_GOALS_OPTIONS.de],
        services: serviceOptions,
        features: [...FALLBACK_FEATURES_OPTIONS.de],
        budget: [...FALLBACK_BUDGET_OPTIONS.de],
        generic: [...FALLBACK_OPTIONS.de],
      }
    : {
        want_website: ['Да, нужен сайт', 'Пока не уверен', 'Сначала есть вопрос'],
        contact_name: ['Напишу имя сам', 'Укажу в сообщении', 'Предпочту позже'],
        contact_phone: ['WhatsApp', 'Telegram', 'Укажу в сообщении'],
        contact_email: ['Напишу email сам', 'Укажу в сообщении', 'Предпочту позже'],
        niche: [...FALLBACK_NICHE_OPTIONS.ru],
        site_status: [...FALLBACK_SITE_STATUS_OPTIONS.ru],
        goals: [...FALLBACK_GOALS_OPTIONS.ru],
        services: serviceOptions,
        features: [...FALLBACK_FEATURES_OPTIONS.ru],
        budget: [...FALLBACK_BUDGET_OPTIONS.ru],
        generic: [...FALLBACK_OPTIONS.ru],
      }

  return optionsByLocale[kind as keyof typeof optionsByLocale]
}

function optionsMatchQuestion(options: string[], kind: string, locale: 'ru' | 'de', brief?: Brief): boolean {
  const canonical = getCanonicalOptions(kind, locale, brief)
  if (!canonical || kind === 'generic') return options.length >= 2

  const normalizedOptions = options.map((option) => normalizeOptionText(option).toLowerCase())
  const normalizedCanonical = canonical.map((option) => normalizeOptionText(option).toLowerCase())
  const overlap = normalizedOptions.filter((option) =>
    normalizedCanonical.some((canonicalOption) => canonicalOption === option || canonicalOption.includes(option) || option.includes(canonicalOption))
  ).length

  return overlap >= Math.min(2, normalizedOptions.length)
}

function getFinalOptions(reply: string, rawOptions: string[], locale: 'ru' | 'de', messages: ChatMessage[], brief?: Brief): string[] | undefined {
  if (isClosingMessage(reply)) return undefined

  const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user')?.content
  const kind = getQuestionKind(reply, locale, lastUserMessage, brief)
  const cleaned = Array.from(
    new Set(
      rawOptions
        .map((option) => normalizeOptionText(option))
        .filter((option) => option.length >= 2 && option.length <= 60)
    )
  ).slice(0, 4)

  const canonical = getCanonicalOptions(kind, locale, brief)
  if (canonical?.length && kind !== 'generic') return canonical.slice(0, 4)

  if (cleaned.length >= 2 && optionsMatchQuestion(cleaned, kind, locale, brief)) {
    return cleaned
  }

  return [...getFallbackOptions(reply, locale)]
}

function getFallbackOptions(reply: string, locale: 'ru' | 'de'): readonly string[] {
  if (/ниш|сфер|направл|отрасл|бизнес/i.test(reply)) return FALLBACK_NICHE_OPTIONS[locale]
  if (/уже есть|новый сайт|сайт или нужен|редизайн|обновить/i.test(reply)) return FALLBACK_SITE_STATUS_OPTIONS[locale]
  if (/цел|достичь|что вы хотите|какую задачу/i.test(reply)) return FALLBACK_GOALS_OPTIONS[locale]
  if (/услуг|предлагаете|товар/i.test(reply)) return FALLBACK_SERVICES_OPTIONS[locale]
  if (/функци|онлайн-запис|прайс|галере/i.test(reply)) return FALLBACK_FEATURES_OPTIONS[locale]
  if (/бюджет|стоимость|цена/i.test(reply)) return FALLBACK_BUDGET_OPTIONS[locale]
  return FALLBACK_OPTIONS[locale]
}

function parseAIResponse(content: string, locale: 'ru' | 'de' = 'ru', messages: ChatMessage[] = [], brief?: Brief): AIResponse {
  const trimmed = content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()

  // Извлекаем JSON-объект из ответа (модель может добавить текст до/после)
  const jsonMatch = trimmed.match(/\{\s*"reply"\s*:[\s\S]*\}/)
  const toParse = jsonMatch ? jsonMatch[0] : trimmed

  try {
    const parsed = JSON.parse(toParse) as AIResponse
    if (typeof parsed.reply !== 'string') {
      const opts = getFinalOptions(trimmed, [], locale, messages, brief)
      return { reply: trimmed, brief_update: {}, options: opts }
    }
    const options = Array.isArray(parsed.options)
      ? parsed.options.filter((o): o is string => typeof o === 'string').slice(0, 4)
      : []
    const finalOptions = getFinalOptions(parsed.reply, options, locale, messages, brief)
    return {
      reply: parsed.reply,
      brief_update: typeof parsed.brief_update === 'object' && parsed.brief_update ? parsed.brief_update : {},
      options: finalOptions?.length ? finalOptions : undefined,
    }
  } catch (e) {
    console.warn('[OpenAI] Failed to parse JSON:', e, 'Raw:', trimmed?.slice(0, 200))
    const opts = getFinalOptions(trimmed || content, [], locale, messages, brief)
    return { reply: trimmed || content, brief_update: {}, options: opts }
  }
}
