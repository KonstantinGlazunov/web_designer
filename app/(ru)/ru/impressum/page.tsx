import type { Metadata } from 'next'
import { ImpressumPageContent } from '@/components/legal/impressum-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Выходные данные | Vibe Studio',
  description: 'Юридические сведения и контакты Vibe Studio.',
  alternates: pageAlternates('/impressum', 'ru'),
}

export default function RuImpressumPage() {
  return <ImpressumPageContent />
}

