import { NextRequest, NextResponse } from 'next/server'
import { escapeHtmlForTelegram, sendQuizMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, locale } = body as { text?: string; locale?: string }

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'text required' }, { status: 400 })
    }

    const header =
      locale === 'de'
        ? '🧩 <b>Neue Quiz-Anfrage</b>'
        : '🧩 <b>Новый квиз-запрос</b>'

    const payload = `${header}\n\n<pre>${escapeHtmlForTelegram(text)}</pre>`

    const ok = await sendQuizMessage(payload)
    if (!ok) {
      return NextResponse.json(
        { error: 'Telegram send failed' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[API /quiz]', e)
    return NextResponse.json(
      { error: 'Quiz submit failed', details: String(e) },
      { status: 500 }
    )
  }
}


