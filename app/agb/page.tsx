import { LegalPageLayout } from '@/components/legal-page-layout'

export default function AgbPage() {
  return (
    <LegalPageLayout eyebrow="AGB" title="Allgemeine Geschäftsbedingungen">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">1. Geltungsbereich</h2>
        <p className="mt-4">
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Angebote und Leistungen von Konstantin Glazunov im Bereich Webdesign, Webentwicklung, technische Betreuung und digitale Produktumsetzung.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">2. Vertragsschluss und Leistungsumfang</h2>
        <p className="mt-4">
          Grundlage der Zusammenarbeit sind individuelles Angebot, Projektbriefing und ggf. weitere schriftliche Vereinbarungen. Der konkrete Leistungsumfang ergibt sich ausschließlich aus diesen Unterlagen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Mitwirkungspflichten des Kunden</h2>
        <p className="mt-4">
          Der Kunde stellt alle für das Projekt benötigten Inhalte, Zugänge, Freigaben und Informationen rechtzeitig bereit. Verzögerungen durch fehlende Mitwirkung können Zeitplan und Vergütung beeinflussen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Vergütung und Zahlung</h2>
        <p className="mt-4">
          Alle Preise richten sich nach dem individuellen Angebot. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug fällig.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Abnahme</h2>
        <p className="mt-4">
          Soweit eine Abnahme vorgesehen ist, gilt die Leistung als abgenommen, wenn der Kunde die Abnahme erklärt, die Webseite produktiv nutzt oder innerhalb angemessener Frist keine wesentlichen Mängel rügt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Nutzungsrechte</h2>
        <p className="mt-4">
          Nutzungsrechte an Design-, Text- und Entwicklungsleistungen gehen erst nach vollständiger Bezahlung auf den Kunden über, soweit nichts Abweichendes schriftlich vereinbart ist.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">7. Domain und Hosting</h2>
        <div className="mt-4 space-y-3">
          <p>
            Domainregistrierung und Hosting sind nur dann Vertragsbestandteil, wenn sie ausdrücklich beauftragt wurden.
          </p>
          <p>
            Bei Domainleistungen erfolgt die Registrierung grundsätzlich im Namen des Kunden, soweit rechtlich und technisch möglich.
          </p>
          <p>
            Für Leistungen externer Anbieter (z. B. Domain-Registrar, DNS-, Hosting- oder CDN-Anbieter) gelten zusätzlich deren Vertrags- und Nutzungsbedingungen.
          </p>
          <p>
            Eine durchgängige Verfügbarkeit von Infrastruktur externer Anbieter kann nicht garantiert werden.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">8. Mängel und Haftung</h2>
        <p className="mt-4">
          Es gelten die gesetzlichen Mängelrechte. Die Haftung ist bei leichter Fahrlässigkeit auf vorhersehbare, vertragstypische Schäden begrenzt. Unberührt bleibt die Haftung bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper oder Gesundheit sowie nach zwingenden gesetzlichen Vorschriften.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">9. Inhalte und Rechte Dritter</h2>
        <p className="mt-4">
          Der Kunde ist für die Rechtmäßigkeit bereitgestellter Inhalte (z. B. Texte, Bilder, Marken) verantwortlich und stellt sicher, dass keine Rechte Dritter verletzt werden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">10. Laufzeit und Kündigung</h2>
        <p className="mt-4">
          Projektverträge enden mit Leistungserbringung und Zahlung. Wiederkehrende Leistungen (z. B. Wartung oder Hosting-Management) laufen auf unbestimmte Zeit und können, sofern nicht anders vereinbart, mit 30 Tagen zum Monatsende gekündigt werden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">11. Schlussbestimmungen</h2>
        <p className="mt-4">
          Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </section>
    </LegalPageLayout>
  )
}
