'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock3 } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { blogPosts, blogTopics } from '@/lib/blog-posts'

const copy = {
  de: {
    title: 'Blog',
    subtitle: '10 aktuelle Artikel über die Vermarktung von Produkten und Dienstleistungen über Landingpages.',
    topicsTitle: '10 aktuelle Themen',
    readMore: 'Artikel lesen',
    minutes: 'Min.',
  },
  ru: {
    title: 'Блог',
    subtitle: '10 актуальных статей о продвижении товаров и услуг через лендинги.',
    topicsTitle: '10 актуальных тем',
    readMore: 'Читать статью',
    minutes: 'мин',
  },
} as const

function formatDate(isoDate: string, locale: 'de' | 'ru') {
  return new Date(isoDate).toLocaleDateString(locale === 'de' ? 'de-DE' : 'ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogListPage() {
  const { locale } = useSitePreferences()
  const t = copy[locale]
  const topics = blogTopics[locale]

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{t.title}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t.subtitle}</h1>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">{t.topicsTitle}</h2>
            <ol className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:text-base">
              {topics.map((item) => (
                <li key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => {
            const localized = post.content[locale]

            return (
              <article key={post.slug} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200 bg-slate-100">
                  <Image
                    src={post.image}
                    alt={localized.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{localized.styleLabel}</p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">{localized.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{localized.excerpt}</p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-sky-700" />
                      {formatDate(post.publishedAtISO, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-sky-700" />
                      {post.readTimeMin} {t.minutes}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    {t.readMore}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
