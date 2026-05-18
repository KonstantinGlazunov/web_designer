import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { SitePreferencesProvider } from '@/components/providers/site-preferences'
import { CookieConsentProvider } from '@/components/providers/cookie-consent'
import { CookieConsentDialog } from '@/components/cookie-consent-dialog'
import { GoogleAnalytics } from '@/components/google-analytics'
import { pageAlternates, siteJsonLd } from '@/lib/seo'

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
  title: 'Vibe Studio - сайты для малого бизнеса в Германии',
  description:
    'Понятные современные сайты для малого бизнеса в Германии: структура, доверие и заявки без лишней сложности.',
  alternates: pageAlternates('/', 'ru'),
  applicationName: 'Vibe Studio',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Vibe Studio - сайты для малого бизнеса в Германии',
    description:
      'Понятные современные сайты для малого бизнеса в Германии: структура, доверие и заявки без лишней сложности.',
    type: 'website',
    url: 'https://erstellen-websiten.de/ru',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Рабочий процесс Vibe Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Studio - сайты для малого бизнеса в Германии',
    description:
      'Понятные современные сайты для малого бизнеса в Германии: структура, доверие и заявки без лишней сложности.',
    images: ['/images/working-photo.webp'],
  },
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
}

export default function RuRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SitePreferencesProvider routeLocale="ru">
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
