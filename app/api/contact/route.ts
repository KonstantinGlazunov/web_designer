import { NextRequest, NextResponse } from 'next/server'
import { normalizeLongText, normalizeUserMessage } from '@/lib/request-validation'
import { escapeHtmlForTelegram, sendQuizMessage } from '@/lib/telegram'

interface ContactPayload {
  locale?: 'de' | 'ru'
  salutation?: string
  name?: string
  company?: string
  website?: string
  email?: string
  phone?: string
  message?: string
  consent?: boolean
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 6
const contactRateLimiter = new Map<string, { count: number; resetAt: number }>()

function getClientKey(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for') ?? ''
  const ip = forwardedFor.split(',')[0]?.trim() || req.headers.get('x-real-ip')?.trim() || 'unknown-ip'
  const userAgent = req.headers.get('user-agent')?.slice(0, 120) || 'unknown-ua'
  return `${ip}:${userAgent}`
}

function isRateLimited(req: NextRequest) {
  const now = Date.now()
  const key = getClientKey(req)
  const current = contactRateLimiter.get(key)

  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true
    contactRateLimiter.set(key, { ...current, count: current.count + 1 })
    return false
  }

  contactRateLimiter.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })

  if (contactRateLimiter.size > 500) {
    for (const [mapKey, entry] of contactRateLimiter.entries()) {
      if (entry.resetAt <= now) contactRateLimiter.delete(mapKey)
    }
  }

  return false
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(req)) {
      return NextResponse.json({ error: 'too many requests' }, { status: 429 })
    }

    const body = (await req.json()) as ContactPayload

    const locale = body.locale === 'ru' ? 'ru' : 'de'
    const salutation = normalizeUserMessage(body.salutation ?? '', 60) ?? ''
    const name = normalizeUserMessage(body.name ?? '', 120)
    const company = normalizeUserMessage(body.company ?? '', 160) ?? ''
    const honeypotWebsite = normalizeUserMessage(body.website ?? '', 160) ?? ''
    const email = normalizeUserMessage(body.email ?? '', 160)
    const phone = normalizeUserMessage(body.phone ?? '', 80) ?? ''
    const message = normalizeLongText(body.message ?? '')
    const consent = body.consent === true

    // Hidden anti-bot field: if it has content, treat as successful no-op and stop processing.
    if (honeypotWebsite) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message || !consent) {
      return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
    }

    const header = locale === 'de' ? '📩 <b>Neue Kontaktanfrage</b>' : '📩 <b>Новая заявка с контактов</b>'
    const lines = [
      header,
      '',
      `Sprache: ${locale.toUpperCase()}`,
      salutation ? `Anrede: ${salutation}` : '',
      `Name: ${name}`,
      company ? `Unternehmen: ${company}` : '',
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : '',
      '',
      'Nachricht:',
      message,
      '',
      'Datenschutz-Einwilligung: Ja',
    ]
      .filter(Boolean)
      .join('\n')

    const ok = await sendQuizMessage(escapeHtmlForTelegram(lines))
    if (!ok) {
      return NextResponse.json({ error: 'telegram send failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[API /contact]', e)
    return NextResponse.json({ error: 'contact submit failed', details: String(e) }, { status: 500 })
  }
}
