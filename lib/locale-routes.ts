import type { Locale } from '@/lib/translations'

function ensureLeadingSlash(path: string) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function normalizePathname(pathname: string) {
  const withSlash = ensureLeadingSlash(pathname)
  if (withSlash === '/') return '/'
  return withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
}

export function stripRuPrefix(pathname: string) {
  const normalized = normalizePathname(pathname)
  if (normalized === '/ru') return '/'
  if (normalized.startsWith('/ru/')) {
    return normalized.slice(3)
  }
  return normalized
}

export function localizePath(pathname: string, locale: Locale) {
  const basePath = stripRuPrefix(pathname)
  if (locale === 'ru') {
    if (basePath === '/landing') {
      return '/ru'
    }
    return basePath === '/' ? '/ru' : `/ru${basePath}`
  }
  return basePath
}

export function isRuPath(pathname: string) {
  const normalized = normalizePathname(pathname)
  return normalized === '/ru' || normalized.startsWith('/ru/')
}
