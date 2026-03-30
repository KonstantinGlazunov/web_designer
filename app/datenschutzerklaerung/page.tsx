import { LegalPageLayout } from '@/components/legal-page-layout'

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Datenschutzerklaerung" title="Hinweise zum Datenschutz">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">1. Verantwortlicher</h2>
        <div className="mt-4 space-y-1">
          <p>Konstantin Glazunov</p>
          <p>Braunfels, Lindenstraße 16</p>
          <p>E-Mail: glazunov.const@gmail.com</p>
          <p>WhatsApp: +49 1511 0974353</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">2. Zwecke und Rechtsgrundlagen der Verarbeitung</h2>
        <div className="mt-4 space-y-3">
          <p>
            Wir verarbeiten personenbezogene Daten nur, wenn dies rechtlich erlaubt ist. Je nach Vorgang verarbeiten wir Daten insbesondere auf Grundlage von Art. 6 Abs. 1 lit. a, b und f DSGVO.
          </p>
          <p>
            Betrieb der Website und technische Sicherheit (z. B. Server-Logs): Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Bearbeitung von Kontaktanfragen (E-Mail, Formular, Chat): Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation) und hilfsweise Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Lead-Erfassung per Quiz/Chat inkl. Weiterleitung in Telegram zur Anfragebearbeitung: Art. 6 Abs. 1 lit. b DSGVO.
          </p>
          <p>
            Einsatz von Google Analytics nur nach Einwilligung: Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit Paragraf 25 Abs. 1 TDDDG.
          </p>
          <p>
            Speicherung Ihrer Cookie-Auswahl in localStorage: Paragraf 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Hosting, Domain und technische Protokolle</h2>
        <div className="mt-4 space-y-3">
          <p>
            Die Website wird auf einer virtuellen Maschine bei Oracle Cloud Infrastructure (OCI) betrieben. Im Rahmen des Hostings koennen technische Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, angefragte URL, User-Agent) in Server-Logs verarbeitet werden.
          </p>
          <p>
            Die Verarbeitung erfolgt zur stabilen Bereitstellung, Fehleranalyse und IT-Sicherheit (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            Domain- und DNS-Leistungen werden ueber den jeweils eingesetzten Anbieter bereitgestellt. Dabei fallen technisch erforderliche Verarbeitungen beim jeweiligen Provider an.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Eingesetzte Empfaenger und Dienstleister</h2>
        <div className="mt-4 space-y-3">
          <p>Fuer den Betrieb dieser Website koennen folgende Empfaenger bzw. Dienstleister Daten erhalten:</p>
          <p>Hosting: Oracle Cloud Infrastructure (Serverbetrieb).</p>
          <p>Webanalyse (optional, nur nach Einwilligung): Google Analytics 4 (Google).</p>
          <p>KI-gestuetzter Chat: OpenAI (Verarbeitung von Chat-Inhalten zur Antwortgenerierung).</p>
          <p>Lead-Benachrichtigung: Telegram (Uebermittlung von Anfrageinhalten an den hinterlegten Business-Chat).</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Drittlanduebermittlungen</h2>
        <p className="mt-4">
          Bei der Nutzung einzelner Dienstleister kann eine Verarbeitung in Staaten ausserhalb der EU/des EWR (insbesondere USA) nicht ausgeschlossen werden. Solche Uebermittlungen erfolgen nur nach Massgabe der Art. 44 ff. DSGVO, insbesondere auf Basis von EU-Standardvertragsklauseln und, soweit anwendbar, Angemessenheitsbeschluessen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Speicherdauer</h2>
        <div className="mt-4 space-y-3">
          <p>Server-Logdaten werden nur so lange gespeichert, wie dies fuer Sicherheit und Fehleranalyse erforderlich ist.</p>
          <p>Chat-Sitzungen im Laufzeitspeicher werden automatisch geloescht (derzeit nach spaetestens 24 Stunden Inaktivitaet).</p>
          <p>Kontakt- und Projektdaten werden geloescht, sobald der Zweck entfaellt und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
          <p>Ihre Cookie-Einwilligung bleibt in localStorage gespeichert, bis Sie sie aendern oder den lokalen Speicher loeschen.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">7. Ihre Rechte</h2>
        <p className="mt-4">
          Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Datenuebertragbarkeit sowie Widerspruch gegen Verarbeitungen nach Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">8. Widerruf von Einwilligungen</h2>
        <p className="mt-4">
          Erteilte Einwilligungen (z. B. fuer Analytics) koennen Sie jederzeit mit Wirkung fuer die Zukunft widerrufen, indem Sie Ihre Cookie-Einstellungen aendern.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">9. Beschwerderecht bei einer Aufsichtsbehoerde</h2>
        <p className="mt-4">
          Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehoerde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewoehnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmasslichen Verstosses.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">10. Sicherheit</h2>
        <p className="mt-4">
          Wir setzen angemessene technische und organisatorische Massnahmen ein, um Ihre Daten gegen Verlust, Missbrauch und unbefugten Zugriff zu schuetzen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">11. Stand und Aenderungen</h2>
        <p className="mt-4">
          Diese Datenschutzerklaerung wird aktualisiert, wenn sich rechtliche Anforderungen, eingesetzte Dienste oder Verarbeitungsprozesse aendern.
        </p>
      </section>
    </LegalPageLayout>
  )
}
