'use client'

import { useMemo } from 'react'
import { useCookieConsent } from '@/components/providers/cookie-consent'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { cn } from '@/lib/utils'

interface CookieSettingsTriggerProps {
  className?: string
}

export function CookieSettingsTrigger({ className }: CookieSettingsTriggerProps) {
  const { openDialog } = useCookieConsent()
  const { locale } = useSitePreferences()

  const label = useMemo(
    () => (locale === 'de' ? 'Cookie-Einstellungen' : 'Настройки cookie'),
    [locale],
  )

  return (
    <button type="button" onClick={openDialog} className={cn('transition hover:text-slate-950', className)}>
      {label}
    </button>
  )
}
