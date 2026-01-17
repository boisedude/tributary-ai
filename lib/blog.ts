/**
 * @fileoverview Blog post utilities for reading and parsing MDX blog content.
 * Handles loading blog posts from the content/blog directory, parsing frontmatter,
 * and calculating reading time.
 *
 * @example
 * // Get all posts for the blog listing page
 * const posts = getAllPosts();
 *
 * // Get a single post by slug
 * const post = getPostBySlug('my-post-slug');
 *
 * // Get all unique tags
 * const tags = getAllTags();
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

/** Directory where blog MDX files are stored */
const postsDirectory = path.join(process.cwd(), "content/blog")

/**
 * Blog post data structure returned by the blog utilities.
 * Matches the frontmatter schema expected in MDX files.
 */
export interface BlogPost {
  /** URL-friendly identifier derived from filename */
  slug: string
  /** Post title from frontmatter */
  title: string
  /** Publication date in ISO format */
  date: string
  /** Short description for listings and SEO */
  excerpt: string
  /** Raw MDX content (without frontmatter) */
  content: string
  /** Estimated reading time (e.g., "5 min read") */
  readingTime: string
  /** Optional categorization tags */
  tags?: string[]
  /** Post author name */
  author?: string
  /** Featured image path */
  image?: string
}

/**
 * Retrieves all blog posts sorted by date (newest first).
 *
 * @returns {BlogPost[]} Array of all blog posts with parsed frontmatter
 *
 * @example
 * const posts = getAllPosts();
 * // Returns: [{ slug: 'latest-post', title: '...', ... }, ...]
 */
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

/**
 * Retrieves a single blog post by its URL slug.
 *
 * @param {string} slug - The URL-friendly identifier (filename without .mdx extension)
 * @returns {BlogPost | null} The blog post data, or null if not found
 *
 * @example
 * const post = getPostBySlug('ai-implementation-guide');
 * if (post) {
 *   console.log(post.title); // "AI Implementation Guide"
 * }
 */
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

/**
 * Extracts all unique tags from all blog posts.
 *
 * @returns {string[]} Array of unique tag strings
 *
 * @example
 * const tags = getAllTags();
 * // Returns: ["AI", "SaaS", "GTM Strategy", ...]
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags)
}
