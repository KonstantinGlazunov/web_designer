import { LegalPageLayout } from '@/components/legal-page-layout'

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Datenschutzerklärung" title="Hinweise zum Datenschutz">
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
            Betrieb der Webseite und technische Sicherheit (z. B. Server-Logs): Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Bearbeitung von Kontaktanfragen (E-Mail, Formular, Chat): Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation) und hilfsweise Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Lead-Erfassung per Quiz und Chat inklusive Weiterleitung in Telegram zur Anfragebearbeitung: Art. 6 Abs. 1 lit. b DSGVO.
          </p>
          <p>
            Einsatz von Google Analytics nur nach Einwilligung: Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit Paragraf 25 Abs. 1 TDDDG.
          </p>
          <p>
            Speicherung Ihrer Cookie-Auswahl im localStorage: Paragraf 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Hosting, Domain und technische Protokolle</h2>
        <div className="mt-4 space-y-3">
          <p>
            Die Webseite wird auf einer virtuellen Maschine bei Oracle Cloud Infrastructure (OCI) betrieben. Im Rahmen des Hostings können technische Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, angefragte URL, User-Agent) in Server-Logs verarbeitet werden.
          </p>
          <p>
            Die Verarbeitung erfolgt zur stabilen Bereitstellung, Fehleranalyse und IT-Sicherheit (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            Domain- und DNS-Leistungen werden über den jeweils eingesetzten Anbieter bereitgestellt. Dabei fallen technisch erforderliche Verarbeitungen beim jeweiligen Anbieter an.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Eingesetzte Empfänger und Dienstleister</h2>
        <div className="mt-4 space-y-3">
          <p>Für den Betrieb dieser Webseite können folgende Empfänger bzw. Dienstleister Daten erhalten:</p>
          <p>Hosting: Oracle Cloud Infrastructure (Serverbetrieb).</p>
          <p>Webanalyse (optional, nur nach Einwilligung): Google Analytics 4 (Google).</p>
          <p>KI-gestützter Chat: OpenAI (Verarbeitung von Chat-Inhalten zur Antwortgenerierung).</p>
          <p>Lead-Benachrichtigung: Telegram (Übermittlung von Anfrageinhalten an den hinterlegten Geschäfts-Chat).</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Drittlandübermittlungen</h2>
        <p className="mt-4">
          Bei der Nutzung einzelner Dienstleister kann eine Verarbeitung in Staaten außerhalb der EU/des EWR (insbesondere USA) nicht ausgeschlossen werden. Solche Übermittlungen erfolgen nur nach Maßgabe der Art. 44 ff. DSGVO, insbesondere auf Basis von EU-Standardvertragsklauseln und, soweit anwendbar, Angemessenheitsbeschlüssen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Speicherdauer</h2>
        <div className="mt-4 space-y-3">
          <p>Server-Logdaten werden nur so lange gespeichert, wie dies für Sicherheit und Fehleranalyse erforderlich ist.</p>
          <p>Chat-Sitzungen im Laufzeitspeicher werden automatisch gelöscht (derzeit nach spätestens 24 Stunden Inaktivität).</p>
          <p>Kontakt- und Projektdaten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
          <p>Ihre Cookie-Einwilligung bleibt im localStorage gespeichert, bis Sie sie ändern oder den lokalen Speicher löschen.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">7. Ihre Rechte</h2>
        <p className="mt-4">
          Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen nach Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">8. Widerruf von Einwilligungen</h2>
        <p className="mt-4">
          Erteilte Einwilligungen (z. B. für Analytics) können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie Ihre Cookie-Einstellungen ändern.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
        <p className="mt-4">
          Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">10. Sicherheit</h2>
        <p className="mt-4">
          Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Verlust, Missbrauch und unbefugten Zugriff zu schützen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">11. Stand und Änderungen</h2>
        <p className="mt-4">
          Diese Datenschutzerklärung wird aktualisiert, wenn sich rechtliche Anforderungen, eingesetzte Dienste oder Verarbeitungsprozesse ändern.
        </p>
      </section>
    </LegalPageLayout>
  )
}
