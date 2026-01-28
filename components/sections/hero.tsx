import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Hero section - clean, editorial design.
 * Focuses on transformation vision.
 */
export function Hero() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <p className="text-sm font-medium tracking-wide text-accent uppercase mb-6">
            Technology Consulting
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-[1.1]">
            AI changes everything.
            <br />
            <span className="text-accent">That&apos;s the opportunity.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We help companies navigate the next evolution of business—not by adding more tools, but by simplifying how you operate.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group bg-accent hover:bg-accent/90">
              <Link href="/quiz">
                Get Your AI Readiness Score
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/assessment">
                Explore The Assessment
              </Link>
            </Button>
          </div>

          {/* Simple Credentials */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              30 years navigating platform transitions at Microsoft, Citrix, Confluent, Astronomer, and Micron.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
