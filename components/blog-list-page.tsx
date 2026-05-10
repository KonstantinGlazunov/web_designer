'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CalendarDays, Clock3, Search } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { SiteFooter } from '@/components/site-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { localizePath } from '@/lib/locale-routes'
import { blogPosts, blogTopics, blogTopicSlugs } from '@/lib/blog-posts'

const copy = {
  de: {
    title: 'Blog',
    subtitle: '{count} aktuelle Artikel über die Vermarktung von Produkten und Dienstleistungen über Landingpages.',
    topicsTitle: '{count} aktuelle Themen',
    searchLabel: 'Schnell zu einer Thema springen',
    searchPlaceholder: 'Thema suchen...',
    noMatches: 'Keine passenden Themen gefunden.',
    readMore: 'Artikel lesen',
    minutes: 'Min.',
  },
  ru: {
    title: 'Блог',
    subtitle: '{count} актуальных статей о продвижении товаров и услуг через лендинги.',
    topicsTitle: '{count} актуальных тем',
    searchLabel: 'Быстрый переход к теме',
    searchPlaceholder: 'Найти тему...',
    noMatches: 'Подходящие темы не найдены.',
    readMore: 'Читать статью',
    minutes: 'мин',
  },
} as const

const ruStyleLabels: Record<string, string> = {
  'Neon Grid': 'Неоновая сетка',
  'Paper Collage': 'Бумажный коллаж',
  Blueprint: 'Чертеж',
  'Warm Editorial': 'Теплая редакционная подача',
  'Minimal Mono': 'Минимализм',
  'Retro Pop': 'Ретро-поп',
  'Isometric Blocks': 'Изометрические блоки',
  Glassmorphism: 'Глассморфизм',
  'Data Heatmap': 'Тепловая карта данных',
  'Abstract Ribbon': 'Абстрактная лента',
}

function getStyleLabel(label: string, locale: 'de' | 'ru') {
  if (locale === 'de') return label
  return ruStyleLabels[label] ?? label
}

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
  const homeHref = localizePath('/', locale)
  const articleBaseHref = localizePath('/blog', locale)
  const [searchQuery, setSearchQuery] = useState('')
  const orderedPosts = useMemo(
    () =>
      blogTopicSlugs
        .map((slug) => blogPosts.find((post) => post.slug === slug) ?? null)
        .filter((post): post is (typeof blogPosts)[number] => post !== null),
    [],
  )
  const subtitle = t.subtitle.replace('{count}', String(orderedPosts.length || blogPosts.length))
  const topicsTitle = t.topicsTitle.replace('{count}', String(topics.length))
  const topicLinks = topics.map((topic, index) => {
    const post = orderedPosts[index]
    return {
      topic,
      slug: post?.slug ?? null,
      preview: post?.content[locale].excerpt ?? '',
    }
  })

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredTopicLinks =
    normalizedQuery.length === 0
      ? topicLinks
      : topicLinks.filter((entry) => entry.topic.toLowerCase().includes(normalizedQuery))

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
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
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{subtitle}</h1>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">{topicsTitle}</h2>
            <label className="mt-4 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
              <Search className="h-4 w-4 text-sky-700" />
              <span className="sr-only">{t.searchLabel}</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>

            <ol className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:hidden">
              {filteredTopicLinks.map(({ topic, slug, preview }) => (
                <li
                  key={topic}
                  className="min-w-[84%] snap-start rounded-xl border border-slate-200 bg-white p-4"
                >
                  {slug ? (
                    <Link href={`${articleBaseHref}/${slug}`} className="block">
                      <p className="text-sm font-medium leading-6 text-slate-900">{topic}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{preview}</p>
                    </Link>
                  ) : (
                    <p className="text-sm font-medium leading-6 text-slate-900">{topic}</p>
                  )}
                </li>
              ))}
            </ol>

            <ol className="mt-4 hidden gap-3 text-sm text-slate-700 md:grid md:grid-flow-col md:grid-rows-2 md:auto-cols-[minmax(260px,1fr)] md:overflow-x-auto md:pb-1">
              {filteredTopicLinks.map(({ topic, slug, preview }) => (
                <li
                  key={topic}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-sky-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                >
                  {slug ? (
                    <Link href={`${articleBaseHref}/${slug}`} className="block">
                      <p className="font-medium leading-6 text-slate-900">{topic}</p>
                      <p className="mt-2 max-h-[3.75rem] min-h-[3.75rem] overflow-hidden text-xs leading-5 text-slate-600">
                        {preview}
                      </p>
                    </Link>
                  ) : (
                    <p className="font-medium leading-6 text-slate-900">{topic}</p>
                  )}
                </li>
              ))}
            </ol>

            {filteredTopicLinks.length === 0 ? (
              <p className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                {t.noMatches}
              </p>
            ) : null}
          </section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => {
            const localized = post.content[locale]

            return (
              <article key={post.slug} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <Link
                  href={`${articleBaseHref}/${post.slug}`}
                  className="group block relative aspect-[16/9] overflow-hidden border-b border-slate-200 bg-slate-100"
                  aria-label={localized.title}
                >
                  <Image
                    src={post.image}
                    alt={localized.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover transition duration-200 group-hover:scale-[1.01]"
                  />
                </Link>

                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{getStyleLabel(localized.styleLabel, locale)}</p>
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
                    href={`${articleBaseHref}/${post.slug}`}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    {t.readMore}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <SiteFooter className="mt-6" />
      </section>
    </main>
  )
}
