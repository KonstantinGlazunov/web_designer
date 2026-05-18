import type { Metadata } from 'next'
import { PrivacyPageContent } from '@/components/legal/privacy-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Vibe Studio',
  description:
    'Datenschutzhinweise von Vibe Studio zu Verarbeitung, Diensten, Cookies und Ihren Rechten.',
  alternates: pageAlternates('/datenschutzerklaerung', 'de'),
}

export default function DatenschutzPage() {
  return <PrivacyPageContent />
}
