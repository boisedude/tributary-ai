import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Users,
  Workflow,
  Server,
  Shield,
  FileText,
  Presentation,
  Map,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Assessment - Two-Week Diagnostic",
  description:
    "A two-week diagnostic that shows you exactly where you stand, what's holding you back, and what to change. Evaluates People, Process, Technology, and Politics. $25K-$35K with satisfaction guarantee.",
  keywords: [
    "AI assessment",
    "technology assessment",
    "digital transformation assessment",
    "organizational assessment",
    "IT assessment",
    "mid-market consulting",
  ],
  openGraph: {
    title: "The Assessment - Tributary AI",
    description:
      "A two-week diagnostic that shows you exactly where you stand, what's holding you back, and what to change.",
    type: "website",
  },
};

const dimensions = [
  {
    icon: Users,
    title: "People",
    items: [
      "Leadership AI fluency",
      "Cognitive load distribution",
      "Decision rights clarity",
      "Talent-to-work alignment",
    ],
  },
  {
    icon: Workflow,
    title: "Process",
    items: [
      "Intake-to-action gaps",
      "Coordination overhead",
      "Bottleneck visibility",
      "Process documentation",
    ],
  },
  {
    icon: Server,
    title: "Technology",
    items: [
      "Stack complexity",
      "Data accessibility",
      "Automation readiness",
      "Spend trajectory",
    ],
  },
  {
    icon: Shield,
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
    icon: FileText,
    title: "Findings Document",
    description: "Detailed assessment across all four dimensions",
  },
  {
    icon: Presentation,
    title: "Leadership Presentation",
    description: "For your executive team",
  },
  {
    icon: Map,
    title: "Scorecard + Roadmap",
    description: "Prioritized recommendations you can act on",
  },
];

export default function AssessmentPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
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
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6">
                  Why you need an outside perspective
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your team can&apos;t do this assessment. Not because they lack talent—because they&apos;re running the business. They don&apos;t have time to step back, they don&apos;t have visibility across functions, and they can&apos;t objectively recommend killing their own projects or restructuring their own teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Four Dimensions */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Four Dimensions
            </h2>

            {/* Assessment Process Diagram */}
            <div className="mb-12 overflow-hidden rounded-2xl">
              <Image
                src="/images/assessment-process.webp"
                alt="Assessment framework: People, Process, Technology, and Politics flowing into AI Readiness & Strategy"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {dimensions.map((dimension) => {
                const Icon = dimension.icon;
                return (
                  <Card key={dimension.title} className="card-glow-teal">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold">{dimension.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {dimension.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 mt-1 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Politics */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-accent/50">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-4">Why Politics?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Politics kills more transformations than bad technology. If your executives aren&apos;t aligned, or your last initiative left scars, it will have a direct impact on your project&apos;s chance of success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              What You Get
            </h2>

            {/* Deliverables Preview Image */}
            <div className="mb-12 overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/assessment-deliverables.webp"
                alt="Assessment deliverables: AI Readiness Assessment Report and Executive Summary presentation"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {deliverables.map((deliverable) => {
                const Icon = deliverable.icon;
                return (
                  <Card key={deliverable.title}>
                    <CardContent className="p-6 text-center">
                      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-accent/10 mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-2">{deliverable.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {deliverable.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-2">Pricing</h2>
                <p className="text-4xl font-bold text-accent mb-2">$25K - $35K</p>
                <p className="text-lg text-muted-foreground mb-6">2 weeks</p>
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-2">The Guarantee</h3>
                  <p className="text-muted-foreground">
                    If you&apos;re not satisfied, you don&apos;t pay.
                  </p>
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
