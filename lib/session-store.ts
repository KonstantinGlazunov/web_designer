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
const SESSION_TTL_MS = 1000 * 60 * 60 * 24
const CLEANUP_INTERVAL_MS = 1000 * 60 * 10

let lastCleanupAt = 0

function cloneEmptyBrief() {
  return JSON.parse(JSON.stringify(emptyBrief)) as Brief
}

function cleanupExpiredSessions(now = Date.now()) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return

  lastCleanupAt = now
  for (const [sessionId, session] of store.entries()) {
    if (now - session.updatedAt > SESSION_TTL_MS) {
      store.delete(sessionId)
    }
  }
}

export function getSession(sessionId: string): Session | undefined {
  cleanupExpiredSessions()
  return store.get(sessionId)
}

export function createSession(sessionId: string): Session {
  cleanupExpiredSessions()
  const session: Session = {
    sessionId,
    messages: [],
    brief: cloneEmptyBrief(),
    status: 'NEW',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  store.set(sessionId, session)
  return session
}

export function getOrCreateSession(sessionId: string): Session {
  cleanupExpiredSessions()
  const existing = store.get(sessionId)
  if (existing) return existing
  return createSession(sessionId)
}

export function updateSession(
  sessionId: string,
  updates: Partial<Pick<Session, 'messages' | 'brief' | 'status'>>
): Session | undefined {
  cleanupExpiredSessions()
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
