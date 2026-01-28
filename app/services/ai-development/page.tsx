import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Layers,
  Rocket,
  Shield,
  Code,
  Database,
  Cpu,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { BreadcrumbListSchema, AIDevelopmentServiceSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Custom AI Application Development | Tributary AI",
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
  },
  alternates: {
    canonical: "https://www.thetributary.ai/services/ai-development/",
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
          { name: "Home", url: "https://www.thetributary.ai" },
          { name: "Services", url: "https://www.thetributary.ai/services" },
          { name: "AI Development", url: "https://www.thetributary.ai/services/ai-development" },
        ]}
      />
      <AIDevelopmentServiceSchema />
      {/* Hero Section */}
      <section className="py-20">
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
          <div className="mx-auto max-w-4xl mt-12">
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
                  <strong className="text-foreground">Pricing:</strong> Project-based or monthly retainer, depending on scope
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
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
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
