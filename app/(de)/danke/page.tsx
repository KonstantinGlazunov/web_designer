import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vielen Dank | Vibe Studio',
  description: 'Vielen Dank für Ihre Anfrage. Vibe Studio meldet sich so bald wie möglich mit einer Einschätzung.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function DankeRoute() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center">
        <div className="w-full rounded-[30px] border border-slate-200 bg-white p-6 text-center sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Vibe Studio</p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Vielen Dank für Ihre Anfrage</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Ihre Nachricht wurde gesendet. Ich melde mich so bald wie möglich mit einer Einschätzung.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Zur Startseite
          </Link>
        </div>
      </section>
    </main>
  )
}
