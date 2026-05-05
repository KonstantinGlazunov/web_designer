import type { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Контакты | Vibe Studio',
  description: 'Контакты Vibe Studio: форма обратной связи, WhatsApp, телефон и электронная почта.',
  alternates: pageAlternates('/kontakt', 'ru'),
  openGraph: {
    title: 'Контакты | Vibe Studio',
    description: 'Контакты Vibe Studio: форма обратной связи, WhatsApp, телефон и электронная почта.',
    url: 'https://erstellen-websiten.de/ru/kontakt',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Связаться с Vibe Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакты | Vibe Studio',
    description: 'Контакты Vibe Studio: форма обратной связи, WhatsApp, телефон и электронная почта.',
    images: ['/images/working-photo.webp'],
  },
}

export default function RuKontaktRoute() {
  return <ContactPage />
}

