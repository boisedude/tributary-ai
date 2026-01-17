import type { Metadata } from "next";
import Link from "next/link";
import { DownloadableGuide } from "@/components/lead-magnets/downloadable-guide";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free SaaS GTM Resources & Guides",
  description:
    "Download free guides for cloud marketplace GTM, SaaS go-to-market strategy, and agentic SaaS business models. Expert insights from Partner of the Year award winners.",
  keywords: [
    "free SaaS GTM resources",
    "cloud marketplace guide",
    "SaaS go-to-market checklist",
    "agentic SaaS guide",
    "marketplace launch guide",
    "SaaS GTM strategy resources",
    "co-sell program guide",
  ],
  openGraph: {
    title: "Free SaaS GTM Resources & Guides",
    description:
      "Download expert guides for cloud marketplace GTM, SaaS strategy, and agentic business models. Practical resources from marketplace experts.",
    type: "website",
  },
};

const guides = [
  {
    title: "Cloud Marketplace GTM Playbook",
    description:
      "Step-by-step guide for launching and scaling on AWS, Azure, and GCP marketplaces. Navigate listings, co-sell programs, private offers, and partner relationships.",
    pdfUrl: "/guides/cloud-marketplace-gtm-playbook.pdf",
  },
  {
    title: "Fractional GTM Leadership Guide",
    description:
      "When to hire fractional vs. full-time GTM leadership. Understand engagement models, success metrics, and how to maximize value from part-time executives.",
    pdfUrl: "/guides/fractional-gtm-leadership-guide.pdf",
  },
  {
    title: "Agentic SaaS Business Model Guide",
    description:
      "Navigate the shift from seat-based to outcome-based pricing. Understand how agentic AI changes SaaS economics and how to position your company.",
    pdfUrl: "/guides/agentic-saas-business-model-guide.pdf",
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
              Free GTM Resources & Guides
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Download expert guides to accelerate your SaaS go-to-market. No fluff, just
              practical insights from marketplace and GTM veterans.
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
              We believe SaaS GTM best practices should be accessible to every company. These
              guides represent real frameworks we use with clients every day. Our
              goal is to help you make informed decisions, whether you work
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
              Get a custom GTM strategy session tailored to your SaaS company.
              We&apos;ll analyze your specific situation and provide actionable
              recommendations.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Strategy Call
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
