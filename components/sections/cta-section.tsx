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
            AI is the moment where business begins its next great evolution. Let&apos;s talk about where you are and whether we can help you navigate it.
          </p>

          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/contact">
                Book a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm opacity-70">
            No sales pitch. No 47-slide deck. Just a direct conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
