'use client'

import type { Locale } from '@/lib/translations'
import { useSitePreferences } from '@/components/providers/site-preferences'

const locales: Locale[] = ['ru', 'de']

export function LocaleToggle() {
  const { locale, setLocale } = useSitePreferences()

  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/10 p-1">
      {locales.map((value) => {
        const active = value === locale
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              active ? 'bg-white text-slate-950' : 'text-slate-200 hover:text-white'
            }`}
          >
            {value}
          </button>
        )
      })}
    </div>
  )
}
