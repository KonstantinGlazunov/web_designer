import type { Metadata } from 'next'
import { AboutMePage } from '@/components/about-me-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Über mich | Vibe Studio',
  description:
    'Konstantin Glazunov: Websites für kleine Unternehmen in Deutschland - verständlich, persönlich und auf Anfragen ausgerichtet.',
  alternates: pageAlternates('/ueber-mich', 'de'),
  openGraph: {
    title: 'Über mich | Vibe Studio',
    description:
      'Konstantin Glazunov entwickelt verständliche Websites für kleine Unternehmen in Deutschland.',
    url: 'https://erstellen-websiten.de/ueber-mich',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Arbeitsgespräch über eine Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über mich | Vibe Studio',
    description:
      'Konstantin Glazunov entwickelt verständliche Websites für kleine Unternehmen in Deutschland.',
    images: ['/images/working-photo.webp'],
  },
}

export default function UeberMichRoute() {
  return <AboutMePage />
}
