'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSitePreferences } from '@/components/providers/site-preferences'

export function HomePageReveal() {
  const { locale } = useSitePreferences()
  const searchParams = useSearchParams()
  const shouldAnimateShell = locale !== 'ru' && searchParams.get('quiz') !== '1'

  useEffect(() => {
    const shell = document.getElementById('home-static-shell')
    if (!shell || !shouldAnimateShell) {
      return
    }

    const elements = Array.from(shell.querySelectorAll<HTMLElement>('.reveal-stagger'))
    if (elements.length === 0) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          target.classList.add('is-visible')
          observer.unobserve(target)
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [shouldAnimateShell])

  return null
}
