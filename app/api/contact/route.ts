import { NextRequest, NextResponse } from 'next/server'
import { normalizeLongText, normalizeUserMessage } from '@/lib/request-validation'
import { escapeHtmlForTelegram, sendQuizMessage } from '@/lib/telegram'

interface ContactPayload {
  locale?: 'de' | 'ru'
  salutation?: string
  name?: string
  company?: string
  email?: string
  phone?: string
  message?: string
  consent?: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload

    const locale = body.locale === 'ru' ? 'ru' : 'de'
    const salutation = normalizeUserMessage(body.salutation ?? '', 60) ?? ''
    const name = normalizeUserMessage(body.name ?? '', 120)
    const company = normalizeUserMessage(body.company ?? '', 160) ?? ''
    const email = normalizeUserMessage(body.email ?? '', 160)
    const phone = normalizeUserMessage(body.phone ?? '', 80) ?? ''
    const message = normalizeLongText(body.message ?? '')
    const consent = body.consent === true

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
