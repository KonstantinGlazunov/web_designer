import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session-store'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId')
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
  }

  const session = getSession(sessionId)
  if (!session) {
    return NextResponse.json({ messages: [], brief: null, status: null })
  }

  return NextResponse.json({
    messages: session.messages,
    brief: session.brief,
    status: session.status,
  })
}
