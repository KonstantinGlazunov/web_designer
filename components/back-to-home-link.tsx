'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSitePreferences } from '@/components/providers/site-preferences'

export function BackToHomeLink() {
  const router = useRouter()
  const { locale } = useSitePreferences()
  const label = locale === 'de' ? 'Zur Startseite' : 'На главную'

  function handleClick() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
      aria-label={label}
      title={label}
    >
      <X className="h-4 w-4" />
    </button>
  )
}
