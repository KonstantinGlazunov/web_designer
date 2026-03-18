import type { Brief } from './brief'
import type { ChatMessage } from './session-store'
import { isClosingMessage } from './chat-utils'

const SYSTEM_PROMPT = `Ты — дружелюбный менеджер веб-студии.

Твоя задача: провести диалог, собрать контакты и заполнить бриф на разработку сайта.

СТРОГИЙ ПОРЯДОК ВОПРОСОВ:

1. СНАЧАЛА — несколько общих вопросов (по одному за раз):
   • Вам нужен сайт? (want_website)
   • В какой нише вы работаете? (niche)
   • У вас уже есть сайт или нужен новый? (site_status: "новый" / "уже есть")

2. ПОТОМ — сбор контактов. Скажи что-то вроде:
   "Давайте я запишу ваши координаты, чтобы связаться с вами. Потом мы поговорим подробнее."
   Собери: имя (contact.name), затем "У вас есть WhatsApp или Telegram?" (contact.phone), email (contact.email).
   НЕ спрашивай "Какой у вас номер?" — спрашивай про WhatsApp/Telegram.
   Спрашивай по одному полю.
   Если клиент на ВСЕ вопросы (имя, телефон, email) ответил "Укажу в сообщении" и в brief до сих пор нет контактов — НЕ заканчивай диалог. Скажи вежливо: "Хорошо! Тогда напишите, пожалуйста, в сообщении хотя бы один контакт — имя, номер или email — чтобы мы могли с вами связаться." Когда он напишет в сообщении — извлеки из текста имя/телефон/email и заполни brief_update.

3. ПОСЛЕ КОНТАКТОВ — НЕ заканчивай сразу! Продолжай заполнять бриф (по одному вопросу):
   • Какие цели у сайта? (goals: привлечь клиентов, продавать, доверие)
   • Какие услуги предлагаете? (services: для автомастерской — ремонт, диагностика, запчасти и т.д.)
   • Какие функции нужны? (features: онлайн-запись, прайс, галерея работ)
   • Какой бюджет? (budget.range)
   Только когда есть контакты И хотя бы цели/услуги/бюджет — поблагодари и скажи, что свяжетесь.

Правила:
• Задавай ОДИН вопрос за раз
• На КАЖДЫЙ вопрос обязательно предлагай 2–4 варианта в options
• Веди диалог тепло и дружелюбно
• После контактов — сразу переходи к вопросу о целях, услугах или бюджете. НЕ говори "Спасибо, свяжемся" только из-за контактов — продолжай бриф!

КРИТИЧНО — НЕ СДАВАЙСЯ:
• НИКОГДА не говори "дайте знать, когда понадобится" или "обращайтесь, когда будете готовы"
• Твоя цель: контакты + хотя бы цели/услуги/бюджет. НЕ заканчивай только контактами — всегда продолжай с вопросами брифа (цели, услуги, функции, бюджет).
• Если клиент НЕ УВЕРЕН в нужности сайта ("не уверен", "подумаю", "пока нет", "в процессе") — НЕ повторяй вопрос "Вам нужен сайт?". Спроси: "А что вы вообще хотите достичь? Какую задачу решаете?" с options: ["Привлечь клиентов", "Продавать онлайн", "Повысить доверие", "Другое"]. Когда он назовёт цель — скажи кратко, что сайт как раз для этого помогает, и переходи к следующему вопросу (ниша).
• Если клиент откладывает по другим вопросам (ниша) — мягко возвращай: "Понятно. А в какой нише вы работаете?" и т.д.
• Если клиент везде ответил "Укажу в сообщении" и контактов нет — вежливо попроси написать хотя бы один контакт в сообщении. НЕ говори "Спасибо, свяжемся" без контактов.
• Всегда задавай следующий вопрос, чтобы продвинуть к контактам или брифу

СТРОГО отвечай ТОЛЬКО валидным JSON. Никакого текста до или после JSON — только один JSON-объект:
{"reply": "текст ответа", "brief_update": { /* обновлённые поля */ }, "options": ["Вариант 1", "Вариант 2"]}

• reply — только вопрос или фраза. НЕ перечисляй варианты в reply — они показываются кнопками из options. Пример: "В какой нише вы работаете?" (без списка в тексте).
• brief_update — только изменённые поля. Примеры: contact: { name, phone, email }; goals: ["лиды"]; services: ["ремонт", "диагностика"]; features: ["онлайн-запись"]; budget: { range: "до 1000€" }
• options — варианты отображаются как КНОПКИ. ОБЯЗАТЕЛЬНО 2–4 варианта для вопросов.
  Для завершающих сообщений — options: [] или не включай.
  Для ниши: ["Парикмахерская", "Imbiss", "Автомастерская", "Юрист"]; для site_status — ["Уже есть, хочу обновить", "Еще нет, но нужен", "Другое"]; для целей — ["Привлечь клиентов", "Продавать онлайн", "Повысить доверие", "Другое"]; для услуг — подбирай под нишу (автомастерская: ремонт, диагностика, запчасти); для функций — ["Онлайн-запись", "Прайс", "Галерея работ", "Другое"]; для бюджета — ["До 500€", "500–2000€", "2000€+", "Обсудим"]; для открытых — ["Укажу в сообщении", "Пропустить"].`

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

  return parseAIResponse(content, locale)
}

export function sanitizeBriefUpdate(raw: unknown): Partial<Brief> {
  if (typeof raw !== 'object' || raw === null) return {}
  const obj = raw as Record<string, unknown>
  const sanitized: Record<string, unknown> = {}

  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) continue
    if (key === 'business' && typeof val === 'object' && val !== null) {
      const b = val as Record<string, unknown>
      sanitized[key] = {
        type: String(b.type ?? ''),
        description: String(b.description ?? ''),
        location: String(b.location ?? ''),
      }
    } else if (key === 'design' && typeof val === 'object' && val !== null) {
      const d = val as Record<string, unknown>
      sanitized[key] = {
        style: String(d.style ?? ''),
        references: Array.isArray(d.references) ? d.references.map(String) : [],
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
      sanitized[key] = { range: String(b.range ?? '') }
    } else if (key === 'contact' && typeof val === 'object' && val !== null) {
      const c = val as Record<string, unknown>
      sanitized[key] = {
        name: String(c.name ?? ''),
        phone: String(c.phone ?? ''),
        email: String(c.email ?? ''),
      }
    } else if (['want_website', 'niche', 'site_status'].includes(key)) {
      sanitized[key] = String(val)
    } else if (['goals', 'services', 'competitors', 'traffic_sources', 'features', 'languages'].includes(key)) {
      sanitized[key] = Array.isArray(val) ? val.map(String) : [String(val)]
    } else if (['target_audience', 'usp', 'sales_funnel', 'deadline'].includes(key)) {
      sanitized[key] = String(val)
    }
  }

  return sanitized as Partial<Brief>
}

const FALLBACK_OPTIONS = { ru: ['Укажу в сообщении', 'Другое'], de: ['Schreibe in Nachricht', 'Anderes'] } as const
const FALLBACK_NICHE_OPTIONS = {
  ru: ['Парикмахерская', 'Imbiss', 'Автомастерская', 'Юрист'],
  de: ['Friseur', 'Imbiss', 'Kfz-Werkstatt', 'Anwalt'],
} as const
const FALLBACK_SITE_STATUS_OPTIONS = {
  ru: ['Уже есть, хочу обновить', 'Еще нет, но нужен', 'Другое'],
  de: ['Bereits vorhanden, möchte aktualisieren', 'Noch nicht, aber brauche einen', 'Anderes'],
} as const
const FALLBACK_GOALS_OPTIONS = {
  ru: ['Привлечь клиентов', 'Продавать онлайн', 'Повысить доверие', 'Другое'],
  de: ['Kunden gewinnen', 'Online verkaufen', 'Vertrauen aufbauen', 'Anderes'],
} as const
const FALLBACK_SERVICES_OPTIONS = {
  ru: ['Ремонт', 'Консультации', 'Продажа', 'Другое'],
  de: ['Reparatur', 'Beratung', 'Verkauf', 'Anderes'],
} as const
const FALLBACK_FEATURES_OPTIONS = {
  ru: ['Онлайн-запись', 'Прайс', 'Галерея работ', 'Другое'],
  de: ['Online-Buchung', 'Preisliste', 'Galerie', 'Anderes'],
} as const
const FALLBACK_BUDGET_OPTIONS = {
  ru: ['До 500€', '500–2000€', '2000€+', 'Обсудим'],
  de: ['Bis 500€', '500–2000€', '2000€+', 'Besprechen'],
} as const

function getFallbackOptions(reply: string, locale: 'ru' | 'de'): readonly string[] {
  if (/ниш|сфер|направл|отрасл|бизнес/i.test(reply)) return FALLBACK_NICHE_OPTIONS[locale]
  if (/уже есть|новый сайт|сайт или нужен|редизайн|обновить/i.test(reply)) return FALLBACK_SITE_STATUS_OPTIONS[locale]
  if (/цел|достичь|что вы хотите|какую задачу/i.test(reply)) return FALLBACK_GOALS_OPTIONS[locale]
  if (/услуг|предлагаете|товар/i.test(reply)) return FALLBACK_SERVICES_OPTIONS[locale]
  if (/функци|онлайн-запис|прайс|галере/i.test(reply)) return FALLBACK_FEATURES_OPTIONS[locale]
  if (/бюджет|стоимость|цена/i.test(reply)) return FALLBACK_BUDGET_OPTIONS[locale]
  return FALLBACK_OPTIONS[locale]
}

function parseAIResponse(content: string, locale: 'ru' | 'de' = 'ru'): AIResponse {
  const trimmed = content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()

  // Извлекаем JSON-объект из ответа (модель может добавить текст до/после)
  const jsonMatch = trimmed.match(/\{\s*"reply"\s*:[\s\S]*\}/)
  const toParse = jsonMatch ? jsonMatch[0] : trimmed

  try {
    const parsed = JSON.parse(toParse) as AIResponse
    if (typeof parsed.reply !== 'string') {
      const opts = isClosingMessage(trimmed) ? undefined : [...getFallbackOptions(trimmed, locale)]
      return { reply: trimmed, brief_update: {}, options: opts }
    }
    const options = Array.isArray(parsed.options)
      ? parsed.options.filter((o): o is string => typeof o === 'string').slice(0, 4)
      : []
    const fallback = getFallbackOptions(parsed.reply, locale)
    const finalOptions = isClosingMessage(parsed.reply) ? [] : options.length ? options : [...fallback]
    return {
      reply: parsed.reply,
      brief_update: typeof parsed.brief_update === 'object' && parsed.brief_update ? parsed.brief_update : {},
      options: finalOptions.length ? finalOptions : undefined,
    }
  } catch (e) {
    console.warn('[OpenAI] Failed to parse JSON:', e, 'Raw:', trimmed?.slice(0, 200))
    const opts = isClosingMessage(trimmed) ? undefined : [...getFallbackOptions(trimmed, locale)]
    return { reply: trimmed || content, brief_update: {}, options: opts }
  }
}
