"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Search } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/blog"

const POSTS_PER_PAGE = 12;

/**
 * Props for the BlogList component.
 */
interface BlogListProps {
  /** Array of blog posts to display */
  posts: BlogPost[]
}

/**
 * Blog list component with search and "Show More" pagination.
 */
export function BlogList({ posts }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  // Reset visible count when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setVisibleCount(POSTS_PER_PAGE)
  }

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
              onChange={(e) => handleSearch(e.target.value)}
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
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <div key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group h-full">
                  <Card className="h-full overflow-hidden hover:border-accent transition-colors">
                    {post.image && (
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={338}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <CardTitle className="line-clamp-2 group-hover:text-accent transition-colors">
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

          {hasMore && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
              >
                Show More ({filteredPosts.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}
