import type { Metadata } from 'next'
import { PrivacyPageContent } from '@/components/legal/privacy-page-content'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Vibe Studio',
  description: 'Информация о защите данных, cookie и обработке обращений на сайте Vibe Studio.',
  alternates: pageAlternates('/datenschutzerklaerung', 'ru'),
}

export default function RuPrivacyPage() {
  return <PrivacyPageContent />
}

