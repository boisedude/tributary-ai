import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Call-to-action section.
 * Clean, editorial design with solid background.
 */
export function CTASection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to move?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Start with a quick self-assessment, or have a direct conversation about where you are.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/quiz">
                Get Your AI Readiness Score
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/contact">
                Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
