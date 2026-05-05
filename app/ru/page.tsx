import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Suspense } from 'react'
import { HomePageClient } from '@/components/home-page-client'
import { pageAlternates } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Vibe Studio - сайты для малого бизнеса в Германии',
  description:
    'Понятные современные сайты для малого бизнеса в Германии: структура, доверие и заявки без лишней сложности.',
  alternates: pageAlternates('/', 'ru'),
  openGraph: {
    title: 'Vibe Studio - сайты для малого бизнеса в Германии',
    description:
      'Понятные современные сайты для малого бизнеса в Германии: структура, доверие и заявки без лишней сложности.',
    url: 'https://erstellen-websiten.de/ru',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
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
}

export default function RuHomePage() {
  return (
    <div className={manrope.className}>
      <Suspense fallback={null}>
        <HomePageClient />
      </Suspense>
    </div>
  )
}
