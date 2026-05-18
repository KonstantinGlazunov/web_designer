import type { Metadata } from 'next'
import type { Locale } from '@/lib/translations'
import { localizePath, normalizePathname } from '@/lib/locale-routes'

export const SITE_URL = 'https://erstellen-websiten.de'

export const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vibe Studio',
    url: SITE_URL,
    logo: `${SITE_URL}/images/favicon.svg`,
    image: `${SITE_URL}/images/working-photo.webp`,
    founder: {
      '@type': 'Person',
      name: 'Konstantin Glazunov',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/kontakt`,
      areaServed: 'DE',
      availableLanguage: ['de', 'ru'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vibe Studio',
    url: SITE_URL,
    inLanguage: ['de-DE', 'ru-RU'],
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Studio',
      url: SITE_URL,
    },
  },
]

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
