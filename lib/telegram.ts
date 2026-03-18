import type { Brief } from './brief'
import type { LeadStatus } from './session-store'
import type { ChatMessage } from './session-store'

const TELEGRAM_API = 'https://api.telegram.org/bot'

function getToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    console.warn('[Telegram] TELEGRAM_BOT_TOKEN not set')
    return ''
  }
  return token
}

async function sendMessage(text: string, replyMarkup?: object): Promise<boolean> {
  const token = getToken()
  if (!token) return false

  const chatId = process.env.TELEGRAM_CHAT_ID || '-5143321122'

  try {
    const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Telegram] sendMessage failed:', res.status, err)
      return false
    }
    return true
  } catch (e) {
    console.error('[Telegram] sendMessage error:', e)
    return false
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function escapeHtmlForTelegram(s: string): string {
  return escapeHtml(s)
}

function formatDialog(messages: ChatMessage[], maxLen = 2000): string {
  if (!messages?.length) return ''
  const lines = messages.map((m) => {
    const escaped = escapeHtml(m.content)
    return m.role === 'user' ? `👤 ${escaped}` : `🤖 ${escaped}`
  })
  const text = lines.join('\n')
  return text.length > maxLen ? text.slice(0, maxLen) + '\n...' : text
}

function formatBriefFields(brief: Brief): string[] {
  const lines: string[] = []
  if (brief?.want_website) lines.push(`Нужен сайт: ${brief.want_website}`)
  if (brief?.niche) lines.push(`Ниша: ${brief.niche}`)
  if (brief?.site_status) lines.push(`Сайт: ${brief.site_status}`)
  const c = brief?.contact
  if (c && typeof c === 'object') {
    if (c.name) lines.push(`Имя: ${c.name}`)
    if (c.phone) lines.push(`Телефон: ${c.phone}`)
    if (c.email) lines.push(`Email: ${c.email}`)
  }
  const biz = brief?.business
  if (biz && typeof biz === 'object') {
    const bizStr = biz.type || biz.description || biz.location
    if (bizStr) lines.push(`Бизнес: ${bizStr}`)
  }
  if (Array.isArray(brief?.services) && brief.services.length) lines.push(`Услуги: ${brief.services.join(', ')}`)
  const budget = brief?.budget
  if (budget && typeof budget === 'object' && budget.range) lines.push(`Бюджет: ${budget.range}`)
  return lines
}

export async function sendNewLead(sessionId: string, brief: Brief, messages: ChatMessage[] = []): Promise<void> {
  const lines = formatBriefFields(brief)
  const dialog = formatDialog(messages)
  const parts = [
    '🟡 <b>НОВЫЙ ЛИД</b>',
    `ID: <code>${sessionId}</code>`,
    ...lines,
    'Статус: NEW',
  ]
  if (dialog) parts.push('', '<b>Диалог:</b>', dialog)
  await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
}

const FIELD_LABELS: Record<string, string> = {
  want_website: 'Нужен сайт',
  niche: 'Ниша',
  site_status: 'Сайт',
  contact: 'Контакты',
  business: 'Бизнес',
  goals: 'Цели',
  target_audience: 'ЦА',
  services: 'Услуги',
  usp: 'УТП',
  competitors: 'Конкуренты',
  sales_funnel: 'Воронка продаж',
  traffic_sources: 'Источники трафика',
  features: 'Функции',
  design: 'Дизайн',
  content: 'Контент',
  tech: 'Технологии',
  seo: 'SEO/Реклама',
  languages: 'Языки',
  budget: 'Бюджет',
  deadline: 'Срок',
}

function formatValue(v: unknown): string {
  if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
    return Object.entries(v)
      .filter(([, val]) => val !== '' && val !== false && val !== undefined)
      .map(([k, val]) => `${k}: ${val}`)
      .join(', ')
  }
  if (Array.isArray(v)) return v.join(', ')
  return String(v)
}

export async function sendBriefUpdate(
  sessionId: string,
  changedFields: Record<string, unknown>,
  brief: Brief,
  status: LeadStatus,
  messages: ChatMessage[] = []
): Promise<void> {
  const items = Object.entries(changedFields)
    .map(([k, v]) => `• ${FIELD_LABELS[k] || k}: ${formatValue(v)}`)
    .join('\n')

  const parts = [
    '🔵 <b>ОБНОВЛЕНИЕ</b>',
    `ID: <code>${sessionId}</code>`,
    'Добавлено:',
    items,
    `Статус: ${status}`,
  ]
  const dialog = formatDialog(messages)
  if (dialog) parts.push('', '<b>Диалог:</b>', dialog)
  await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
}

export async function sendReadyBrief(sessionId: string, brief: Brief, messages: ChatMessage[] = []): Promise<void> {
  const lines = formatBriefFields(brief)
  const dialog = formatDialog(messages)
  const parts = [
    '🟢 <b>ЛИД С КОНТАКТАМИ</b>',
    `ID: <code>${sessionId}</code>`,
    ...lines,
    'Статус: READY',
  ]
  if (dialog) parts.push('', '<b>Диалог:</b>', dialog)
  await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
}

export async function sendQuizMessage(text: string): Promise<boolean> {
  return sendMessage(text)
}

function getInlineButtons(sessionId: string): object {
  return {
    inline_keyboard: [
      [
        { text: '✅ В работу', callback_data: `status:${sessionId}:IN_PROGRESS` },
        { text: '❌ Отказ', callback_data: `status:${sessionId}:CLOSED` },
      ],
      [
        { text: '💰 Обсуждение бюджета', callback_data: `action:${sessionId}:budget` },
        { text: '📞 Связаться', callback_data: `action:${sessionId}:contact` },
      ],
    ],
  }
}
