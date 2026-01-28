import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Tributary AI",
  description:
    "Michael Cooper. 30 years in enterprise technology. Now helping companies navigate AI.",
  keywords: [
    "Michael Cooper",
    "Tributary AI",
    "AI consulting",
    "technology consulting",
    "Boise Idaho",
  ],
  openGraph: {
    title: "About | Tributary AI",
    description:
      "Michael Cooper. 30 years in enterprise technology. Now helping companies navigate AI.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/about/",
  },
};

const endorsements = [
  {
    quote: "Michael understands enterprise technology at a level most consultants never reach. He built partnerships that generated over a billion dollars in revenue.",
    name: "[Name]",
    title: "Senior Director",
    company: "Microsoft",
  },
  {
    quote: "One of the sharpest technical minds I've worked with. Michael sees the architecture problem others miss and knows how to fix it.",
    name: "[Name]",
    title: "VP of Engineering",
    company: "Citrix",
  },
  {
    quote: "Michael helped us build a $40M partnership from scratch. He thinks like a business owner, not just a technologist.",
    name: "[Name]",
    title: "Chief Revenue Officer",
    company: "Confluent",
  },
  {
    quote: "Michael helped us see through the complexity and build a simplification roadmap that actually made sense to our leadership team.",
    name: "[Name]",
    title: "CIO",
    company: "Micron",
  },
];

export default function AboutPage() {
  return (
    <article>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Photo + Name */}
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
                <h1 className="text-4xl font-bold">Michael Cooper</h1>
                <p className="mt-2 text-muted-foreground">Eagle, Idaho</p>
                <p className="mt-6 text-lg leading-relaxed">
                  30 years in enterprise technology. Microsoft, Citrix, Confluent. Built partnerships, led teams, helped companies navigate platform transitions.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  Now I help mid-market companies figure out what AI can actually do for them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 bg-muted/30">
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
                <span><strong>Cisco certified trainer</strong>—taught networking fundamentals to enterprise teams</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">What People Say</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {endorsements.map((endorsement, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <p className="text-muted-foreground italic leading-relaxed">
                    &ldquo;{endorsement.quote}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">{endorsement.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {endorsement.title}, {endorsement.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic">
              Placeholder quotes—real endorsements coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Philosophy</h2>
            <p className="text-xl leading-relaxed">
              AI is the moment where business begins its next great evolution. Not a tool to bolt onto existing processes—a fundamental shift in how companies operate.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I&apos;ve seen what works and what doesn&apos;t. The technology is rarely the problem. The problem is organizational drag, fragmented systems, and roadmaps built for a world that no longer exists.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I help companies see clearly, decide confidently, and move faster.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-8 text-center">
              <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent mb-4">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Think You&apos;re Smart?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
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
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg mb-6">
              If you&apos;re trying to figure out what AI means for your business, let&apos;s talk.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Book a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
