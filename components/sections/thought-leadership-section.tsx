import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Radio, ExternalLink } from "lucide-react";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { EXTERNAL_LINKS } from "@/lib/constants";

/**
 * Thought Leadership section - displays latest blog posts and podcast.
 * Positions Tributary as an authority in AI strategy.
 */
export function ThoughtLeadershipSection() {
  // Get latest 3 blog posts
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-4">
              Insights & Resources
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ongoing Thought Leadership
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical insights on AI strategy, agentic systems, and business transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Latest Blog Posts - 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold mb-4">Latest Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {latestPosts.slice(0, 2).map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
              {latestPosts[2] && (
                <BlogPostCard post={latestPosts[2]} />
              )}
              <div className="pt-4">
                <Button asChild variant="outline" className="group">
                  <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Podcast Feature - 1 column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Featured Podcast</h3>
              <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Radio className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Agentic SaaS Talks</CardTitle>
                      <CardDescription>Weekly insights</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Exploring the future of AI-powered business—from agentic systems
                    to the shifting landscape of enterprise software.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AI Strategy</Badge>
                    <Badge variant="secondary">SaaS</Badge>
                    <Badge variant="secondary">Agentic AI</Badge>
                  </div>
                  <Button asChild className="w-full group bg-accent hover:bg-accent/90">
                    <a
                      href={EXTERNAL_LINKS.PODCAST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual blog post card component.
 */
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full overflow-hidden hover:border-accent transition-colors">
        {post.image && (
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={225}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-base line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
