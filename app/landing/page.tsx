import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { LandingPage } from '@/components/landing/landing-page'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Landing | Vibe Studio',
  description:
    'Klare, moderne Websites für kleine Unternehmen im Lahn-Dill-Kreis. Ohne leere Versprechen, mit klarer Struktur und professionellem Auftritt.',
}

export default function LandingRoute() {
  return (
    <div className={manrope.className}>
      <LandingPage />
    </div>
  )
}
