import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Cog,
  Code,
  Headphones,
} from "lucide-react";
import { ServiceSchema } from "@/components/structured-data/schemas";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Readiness Assessment | Technology Diagnostic | Tributary AI",
  description:
    "Two-week AI readiness diagnostic for mid-market companies. Evaluate People, Process, Technology, and Politics. $25K-$35K. Satisfaction guaranteed.",
  keywords: [
    "AI assessment",
    "AI readiness assessment",
    "technology assessment",
    "digital transformation assessment",
    "organizational assessment",
    "IT assessment",
    "mid-market consulting",
  ],
  openGraph: {
    title: "AI Readiness Assessment | Tributary AI",
    description:
      "Two-week diagnostic that shows you where you stand and what to change. Evaluates People, Process, Technology, and Politics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Assessment | Tributary AI",
    description: "Two-week diagnostic evaluating your organization's AI readiness across People, Process, Technology, and Politics.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetributary.ai/assessment/",
  },
};

const dimensions = [
  {
    title: "People",
    items: [
      "Leadership AI fluency",
      "Cognitive load distribution",
      "Decision rights clarity",
      "Talent-to-work alignment",
    ],
  },
  {
    title: "Process",
    items: [
      "Intake-to-action gaps",
      "Coordination overhead",
      "Bottleneck visibility",
      "Process documentation",
    ],
  },
  {
    title: "Technology",
    items: [
      "Stack complexity",
      "Data accessibility",
      "Automation readiness",
      "Spend trajectory",
    ],
  },
  {
    title: "Politics",
    items: [
      "Executive alignment",
      "Change sponsorship",
      "Turf risk",
      "Prior initiative trauma",
    ],
  },
];

const deliverables = [
  {
    title: "Findings Document",
    description: "Detailed assessment across all four dimensions",
  },
  {
    title: "Leadership Presentation",
    description: "For your executive team",
  },
  {
    title: "Scorecard + Roadmap",
    description: "Prioritized recommendations you can act on",
  },
];

export default function AssessmentPage() {
  return (
    <article className="bg-gradient-subtle">
      <ServiceSchema />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              The Assessment
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              A two-week diagnostic that shows you exactly where you stand, what&apos;s holding you back, and what to change.
            </p>
          </div>
        </div>
      </section>

      {/* Why External Assessment */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">
                Why you need an outside perspective
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your team can&apos;t do this assessment. Not because they lack talent—because they&apos;re running the business. They don&apos;t have time to step back, they don&apos;t have visibility across functions, and they can&apos;t objectively recommend killing their own projects or restructuring their own teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Dimensions */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">
              Four Dimensions
            </h2>

            {/* Assessment Process Diagram */}
            <div className="mb-12 overflow-hidden rounded-lg">
              <Image
                src="/images/assessment-process.webp"
                alt="Assessment framework: People, Process, Technology, and Politics flowing into AI Readiness & Strategy"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {dimensions.map((dimension) => (
                <div key={dimension.title} className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">{dimension.title}</h3>
                  <ul className="space-y-2">
                    {dimension.items.map((item) => (
                      <li key={item} className="text-muted-foreground">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Politics */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Why Politics?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Politics kills more transformations than bad technology. If your executives aren&apos;t aligned, or your last initiative left scars, it will have a direct impact on your project&apos;s chance of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">
              What You Get
            </h2>

            {/* Deliverables Preview Image */}
            <div className="mb-12 overflow-hidden rounded-lg">
              <Image
                src="/images/assessment-deliverables.webp"
                alt="Assessment deliverables: AI Readiness Assessment Report and Executive Summary presentation"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {deliverables.map((deliverable) => (
                <div key={deliverable.title} className="border rounded-lg p-6 bg-background">
                  <h3 className="font-semibold mb-2">{deliverable.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {deliverable.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="border rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2">Pricing</h2>
              <p className="text-4xl font-bold text-accent mb-2">$25K - $35K</p>
              <p className="text-lg text-muted-foreground mb-6">2 weeks</p>
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">The Guarantee</h3>
                <p className="text-muted-foreground">
                  If you&apos;re not satisfied, you don&apos;t pay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              After The Assessment, you&apos;ll have a clear roadmap. Many clients choose to continue with implementation—but there&apos;s no obligation. Here are the paths we can help with:
            </p>
            <div className="grid gap-4">
              <Link
                href={ROUTES.AI_AUTOMATION}
                className="group flex items-start gap-4 border rounded-lg p-6 transition-all hover:border-accent hover:shadow-md"
              >
                <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent">
                  <Cog className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    AI Automation & Deployment
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implement AI into existing workflows. RPA, process automation, AI agent deployment.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
              <Link
                href={ROUTES.AI_DEVELOPMENT}
                className="group flex items-start gap-4 border rounded-lg p-6 transition-all hover:border-accent hover:shadow-md"
              >
                <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent">
                  <Code className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    AI Application Development
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Custom AI-powered applications. Internal tools, customer-facing products.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
              <Link
                href={ROUTES.MANAGED_SERVICES}
                className="group flex items-start gap-4 border rounded-lg p-6 transition-all hover:border-accent hover:shadow-md"
              >
                <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent">
                  <Headphones className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    Managed Services
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ongoing IT management, cloud administration, fractional CTO/CIO advisory.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Get Clarity?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s have a conversation about your situation and whether The Assessment is the right starting point.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Call
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
