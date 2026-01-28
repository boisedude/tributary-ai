import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Workflow,
  Zap,
  Clock,
  TrendingDown,
  Users,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { BreadcrumbListSchema, AIAutomationServiceSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "AI Automation & Process Automation Services | Tributary AI",
  description:
    "AI automation and RPA services for mid-market companies. Process automation, AI agent deployment, and workflow optimization.",
  keywords: [
    "AI automation",
    "RPA",
    "robotic process automation",
    "AI agents",
    "workflow automation",
    "process automation",
    "AI deployment",
  ],
  openGraph: {
    title: "AI Automation & Process Automation Services | Tributary AI",
    description:
      "AI automation and RPA services. Process automation and AI agent deployment for mid-market companies.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/services/ai-automation/",
  },
};

const capabilities = [
  {
    title: "Process Automation",
    description:
      "Identify and automate repetitive workflows. Data entry, document processing, approval routing, report generation.",
    icon: Workflow,
  },
  {
    title: "AI Agent Deployment",
    description:
      "Deploy AI agents that handle customer inquiries, internal support tickets, scheduling, and routine decision-making.",
    icon: Bot,
  },
  {
    title: "System Integration",
    description:
      "Connect disparate systems with AI-powered middleware. Eliminate manual data transfer between applications.",
    icon: Zap,
  },
];

const outcomes = [
  {
    metric: "Hours Recovered",
    description: "Staff time freed from repetitive tasks",
    icon: Clock,
  },
  {
    metric: "Error Reduction",
    description: "Fewer mistakes from manual processes",
    icon: TrendingDown,
  },
  {
    metric: "Team Focus",
    description: "People doing work that matters",
    icon: Users,
  },
];

const useCases = [
  "Invoice processing and AP automation",
  "Customer onboarding workflows",
  "Employee request handling",
  "Data extraction from documents",
  "Report generation and distribution",
  "Cross-system data synchronization",
  "Email triage and routing",
  "Inventory and order management",
];

export default function AIAutomationPage() {
  return (
    <article className="bg-gradient-subtle">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://www.thetributary.ai" },
          { name: "Services", url: "https://www.thetributary.ai/services" },
          { name: "AI Automation", url: "https://www.thetributary.ai/services/ai-automation" },
        ]}
      />
      <AIAutomationServiceSchema />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
              Implementation Service
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              AI Automation & Deployment
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Turn assessment findings into working automation. We implement AI into your existing workflows—no rip-and-replace required.
            </p>
          </div>
          {/* Hero Image */}
          <div className="mx-auto max-w-4xl mt-12">
            <Image
              src="/images/ai-automation-hero.webp"
              alt="AI automation: manual tasks flowing through AI to deliver completed outputs and time reclaimed"
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
                Why Automate Now
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AI has made automation accessible in ways it wasn&apos;t before. Tasks that once required expensive custom development can now be handled by AI agents and modern RPA tools. The ROI timeline has compressed from years to months.
              </p>
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

      {/* Use Cases */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Common Use Cases</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                >
                  <span className="text-accent">•</span>
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Expected Outcomes</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {outcomes.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <div key={outcome.metric} className="text-center p-6">
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
                  <strong className="text-foreground">Pricing:</strong> Project-based, scoped after Assessment
                </p>
                <p>
                  <strong className="text-foreground">Timeline:</strong> Varies by scope—typically 4-12 weeks per automation
                </p>
                <p>
                  <strong className="text-foreground">Typical buyer:</strong> CIO, VP Operations, VP IT
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
                Not Sure Where to Start?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you already know what needs automating, we can jump straight to implementation. If you&apos;re not sure which processes to prioritize, The Assessment identifies the highest-impact opportunities and the right order to tackle them.
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
              Ready to Automate?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s discuss your automation opportunities and whether The Assessment is the right starting point.
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
