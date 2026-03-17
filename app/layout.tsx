import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { SitePreferencesProvider } from '@/components/providers/site-preferences'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CodeVibe Studio',
  description:
    'CodeVibe Studio builds modern websites with Next.js, Tailwind, motion, AI-friendly UX, and premium 2026 visuals.',
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
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  )
}
