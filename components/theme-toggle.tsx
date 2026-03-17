'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useSitePreferences } from '@/components/providers/site-preferences'

export function ThemeToggle() {
  const { theme, toggleTheme } = useSitePreferences()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/15 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  )
}
