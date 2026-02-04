import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Credentials section - showcases experience.
 * Clean, editorial design.
 */
export function CredentialsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <h2 className="text-3xl font-bold sm:text-4xl">
            30 years of transformation experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We&apos;ve navigated every major platform transition—from on-prem to cloud, from waterfall to agile, from traditional software to SaaS. Now we help companies navigate the AI shift.
          </p>

          {/* Founder */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/michael-cooper-about.jpg"
                alt="Michael Cooper"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Michael Cooper</p>
              <p className="text-sm text-accent">Founder, Tributary AI</p>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                Nearly 30 years navigating enterprise technology transitions at Microsoft, Citrix, Simplot, and Micron. Global leadership roles spanning Sales, Marketing, IT, Partner ecosystems, and Product—a cross-functional view of how technology, business models, and organizational incentives collide during periods of change.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/about">
                Read the Full Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
