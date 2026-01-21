import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Founder | Tributary AI",
  description:
    "30+ years leading technology transformations at Microsoft, Citrix, Confluent, and more. Tributary is built on 25 years of enterprise experience, founded in Idaho in 1999.",
  keywords: [
    "Michael Cooper",
    "Tributary AI founder",
    "technology consulting",
    "enterprise technology",
    "Microsoft",
    "Citrix",
    "Confluent",
    "MDC IT",
    "Boise Idaho",
  ],
  openGraph: {
    title: "Our Founder | Tributary AI",
    description:
      "30+ years leading technology transformations. Now helping companies see clearly and move faster.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-[280px_1fr] items-center">
              {/* Photo */}
              <div className="mx-auto md:mx-0">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/michael-cooper-about.jpg"
                    alt="Michael Cooper - Founder of Tributary AI"
                    width={280}
                    height={350}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold sm:text-5xl">
                  Michael Cooper
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                  30 years leading technology transformations at Microsoft, Citrix, Micron, and Simplot.
                </p>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  I&apos;ve seen what works, what fails, and why most initiatives stall. Now I help companies see clearly and move faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Longer Version */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;ve spent my career at the intersection of technology and business transformation—leading organizations through major platform shifts and helping companies navigate change.
              </p>
              <p>
                What I&apos;ve learned: the technology is rarely the problem. The problem is organizational drag—misaligned teams, fragmented systems, political friction, and roadmaps built for a world that no longer exists.
              </p>
              <p>
                AI changes the math on all of this. Thinking is no longer the constraint. Execution is. Companies that simplify will win. Companies that keep adding complexity will struggle.
              </p>
              <p>
                I help leaders see clearly, decide confidently, and move faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Credentials
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Experience</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>30 years enterprise technology leadership</li>
                    <li>Built and scaled organizations from startup to enterprise</li>
                    <li>Led teams through multiple major platform transitions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-6">Companies</h3>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <Image
                      src="/logos/companies/microsoft.png"
                      alt="Microsoft"
                      width={120}
                      height={26}
                      className="h-6 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                    <Image
                      src="/logos/companies/citrix.png"
                      alt="Citrix"
                      width={80}
                      height={26}
                      className="h-6 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                    <Image
                      src="/logos/companies/confluent.png"
                      alt="Confluent"
                      width={120}
                      height={26}
                      className="h-6 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                    <Image
                      src="/logos/companies/micron.png"
                      alt="Micron"
                      width={100}
                      height={26}
                      className="h-6 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                    <Image
                      src="/logos/companies/simplot.png"
                      alt="J.R. Simplot Company"
                      width={100}
                      height={26}
                      className="h-6 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Based in Boise, Idaho</p>
                    <p className="text-muted-foreground">Serving clients nationally</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our History
            </h2>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Built on 25 Years of Enterprise Experience
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tributary is the evolution of Managed Data Communications (MDC IT), founded in Idaho in 1999. MDC IT delivered infrastructure and transformation projects for some of Idaho&apos;s largest organizations — systems that still run today.
                  </p>
                  <div>
                    <p className="font-semibold text-foreground mb-3">Past engagements include:</p>
                    <ul className="grid gap-2 md:grid-cols-2">
                      <li>• Boise Cascade</li>
                      <li>• Albertson&apos;s</li>
                      <li>• Global Travel</li>
                      <li>• Primary Health</li>
                      <li>• College of Idaho</li>
                      <li>• Cooper Norman</li>
                      <li>• Idaho State Tax Commission</li>
                      <li>• Idaho State Liquor Dispensary</li>
                      <li>• Idaho State Parks &amp; Recreation</li>
                    </ul>
                  </div>
                  <p>
                    That experience — building systems designed to last, navigating enterprise complexity, working across industries — is the foundation Tributary brings to every engagement.
                  </p>
                  <p>
                    Now the focus is singular: helping mid-market companies use AI to simplify operations and reduce costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Have a Conversation?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              No sales pitch. Just a direct conversation about where you are and whether I can help.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Call
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
