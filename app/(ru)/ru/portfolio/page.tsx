import type { Metadata } from 'next'
import { PortfolioPage } from '@/components/portfolio-page'
import { pageAlternates } from '@/lib/seo'

const title = 'Портфолио | Примеры сайтов'
const description =
  'Примеры сайтов, лендингов и многоязычных проектов для малого бизнеса и самостоятельных специалистов.'

export const metadata: Metadata = {
  title,
  description,
  alternates: pageAlternates('/portfolio', 'ru'),
  openGraph: {
    title,
    description,
    url: 'https://erstellen-websiten.de/ru/portfolio',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/portfolio-speicher.webp',
        width: 1200,
        height: 750,
        alt: 'Примеры сайтов Vibe Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/portfolio-speicher.webp'],
  },
}

export default function PortfolioRoute() {
  return <PortfolioPage locale="ru" />
}
