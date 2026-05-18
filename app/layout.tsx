import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { SitePreferencesProvider } from '@/components/providers/site-preferences'
import { CookieConsentProvider } from '@/components/providers/cookie-consent'
import { CookieConsentDialog } from '@/components/cookie-consent-dialog'
import { GoogleAnalytics } from '@/components/google-analytics'
import { pageAlternates } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vibe Studio',
    url: 'https://erstellen-websiten.de',
    logo: 'https://erstellen-websiten.de/images/favicon.svg',
    image: 'https://erstellen-websiten.de/images/working-photo.webp',
    founder: {
      '@type': 'Person',
      name: 'Konstantin Glazunov',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://erstellen-websiten.de/kontakt',
      areaServed: 'DE',
      availableLanguage: ['de', 'ru'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vibe Studio',
    url: 'https://erstellen-websiten.de',
    inLanguage: ['de-DE', 'ru-RU'],
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Studio',
      url: 'https://erstellen-websiten.de',
    },
  },
]

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://erstellen-websiten.de'),
  title: 'Vibe Studio - Websites für kleine Unternehmen',
  description:
    'Moderne, verständliche Websites für kleine Unternehmen in Deutschland - klar, mobil optimiert und ohne unnötigen Aufwand.',
  alternates: pageAlternates('/', 'de'),
  applicationName: 'Vibe Studio',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Vibe Studio - Websites für kleine Unternehmen',
    description:
      'Moderne, verständliche Websites für kleine Unternehmen in Deutschland - klar, mobil optimiert und ohne unnötigen Aufwand.',
    type: 'website',
    url: 'https://erstellen-websiten.de',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Vibe Studio Arbeitssituation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Studio - Websites für kleine Unternehmen',
    description:
      'Moderne, verständliche Websites für kleine Unternehmen in Deutschland - klar, mobil optimiert und ohne unnötigen Aufwand.',
    images: ['/images/working-photo.webp'],
  },
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SitePreferencesProvider>
          <CookieConsentProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
            />
            <GoogleAnalytics />
            <CookieConsentDialog />
            {children}
          </CookieConsentProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  )
}
