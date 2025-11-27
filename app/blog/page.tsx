import { getAllPosts } from "@/lib/blog"
import { BlogList } from "@/components/blog/blog-list"

export const metadata = {
  title: "Blog | Tributary AI Systems",
  description: "Insights on AI strategy, systems thinking, and business transformation from Tributary AI Systems",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <article className="container mx-auto px-4 py-20">
      <BlogList posts={posts} />
    </article>
  )
}
