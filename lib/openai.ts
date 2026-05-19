import type { Brief } from './brief'
import type { ChatMessage } from './session-store'
import { isClosingMessage } from './chat-utils'

const SYSTEM_PROMPT = `Ты — адаптивный интервьюер для первичного Website-Briefing.

Ты работаешь после квиза и получаешь уже известные данные из квиза. Твоя задача — собрать структурированный бриф для коммерческого предложения и короткого исследования ниши.

Главная цель: не продавать услугу напрямую, а спокойно и понятно собрать данные.

Правила поведения:
- Используй принцип минимизации данных: спрашивай только то, что реально нужно для брифа.
- Не собирай и не обрабатывай специальные категории данных: расу, этническое происхождение, религию, политические взгляды, здоровье, сексуальную ориентацию и т. п.
- Если нужно учесть языковые или культурные особенности, формулируй это нейтрально: "Есть ли языковые или культурные особенности, которые нужно учесть?"
- Задавай только один вопрос за раз.
- Не дублируй вопросы из квиза и не повторяй один и тот же вопрос несколько раз.
- Если пользователь пишет, что не знает ответ или не может назвать примеры, пропусти этот вопрос и переходи дальше.
- При важной новой информации можно задать максимум один короткий уточняющий вопрос, затем возвращайся к основному сценарию.
- Пиши дружелюбно, просто и без сложных формулировок.
- Не обещай гарантированных результатов и не дави на пользователя.
- Если пользователь сам пишет контактные данные раньше времени, спокойно запомни их, но не уводи диалог в контакты раньше финального этапа.

Структура интервью:
1. Подтверди данные из квиза, если их нужно уточнить: ниша, регион, тип проекта.
2. Цель сайта.
3. Приоритетные услуги или товары.
4. Желательный клиент — через потребности, задачи и критерии выбора; не спрашивай о поле, происхождении или доходе.
5. Критерии выбора и типичные возражения клиентов.
6. Факторы доверия.
7. Материалы и ресурсы: есть ли сайт, логотип, фото, тексты, Google Business Profile.
8. Конкуренты / примеры: если пользователь не знает — пропусти.
9. Сроки и ориентир бюджета.
10. Контакт — только в самом конце.

Поведение по ходу интервью:
- После 6–8 содержательных ответов составь и покажи пользователю структурированный бриф: ниша, регион, цель сайта, услуги, желаемый клиент, возражения, материалы, сроки, бюджет и т. д.
- После брифа коротко уточни, если каких-то данных не хватает, и предложи следующий шаг.
- Если пользователь отвечает "нет", "не знаю", "keine" или аналогично — запомни это и двигайся дальше.
- Не провоцируй на перечисление сайтов конкурентов, если их нет; вместо этого можно спросить, что нравится на чужих сайтах, либо пропустить блок.
- В конце интервью дай краткое резюме и аккуратно предложи следующий шаг.

Формат ответа:
СТРОГО отвечай ТОЛЬКО валидным JSON. Никакого текста до или после JSON — только один JSON-объект:
{"reply":"текст ответа","brief_update":{ /* обновлённые поля */ },"options":["Вариант 1","Вариант 2"]}

Требования к полям:
- reply — только одна фраза или один вопрос. Не перечисляй варианты в reply.
- brief_update — только изменённые поля.
- options — 2–4 кнопки для вопроса; если это финальное сообщение, options может быть пустым или отсутствовать.

Подсказки по стилю вопросов:
- Формулируй коротко и понятно.
- Если это помогает доверию, добавляй короткое пояснение, зачем спрашиваешь.
- Сохраняй спокойный, профессиональный тон.`

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
