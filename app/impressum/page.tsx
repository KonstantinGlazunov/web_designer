'use client'

import { LegalPageLayout } from '@/components/legal-page-layout'
import { ProtectedContactLink } from '@/components/protected-contact-link'
import { useSitePreferences } from '@/components/providers/site-preferences'
import type { Locale } from '@/lib/translations'

const impressumPhoneDisplayParts = ['+49', ' ', '1511', ' ', '0974353']
const impressumPhoneHrefParts = ['+49', '1511', '0974353']

const copy: Record<
  Locale,
  {
    eyebrow: string
    title: string
    companyHeading: string
    contactHeading: string
    contentHeading: string
    companyType: string
    country: string
    contactEmail: string
    contactWhatsapp: string
    contactReveal: string
    addressLikeAbove: string
  }
> = {
  de: {
    eyebrow: 'Impressum',
    title: 'Vibe Studio',
    companyHeading: 'Angaben gemäß § 5 DDG',
    contactHeading: 'Kontakt',
    contentHeading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    companyType: 'Vibe Studio (Einzelunternehmen)',
    country: 'Deutschland',
    contactEmail: 'E-Mail: glazunov.const@gmail.com',
    contactWhatsapp: 'WhatsApp',
    contactReveal: 'Nummer anzeigen',
    addressLikeAbove: 'Adresse wie oben',
  },
  ru: {
    eyebrow: 'Выходные данные',
    title: 'Vibe Studio',
    companyHeading: 'Сведения согласно § 5 DDG',
    contactHeading: 'Контакты',
    contentHeading: 'Ответственный за содержание согласно § 18 Abs. 2 MStV',
    companyType: 'Vibe Studio (индивидуальный предприниматель)',
    country: 'Германия',
    contactEmail: 'Эл. почта: glazunov.const@gmail.com',
    contactWhatsapp: 'WhatsApp',
    contactReveal: 'Показать номер',
    addressLikeAbove: 'Адрес как выше',
  },
}

export default function ImpressumPage() {
  const { locale } = useSitePreferences()
  const t = copy[locale]

  return (
    <LegalPageLayout eyebrow={t.eyebrow} title={t.title}>
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{t.companyHeading}</h2>
        <div className="mt-4 space-y-1">
          <p>{t.companyType}</p>
          <p>Konstantin Glazunov</p>
          <p>Lindenstraße 16</p>
          <p>35619 Braunfels</p>
          <p>{t.country}</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{t.contactHeading}</h2>
        <div className="mt-4 space-y-1">
          <p>{t.contactEmail}</p>
          <ProtectedContactLink
            label={t.contactWhatsapp}
            maskedValue="+49 1511 ..."
            revealLabel={t.contactReveal}
            hrefScheme="tel:"
            hrefParts={impressumPhoneHrefParts}
            displayParts={impressumPhoneDisplayParts}
            className="text-left underline-offset-2 hover:underline"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          {t.contentHeading}
        </h2>
        <div className="mt-4 space-y-1">
          <p>Konstantin Glazunov</p>
          <p>{t.addressLikeAbove}</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
