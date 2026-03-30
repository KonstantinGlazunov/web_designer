import { LegalPageLayout } from '@/components/legal-page-layout'

export default function AgbPage() {
  return (
    <LegalPageLayout eyebrow="AGB" title="Allgemeine Geschaeftsbedingungen">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">1. Geltungsbereich</h2>
        <p className="mt-4">
          Diese Allgemeinen Geschaeftsbedingungen gelten fuer alle Angebote und Leistungen von Konstantin Glazunov im Bereich Webdesign, Webentwicklung, technische Betreuung und digitale Produktumsetzung.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">2. Vertragsschluss und Leistungsumfang</h2>
        <p className="mt-4">
          Grundlage der Zusammenarbeit sind individuelles Angebot, Projektbriefing und ggf. weitere schriftliche Vereinbarungen. Der konkrete Leistungsumfang ergibt sich ausschliesslich aus diesen Unterlagen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">3. Mitwirkungspflichten des Kunden</h2>
        <p className="mt-4">
          Der Kunde stellt alle fuer das Projekt benoetigten Inhalte, Zugaenge, Freigaben und Informationen rechtzeitig bereit. Verzoegerungen durch fehlende Mitwirkung koennen Zeitplan und Verguetung beeinflussen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">4. Verguetung und Zahlung</h2>
        <p className="mt-4">
          Alle Preise richten sich nach dem individuellen Angebot. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug faellig.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">5. Abnahme</h2>
        <p className="mt-4">
          Soweit eine Abnahme vorgesehen ist, gilt die Leistung als abgenommen, wenn der Kunde die Abnahme erklaert, die Website produktiv nutzt oder innerhalb angemessener Frist keine wesentlichen Maengel ruegt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">6. Nutzungsrechte</h2>
        <p className="mt-4">
          Nutzungsrechte an Design-, Text- und Entwicklungsleistungen gehen erst nach vollstaendiger Bezahlung auf den Kunden ueber, soweit nichts Abweichendes schriftlich vereinbart ist.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">7. Domain und Hosting</h2>
        <div className="mt-4 space-y-3">
          <p>
            Domainregistrierung und Hosting sind nur dann Vertragsbestandteil, wenn sie ausdruecklich beauftragt wurden.
          </p>
          <p>
            Bei Domainleistungen erfolgt die Registrierung grundsaetzlich im Namen des Kunden, soweit rechtlich und technisch moeglich.
          </p>
          <p>
            Fuer Leistungen externer Provider (z. B. Domain-Registrar, DNS-, Hosting- oder CDN-Anbieter) gelten zusaetzlich deren Vertrags- und Nutzungsbedingungen.
          </p>
          <p>
            Eine durchgaengige Verfuegbarkeit von Drittanbieter-Infrastruktur kann nicht garantiert werden.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">8. Maengel und Haftung</h2>
        <p className="mt-4">
          Es gelten die gesetzlichen Maengelrechte. Die Haftung ist bei leichter Fahrlaessigkeit auf vorhersehbare, vertragstypische Schaeden begrenzt. Unberuehrt bleibt die Haftung bei Vorsatz, grober Fahrlaessigkeit, Verletzung von Leben, Koerper oder Gesundheit sowie nach zwingenden gesetzlichen Vorschriften.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">9. Inhalte und Rechte Dritter</h2>
        <p className="mt-4">
          Der Kunde ist fuer die Rechtmaessigkeit bereitgestellter Inhalte (z. B. Texte, Bilder, Marken) verantwortlich und stellt sicher, dass keine Rechte Dritter verletzt werden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">10. Laufzeit und Kuendigung</h2>
        <p className="mt-4">
          Projektvertraege enden mit Leistungserbringung und Zahlung. Wiederkehrende Leistungen (z. B. Wartung/Hosting-Management) laufen auf unbestimmte Zeit und koennen, sofern nicht anders vereinbart, mit 30 Tagen zum Monatsende gekuendigt werden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">11. Schlussbestimmungen</h2>
        <p className="mt-4">
          Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der uebrigen Bestimmungen unberuehrt.
        </p>
      </section>
    </LegalPageLayout>
  )
}
