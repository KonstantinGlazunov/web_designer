import { LegalPageLayout } from '@/components/legal-page-layout'

export default function ImpressumPage() {
  return (
    <LegalPageLayout eyebrow="Impressum" title="CodeVibe Studio">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Angaben gemaess Paragraf 5 TMG</h2>
        <div className="mt-4 space-y-1">
          <p>Max Mustermann</p>
          <p>Studio fuer moderne Websites und digitale Produkte</p>
          <p>Berlin, Deutschland</p>
          <p>E-Mail: hello@codevibe.studio</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Kontakt</h2>
        <div className="mt-4 space-y-1">
          <p>Telefon: +49 000 0000000</p>
          <p>E-Mail: hello@codevibe.studio</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Verantwortlich fuer den Inhalt</h2>
        <p className="mt-4">
          Max Mustermann, Berlin, Deutschland.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Hinweis</h2>
        <p className="mt-4">
          Bitte ersetzen Sie diese Platzhalter vor dem echten Launch durch Ihre realen Unternehmens- und Kontaktdaten.
        </p>
      </section>
    </LegalPageLayout>
  )
}
