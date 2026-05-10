'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCookieConsent } from '@/components/providers/cookie-consent'
import { getGaId, setAnalyticsUserContext } from '@/lib/analytics'

export function GoogleAnalytics() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const gaId = getGaId()
  const enabled = Boolean(consent?.analytics)

  useEffect(() => {
    if (!enabled) return
    setAnalyticsUserContext(pathname)
  }, [enabled, pathname])

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
