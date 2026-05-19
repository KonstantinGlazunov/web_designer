import type { Metadata } from 'next'
import { PricesPage } from '@/components/prices-page'
import { pricesCopy } from '@/lib/prices-copy'
import { pageAlternates } from '@/lib/seo'

const seo = pricesCopy.ru.seo

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: pageAlternates('/preise', 'ru'),
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: seo.canonical,
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Цены на сайты Vibe Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: ['/images/working-photo.webp'],
  },
}

export default function RuPreiseRoute() {
  return <PricesPage locale="ru" />
}
