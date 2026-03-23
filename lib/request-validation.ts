const SESSION_ID_PATTERN = /^[a-zA-Z0-9_-]{8,128}$/

export const MAX_CHAT_MESSAGE_LENGTH = 2000
export const MAX_QUIZ_TEXT_LENGTH = 12000

export function isValidSessionId(value: unknown): value is string {
  return typeof value === 'string' && SESSION_ID_PATTERN.test(value)
}

export function normalizeUserMessage(value: unknown, maxLength = MAX_CHAT_MESSAGE_LENGTH): string | null {
  if (typeof value !== 'string') return null

  const normalized = value.replace(/\s+/g, ' ').trim()
  if (!normalized) return null
  if (normalized.length > maxLength) return null

  return normalized
}

export function normalizeLongText(value: unknown, maxLength = MAX_QUIZ_TEXT_LENGTH): string | null {
  if (typeof value !== 'string') return null

  const normalized = value.trim()
  if (!normalized) return null
  if (normalized.length > maxLength) return null

  return normalized
}
