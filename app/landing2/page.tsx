import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Landing2Page } from '@/components/landing2/landing2-page'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Landing2 | Vibe Studio',
  description:
    'Moderne, verständliche Websites für kleine Unternehmen im Lahn-Dill-Kreis. Ehrlich, klar und ohne leere Versprechen.',
}

export default function Landing2Route() {
  return (
    <div className={manrope.className}>
      <Landing2Page />
    </div>
  )
}
