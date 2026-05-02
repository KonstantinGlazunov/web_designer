import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'

const siteUrl = 'https://erstellen-websiten.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/landing`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/landing2`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogEntries,
    {
      url: `${siteUrl}/impressum`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/datenschutzerklaerung`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/agb`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/experemental`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ]
}
