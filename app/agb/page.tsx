import type { Metadata } from 'next'
import { AgbPageContent } from '@/components/legal/agb-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'AGB | Vibe Studio',
  description: 'Allgemeine Geschäftsbedingungen für Leistungen von Vibe Studio.',
  alternates: pageAlternates('/agb', 'de'),
}

export default function AgbPage() {
  return <AgbPageContent />
}
