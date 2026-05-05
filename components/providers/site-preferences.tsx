'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { isRuPath, localizePath } from '@/lib/locale-routes'
import type { Locale } from '@/lib/translations'

type Theme = 'dark' | 'light'

interface SitePreferencesContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  toggleTheme: () => void
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null)

const LOCALE_KEY = 'codevibe-locale'
const THEME_KEY = 'codevibe-theme'
const PREFERENCES_EVENT = 'codevibe-preferences-change'

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'de'
  const lang = navigator.language || (navigator.languages && navigator.languages[0]) || ''
  const code = lang.toLowerCase().split('-')[0]
  if (code === 'ru') return 'ru'
  if (code === 'de') return 'de'
  return 'de'
}

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'de'
  }

  const storedLocale = window.localStorage.getItem(LOCALE_KEY)
  if (storedLocale === 'de' || storedLocale === 'ru') return storedLocale
  return detectBrowserLocale()
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY)
  return storedTheme === 'light' ? 'light' : 'dark'
}

let cachedSnapshot: { locale: Locale; theme: Theme } | null = null
let cachedLocale: Locale | null = null
let cachedTheme: Theme | null = null

function getSnapshot() {
  const locale = getStoredLocale()
  const theme = getStoredTheme()
  if (cachedLocale === locale && cachedTheme === theme && cachedSnapshot) {
    return cachedSnapshot
  }
  cachedLocale = locale
  cachedTheme = theme
  cachedSnapshot = { locale, theme }
  return cachedSnapshot
}

const serverSnapshots: Record<Locale, { locale: Locale; theme: Theme }> = {
  de: { locale: 'de', theme: 'dark' },
  ru: { locale: 'ru', theme: 'dark' },
}

function getServerSnapshotForLocale(locale: Locale) {
  return serverSnapshots[locale]
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleStorage = () => onStoreChange()
  window.addEventListener('storage', handleStorage)
  window.addEventListener(PREFERENCES_EVENT, handleStorage)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(PREFERENCES_EVENT, handleStorage)
  }
}

function notifyPreferencesChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PREFERENCES_EVENT))
  }
}

export function SitePreferencesProvider({
  children,
  routeLocale,
}: {
  children: ReactNode
  routeLocale?: Locale
}) {
  const router = useRouter()
  const pathname = usePathname()
  const pathLocale: Locale = pathname && isRuPath(pathname) ? 'ru' : 'de'
  const effectiveRouteLocale = routeLocale ?? pathLocale
  const preferences = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => getServerSnapshotForLocale(effectiveRouteLocale),
  )
  const theme = preferences.theme
  const locale = effectiveRouteLocale ?? preferences.locale

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale === 'de' ? 'de' : 'ru'
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        window.localStorage.setItem(LOCALE_KEY, nextLocale)
        const currentPath = pathname || '/'
        const nextPath = localizePath(currentPath, nextLocale)
        const query = typeof window === 'undefined' ? '' : window.location.search
        const nextUrl = `${nextPath}${query}`
        const currentUrl = `${currentPath}${query}`
        if (nextUrl !== currentUrl) {
          router.push(nextUrl)
        }
        notifyPreferencesChange()
      },
      theme,
      toggleTheme: () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        window.localStorage.setItem(THEME_KEY, nextTheme)
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
        notifyPreferencesChange()
      },
    }),
    [locale, pathname, router, theme],
  )

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext)

  if (!context) {
    throw new Error('useSitePreferences must be used within SitePreferencesProvider')
  }

  return context
}
