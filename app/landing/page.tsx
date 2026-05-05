import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { LandingPage } from '@/components/landing/landing-page'
import { pageAlternates } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Landingpage für kleine Unternehmen | Vibe Studio',
  description:
    'Klare, moderne Websites für kleine Unternehmen im Lahn-Dill-Kreis. Ohne leere Versprechen, mit klarer Struktur und professionellem Auftritt.',
  alternates: pageAlternates('/landing', 'de'),
  openGraph: {
    title: 'Landingpage für kleine Unternehmen | Vibe Studio',
    description:
      'Klare, moderne Websites für kleine Unternehmen im Lahn-Dill-Kreis. Ohne leere Versprechen, mit klarer Struktur und professionellem Auftritt.',
    url: 'https://erstellen-websiten.de/landing',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Landingpage Entwicklung für kleine Unternehmen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landingpage für kleine Unternehmen | Vibe Studio',
    description:
      'Klare, moderne Websites für kleine Unternehmen im Lahn-Dill-Kreis. Ohne leere Versprechen, mit klarer Struktur und professionellem Auftritt.',
    images: ['/images/working-photo.webp'],
  },
}

export default function LandingRoute() {
  return (
    <div className={manrope.className}>
      <LandingPage />
    </div>
  )
}
