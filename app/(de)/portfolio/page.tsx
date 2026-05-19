import type { Metadata } from 'next'
import { PortfolioPage } from '@/components/portfolio-page'
import { pageAlternates } from '@/lib/seo'

const title = 'Portfolio | Beispiele für Websites'
const description =
  'Konkrete Beispiele für Websites, Landingpages und mehrsprachige Projekte für kleine Unternehmen und Selbstständige.'

export const metadata: Metadata = {
  title,
  description,
  alternates: pageAlternates('/portfolio', 'de'),
  openGraph: {
    title,
    description,
    url: 'https://erstellen-websiten.de/portfolio',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/portfolio-speicher.webp',
        width: 1200,
        height: 750,
        alt: 'Portfolio Beispiele für Websites',
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
  return <PortfolioPage locale="de" />
}
