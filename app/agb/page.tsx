import { LegalPageLayout } from '@/components/legal-page-layout'

export default function AgbPage() {
  return (
    <LegalPageLayout eyebrow="AGB" title="Allgemeine Geschaeftsbedingungen">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">1. Geltungsbereich</h2>
        <p className="mt-4">
          Diese Allgemeinen Geschaeftsbedingungen gelten fuer alle Leistungen von CodeVibe Studio im Bereich Webdesign,
          Frontend-Entwicklung, Konzeption und digitale Produktumsetzung.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">2. Leistungen</h2>
        <p className="mt-4">
          Art und Umfang der Leistungen ergeben sich aus dem individuellen Angebot, Projektbriefing oder einer gesonderten Vereinbarung.
          CodeVibe Studio erbringt ausschliesslich die dort beschriebenen Leistungen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Mitwirkungspflichten des Kunden</h2>
        <p className="mt-4">
          Der Kunde stellt alle fuer das Projekt erforderlichen Inhalte, Freigaben und Informationen rechtzeitig zur Verfuegung.
          Verzoegerungen durch fehlende Mitwirkung koennen zu einer Anpassung des Zeitplans fuehren.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Verguetung und Zahlung</h2>
        <p className="mt-4">
          Alle Preise verstehen sich gemaess individueller Vereinbarung. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen ohne Abzug faellig.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Nutzungsrechte</h2>
        <p className="mt-4">
          Nutzungsrechte an Design- und Entwicklungsleistungen gehen erst nach vollstaendiger Bezahlung auf den Kunden ueber, sofern nichts anderes schriftlich vereinbart wurde.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Haftung</h2>
        <p className="mt-4">
          CodeVibe Studio haftet nur fuer Vorsatz und grobe Fahrlaessigkeit, soweit gesetzlich zulaessig. Fuer Inhalte, die vom Kunden bereitgestellt werden, ist ausschliesslich der Kunde verantwortlich.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">7. Schlussbestimmungen</h2>
        <p className="mt-4">
          Es gilt deutsches Recht. Bitte passen Sie diese Vorlage vor dem echten Einsatz mit juristisch geprueften Angaben an.
        </p>
      </section>
    </LegalPageLayout>
  )
}
