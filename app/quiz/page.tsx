import type { Metadata } from "next";
import Link from "next/link";
import { AIReadinessQuiz } from "@/components/interactive/ai-readiness-quiz";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Target, Lightbulb } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Readiness Quiz | Discover Your Foundation | Tributary AI",
  description:
    "Take our free 5-minute quiz to discover if your organization is ready for AI. Assess Data, Technology, People, Process, Governance, and Politics—the 6 dimensions that determine AI success.",
  keywords: [
    "AI readiness assessment",
    "AI readiness quiz",
    "AI implementation",
    "digital transformation",
    "AI strategy",
    "data readiness",
    "AI governance",
    "mid-market AI",
    "business AI assessment",
  ],
  openGraph: {
    title: "AI Readiness Quiz | Tributary AI",
    description:
      "5-minute quiz to discover if your organization is ready for AI. Get personalized recommendations across 6 dimensions including Data Readiness and AI Governance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Quiz | Tributary AI",
    description:
      "5-minute quiz to discover if your organization is ready for AI.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetributary.ai/quiz/",
  },
};

const benefits = [
  {
    icon: Clock,
    title: "5 Minutes",
    description: "Comprehensive yet respectful of your time",
  },
  {
    icon: Target,
    title: "18 Questions",
    description: "Covering Data, People, Process, Technology, Governance, and Politics",
  },
  {
    icon: Lightbulb,
    title: "Weighted Scoring",
    description: "Data-weighted results with dimension breakdown",
  },
];

export default function QuizPage() {
  return (
    <article className="bg-gradient-subtle min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-accent font-medium mb-4">Free Assessment</p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Most AI Projects Fail. Here&apos;s Why.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Companies that layer AI onto existing chaos struggle. Those that build on a solid foundation succeed. Take 5 minutes to explore your organization&apos;s readiness—and start a conversation about what needs to change.
            </p>

            {/* Benefits */}
            <div className="grid gap-4 sm:grid-cols-3 mt-10 mb-12">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-3">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <AIReadinessQuiz />
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Why This Quiz Matters
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold text-destructive mb-3">
                  Weak Foundation
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Scattered, inconsistent data no one trusts</li>
                  <li>Disconnected systems that don&apos;t talk to each other</li>
                  <li>Processes that live in people&apos;s heads</li>
                  <li>No AI governance or ethical guidelines</li>
                  <li>Leadership confusion about what AI can actually do</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-destructive">
                  Result: Expensive AI projects that fail to deliver value
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-accent/30">
                <h3 className="font-semibold text-accent mb-3">
                  Solid Foundation
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Clean, well-governed data ready for AI</li>
                  <li>Integrated systems with clear data flows</li>
                  <li>Documented, standardized processes</li>
                  <li>AI strategy aligned with business objectives</li>
                  <li>Aligned leadership with realistic expectations</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-accent">
                  Result: AI that actually multiplies your capabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Need to Strengthen Your Foundation?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              If your foundation isn&apos;t solid, we help you fix it. Our two-week Assessment shows exactly what needs to change—and gives you a roadmap to get there.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href={ROUTES.ASSESSMENT}>
                  Learn About The Assessment
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
