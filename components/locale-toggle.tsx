'use client'

import { Globe } from 'lucide-react'
import type { Locale } from '@/lib/translations'
import { useSitePreferences } from '@/components/providers/site-preferences'

export function LocaleToggle() {
  const { locale, setLocale } = useSitePreferences()
  const nextLocale: Locale = locale === 'de' ? 'ru' : 'de'
  const currentLabel = locale === 'de' ? 'DE' : 'RU'
  const nextLabel = locale === 'de' ? 'RU' : 'DE'

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={locale === 'de' ? 'Switch to Russian' : 'Switch to German'}
      className="inline-flex flex-none items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-400 hover:bg-white sm:text-xs"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{currentLabel}</span>
      <span className="text-slate-400">/</span>
      <span className="text-slate-500">{nextLabel}</span>
    </button>
  )
}
