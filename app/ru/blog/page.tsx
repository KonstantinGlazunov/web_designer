import type { Metadata } from 'next'
import { BlogListPage } from '@/components/blog-list-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Блог | Лендинги и заявки в 2026',
  description:
    '21 практическая статья о том, как продвигать услуги и товары через лендинги и получать больше заявок.',
  alternates: pageAlternates('/blog', 'ru'),
  openGraph: {
    title: 'Блог | Лендинги и заявки в 2026',
    description:
      'Практические материалы про конверсию, SEO, мобильный UX, доверие, consent UX и видимость в AI/LLM-выдаче.',
    url: 'https://erstellen-websiten.de/ru/blog',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/blog-landing-v2-01.webp',
        width: 1600,
        height: 900,
        alt: 'Статьи про лендинги и конверсию',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог | Лендинги и заявки в 2026',
    description:
      '21 практическая статья про конверсию, SEO, мобильный UX и маркетинг лендингов.',
    images: ['/images/blog-landing-v2-01.webp'],
  },
}

export default function RuBlogRoute() {
  return <BlogListPage />
}
