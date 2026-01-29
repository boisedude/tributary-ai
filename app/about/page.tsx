import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Users, Target, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tributary AI | AI Consulting for Mid-Market Companies",
  description:
    "Tributary AI helps mid-market companies navigate AI with 30 years of enterprise transformation experience. Boutique consulting that simplifies, not complicates.",
  keywords: [
    "Tributary AI",
    "AI consulting",
    "Michael Cooper",
    "technology consulting",
    "mid-market AI",
    "Eagle Idaho",
    "AI strategy",
  ],
  openGraph: {
    title: "About Tributary AI | AI Consulting for Mid-Market Companies",
    description:
      "Helping mid-market companies navigate AI with 30 years of enterprise transformation experience.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/about/",
  },
};

const differentiators = [
  {
    icon: Users,
    title: "Boutique, Not Factory",
    description:
      "No junior consultants learning on your dime. You work directly with 30 years of enterprise transformation experience.",
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description:
      "We don't bill to maximize hours. We bill to deliver results. If you're not satisfied, you don't pay.",
  },
  {
    icon: Wrench,
    title: "Builder Mentality",
    description:
      "We don't just advise—we implement. Strategy without execution is just expensive conversation.",
  },
];

export default function AboutPage() {
  return (
    <article>
      {/* Company Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-4">
              AI Consulting
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Practical AI Strategy for Growing Companies
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Tributary AI helps mid-market companies ($10M–$500M) navigate the AI transition—by simplifying operations, not adding complexity.
            </p>
            <p className="mt-4 text-muted-foreground">
              Based in Eagle, Idaho. Serving clients nationally.
            </p>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Our Belief</h2>
            <div className="bg-background border rounded-lg p-8 mb-8">
              <p className="text-2xl font-semibold text-center">
                &ldquo;AI should reduce your technology spend—not increase it.&rdquo;
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Most AI projects fail because companies layer AI onto existing complexity. They automate chaos instead of fixing it.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We take a different approach: simplify first, then accelerate. Clean your data. Establish a single source of truth. Build AI on a solid foundation.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Tributary</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {differentiators.map((item, index) => (
                <div key={index} className="border rounded-lg p-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-muted-foreground">
              We keep our team small intentionally. When you work with Tributary, you work directly with the founder.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-6">
              The Founder
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="shrink-0">
                <Image
                  src="/images/michael-cooper-about.jpg"
                  alt="Michael Cooper"
                  width={160}
                  height={200}
                  className="rounded-lg"
                  priority
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Michael Cooper</h2>
                <p className="mt-1 text-muted-foreground">Eagle, Idaho</p>
                <p className="mt-6 text-lg leading-relaxed">
                  30 years navigating enterprise technology transitions at Microsoft, Citrix, Confluent, and Astronomer. Built cloud partnerships, led sales organizations, helped companies navigate every major platform shift from on-prem to cloud, waterfall to agile, traditional to SaaS.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Now I help mid-market companies figure out what AI can actually do for them—and what it can&apos;t. No hype. No science projects. Just practical strategy that moves the business forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Track Record</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>$1.1B quota</strong> leading US Datacenter Sales at Microsoft</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>3x Microsoft Executive Briefing Speaker of the Year</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>$40M ARR</strong> partnership built from zero at Confluent</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>Published author</strong>—McGraw-Hill certification guides on Active Directory, Exchange, and DNS</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>Microsoft, Citrix, and Cisco certified instructor</strong>—taught enterprise technology to thousands of IT professionals</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bently Challenge */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-8 bg-background">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="shrink-0">
                  <Image
                    src="/images/bently-arcade.png"
                    alt="Bently the dog - Legendary AI opponent"
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Gamepad2 className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium text-accent uppercase tracking-wide">Legendary Difficulty</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Think You&apos;re Smart?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Bet you can&apos;t beat Michael&apos;s dog Bently at Checkers or Connect 4.
                  </p>
                  <Button asChild variant="outline" className="group">
                    <a
                      href="https://www.mcooper.com/arcade/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Challenge Bently
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to See What AI Can Do For You?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Start with a conversation. No pitch, no pressure—just an honest assessment of where AI can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10">
                <Link href="/quiz">
                  Take the AI Readiness Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
