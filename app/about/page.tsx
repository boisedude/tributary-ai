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
    "Meet Michael Cooper, founder of Tributary AI Systems. 30+ years of GTM and enterprise technology experience, Microsoft and Google Partner of the Year awards, and deep expertise in cloud marketplaces and SaaS go-to-market. Based in Boise, Idaho, serving clients nationally.",
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
      "30+ years of GTM experience. Microsoft and Google Partner of the Year awards. Expert in cloud marketplaces, SaaS GTM, and agentic systems.",
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
              30+ years navigating platform shifts. Now helping companies survive the biggest one yet.
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
                  The Agentic Shift Won&apos;t Wait
                </h2>
                <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                  <p>
                    2026 marks a major inflection point in technology. The transition to agentic systems will reward companies that adapt with lower costs, faster execution, and market share gains. I&apos;ve seen this pattern before: client-server to web, on-prem to cloud. Each transition created winners and losers. This one will be no different, just faster.
                  </p>
                  <p>
                    I&apos;m not a typical consultant. I&apos;ve built GTM teams, scaled businesses through platform transitions, and earned Partner of the Year recognition from both Microsoft and Google. I bring that operator perspective to every engagement—no theoretical frameworks, just practical advice from someone who&apos;s been in the arena.
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
                30 years of go-to-market and enterprise technology experience spanning
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
                <h2 className="text-3xl font-bold">Why I Started Tributary</h2>
                <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                  <p>
                    After years inside Microsoft, Citrix, Confluent, and Astronomer, I saw the agentic wave coming. Most companies aren&apos;t ready. The big consulting firms will take your money and deliver frameworks and slide decks. I&apos;d rather help you actually move.
                  </p>
                  <p>
                    This is a new company, but I&apos;m not new to this work. 30+ years of GTM, cloud partnerships, and platform transitions. Partner of the Year from both Microsoft and Google. I know what it takes to navigate major shifts because I&apos;ve done it—repeatedly.
                  </p>
                  <p>
                    Based in Boise, serving clients nationally. No big-firm overhead. No junior consultants learning on your dime. Just direct access to someone who&apos;s been in the arena and can help you move fast.
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
              Ready to Have an Honest Conversation?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              No sales pitch. No 47-slide deck. Just a direct conversation about where you are, where you need to be, and whether I can help you get there.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Let&apos;s Talk
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
