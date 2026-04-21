'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

export type LeadConsentState = {
  accepted: true
  updatedAt: string
}

type LeadConsentContextValue = {
  consent: LeadConsentState | null
  isDialogOpen: boolean
  accept: () => void
  openDialog: () => void
  closeDialog: () => void
}

const LeadConsentContext = createContext<LeadConsentContextValue | null>(null)

const STORAGE_KEY = 'codevibe-lead-consent-v1'
const CONSENT_EVENT = 'codevibe-lead-consent-change'

function nowIso() {
  return new Date().toISOString()
}

function coerceStored(value: unknown): LeadConsentState | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Partial<LeadConsentState>
  if (v.accepted !== true) return null
  if (typeof v.updatedAt !== 'string' || !v.updatedAt) return null
  return { accepted: true, updatedAt: v.updatedAt }
}

function writeStored(state: LeadConsentState) {
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

const serverSnapshot = { consent: null as LeadConsentState | null, isDialogOpen: false }

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

  let consent: LeadConsentState | null = null
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
let cachedSnapshot: { consent: LeadConsentState | null; isDialogOpen: boolean } | null = null

export function LeadConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { consent, isDialogOpen } = snapshot
  const [forceOpen, setForceOpen] = useState(false)
  const [interactionUnlocked, setInteractionUnlocked] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const isUnlocked = Boolean(consent) || interactionUnlocked

  useEffect(() => {
    if (consent) {
      return
    }

    const unlock = () => setInteractionUnlocked(true)
    const unlockOnScroll = () => {
      if (window.scrollY > 0) unlock()
    }

    window.addEventListener('site:intro-ready', unlock)
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('touchstart', unlock, { passive: true })
    window.addEventListener('wheel', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    window.addEventListener('scroll', unlockOnScroll, { passive: true })

    return () => {
      window.removeEventListener('site:intro-ready', unlock)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('scroll', unlockOnScroll)
    }
  }, [consent])

  const accept = useCallback(() => {
    const next: LeadConsentState = { accepted: true, updatedAt: nowIso() }
    setDismissed(false)
    setForceOpen(false)
    writeStored(next)
  }, [])

  const openDialog = useCallback(() => {
    setInteractionUnlocked(true)
    setDismissed(false)
    setForceOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setForceOpen(false)
    setDismissed(true)
  }, [])

  const value = useMemo<LeadConsentContextValue>(
    () => ({
      consent,
      isDialogOpen: Boolean((forceOpen || isDialogOpen) && isUnlocked && !dismissed && !consent),
      accept,
      openDialog,
      closeDialog,
    }),
    [accept, closeDialog, consent, dismissed, forceOpen, isDialogOpen, isUnlocked, openDialog],
  )

  return <LeadConsentContext.Provider value={value}>{children}</LeadConsentContext.Provider>
}

export function useLeadConsent() {
  const ctx = useContext(LeadConsentContext)
  if (!ctx) throw new Error('useLeadConsent must be used within LeadConsentProvider')
  return ctx
}
