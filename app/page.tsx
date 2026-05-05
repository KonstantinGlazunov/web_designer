import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { HomePage } from '@/components/home-page'
import { pageAlternates } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Vibe Studio - Websites für kleine Unternehmen',
  description:
    'Moderne, verständliche Websites für kleine Unternehmen. Ehrlich, klar und ohne leere Versprechen.',
  alternates: pageAlternates('/', 'de'),
  openGraph: {
    title: 'Vibe Studio - Websites für kleine Unternehmen',
    description:
      'Moderne, verständliche Websites für kleine Unternehmen. Ehrlich, klar und ohne leere Versprechen.',
    url: 'https://erstellen-websiten.de',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Vibe Studio Arbeitssituation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Studio - Websites für kleine Unternehmen',
    description:
      'Moderne, verständliche Websites für kleine Unternehmen. Ehrlich, klar und ohne leere Versprechen.',
    images: ['/images/working-photo.webp'],
  },
}

export default function Page() {
  return (
    <div className={manrope.className}>
      <HomePage />
    </div>
  )
}
