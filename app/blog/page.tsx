import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/blog-list";
import { BlogListingSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "AI Strategy & Business Transformation Blog",
  description:
    "Expert insights on AI strategy, agentic systems, business transformation, and cloud marketplaces. Practical guidance for mid-market companies adopting AI. Latest trends in enterprise AI adoption and implementation.",
  keywords: [
    "AI strategy blog",
    "AI transformation insights",
    "agentic systems blog",
    "enterprise AI adoption",
    "AI implementation guide",
    "business AI strategy",
    "cloud marketplace insights",
  ],
  openGraph: {
    title: "AI Strategy & Transformation Blog - Tributary AI",
    description:
      "Expert insights on AI strategy, agentic systems, and business transformation. Practical guidance for companies adopting AI.",
    type: "website",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetributary.ai/blog/",
  },
};

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <article className="container mx-auto px-4 py-20">
      <BlogListingSchema />
      <BlogList posts={posts} />
    </article>
  )
}
