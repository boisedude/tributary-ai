import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
  tags?: string[]
  author?: string
  image?: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        content,
        readingTime: readingTime(content).text,
        tags: data.tags || [],
        author: data.author || "Tributary AI Systems",
        image: data.image,
      } as BlogPost
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content,
      readingTime: readingTime(content).text,
      tags: data.tags || [],
      author: data.author || "Tributary AI Systems",
      image: data.image,
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags)
}
