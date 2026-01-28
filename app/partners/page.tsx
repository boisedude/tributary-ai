import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Building2, Users, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners & Alliances | Tributary AI",
  description:
    "Strategic partnerships with AWS and Microsoft. Implementation partners for execution. Scaling Tributary's advisory capacity to mid-market.",
  keywords: ["AWS partner", "Microsoft partner", "implementation partners", "technology partners"],
  openGraph: {
    title: "Partners & Alliances | Tributary AI",
    description:
      "Strategic partnerships with AWS and Microsoft. Implementation partners for execution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Alliances | Tributary AI",
    description: "Strategic partnerships with AWS and Microsoft. Implementation partners for execution. Scaling Tributary's advisory capacity to mid-market.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetributary.ai/partners/",
  },
};

export default function PartnersPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Strategic partnerships. Senior thinking. Execution capacity.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Tributary brings strategic clarity. Our partners bring implementation capacity. Together, we accelerate your simplification.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partnerships Matter */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Why This Matters</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Assessment identifies what to change, but identification isn&apos;t execution. Most consulting firms solve this one of two ways: they either force you into a retainer (making them your permanent IT department) or disappear after findings, leaving your team with a roadmap and no capacity to deliver.
              </p>
              <p>
                We do neither.
              </p>
              <p>
                Tributary remains your strategic partner through implementation. We handle architecture decisions, oversee quality, unblock roadblocks, and make sure vendors and partners stay aligned with what the Assessment identified. We don&apos;t disappear. We also don&apos;t pretend we&apos;re better at systems implementation than specialists who do it 100 days a year.
              </p>
              <p>Our SI partners are vetted specifically for:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Architectural discipline</strong> — They follow frameworks, not chasing shiny tools</li>
                <li><strong>Mid-market experience</strong> — They understand constraints and speed matters more than perfection</li>
                <li><strong>Implementation integrity</strong> — They move fast without cutting corners</li>
                <li><strong>Communication clarity</strong> — They keep your team informed, not overwhelmed</li>
              </ul>
              <p>
                This model scales our capacity while maintaining the quality of thinking that makes The Assessment valuable in the first place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Platform Partnerships */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Cloud Platform Partnerships</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* AWS */}
              <div className="border rounded-lg p-8">
                <div className="flex items-center justify-center mb-6 h-16">
                  <Image
                    src="/logos/partners/aws.svg"
                    alt="Amazon Web Services"
                    width={120}
                    height={72}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Amazon Web Services</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our Assessment evaluates your AWS readiness and identifies optimization opportunities across compute, storage, data services, and networking. If your roadmap includes AWS—whether it&apos;s migrating workloads, consolidating systems, or taking advantage of AI services—our SI partners have the AWS certifications, architectural expertise, and hands-on experience to execute efficiently.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Savings opportunities often emerge from AWS platform features companies don&apos;t know they have. Our partners know where to look.
                </p>
              </div>

              {/* Microsoft */}
              <div className="border rounded-lg p-8">
                <div className="flex items-center justify-center mb-6 h-16">
                  <Image
                    src="/logos/partners/microsoft.png"
                    alt="Microsoft"
                    width={150}
                    height={72}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Microsoft</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most mid-market companies have significant Microsoft investments — Azure infrastructure, M365 licensing, and SQL Server databases are starting points for simplification. Our Assessment addresses Microsoft architecture directly, identifying consolidation opportunities, licensing optimization, and paths to cloud-native models.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Michael&apos;s 25 years with Microsoft and track record of 1st-party Azure integrations at Confluent and Astronomer inform architecture recommendations that actually move the needle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">When You Need Implementation Capacity</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Assessment stands alone — it delivers value independent of follow-on work. But most clients choose to act on recommendations immediately. When execution starts, Tributary connects you with vetted SI partners who share our philosophy about simplification and moving fast without cutting corners.
              </p>
              <p>Our SI network includes firms with:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>India-based delivery centers</strong> — Cost-effective execution capacity for detailed implementation work</li>
                <li><strong>US-based teams</strong> — For architecture decisions, customer interfacing, and high-touch work</li>
                <li><strong>Specialized expertise</strong> — Cloud migrations, data consolidation, process automation, and systems integration</li>
                <li><strong>Quality standards</strong> — Architects we&apos;ve worked with personally; not vendor directory listings</li>
              </ul>
              <p>
                You remain the &quot;architecture owner&quot; throughout. Tributary oversees quality, makes sure partners follow the roadmap identified in The Assessment, and escalates roadblocks to you and your leadership team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ul className="grid gap-6 md:grid-cols-3">
              <li className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-lg">Architect-Led</h3>
                </div>
                <p className="text-muted-foreground">
                  All recommendations and oversight come from people with deep technical strategy experience. We don&apos;t hand over architecture to vendor sales teams.
                </p>
              </li>

              <li className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-lg">Committed to Your Success</h3>
                </div>
                <p className="text-muted-foreground">
                  Tributary stays involved through implementation. We&apos;re not trying to maximize SI partner hours. We&apos;re trying to move your business forward.
                </p>
              </li>

              <li className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-lg">Vendor-Agnostic</h3>
                </div>
                <p className="text-muted-foreground">
                  We recommend AWS or Microsoft based on your needs, not partnership margins. Same philosophy extends to all tooling recommendations.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Becoming a Partner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Interested in Partnering With Tributary?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We&apos;re selective about who we work with. If your firm has experience with mid-market companies ($100M-$1B revenue), practices architectural discipline, and shares our philosophy about simplification first then automation, we&apos;d like to hear from you.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>What we look for:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Proven track record with mid-market (not enterprise-only or startup-only)</li>
                <li>Deep expertise in cloud platforms, systems integration, or process automation</li>
                <li>Willingness to follow architectural recommendations</li>
                <li>Communication that keeps customers informed without overwhelming them</li>
              </ul>
              <p className="text-muted-foreground">
                Contact us at <a href="mailto:partner@thetributary.ai" className="text-accent hover:underline">partner@thetributary.ai</a> to discuss potential partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Strategic clarity comes first. Implementation comes second. Let&apos;s talk about where you stand.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/assessment">
                  Start With The Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a 30-Minute Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
