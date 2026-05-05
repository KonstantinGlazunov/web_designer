import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'
import { localizePath } from '@/lib/locale-routes'

const siteUrl = 'https://erstellen-websiten.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticPaths = [
    '/',
    '/landing',
    '/ueber-mich',
    '/kontakt',
    '/blog',
    '/impressum',
    '/datenschutzerklaerung',
    '/agb',
  ]

  const staticEntries: MetadataRoute.Sitemap = ['de', 'ru'].flatMap((locale) =>
    staticPaths.map((path) => {
      const localizedPath = localizePath(path, locale === 'ru' ? 'ru' : 'de')
      return {
        url: `${siteUrl}${localizedPath}`,
        lastModified,
        changeFrequency:
          path === '/impressum' || path === '/datenschutzerklaerung' || path === '/agb'
            ? 'yearly'
            : 'weekly',
        priority: path === '/' ? 1 : path === '/blog' ? 0.7 : 0.6,
      }
    }),
  )

  const blogEntries: MetadataRoute.Sitemap = ['de', 'ru'].flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${siteUrl}${localizePath(`/blog/${post.slug}`, locale === 'ru' ? 'ru' : 'de')}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
  )

  return [...staticEntries, ...blogEntries]
}
