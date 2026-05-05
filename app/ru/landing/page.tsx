import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { LandingPage } from '@/components/landing/landing-page'
import { pageAlternates } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Лендинг для малого бизнеса | Vibe Studio',
  description:
    'Четкая и современная посадочная страница для малого бизнеса в Германии: структура, доверие и понятный следующий шаг.',
  alternates: pageAlternates('/landing', 'ru'),
  openGraph: {
    title: 'Лендинг для малого бизнеса | Vibe Studio',
    description:
      'Четкая и современная посадочная страница для малого бизнеса в Германии: структура, доверие и понятный следующий шаг.',
    url: 'https://erstellen-websiten.de/ru/landing',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Разработка лендинга для малого бизнеса',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Лендинг для малого бизнеса | Vibe Studio',
    description:
      'Четкая и современная посадочная страница для малого бизнеса в Германии: структура, доверие и понятный следующий шаг.',
    images: ['/images/working-photo.webp'],
  },
}

export default function RuLandingRoute() {
  return (
    <div className={manrope.className}>
      <LandingPage />
    </div>
  )
}

