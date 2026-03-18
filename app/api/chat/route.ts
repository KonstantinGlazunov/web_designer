import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateSession, updateSession } from '@/lib/session-store'
import { chatWithAI, sanitizeBriefUpdate } from '@/lib/openai'
import { deepMergeBrief, getChangedFields } from '@/lib/brief'
import { sendNewLead, sendBriefUpdate, sendReadyBrief } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, message, locale } = body as { sessionId?: string; message?: string; locale?: string }

    if (!sessionId || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'sessionId and message required' },
        { status: 400 }
      )
    }

    const session = getOrCreateSession(sessionId)
    const isNewSession = session.messages.length === 0

    const newMessages = [
      ...session.messages,
      { role: 'user' as const, content: message.trim() },
    ]

    const aiResponse = await chatWithAI(newMessages, session.brief, locale === 'de' ? 'de' : 'ru')
    const oldBrief = session.brief
    const sanitizedUpdate = sanitizeBriefUpdate(aiResponse.brief_update)
    const newBrief = deepMergeBrief(oldBrief, sanitizedUpdate)

    const changedFields = getChangedFields(oldBrief, newBrief)
    const hasUpdates = Object.keys(changedFields).length > 0

    const assistantMsg: { role: 'assistant'; content: string; options?: string[] } = {
      role: 'assistant',
      content: aiResponse.reply,
    }
    if (aiResponse.options?.length) assistantMsg.options = aiResponse.options
    const updatedMessages = [...newMessages, assistantMsg]

    let newStatus = session.status
    if (isNewSession) {
      newStatus = 'NEW'
    } else if (hasUpdates && newStatus === 'NEW') {
      newStatus = 'IN_PROGRESS'
    }

    const hasContact = hasContactInfo(newBrief)
    if (hasContact && newStatus !== 'READY') {
      newStatus = 'READY'
    }

    updateSession(sessionId, {
      messages: updatedMessages,
      brief: newBrief,
      status: newStatus,
    })

    try {
      if (isNewSession) {
        await sendNewLead(sessionId, newBrief, updatedMessages)
      } else if (hasContact && session.status !== 'READY') {
        await sendReadyBrief(sessionId, newBrief, updatedMessages)
      } else if (hasUpdates) {
        await sendBriefUpdate(sessionId, changedFields, newBrief, newStatus, updatedMessages)
      }
    } catch (tgErr) {
      console.error('[API /chat] Telegram notification failed:', tgErr)
    }

    return NextResponse.json({
      reply: aiResponse.reply,
      brief: newBrief,
      status: newStatus,
      options: aiResponse.options,
    })
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    console.error('[API /chat]', err.message, err)
    const cause = (err as { cause?: { code?: string } }).cause
    const isNetwork = cause?.code === 'ENETUNREACH' || cause?.code === 'ECONNREFUSED' || err.message.includes('fetch failed')
    let msg = err.message.startsWith('Превышен') || err.message.startsWith('Сервис')
      ? err.message
      : 'Ошибка при обработке. Попробуйте ещё раз.'
    if (isNetwork) msg = 'Нет связи с сервером. Проверьте интернет и попробуйте снова.'
    return NextResponse.json(
      { error: msg, details: err.message },
      { status: 500 }
    )
  }
}

function hasContactInfo(brief: { contact?: { name?: string; phone?: string; email?: string } }): boolean {
  const c = brief.contact
  if (!c || typeof c !== 'object') return false
  const hasName = Boolean(c.name?.trim())
  const hasContact = Boolean(c.phone?.trim() || c.email?.trim())
  return hasName && hasContact
}
