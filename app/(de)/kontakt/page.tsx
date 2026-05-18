import type { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Kontakt | Vibe Studio',
  description: 'Kontaktseite von Vibe Studio: Anfrage senden, WhatsApp, Telefon und E-Mail.',
  alternates: pageAlternates('/kontakt', 'de'),
  openGraph: {
    title: 'Kontakt | Vibe Studio',
    description: 'Kontaktseite von Vibe Studio: Anfrage senden, WhatsApp, Telefon und E-Mail.',
    url: 'https://erstellen-websiten.de/kontakt',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/working-photo.webp',
        width: 1024,
        height: 1024,
        alt: 'Kontakt zu Vibe Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | Vibe Studio',
    description: 'Kontaktseite von Vibe Studio: Anfrage senden, WhatsApp, Telefon und E-Mail.',
    images: ['/images/working-photo.webp'],
  },
}

export default function KontaktRoute() {
  return <ContactPage />
}
