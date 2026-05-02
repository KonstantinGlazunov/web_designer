'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, CheckCircle2, Clock3 } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { getBlogPostBySlug } from '@/lib/blog-posts'

const copy = {
  de: {
    back: 'Zur Blog-Übersicht',
    notFound: 'Artikel nicht gefunden',
  },
  ru: {
    back: 'Ко всем статьям',
    notFound: 'Статья не найдена',
  },
} as const

function formatDate(isoDate: string, locale: 'de' | 'ru') {
  return new Date(isoDate).toLocaleDateString(locale === 'de' ? 'de-DE' : 'ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const { locale } = useSitePreferences()
  const t = copy[locale]
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-slate-200 bg-white p-8">
          <p className="text-lg font-semibold">{t.notFound}</p>
          <Link href="/blog" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            {t.back}
          </Link>
        </div>
      </main>
    )
  }

  const localized = post.content[locale]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.content.de.title,
    description: post.seoDescription,
    datePublished: post.publishedAtISO,
    dateModified: post.publishedAtISO,
    author: { '@type': 'Person', name: 'Konstantin Glazunov' },
    publisher: { '@type': 'Organization', name: 'Vibe Studio', url: 'https://erstellen-websiten.de' },
    image: `https://erstellen-websiten.de${post.image}`,
    inLanguage: locale === 'de' ? 'de-DE' : 'ru-RU',
    mainEntityOfPage: `https://erstellen-websiten.de/blog/${post.slug}`,
    keywords: post.keywords,
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
          Vibe Studio
        </Link>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <Link href="/blog" className="text-sm font-semibold text-sky-700 underline-offset-2 hover:underline">
            {t.back}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{localized.styleLabel}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{localized.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">{localized.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-600 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-sky-700" />
              {formatDate(post.publishedAtISO, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Clock3 className="h-3.5 w-3.5 text-sky-700" />
              {post.readTimeMin} {locale === 'de' ? 'Min.' : 'мин'}
            </span>
          </div>
        </div>

        <article className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100">
            <Image
              src={post.image}
              alt={localized.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>

          <p className="text-base leading-7 text-slate-700 sm:text-lg">{localized.summary}</p>

          <div className="mt-8 space-y-8">
            {localized.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold leading-tight text-slate-950">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">{localized.checklistTitle}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {localized.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">{localized.conclusionTitle}</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">{localized.conclusion}</p>
          </section>

        </article>
      </section>
    </main>
  )
}
