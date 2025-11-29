import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"
import { BlogPostSchema } from "@/components/structured-data/schemas"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Tributary AI Systems`,
    description: post.excerpt,
    keywords: post.tags?.join(", "),
    authors: [{ name: post.author || "Tributary AI Systems" }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      siteName: 'Tributary AI Systems',
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      publishedTime: post.date,
      authors: [post.author || 'Tributary AI Systems'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts based on shared tags
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p =>
      p.slug !== post.slug &&
      p.tags?.some(tag => post.tags?.includes(tag))
    )
    .slice(0, 2)

  return (
    <article className="container mx-auto px-4 py-20">
      <BlogPostSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author || "Tributary AI Systems"}
        image={post.image}
        url={`https://www.thetributary.ai/blog/${post.slug}`}
      />
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]}
        />

        <header className="mb-12">
          {post.image && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={675}
                className="h-full w-full object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          )}

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeHighlight,
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t pt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Related Posts</h2>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View all posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                    {relatedPost.image && (
                      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-teal-500/20">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          width={600}
                          height={338}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {relatedPost.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{relatedPost.readingTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
