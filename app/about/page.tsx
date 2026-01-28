import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export default function AboutPage() {
  return (
    <article>
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
                  30 years in enterprise technology. Microsoft, Citrix, Confluent, Astronomer. Built partnerships, led teams, helped companies navigate platform transitions.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  Now I help mid-market companies figure out what AI can actually do for them.
                </p>
              </div>
            </div>

            {/* The Point */}
            <div className="mt-16 pt-12 border-t">
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

            {/* CTA */}
            <div className="mt-16 pt-12 border-t">
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
        </div>
      </section>
    </article>
  );
}
