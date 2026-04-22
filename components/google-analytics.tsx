'use client'

import Script from 'next/script'
import { useMemo } from 'react'
import { useCookieConsent } from '@/components/providers/cookie-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function getGaId() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (typeof id === 'string' && id.trim().length > 0) return id.trim()
  return 'G-H8XXSDP9W4'
}

export function GoogleAnalytics() {
  const { consent } = useCookieConsent()
  const gaId = useMemo(() => getGaId(), [])
  const enabled = Boolean(consent?.analytics)

  if (!enabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });
`}
      </Script>
    </>
  )
}
