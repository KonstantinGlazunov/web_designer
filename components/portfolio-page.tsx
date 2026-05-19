import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { SiteFooter } from '@/components/site-footer'
import { portfolioPageCopy, type LocaleKey } from '@/components/landing/portfolio-copy'
import { localizePath } from '@/lib/locale-routes'
import type { Locale } from '@/lib/translations'

type PortfolioPageProps = {
  locale: Locale
}

const sectionLabels: Record<
  LocaleKey,
  {
    task: string
    implementation: string
    functions: string
    technologies: string
    openSite: string
    home: string
  }
> = {
  de: {
    task: 'Aufgabe',
    implementation: 'Umsetzung',
    functions: 'Funktionen',
    technologies: 'Technologien',
    openSite: 'Website öffnen',
    home: 'Startseite',
  },
  ru: {
    task: 'Задача',
    implementation: 'Реализация',
    functions: 'Функции',
    technologies: 'Технологии',
    openSite: 'Открыть сайт',
    home: 'На главную',
  },
}

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const copy = portfolioPageCopy[locale]
  const labels = sectionLabels[locale]
  const homeHref = localizePath('/', locale)

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
          {labels.home}
        </Link>
        <div className="flex items-center gap-2">
          <LocaleToggle />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              {locale === 'de' ? 'Portfolio' : 'Портфолио'}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{copy.intro}</p>
          </div>
        </section>

        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm leading-6 text-slate-600">
              {locale === 'de'
                ? 'Sieben reale Projekte im Überblick. Auf Desktop und Mobile direkt sichtbar.'
                : 'Семь реальных проектов в обзоре. На desktop и mobile они видны сразу.'}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.projects.length} {locale === 'de' ? 'Projekte' : 'проектов'}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {copy.projects.map((project, index) => {
              const isFeatured = index === 0

              return (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-slate-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-100 bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      priority={isFeatured}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.08)_100%)]" />
                  </div>

                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="max-w-4xl">
                      <h2 className="text-2xl font-semibold text-slate-950 sm:text-[2.1rem]">{project.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{project.description}</p>
                    </div>

                    <div className="mt-7 grid gap-4 lg:grid-cols-2">
                      <SectionLine label={labels.task} text={project.task} />
                      <SectionLine label={labels.implementation} text={project.implementation} />
                      <SectionLine label={labels.functions} text={project.functions} />
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                          {labels.technologies}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-7">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
                        >
                          {labels.openSite}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-400">
                          TODO
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </main>
  )
}

function SectionLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
    </div>
  )
}
