import { LegalPageLayout } from '@/components/legal-page-layout'

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Datenschutzerklaerung" title="Hinweise zum Datenschutz">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">1. Verantwortliche Stelle</h2>
        <div className="mt-4 space-y-1">
          <p>CodeVibe Studio</p>
          <p>Berlin, Deutschland</p>
          <p>E-Mail: hello@codevibe.studio</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p className="mt-4">
          Personenbezogene Daten werden nur verarbeitet, soweit dies fuer die Bereitstellung der Website, die Kontaktaufnahme oder die Vertragserfuellung erforderlich ist.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Kontaktformular und E-Mail</h2>
        <p className="mt-4">
          Wenn Sie per Formular oder E-Mail Kontakt aufnehmen, werden Ihre Angaben zur Bearbeitung der Anfrage und fuer moegliche Anschlussfragen gespeichert.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Hosting und technische Logdaten</h2>
        <p className="mt-4">
          Beim Aufruf der Website koennen technisch notwendige Informationen wie IP-Adresse, Zeitpunkt, URL und Browserdaten in Server-Logs verarbeitet werden, um den Betrieb und die Sicherheit der Website sicherzustellen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Ihre Rechte</h2>
        <p className="mt-4">
          Sie haben das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung sowie auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten im Rahmen der gesetzlichen Vorgaben.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Hinweis</h2>
        <p className="mt-4">
          Diese Datenschutzerklaerung ist eine Vorlage und ersetzt keine juristische Pruefung. Vor dem Livegang sollten die tatsaechlich verwendeten Tools, Dienste und Rechtsgrundlagen exakt eingepflegt werden.
        </p>
      </section>
    </LegalPageLayout>
  )
}
