import Link from 'next/link'

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  children: React.ReactNode
}

export function LegalPageLayout({ eyebrow, title, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-page-light px-4 py-20 dark:bg-page-dark sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/12 bg-white/70 p-8 shadow-glow backdrop-blur-xl dark:bg-glass-dark/75">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{title}</h1>
        <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {children}
        </div>
        <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-emerald-500 hover:text-emerald-400">
          Zurueck zur Startseite
        </Link>
      </div>
    </main>
  )
}
