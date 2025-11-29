import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, BookOpen, Building2, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tributary AI Systems - Meet Mike Cooper",
  description:
    "Meet Mike Cooper, founder of Tributary AI Systems. 25+ years of enterprise technology experience, Microsoft and Google Partner of the Year awards, and deep expertise in cloud marketplaces and AI readiness. Based in Boise, Idaho, serving clients nationally.",
  keywords: [
    "Mike Cooper",
    "Tributary AI founder",
    "AI consulting expert",
    "cloud marketplace consultant",
    "Microsoft Partner of the Year",
    "Google Partner of the Year",
    "enterprise technology",
    "Boise Idaho consulting",
    "AI strategy consultant",
    "agentic SaaS podcast",
  ],
  openGraph: {
    title: "About Tributary AI Systems - Meet Mike Cooper",
    description:
      "25+ years of enterprise technology experience. Microsoft and Google Partner of the Year awards. Expert in AI readiness, cloud marketplaces, and agentic systems.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              About Tributary AI Systems
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Where decades of enterprise experience meet the future of
              intelligent business
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="card-glow-teal">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold">
                  Where Business Experience Meets Intelligent Innovation
                </h2>
                <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                  <p>
                    We help companies prepare for the agentic era by modernizing
                    systems, processes, and strategy for AI-driven operations.
                    Our approach combines deep technical expertise with real-world
                    business experience.
                  </p>
                  <p>
                    We&apos;re not just consultants. We&apos;re experienced operators who
                    have built teams, scaled businesses, and navigated the
                    complexities of enterprise technology transformation. We bring
                    that practical perspective to every engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">The Journey</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                Tributary AI Systems is founded by Mike Cooper, who brings over
                25 years of enterprise technology experience spanning networking,
                security, cloud infrastructure, and platform partnerships.
              </p>
              <p>
                Mike&apos;s career began in Idaho, where he founded MDC IT and worked
                with regional powerhouses like JR Simplot, Albertsons, and
                Primary Health. That foundation in understanding real business
                needs has remained central to his approach ever since.
              </p>
              <p>
                From those Idaho roots, Mike scaled to global roles at some of
                technology&apos;s most influential companies. At Microsoft and Citrix,
                he led teams that earned Partner of the Year recognition from
                both Microsoft and Google. At Confluent and Astronomer, he built
                go-to-market strategies and cloud marketplace programs that drove
                significant business growth.
              </p>
              <p>
                Throughout his career, Mike has been at the forefront of platform
                ecosystems and partner strategy. He&apos;s navigated the complexities
                of AWS, Azure, and GCP marketplaces, built co-sell programs with
                major cloud providers, and helped numerous companies successfully
                bring their solutions to market through strategic partnerships.
              </p>
              <p>
                As a published author on Windows Server, Exchange, and Active
                Directory, Mike has contributed to the broader technology
                community&apos;s understanding of enterprise systems. Today, he hosts
                the &quot;Agentic SaaS Talks&quot; podcast, exploring the intersection of
                AI, platforms, and business transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tributary Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="card-glow-coral">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold">Why Tributary</h2>
                <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                  <p>
                    After years at major technology companies, Mike recognized an
                    opportunity to return to what he does best: helping businesses
                    directly navigate complex technology transformations.
                  </p>
                  <p>
                    The agentic era demands more than theoretical knowledge. It
                    requires practical experience in systems integration, partner
                    ecosystems, and the reality of enterprise operations. Tributary
                    AI Systems brings that experience to companies preparing for
                    AI-driven business.
                  </p>
                  <p>
                    Based in Boise but serving clients nationally, we combine the
                    accessibility and pragmatism of our Idaho roots with the
                    expertise gained from working at the highest levels of
                    enterprise technology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Experience & Recognition
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Partner of the Year Awards</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Led teams to Microsoft Partner of the Year and Google
                        Partner of the Year recognition
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Major Platforms</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Deep expertise across AWS, Azure, GCP, Confluent, and
                        Astronomer ecosystems
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Published Author</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Written books on Windows Server, Exchange, and Active
                        Directory technologies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Radio className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Agentic SaaS Talks</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Host of podcast exploring AI, platforms, and business
                        transformation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career Timeline */}
            <div className="mt-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-semibold text-lg mb-4">Career Highlights</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 shrink-0 rounded-full bg-accent"></div>
                      <div>
                        <span className="font-medium text-foreground">
                          Current:
                        </span>{" "}
                        GTM Leader at Omnistrate, building Tributary AI Systems
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 shrink-0 rounded-full bg-accent"></div>
                      <div>
                        <span className="font-medium text-foreground">
                          Previously:
                        </span>{" "}
                        Senior leadership roles at Microsoft, Citrix, Confluent, and
                        Astronomer
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 shrink-0 rounded-full bg-accent"></div>
                      <div>
                        <span className="font-medium text-foreground">
                          Founded:
                        </span>{" "}
                        MDC IT in Idaho, serving JR Simplot, Albertsons, and Primary
                        Health
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 shrink-0 rounded-full bg-accent"></div>
                      <div>
                        <span className="font-medium text-foreground">
                          Expertise:
                        </span>{" "}
                        Cloud marketplaces, partner ecosystems, go-to-market strategy,
                        enterprise systems
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s Build Your AI Strategy
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Whether you&apos;re just beginning to explore AI capabilities or ready
              to transform your operations, we bring the experience to guide you
              through the journey.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Let&apos;s Build Your AI Strategy
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
