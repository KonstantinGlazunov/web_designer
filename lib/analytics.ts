'use client'

type AnalyticsValue = string | number | boolean | null | undefined

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function sanitizeParams(params: Record<string, AnalyticsValue>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined))
}

export function getGaId() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (typeof id === 'string' && id.trim().length > 0) return id.trim()
  return 'G-H8XXSDP9W4'
}

export function resolveLocaleFromPath(pathname: string) {
  return pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'de'
}

export function trackEvent(eventName: string, params: Record<string, AnalyticsValue> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, sanitizeParams(params))
}

export function setAnalyticsUserContext(pathname: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const locale = resolveLocaleFromPath(pathname)
  const payload = {
    locale,
    content_language: locale,
    path_group: pathname === '/' || pathname === '/ru' ? 'home' : pathname.split('/').filter(Boolean)[0] ?? 'home',
  }
  window.gtag('set', 'user_properties', payload)
}

export function trackLead(params: {
  source: 'contact_form' | 'quiz' | 'chatbot'
  locale: 'de' | 'ru'
  contactMethod: 'phone' | 'email' | 'phone_and_email'
  pagePath?: string
  readyForHandoff?: boolean
}) {
  trackEvent('generate_lead', {
    lead_source: params.source,
    locale: params.locale,
    contact_method: params.contactMethod,
    page_path: params.pagePath,
    ready_for_handoff: params.readyForHandoff ?? false,
  })
}
