import type { Metadata } from 'next'
import { AboutMePage } from '@/components/about-me-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Обо мне | Vibe Studio',
  description:
    'Константин Глазунов: разработка понятных сайтов для малого бизнеса в Германии с фокусом на доверие и заявки.',
  alternates: pageAlternates('/ueber-mich', 'ru'),
  openGraph: {
    title: 'Обо мне | Vibe Studio',
    description:
      'Константин Глазунов: разработка понятных сайтов для малого бизнеса в Германии с фокусом на доверие и заявки.',
    url: 'https://erstellen-websiten.de/ru/ueber-mich',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Константин Глазунов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Обо мне | Vibe Studio',
    description:
      'Константин Глазунов: разработка понятных сайтов для малого бизнеса в Германии с фокусом на доверие и заявки.',
    images: ['/images/working-photo.webp'],
  },
}

export default function RuAboutPage() {
  return <AboutMePage />
}

