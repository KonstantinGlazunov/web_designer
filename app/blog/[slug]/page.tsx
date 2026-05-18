import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { BlogArticlePage } from '@/components/blog-article-page'
import { blogPosts, getBlogPostBySlug, getRedirectedBlogSlug } from '@/lib/blog-posts'
import { pageAlternates } from '@/lib/seo'

interface BlogArticleRouteProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogArticleRouteProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    const redirectedSlug = getRedirectedBlogSlug(slug)
    if (redirectedSlug) {
      return {
        alternates: pageAlternates(`/blog/${redirectedSlug}`, 'de'),
      }
    }
    return {
      title: 'Artikel nicht gefunden | Blog',
      description: 'Der angefragte Blogartikel wurde nicht gefunden.',
    }
  }

  const localized = post.content.de

  return {
    title: `${localized.title} | Blog`,
    description: localized.excerpt,
    alternates: pageAlternates(`/blog/${post.slug}`, 'de'),
    openGraph: {
      title: `${localized.title} | Blog`,
      description: localized.excerpt,
      url: `https://erstellen-websiten.de/blog/${post.slug}`,
      siteName: 'Vibe Studio',
      locale: 'de_DE',
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1600,
          height: 900,
          alt: localized.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${localized.title} | Blog`,
      description: localized.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogArticleRoute({ params }: BlogArticleRouteProps) {
  const { slug } = await params
  const redirectedSlug = getRedirectedBlogSlug(slug)
  if (redirectedSlug) {
    permanentRedirect(`/blog/${redirectedSlug}`)
  }

  if (!getBlogPostBySlug(slug)) {
    notFound()
  }

  return <BlogArticlePage slug={slug} />
}
