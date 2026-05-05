import type { Metadata } from 'next'
import type { Locale } from '@/lib/translations'
import { localizePath, normalizePathname } from '@/lib/locale-routes'

export const SITE_URL = 'https://erstellen-websiten.de'

export function absoluteUrl(pathname: string) {
  const normalized = normalizePathname(pathname)
  return `${SITE_URL}${normalized}`
}

export function languageAlternates(pathname: string): NonNullable<Metadata['alternates']>['languages'] {
  const dePath = localizePath(pathname, 'de')
  const ruPath = localizePath(pathname, 'ru')

  return {
    'de-DE': absoluteUrl(dePath),
    'ru-RU': absoluteUrl(ruPath),
    'x-default': absoluteUrl(dePath),
  }
}

export function pageAlternates(pathname: string, locale: Locale): Metadata['alternates'] {
  const canonicalPath = localizePath(pathname, locale)
  return {
    canonical: absoluteUrl(canonicalPath),
    languages: languageAlternates(pathname),
  }
}
