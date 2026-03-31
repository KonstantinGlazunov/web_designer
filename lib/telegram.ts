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

function getChatId(): string {
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!chatId) {
    console.warn('[Telegram] TELEGRAM_CHAT_ID not set')
    return ''
  }
  return chatId
}

async function sendMessage(text: string, replyMarkup?: object): Promise<boolean> {
  const token = getToken()
  const chatId = getChatId()
  if (!token || !chatId) return false

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

function formatDialog(messages: ChatMessage[]): string {
  if (!messages?.length) return ''
  const lines = messages.map((m) => {
    const escaped = escapeHtml(m.content)
    return m.role === 'user' ? `👤 ${escaped}` : `🤖 ${escaped}`
  })
  return lines.join('\n')
}

function chunkByLength(text: string, maxLen = 3500): string[] {
  if (!text) return []
  if (text.length <= maxLen) return [text]

  const chunks: string[] = []
  let current = ''

  for (const line of text.split('\n')) {
    const candidate = current ? `${current}\n${line}` : line
    if (candidate.length <= maxLen) {
      current = candidate
      continue
    }

    if (current) chunks.push(current)

    if (line.length <= maxLen) {
      current = line
      continue
    }

    let offset = 0
    while (offset < line.length) {
      chunks.push(line.slice(offset, offset + maxLen))
      offset += maxLen
    }
    current = ''
  }

  if (current) chunks.push(current)
  return chunks
}

async function sendDialogChunks(dialog: string): Promise<void> {
  const chunks = chunkByLength(dialog, 3500)
  for (let i = 0; i < chunks.length; i += 1) {
    const title = chunks.length > 1 ? `<b>Диалог (${i + 1}/${chunks.length}):</b>` : '<b>Диалог:</b>'
    await sendMessage(`${title}\n${chunks[i]}`)
  }
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
  const delivered = await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
  if (!delivered) return
  if (dialog) await sendDialogChunks(dialog)
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
  const delivered = await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
  if (!delivered) return
  if (dialog) await sendDialogChunks(dialog)
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
  const delivered = await sendMessage(parts.join('\n'), getInlineButtons(sessionId))
  if (!delivered) return
  if (dialog) await sendDialogChunks(dialog)
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
