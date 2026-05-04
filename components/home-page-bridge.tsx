'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSitePreferences } from '@/components/providers/site-preferences'

const HomePageClient = dynamic(
  () => import('@/components/home-page-client').then((mod) => mod.HomePageClient),
  { ssr: false },
)

export function HomePageBridge() {
  const { locale } = useSitePreferences()
  const searchParams = useSearchParams()
  const shouldActivate = locale === 'ru' || searchParams.get('quiz') === '1'

  useEffect(() => {
    const shell = document.getElementById('home-static-shell')
    if (!shell) return

    if (shouldActivate) {
      shell.hidden = true
      return
    }

    shell.hidden = false
  }, [shouldActivate])

  if (!shouldActivate) {
    return null
  }

  return <HomePageClient />
}
