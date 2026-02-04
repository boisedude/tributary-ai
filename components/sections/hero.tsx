import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Hero section - clean, editorial design.
 * Focuses on transformation vision.
 */
export function Hero() {
  return (
    <section className="relative py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <p className="text-sm font-medium tracking-wide text-accent uppercase mb-6">
            Technology Consulting
          </p>

          {/* Main Headline */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            AI isn&apos;t the hard part.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-accent">Making it work inside your business can be.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We help organizations simplify how they operate so AI creates value instead of noise.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group bg-accent hover:bg-accent/90">
              <Link href="/quiz">
                Get Your AI Readiness Score
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent/40 text-accent hover:bg-accent/10 hover:border-accent">
              <Link href="/assessment">
                Explore The Assessment
              </Link>
            </Button>
          </div>

          {/* Simple Credentials */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              30 years of enterprise transformation experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
