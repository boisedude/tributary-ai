import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Brain,
  Scale,
  Handshake,
  Cog,
  Eye,
  Lightbulb,
  Target,
  Settings,
  Zap,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Ready Operating Model Assessment",
  description:
    "Assess your organization's readiness for the age of abundant cognition. Our AI-Ready Operating Model framework helps organizations move from fragmented operations to leverage-optimized performance through structured transformation phases.",
  keywords: [
    "AI readiness assessment",
    "operating model transformation",
    "organizational AI strategy",
    "AI maturity model",
    "cognitive transformation",
    "enterprise AI adoption",
    "AI operating model",
    "decision optimization",
    "organizational performance",
  ],
  openGraph: {
    title: "AI-Ready Operating Model Assessment - Tributary AI",
    description:
      "Assess your organization's readiness for the age of abundant cognition. Move from fragmented operations to leverage-optimized performance.",
    type: "website",
  },
};

// Four Functional Layers of Work
const functionalLayers = [
  {
    icon: Brain,
    title: "Tokenizable Cognition",
    subtitle: "Understanding",
    description:
      "Converting raw information into shared understanding. This is where AI excels - processing, synthesizing, and structuring information at scale.",
  },
  {
    icon: Scale,
    title: "Judgment",
    subtitle: "Decision-Making",
    description:
      "Choosing among options under uncertainty. The layer where human expertise combines with AI insights to make better, faster decisions.",
  },
  {
    icon: Handshake,
    title: "Commitment",
    subtitle: "Obligation Creation",
    description:
      "Making binding decisions that allocate resources. Where authority meets accountability and organizations create obligations.",
  },
  {
    icon: Cog,
    title: "Production/Execution",
    subtitle: "Doing",
    description:
      "Turning decisions into outcomes. The final layer where strategy becomes reality through coordinated action.",
  },
];

// Transformation Phases
const transformationPhases = [
  {
    phase: 0,
    icon: Eye,
    title: "Cognitive Access",
    description: "Establish organizational visibility",
    details:
      "Build the foundation for AI-enabled operations by creating visibility into how information flows, decisions are made, and work gets done.",
  },
  {
    phase: 1,
    icon: Lightbulb,
    title: "Tokenizable Cognition Enablement",
    description: "Turn information into continuous understanding",
    details:
      "Enable AI systems to process and synthesize organizational information, creating real-time understanding that was previously impossible.",
  },
  {
    phase: 2,
    icon: Target,
    title: "Bottleneck Visibility",
    description: "Expose where performance actually breaks down",
    details:
      "Identify the true constraints on organizational performance - often hidden in decision-making delays, information gaps, or coordination failures.",
  },
  {
    phase: 3,
    icon: Settings,
    title: "Operating Model Redesign",
    description: "Redesign authority, roles, and flow",
    details:
      "Restructure how decisions are made, who has authority, and how work flows through the organization to leverage AI capabilities.",
  },
  {
    phase: 4,
    icon: Zap,
    title: "AI Leverage & Automation",
    description: "Convert AI capability into sustained advantage",
    details:
      "Deploy AI systems that continuously improve organizational performance, automating routine cognition while amplifying human judgment.",
  },
];

// Maturity Model Levels
const maturityLevels = [
  {
    level: 1,
    title: "Fragmented",
    characteristics: [
      "Siloed information across departments",
      "Meeting-dependent coordination",
      "Decisions bottlenecked at key individuals",
      "Tribal knowledge dominates",
    ],
    color: "border-red-500/30 bg-red-500/5",
  },
  {
    level: 2,
    title: "Digitized",
    characteristics: [
      "Modern SaaS tools in place",
      "Delayed reporting and dashboards",
      "Data exists but is hard to access",
      "Process documentation incomplete",
    ],
    color: "border-orange-500/30 bg-orange-500/5",
  },
  {
    level: 3,
    title: "Cognitively Enabled",
    characteristics: [
      "Leaders can query the organization directly",
      "Information flows without manual aggregation",
      "Real-time visibility into operations",
      "AI assists with analysis and synthesis",
    ],
    color: "border-yellow-500/30 bg-yellow-500/5",
  },
  {
    level: 4,
    title: "Decision-Optimized",
    characteristics: [
      "Visible bottlenecks and decision rights",
      "Explicit authority structures",
      "Measured decision latency",
      "Continuous process improvement",
    ],
    color: "border-teal-500/30 bg-teal-500/5",
  },
  {
    level: 5,
    title: "Leverage-Optimized",
    characteristics: [
      "System-driven coordination",
      "Automation-first mindset",
      "Humans focus on judgment and commitment",
      "AI handles tokenizable cognition at scale",
    ],
    color: "border-accent/30 bg-accent/10",
  },
];

// Assessment deliverables
const deliverables = [
  "Comprehensive AI readiness scorecard across all four functional layers",
  "Current-state maturity assessment with evidence-based level determination",
  "Transformation roadmap with prioritized phases and milestones",
  "Bottleneck analysis identifying your top 5 performance constraints",
  "Operating model recommendations for authority, roles, and workflows",
  "90-day quick wins to demonstrate value and build momentum",
];

export default function AIReadinessPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: "Services", href: "/services" },
                { label: "AI-Ready Operating Model" },
              ]}
            />
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
              <Brain className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              AI-Ready Operating Model
            </h1>
            <p className="mt-6 text-xl font-medium text-accent sm:text-2xl">
              Prepare your organization for the age of abundant cognition.
            </p>

            {/* Core Thesis */}
            <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-6">
              <p className="text-lg italic text-foreground">
                &quot;Cognition is no longer scarce. 2026 marks a structural
                break: AI has removed thinking as the primary constraint on
                organizational performance. Most organizations are not ready for
                this shift.&quot;
              </p>
            </div>

            <p className="mt-6 text-lg text-muted-foreground">
              The organizations that thrive in the coming decade will be those
              that redesign their operating models around abundant AI cognition.
              Our assessment helps you understand where you are, where you need
              to go, and how to get there.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Book Your Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Functional Layers Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                The Four Functional Layers of Work
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Understanding where AI can amplify performance requires mapping
                how work actually happens.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {functionalLayers.map((layer, idx) => {
                const Icon = layer.icon;
                return (
                  <Card key={idx} className="card-glow-teal">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{layer.title}</CardTitle>
                        <p className="text-sm font-medium text-accent">
                          {layer.subtitle}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{layer.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Phases Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                The Transformation Journey
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A structured path from current state to AI-optimized operations.
              </p>
            </div>

            {/* Timeline visualization */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent/20 md:left-1/2 md:block md:-translate-x-1/2" />

              <div className="space-y-8">
                {transformationPhases.map((phase, idx) => {
                  const Icon = phase.icon;
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } items-center gap-4 md:gap-8`}
                    >
                      {/* Content */}
                      <div
                        className={`w-full md:w-5/12 ${
                          isEven ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <Card className="card-glow-teal">
                          <CardHeader>
                            <div
                              className={`flex items-center gap-3 ${
                                isEven ? "md:flex-row-reverse" : ""
                              }`}
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                                <span className="text-sm font-bold">
                                  {phase.phase}
                                </span>
                              </div>
                              <CardTitle className="text-lg">
                                {phase.title}
                              </CardTitle>
                            </div>
                            <p className="text-sm font-medium text-accent">
                              {phase.description}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {phase.details}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Center icon (desktop) */}
                      <div className="relative z-10 hidden md:flex">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-accent/10">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                      </div>

                      {/* Spacer for opposite side */}
                      <div className="hidden w-5/12 md:block" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maturity Model Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                The 5-Level Maturity Model
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Where is your organization today? Most companies are stuck at
                Level 1 or 2.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              {maturityLevels.map((level) => (
                <Card
                  key={level.level}
                  className={`relative overflow-hidden border-2 ${level.color}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold">
                        {level.level}
                      </span>
                      <CardTitle className="text-base">{level.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {level.characteristics.map((char, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-muted-foreground"
                        >
                          {char}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                What You Get
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A comprehensive assessment with actionable insights and a clear
                path forward.
              </p>
            </div>

            <Card className="card-glow-teal">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">Ideal For</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Organizations currently operating at <strong>Level 1 (Fragmented)</strong> or{" "}
                  <strong>Level 2 (Digitized)</strong> who recognize that AI represents a
                  fundamental shift in how organizations can operate. If your company
                  still depends on meetings for coordination, has information trapped in
                  silos, or struggles with decision-making bottlenecks, this assessment
                  will show you the path to becoming AI-ready.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <h4 className="font-semibold">Common Signs You Need This:</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Decisions wait for the next meeting</li>
                      <li>Same questions asked repeatedly</li>
                      <li>Information lives in people&apos;s heads</li>
                      <li>Reports are always out of date</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <h4 className="font-semibold">Best Fit Companies:</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>50-500 employees</li>
                      <li>Series A through growth stage</li>
                      <li>Knowledge-intensive operations</li>
                      <li>Leadership committed to change</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Assess Your AI Readiness?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Book a consultation to discuss your organization&apos;s current state
              and how we can help you prepare for the age of abundant cognition.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Book Your Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
