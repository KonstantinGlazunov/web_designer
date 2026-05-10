'use client'

import { Globe } from 'lucide-react'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { trackEvent } from '@/lib/analytics'

export function HomeShellLocaleToggle() {
  const { locale, setLocale } = useSitePreferences()

  return (
    <button
      type="button"
      onClick={() => {
        const nextLocale = locale === 'de' ? 'ru' : 'de'
        trackEvent('locale_switch', { from_locale: locale, to_locale: nextLocale, placement: 'home_hero' })
        setLocale(nextLocale)
      }}
      aria-label={locale === 'de' ? 'Switch to Russian' : 'Switch to German'}
      className="inline-flex flex-none items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-400 hover:bg-white sm:text-xs"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{locale === 'de' ? 'DE' : 'RU'}</span>
      <span className="text-slate-400">/</span>
      <span className="text-slate-500">{locale === 'de' ? 'RU' : 'DE'}</span>
    </button>
  )
}
