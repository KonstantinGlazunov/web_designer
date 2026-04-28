import type { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'

export const metadata: Metadata = {
  title: 'Kontakt | Vibe Studio',
  description: 'Kontaktseite von Vibe Studio: Anfrage senden, WhatsApp, Telefon und E-Mail.',
}

export default function KontaktRoute() {
  return <ContactPage />
}
