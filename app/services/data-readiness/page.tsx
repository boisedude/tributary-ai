import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Database,
  GitMerge,
  Shield,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { ROUTES, SITE_URL } from "@/lib/constants";
import { BreadcrumbListSchema, DataReadinessServiceSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Data Readiness Services | Clean Data for AI",
  description:
    "Get your data AI-ready. Data quality assessment, consolidation, governance, and integration services for mid-market companies preparing for AI implementation.",
  keywords: [
    "data readiness",
    "data quality",
    "data governance",
    "data consolidation",
    "AI data preparation",
    "data integration",
    "single source of truth",
    "data architecture",
  ],
  openGraph: {
    title: "Data Readiness Services | Clean Data for AI | Tributary AI",
    description:
      "Get your data AI-ready. Data quality, consolidation, and governance services for companies preparing for AI.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tributary AI - Technology Consulting for the AI Era",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Readiness Services | Clean Data for AI | Tributary AI",
    description:
      "Get your data AI-ready. Data quality, consolidation, and governance services for companies preparing for AI.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/services/data-readiness/`,
  },
};

const capabilities = [
  {
    title: "Data Quality Assessment",
    description:
      "Audit your data across systems. Identify inconsistencies, duplicates, gaps, and quality issues that would undermine AI initiatives.",
    icon: Search,
  },
  {
    title: "Data Consolidation",
    description:
      "Integrate fragmented data sources into a single source of truth. Eliminate silos and establish reliable data flows between systems.",
    icon: GitMerge,
  },
  {
    title: "Data Governance",
    description:
      "Establish ownership, access controls, and data standards. Create policies that ensure data quality and compliance over time.",
    icon: Shield,
  },
];

const outcomes = [
  {
    metric: "Single Source of Truth",
    description: "Consistent answers across all systems",
    icon: Database,
  },
  {
    metric: "AI-Ready Data",
    description: "Clean, structured data for analytics and AI",
    icon: CheckCircle,
  },
  {
    metric: "Reduced Risk",
    description: "Clear ownership and governance policies",
    icon: Shield,
  },
];

const warningSignsLeft = [
  "Different systems give different answers to the same question",
  "You spend more time cleaning data than analyzing it",
  "No one knows which data source to trust",
  "Data quality issues have caused costly mistakes",
];

const warningSignsRight = [
  "Key data lives in spreadsheets on individual computers",
  "Customer records are duplicated across multiple systems",
  "You can't answer basic business questions without manual work",
  "Past AI or analytics projects failed due to data issues",
];

export default function DataReadinessPage() {
  return (
    <article className="bg-gradient-subtle">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: "Data Readiness", url: `${SITE_URL}/services/data-readiness` },
        ]}
      />
      <DataReadinessServiceSchema />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb
          items={[
            { label: "Services", href: ROUTES.SERVICES },
            { label: "Data Readiness" },
          ]}
        />
      </div>
      {/* Hero Section */}
      <section className="py-20 pt-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
              Foundation Service
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Data Readiness
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              AI built on bad data fails. We help you consolidate, clean, and govern your data—creating the foundation that makes AI actually work.
            </p>
          </div>
          {/* Hero Image */}
          <div className="mx-auto max-w-2xl mt-12">
            <Image
              src="/images/data-readiness-hero.webp"
              alt="Data transformation: scattered data sources consolidated into unified, structured data"
              width={1200}
              height={675}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Data First */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Why Data Comes First
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                95% of AI projects that fail cite data quality as a primary factor. You can have the best AI models in the world, but if they&apos;re trained on inconsistent, incomplete, or siloed data, they&apos;ll produce garbage. Data readiness isn&apos;t a prerequisite for AI—it&apos;s the prerequisite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-start gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <h2 className="text-2xl font-bold">Warning Signs You Need Data Work</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <ul className="space-y-3">
                  {warningSignsLeft.map((sign) => (
                    <li key={sign} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {warningSignsRight.map((sign) => (
                    <li key={sign} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">What We Do</h2>
            <div className="grid gap-6">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <div
                    key={capability.title}
                    className="border rounded-lg p-6 flex gap-4"
                  >
                    <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent h-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Expected Outcomes</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {outcomes.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <div key={outcome.metric} className="text-center p-6 bg-background rounded-lg border">
                    <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{outcome.metric}</h3>
                    <p className="text-sm text-muted-foreground">
                      {outcome.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Engagement Model</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Pricing:</strong> $25K - $50K, scoped after Assessment
                </p>
                <p>
                  <strong className="text-foreground">Timeline:</strong> Varies by scope—typically 4-12 weeks for initial consolidation
                </p>
                <p>
                  <strong className="text-foreground">Typical buyer:</strong> CIO, VP IT, VP Operations, CDO
                </p>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  Data readiness work often reveals opportunities for immediate cost savings through system consolidation and elimination of redundant tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to AI */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                The Path to AI Success
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Data readiness closes the gap between diagnosis and solution. After The Assessment identifies your data challenges, this service addresses them—creating the foundation for successful AI implementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="group">
                  <Link href={ROUTES.ASSESSMENT}>
                    Learn About The Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="group">
                  <Link href={ROUTES.AI_AUTOMATION}>
                    See AI Automation Services
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Learn More</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/blog/why-ai-projects-fail-data-architecture"
                className="group p-4 border rounded-lg hover:border-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  Why AI Projects Fail: Data Architecture
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The hidden data problems that doom AI initiatives
                </p>
              </Link>
              <Link
                href="/blog/data-quality-for-ai-quick-wins"
                className="group p-4 border rounded-lg hover:border-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  Data Quality Quick Wins
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Fast improvements that prepare your data for AI
                </p>
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
              Ready to Fix Your Data?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Take our quiz to see where your data stands, or book a call to discuss your specific situation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={ROUTES.QUIZ}>
                  Get Your AI Readiness Score
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
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
