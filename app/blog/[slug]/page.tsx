import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogArticlePage } from '@/components/blog-article-page'
import { blogPosts, getBlogPostBySlug } from '@/lib/blog-posts'

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
    return {
      title: 'Artikel nicht gefunden | Blog',
      description: 'Der angefragte Blogartikel wurde nicht gefunden.',
    }
  }

  return {
    title: `${post.content.de.title} | Blog`,
    description: post.seoDescription,
    openGraph: {
      title: `${post.content.de.title} | Blog`,
      description: post.seoDescription,
      url: `https://erstellen-websiten.de/blog/${post.slug}`,
      siteName: 'Vibe Studio',
      locale: 'de_DE',
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1600,
          height: 900,
          alt: post.content.de.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.content.de.title} | Blog`,
      description: post.seoDescription,
      images: [post.image],
    },
  }
}

export default async function BlogArticleRoute({ params }: BlogArticleRouteProps) {
  const { slug } = await params
  if (!getBlogPostBySlug(slug)) {
    notFound()
  }

  return <BlogArticlePage slug={slug} />
}
