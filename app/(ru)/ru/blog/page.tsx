import type { Metadata } from 'next'
import { BlogListPage } from '@/components/blog-list-page'
import { blogTopicSlugs } from '@/lib/blog-posts'
import { pageAlternates } from '@/lib/seo'

const articleCount = blogTopicSlugs.length

export const metadata: Metadata = {
  title: 'Блог | Сайты, SEO и заявки в 2026',
  description:
    `${articleCount} практических статей о том, как продвигать услуги и товары через лендинги и сайты компании.`,
  alternates: pageAlternates('/blog', 'ru'),
  openGraph: {
    title: 'Блог | Сайты, SEO и заявки в 2026',
    description:
      'Практические материалы про конверсию, SEO, локальную видимость, мобильный UX, доверие и AI/LLM-выдачу.',
    url: 'https://erstellen-websiten.de/ru/blog',
    siteName: 'Vibe Studio',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/blog-landing-v2-01.webp',
        width: 1600,
        height: 900,
        alt: 'Статьи про сайты, SEO и цифровые заявки',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог | Сайты, SEO и заявки в 2026',
    description:
      `${articleCount} практических статей про лендинги, сайты услуг, SEO и локальный спрос.`,
    images: ['/images/blog-landing-v2-01.webp'],
  },
}

export default function RuBlogRoute() {
  return <BlogListPage />
}
