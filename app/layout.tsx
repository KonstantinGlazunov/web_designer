import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { SitePreferencesProvider } from '@/components/providers/site-preferences'
import { CookieConsentProvider } from '@/components/providers/cookie-consent'
import { LeadConsentProvider } from '@/components/providers/lead-consent'
import { CookieConsentDialog } from '@/components/cookie-consent-dialog'
import { LeadConsentDialog } from '@/components/lead-consent-dialog'
import { GoogleAnalytics } from '@/components/google-analytics'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://erstellen-websiten.de'),
  title: 'Vibe Studio',
  description:
    'Vibe Studio builds modern websites with Next.js, Tailwind, motion, AI-friendly UX, and premium 2026 visuals.',
  applicationName: 'Vibe Studio',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Vibe Studio',
    description:
      'Modern websites for small businesses in Germany with strong UX, motion, and AI-assisted lead capture.',
    type: 'website',
    url: 'https://erstellen-websiten.de',
    images: [
      {
        url: '/working-photo.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Studio working photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Studio',
    description:
      'Modern websites for small businesses in Germany with strong UX, motion, and AI-assisted lead capture.',
    images: ['/working-photo.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SitePreferencesProvider>
          <CookieConsentProvider>
            <LeadConsentProvider>
              <GoogleAnalytics />
              <CookieConsentDialog />
              <LeadConsentDialog />
              {children}
            </LeadConsentProvider>
          </CookieConsentProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  )
}
