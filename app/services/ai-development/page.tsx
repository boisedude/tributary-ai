import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Layers,
  Rocket,
  Database,
  Cpu,
} from "lucide-react";
import { ROUTES, SITE_URL } from "@/lib/constants";
import { BreadcrumbListSchema, AIDevelopmentServiceSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Custom AI Application Development",
  description:
    "Custom AI-powered applications for mid-market companies. Internal tools, customer-facing products, LLM integration. Prototype to production.",
  keywords: [
    "AI application development",
    "custom AI software",
    "AI product development",
    "internal AI tools",
    "AI-powered applications",
    "LLM applications",
  ],
  openGraph: {
    title: "Custom AI Application Development | Tributary AI",
    description:
      "Custom AI-powered applications for mid-market companies. From prototype to production.",
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
    title: "Custom AI Application Development | Tributary AI",
    description:
      "Custom AI-powered applications for mid-market companies. From prototype to production.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/services/ai-development/`,
  },
};

const capabilities = [
  {
    title: "Internal Tools",
    description:
      "Custom applications for your team. Knowledge bases, decision support systems, workflow tools, reporting dashboards with AI-powered insights.",
    icon: Layers,
  },
  {
    title: "Customer-Facing Products",
    description:
      "AI features for your products. Chatbots, recommendation engines, intelligent search, content generation, personalization.",
    icon: Rocket,
  },
  {
    title: "Data & AI Infrastructure",
    description:
      "The foundation for AI applications. Data pipelines, model deployment, monitoring, and the architecture to scale.",
    icon: Database,
  },
];

const techAreas = [
  {
    category: "AI/ML",
    items: ["LLM integration", "RAG systems", "Fine-tuning", "Embeddings", "Agent frameworks"],
  },
  {
    category: "Application",
    items: ["Web applications", "APIs", "Mobile backends", "Admin dashboards", "Integrations"],
  },
  {
    category: "Infrastructure",
    items: ["Cloud architecture", "Data pipelines", "CI/CD", "Monitoring", "Security"],
  },
];

const processSteps = [
  {
    step: "1",
    title: "Discovery",
    description: "Understand the problem, users, and constraints. Define success criteria.",
  },
  {
    step: "2",
    title: "Prototype",
    description: "Build a working proof of concept. Validate assumptions with real users.",
  },
  {
    step: "3",
    title: "Build",
    description: "Develop the production application with proper architecture and testing.",
  },
  {
    step: "4",
    title: "Launch & Iterate",
    description: "Deploy, monitor, and improve based on real-world usage.",
  },
];

export default function AIDevelopmentPage() {
  return (
    <article className="bg-gradient-subtle">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: "AI Development", url: `${SITE_URL}/services/ai-development` },
        ]}
      />
      <AIDevelopmentServiceSchema />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb
          items={[
            { label: "Services", href: ROUTES.SERVICES },
            { label: "AI Development" },
          ]}
        />
      </div>
      {/* Hero Section */}
      <section className="py-20 pt-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
              Implementation Service
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              AI Application Development
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Custom AI-powered applications. Internal tools, customer-facing products. From prototype to production.
            </p>
          </div>
          {/* Hero Image */}
          <div className="mx-auto max-w-2xl mt-12">
            <Image
              src="/images/ai-development-hero.webp"
              alt="AI development process: Discovery, Prototype, Build, Launch"
              width={1200}
              height={675}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Build vs. Buy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Off-the-shelf AI tools solve generic problems. Your competitive advantage comes from AI applications tailored to your specific workflows, data, and customers. We build those applications—faster and cheaper than you&apos;d expect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">What We Build</h2>
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

      {/* Tech Areas */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Technology Areas</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {techAreas.map((area) => (
                <div key={area.category} className="bg-background rounded-lg border p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-accent" />
                    {area.category}
                  </h3>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">•</span>
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

      {/* Process */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Our Process</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step) => (
                <div key={step.step} className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm">
                      {step.step}
                    </span>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
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
                  <strong className="text-foreground">Pricing:</strong> $55K - $165K, scoped after Assessment
                </p>
                <p>
                  <strong className="text-foreground">Timeline:</strong> Prototypes in 2-4 weeks; production apps in 2-4 months
                </p>
                <p>
                  <strong className="text-foreground">Typical buyer:</strong> CTO, VP Product, VP Engineering
                </p>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  Our heavy use of AI tooling allows us to deliver these services at a fraction of the usual cost.
                </p>
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
                href="/blog/build-vs-buy-ai-decision-guide"
                className="group p-4 border rounded-lg hover:border-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  The Build vs. Buy Trap
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A mid-market guide to AI investment decisions
                </p>
              </Link>
              <Link
                href="/blog/ai-isnt-one-thing-decision-framework"
                className="group p-4 border rounded-lg hover:border-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  AI Isn&apos;t One Thing
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A decision framework for LLMs, RPA, and ML
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisite */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Have a Clear Vision?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you know what you want to build, let&apos;s talk scope and timeline. If you&apos;re still exploring what&apos;s possible, The Assessment helps clarify your data landscape, existing systems, and organizational readiness—so we build the right thing.
              </p>
              <Button asChild variant="outline" className="group">
                <Link href={ROUTES.ASSESSMENT}>
                  Learn About The Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Have a Product Idea?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s discuss your vision and whether The Assessment is the right starting point.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/quiz">
                  Get Your AI Readiness Score
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Strategy Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
