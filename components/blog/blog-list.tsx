"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Search } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/blog"

/**
 * Props for the BlogList component.
 */
interface BlogListProps {
  /** Array of blog posts to display */
  posts: BlogPost[]
}

/**
 * Blog list component with search functionality and animated cards.
 * Displays blog posts in a responsive grid with filtering by title, excerpt, and tags.
 *
 * @param {BlogListProps} props - Component props
 * @param {BlogPost[]} props.posts - Array of blog posts to display
 * @returns {JSX.Element} Searchable blog post grid
 *
 * @example
 * // Used in app/blog/page.tsx
 * const posts = await getAllBlogPosts();
 * <BlogList posts={posts} />
 *
 * @see {@link BlogPost} from lib/blog.ts for the post type definition
 * @see {@link BLOG_CONFIG} from lib/constants.ts for blog configuration
 */
export function BlogList({ posts }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">Insights & Analysis</h1>
        <p className="text-xl text-muted-foreground">
          AI strategy, systems thinking, and business transformation
        </p>

        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            {searchTerm ? "No posts found matching your search." : "No blog posts yet. Check back soon!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group h-full">
                <Card className="h-full overflow-hidden border-2 hover:border-accent transition-colors">
                  {post.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
