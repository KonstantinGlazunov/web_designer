'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

export type CookieConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

type CookieConsentContextValue = {
  consent: CookieConsentState | null
  isDialogOpen: boolean
  acceptAll: () => void
  acceptNecessary: () => void
  save: (next: Pick<CookieConsentState, 'analytics' | 'marketing'>) => void
  openDialog: () => void
  closeDialog: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

const STORAGE_KEY = 'codevibe-cookie-consent-v1'
const CONSENT_EVENT = 'codevibe-cookie-consent-change'

function nowIso() {
  return new Date().toISOString()
}

function coerceStored(value: unknown): CookieConsentState | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Partial<CookieConsentState>
  if (v.necessary !== true) return null
  if (typeof v.analytics !== 'boolean') return null
  if (typeof v.marketing !== 'boolean') return null
  if (typeof v.updatedAt !== 'string' || !v.updatedAt) return null
  return { necessary: true, analytics: v.analytics, marketing: v.marketing, updatedAt: v.updatedAt }
}

function readStored(): CookieConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return coerceStored(JSON.parse(raw))
  } catch {
    return null
  }
}

function writeStored(state: CookieConsentState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new Event(CONSENT_EVENT))
  } catch {
    // ignore
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const handler = () => onStoreChange()
  window.addEventListener('storage', handler)
  window.addEventListener(CONSENT_EVENT, handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(CONSENT_EVENT, handler)
  }
}

const serverSnapshot = { consent: null as CookieConsentState | null, isDialogOpen: false }

function getServerSnapshot() {
  return serverSnapshot
}

function getSnapshot() {
  if (typeof window === 'undefined') {
    return serverSnapshot
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (raw === cachedRaw && cachedSnapshot) {
    return cachedSnapshot
  }

  cachedRaw = raw

  let consent: CookieConsentState | null = null
  if (raw) {
    try {
      consent = coerceStored(JSON.parse(raw))
    } catch {
      consent = null
    }
  }

  cachedSnapshot = { consent, isDialogOpen: !consent }
  return cachedSnapshot
}

let cachedRaw: string | null = null
let cachedSnapshot: { consent: CookieConsentState | null; isDialogOpen: boolean } | null = null

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { consent, isDialogOpen } = snapshot
  const [forceOpen, setForceOpen] = useState(false)

  const openDialog = useCallback(() => setForceOpen(true), [])
  const closeDialog = useCallback(() => {
    setForceOpen(false)
    if (!consent) {
      const next: CookieConsentState = { necessary: true, analytics: false, marketing: false, updatedAt: nowIso() }
      writeStored(next)
    }
  }, [consent])

  const acceptAll = useCallback(() => {
    const next: CookieConsentState = { necessary: true, analytics: true, marketing: true, updatedAt: nowIso() }
    setForceOpen(false)
    writeStored(next)
  }, [])

  const acceptNecessary = useCallback(() => {
    const next: CookieConsentState = { necessary: true, analytics: false, marketing: false, updatedAt: nowIso() }
    setForceOpen(false)
    writeStored(next)
  }, [])

  const save = useCallback((nextPartial: Pick<CookieConsentState, 'analytics' | 'marketing'>) => {
    const next: CookieConsentState = { necessary: true, ...nextPartial, updatedAt: nowIso() }
    setForceOpen(false)
    writeStored(next)
  }, [])

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isDialogOpen: Boolean(forceOpen || isDialogOpen),
      acceptAll,
      acceptNecessary,
      save,
      openDialog,
      closeDialog,
    }),
    [acceptAll, acceptNecessary, closeDialog, consent, forceOpen, isDialogOpen, openDialog, save],
  )

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}

