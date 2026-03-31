import { LegalPageLayout } from '@/components/legal-page-layout'

export default function ImpressumPage() {
  return (
    <LegalPageLayout eyebrow="Impressum" title="Vibe Studio">
      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Angaben gemäß Paragraf 5 DDG</h2>
        <div className="mt-4 space-y-1">
          <p>Konstantin Glazunov</p>
          <p>Braunfels, Lindenstraße 16</p>
          <p>E-Mail: glazunov.const@gmail.com</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Kontakt</h2>
        <div className="mt-4 space-y-1">
          <p>WhatsApp: +49 1511 0974353</p>
          <p>E-Mail: glazunov.const@gmail.com</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Verantwortlich für den Inhalt</h2>
        <p className="mt-4">Konstantin Glazunov, Braunfels, Lindenstraße 16.</p>
      </section>
    </LegalPageLayout>
  )
}
