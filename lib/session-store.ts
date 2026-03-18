import type { Brief } from './brief'
import { emptyBrief } from './brief'

export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'READY' | 'CLOSED'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  options?: string[]
}

export interface Session {
  sessionId: string
  messages: ChatMessage[]
  brief: Brief
  status: LeadStatus
  createdAt: number
  updatedAt: number
}

const store = new Map<string, Session>()

export function getSession(sessionId: string): Session | undefined {
  return store.get(sessionId)
}

export function createSession(sessionId: string): Session {
  const session: Session = {
    sessionId,
    messages: [],
    brief: JSON.parse(JSON.stringify(emptyBrief)),
    status: 'NEW',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  store.set(sessionId, session)
  return session
}

export function getOrCreateSession(sessionId: string): Session {
  const existing = store.get(sessionId)
  if (existing) return existing
  return createSession(sessionId)
}

export function updateSession(
  sessionId: string,
  updates: Partial<Pick<Session, 'messages' | 'brief' | 'status'>>
): Session | undefined {
  const session = store.get(sessionId)
  if (!session) return undefined

  if (updates.messages !== undefined) session.messages = updates.messages
  if (updates.brief !== undefined) session.brief = updates.brief
  if (updates.status !== undefined) session.status = updates.status

  session.updatedAt = Date.now()
  return session
}

export function setSessionStatus(sessionId: string, status: LeadStatus): Session | undefined {
  return updateSession(sessionId, { status })
}
