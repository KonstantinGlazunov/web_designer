import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { BlogArticlePage } from '@/components/blog-article-page'
import { blogPosts, getBlogPostBySlug, getRedirectedBlogSlug } from '@/lib/blog-posts'
import { pageAlternates } from '@/lib/seo'

interface RuBlogArticleRouteProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: RuBlogArticleRouteProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    const redirectedSlug = getRedirectedBlogSlug(slug)
    if (redirectedSlug) {
      return {
        alternates: pageAlternates(`/blog/${redirectedSlug}`, 'ru'),
      }
    }
    return {
      title: 'Статья не найдена | Блог',
      description: 'Запрошенная статья не найдена.',
    }
  }

  return {
    title: `${post.content.ru.title} | Блог`,
    description: post.seoDescription,
    alternates: pageAlternates(`/blog/${post.slug}`, 'ru'),
    openGraph: {
      title: `${post.content.ru.title} | Блог`,
      description: post.seoDescription,
      url: `https://erstellen-websiten.de/ru/blog/${post.slug}`,
      siteName: 'Vibe Studio',
      locale: 'ru_RU',
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1600,
          height: 900,
          alt: post.content.ru.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.content.ru.title} | Блог`,
      description: post.seoDescription,
      images: [post.image],
    },
  }
}

export default async function RuBlogArticleRoute({ params }: RuBlogArticleRouteProps) {
  const { slug } = await params
  const redirectedSlug = getRedirectedBlogSlug(slug)
  if (redirectedSlug) {
    permanentRedirect(`/ru/blog/${redirectedSlug}`)
  }

  if (!getBlogPostBySlug(slug)) {
    notFound()
  }

  return <BlogArticlePage slug={slug} />
}
