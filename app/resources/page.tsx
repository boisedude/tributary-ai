import type { Metadata } from "next";
import Link from "next/link";
import { DownloadableGuide } from "@/components/lead-magnets/downloadable-guide";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Resources & Guides | Tributary AI",
  description:
    "Download free guides and resources for AI adoption, agentic systems, and cloud marketplace strategies. Expert insights from Tributary AI Systems. AI readiness checklists, implementation guides, and strategic frameworks.",
  keywords: [
    "free AI resources",
    "AI adoption guides",
    "AI readiness checklist",
    "agentic systems guide",
    "cloud marketplace guide",
    "AI strategy resources",
    "AI implementation resources",
  ],
  openGraph: {
    title: "Free AI Resources & Implementation Guides",
    description:
      "Download expert guides for AI adoption, agentic systems, and cloud marketplace strategies. Practical resources for your AI journey.",
    type: "website",
  },
};

const guides = [
  {
    title: "AI Readiness Checklist",
    description:
      "A comprehensive checklist to assess your organization's readiness for AI adoption. Evaluate your data infrastructure, team capabilities, and strategic alignment.",
    pdfUrl: "/guides/ai-readiness-checklist.pdf",
  },
  {
    title: "Agentic Systems Primer",
    description:
      "Understand the fundamentals of outcome-based AI systems. Learn how autonomous agents differ from traditional automation and when to implement them.",
    pdfUrl: "/guides/agentic-systems-primer.pdf",
  },
  {
    title: "Cloud Marketplace Launch Guide",
    description:
      "Step-by-step guide for launching your SaaS product on AWS, Azure, and GCP marketplaces. Navigate technical requirements, pricing strategies, and go-to-market approaches.",
    pdfUrl: "/guides/cloud-marketplace-launch-guide.pdf",
  },
];

export default function ResourcesPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Free AI Resources & Guides
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Download expert guides to accelerate your AI journey. No fluff, just
              practical insights from real-world implementations.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <DownloadableGuide
                key={guide.title}
                title={guide.title}
                description={guide.description}
                pdfUrl={guide.pdfUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why We Share These Resources
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe AI adoption should be accessible to every business. These
              guides represent real frameworks we use with clients every day. Our
              goal is to help you make informed decisions about AI, whether you work
              with us or not.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready for Personalized Guidance?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Get a custom AI readiness assessment tailored to your business.
              We&apos;ll analyze your specific situation and provide actionable
              recommendations.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/assessment">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
