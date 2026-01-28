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
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <h2 className="text-3xl font-bold sm:text-4xl">
            30 years of transformation experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We&apos;ve navigated every major platform transition—from on-prem to cloud, from waterfall to agile, from traditional software to SaaS. Now we help companies navigate the AI shift.
          </p>

          {/* Key Numbers */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">$1.1B</p>
              <p className="text-sm text-muted-foreground mt-1">Revenue at Microsoft</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$40M</p>
              <p className="text-sm text-muted-foreground mt-1">Partnership ARR at Confluent</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2x</p>
              <p className="text-sm text-muted-foreground mt-1">First-party Azure integrations</p>
            </div>
          </div>

          {/* Founder */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6 items-start">
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
                Built cloud partnerships, led sales organizations, and helped companies navigate platform transitions at Microsoft, Citrix, Confluent, and Astronomer. Three-time Microsoft Executive Briefing Center Speaker of the Year.
              </p>
            </div>
          </div>

          {/* Companies */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-3">Companies we&apos;ve worked with:</p>
            <p className="text-sm">
              Microsoft, Citrix, Confluent, Astronomer, Micron, Simplot, Starbucks, Boeing, Nike, Albertsons
            </p>
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
