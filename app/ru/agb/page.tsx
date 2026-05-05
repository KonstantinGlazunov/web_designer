import type { Metadata } from 'next'
import { AgbPageContent } from '@/components/legal/agb-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Условия сотрудничества | Vibe Studio',
  description: 'Общие условия сотрудничества Vibe Studio по разработке и сопровождению сайтов.',
  alternates: pageAlternates('/agb', 'ru'),
}

export default function RuAgbPage() {
  return <AgbPageContent />
}

