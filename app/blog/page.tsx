import type { Metadata } from 'next'
import { BlogListPage } from '@/components/blog-list-page'
import { pageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Blog | Landingpage-Strategien 2026',
  description:
    '10 aktuelle Artikel über die Vermarktung von Produkten und Dienstleistungen über Landingpages.',
  alternates: pageAlternates('/blog', 'de'),
  openGraph: {
    title: 'Blog | Landingpage-Strategien 2026',
    description:
      'Praxisartikel zu Conversion, SEO, Mobile UX, Retargeting und AI-Personalisierung auf Landingpages.',
    url: 'https://erstellen-websiten.de/blog',
    siteName: 'Vibe Studio',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/blog-landing-v2-01.webp',
        width: 1600,
        height: 900,
        alt: 'Landingpage-Strategien 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Landingpage-Strategien 2026',
    description:
      '10 praxisnahe Artikel zur besseren Conversion von Landingpages.',
    images: ['/images/blog-landing-v2-01.webp'],
  },
}

export default function BlogRoute() {
  return <BlogListPage />
}
