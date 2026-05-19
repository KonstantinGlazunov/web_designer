import type { Metadata } from 'next'
import { PricesPage } from '@/components/prices-page'
import { pricesCopy } from '@/lib/prices-copy'
import { pageAlternates } from '@/lib/seo'

const seo = pricesCopy.de.seo

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: pageAlternates('/preise', 'de'),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Vibe Studio Website-Preise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: ['/images/working-photo.webp'],
  },
}

export default function PreiseRoute() {
  return <PricesPage locale="de" />
}
