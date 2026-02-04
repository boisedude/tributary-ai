/**
 * Generates RSS feed (public/feed.xml) from blog posts.
 * Run before build to ensure the feed is included in static export.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://www.thetributary.ai";
const COMPANY_NAME = "Tributary AI";

const postsDirectory = path.join(process.cwd(), "content/blog");
const outputPath = path.join(process.cwd(), "public/feed.xml");

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, fileName),
        "utf8"
      );
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        author: data.author || COMPANY_NAME,
        tags: data.tags || [],
        image: data.image,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss() {
  const posts = getAllPosts();
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString();
      const link = `${SITE_URL}/blog/${post.slug}/`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
${categories}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${COMPANY_NAME} Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Expert insights on AI strategy, agentic systems, business transformation, and cloud marketplaces.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(outputPath, rss, "utf8");
  console.log(`RSS feed generated: ${outputPath} (${posts.length} posts)`);
}

generateRss();
