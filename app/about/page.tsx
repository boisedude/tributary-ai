import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Radio,
  Briefcase,
} from "lucide-react";
import {
  careerPositions,
  formatYearRange,
} from "@/data/career";

export const metadata: Metadata = {
  title: "About Tributary AI Systems - Meet Michael Cooper",
  description:
    "Meet Michael Cooper, founder of Tributary AI Systems. 25+ years of GTM and enterprise technology experience, Microsoft and Google Partner of the Year awards, and deep expertise in cloud marketplaces and SaaS go-to-market. Based in Boise, Idaho, serving clients nationally.",
  keywords: [
    "Michael Cooper",
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
    title: "About Tributary AI Systems - Meet Michael Cooper",
    description:
      "25+ years of GTM experience. Microsoft and Google Partner of the Year awards. Expert in cloud marketplaces, SaaS GTM, and agentic systems.",
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
                Tributary AI Systems is founded by Michael Cooper, who brings over
                25 years of go-to-market and enterprise technology experience spanning
                cloud marketplaces, partner ecosystems, and platform partnerships.
              </p>
              <p>
                Michael&apos;s career began in Idaho, where he founded MDC IT and worked
                with regional powerhouses like JR Simplot, Albertsons, and
                Primary Health. That foundation in understanding real business
                needs has remained central to his approach ever since.
              </p>
              <p>
                From those Idaho roots, Michael scaled to global roles at some of
                technology&apos;s most influential companies. At Microsoft and Citrix,
                he led teams that earned Partner of the Year recognition from
                both Microsoft and Google. At Confluent and Astronomer, he built
                go-to-market strategies and cloud marketplace programs that drove
                significant business growth.
              </p>
              <p>
                Throughout his career, Michael has been at the forefront of platform
                ecosystems and partner strategy. He&apos;s navigated the complexities
                of AWS, Azure, and GCP marketplaces, built co-sell programs with
                major cloud providers, and helped numerous companies successfully
                bring their solutions to market through strategic partnerships.
              </p>
              <p>
                As a published author on Windows Server, Exchange, and Active
                Directory, Michael has contributed to the broader technology
                community&apos;s understanding of enterprise systems.
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
                    After years at major technology companies, Michael recognized an
                    opportunity to return to what he does best: helping SaaS companies
                    accelerate their go-to-market through cloud marketplaces and
                    strategic partnerships.
                  </p>
                  <p>
                    The agentic era demands more than theoretical knowledge. It
                    requires practical experience in cloud partnerships, marketplace
                    GTM, and the reality of scaling SaaS businesses. Tributary
                    AI Systems brings that experience to companies navigating
                    cloud marketplaces and the shift to outcome-based models.
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
      <section className="pb-16">
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
                      <h3 className="font-semibold">Agentic SaaS Talks Podcast</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Host of Agentic SaaS Talks in partnership with AWS, exploring
                        SaaS, cloud platforms, and agentic system architectures
                      </p>
                      <Link
                        href="https://www.agentic-saas-talks.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:underline"
                      >
                        Listen Now
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Career Timeline */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold">Career Timeline</h2>
            </div>
            <div className="space-y-6">
              {careerPositions.map((position, index) => (
                <Card key={position.id} className={index === 0 ? "border-accent" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{position.company}</h3>
                        <p className="text-muted-foreground">{position.title}</p>
                      </div>
                      <span className="text-sm font-medium text-accent whitespace-nowrap">
                        {formatYearRange(position.startYear, position.endYear)}
                      </span>
                    </div>
                    {position.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {position.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 mt-2 shrink-0 rounded-full bg-accent"></div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s Accelerate Your GTM
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Whether you&apos;re launching on cloud marketplaces or need fractional GTM
              leadership, we bring the experience to accelerate your go-to-market.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Strategy Call
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
