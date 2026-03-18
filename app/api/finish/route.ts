import { NextRequest, NextResponse } from 'next/server'
import { getSession, updateSession } from '@/lib/session-store'
import { sendReadyBrief } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId } = body as { sessionId?: string }

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    const session = getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    updateSession(sessionId, { status: 'READY' })
    await sendReadyBrief(sessionId, session.brief)

    return NextResponse.json({
      success: true,
      brief: session.brief,
      status: 'READY',
    })
  } catch (e) {
    console.error('[API /finish]', e)
    return NextResponse.json(
      { error: 'Finish failed', details: String(e) },
      { status: 500 }
    )
  }
}
