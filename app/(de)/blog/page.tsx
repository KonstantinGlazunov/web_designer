import type { Metadata } from 'next'
import { BlogListPage } from '@/components/blog-list-page'
import { blogTopicSlugs } from '@/lib/blog-posts'
import { pageAlternates } from '@/lib/seo'

const articleCount = blogTopicSlugs.length

export const metadata: Metadata = {
  title: 'Blog | Websites, SEO und Anfragen 2026',
  description:
    `${articleCount} aktuelle Artikel über die Vermarktung von Produkten und Dienstleistungen über Landingpages und Firmenwebsites.`,
  alternates: pageAlternates('/blog', 'de'),
  openGraph: {
    title: 'Blog | Websites, SEO und Anfragen 2026',
    description:
      'Praxisartikel zu Conversion, SEO, Mobile UX, lokaler Sichtbarkeit, Firmenwebsites, Trust und AI/LLM-Sichtbarkeit.',
    url: 'https://erstellen-websiten.de/blog',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/blog-landing-v2-01.webp',
        width: 1600,
        height: 900,
        alt: 'Blog zu Websites, SEO und digitalen Anfragen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Websites, SEO und Anfragen 2026',
    description:
      `${articleCount} praxisnahe Artikel zu Landingpages, Firmenwebsites und lokaler Sichtbarkeit.`,
    images: ['/images/blog-landing-v2-01.webp'],
  },
}

export default function BlogRoute() {
  return <BlogListPage />
}
