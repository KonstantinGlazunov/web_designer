import type { Metadata } from 'next'
import { ImpressumPageContent } from '@/components/legal/impressum-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Impressum | Vibe Studio',
  description: 'Rechtliche Angaben und Kontaktdaten von Vibe Studio.',
  alternates: pageAlternates('/impressum', 'de'),
}

export default function ImpressumPage() {
  return <ImpressumPageContent />
}
