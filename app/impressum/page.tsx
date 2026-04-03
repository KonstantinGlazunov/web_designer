import { LegalPageLayout } from '@/components/legal-page-layout'

export default function ImpressumPage() {
  return (
    <LegalPageLayout eyebrow="Impressum" title="Vibe Studio">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Angaben gemäß § 5 DDG</h2>
        <div className="mt-4 space-y-1">
          <p>Vibe Studio (Einzelunternehmen)</p>
          <p>Konstantin Glazunov</p>
          <p>Lindenstraße 16</p>
          <p>35619 Braunfels</p>
          <p>Deutschland</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Kontakt</h2>
        <div className="mt-4 space-y-1">
          <p>E-Mail: glazunov.const@gmail.com</p>
          <p>WhatsApp: +49 1511 0974353</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <div className="mt-4 space-y-1">
          <p>Konstantin Glazunov</p>
          <p>Adresse wie oben</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
