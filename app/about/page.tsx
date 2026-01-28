import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, Mic, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About Michael Cooper | Tributary AI",
  description:
    "30 years building cloud infrastructure at Microsoft, Citrix, Confluent, and Astronomer. Built Microsoft partnerships from $0 to $40M ARR. Now helping mid-market companies simplify with AI.",
  keywords: [
    "Michael Cooper",
    "Tributary AI founder",
    "Microsoft",
    "Citrix",
    "Confluent",
    "Astronomer",
    "cloud partnerships",
    "Azure",
    "AI consulting",
    "Boise Idaho",
  ],
  openGraph: {
    title: "About Michael Cooper | Tributary AI",
    description:
      "30 years building cloud infrastructure. Now helping companies see clearly and move faster with AI.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/about/",
  },
};

export default function AboutPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 md:grid-cols-[300px_1fr] items-start">
              {/* Photo */}
              <div className="mx-auto md:mx-0">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/michael-cooper-about.jpg"
                    alt="Michael Cooper - Founder of Tributary AI"
                    width={300}
                    height={375}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Eagle, Idaho</span>
                </div>
              </div>

              {/* Intro */}
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl">
                  Michael Cooper
                </h1>
                <p className="mt-6 text-xl leading-relaxed">
                  I&apos;ve spent 30 years in enterprise technology—building cloud partnerships, leading sales organizations, and helping companies navigate platform transitions.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  At Microsoft, I carried $1.1B in quota and led the US enterprise cloud infrastructure team. At Confluent, I built the Microsoft partnership from zero to $40M ARR and secured one of only ~12 first-party Azure integrations ever granted. At Astronomer, I did it again—another first-party Azure integration for Apache Airflow.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Now I&apos;m back in Idaho, helping mid-market companies cut through the noise and figure out what AI can actually do for them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Arc */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">The Short Version</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Started at <strong>Micron</strong> in 1995—tech support, then network admin, then running the global WAN rollout. Became the youngest supervisor in company history at 21.
              </p>
              <p>
                Moved to <strong>J.R. Simplot</strong> as lead enterprise architect. Consolidated 30+ Active Directory domains, centralized IT across the company, and got featured at Microsoft TechEd for the migration work.
              </p>
              <p>
                Joined <strong>Microsoft</strong> twice. First time: Windows Server specialist, then datacenter program manager. Second time: ran US enterprise cloud infrastructure sales ($1.1B), then moved to worldwide Azure GTM. Three-time Executive Briefing Center Speaker of the Year.
              </p>
              <p>
                At <strong>Citrix</strong>, led a team of 14 solution architects building reference architectures with HP, Dell, Cisco, NVIDIA, AWS, and Microsoft. Early work on cloud-hosted Windows desktops and GPU-backed VDI.
              </p>
              <p>
                At <strong>Confluent</strong>, built the Microsoft partnership from scratch—$0 to ~$40M ARR. Secured the first-party Azure integration for Kafka. Multiple Microsoft Partner of the Year awards.
              </p>
              <p>
                At <strong>Astronomer</strong>, did it again—secured another first-party Azure integration, this time for Apache Airflow. One of only ~12 companies to ever achieve that.
              </p>
              <p>
                Most recently led GTM at <strong>Omnistrate</strong>—grew revenue from $0 to ~$3M ARR, launched AWS and Azure Marketplace listings, and secured over $1M in cloud partner investment commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Worked With */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Companies I&apos;ve Worked With</h2>
            <p className="text-muted-foreground mb-8">
              Directly employed, as a consultant, or as a strategic partner.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "Microsoft",
                "Citrix",
                "Confluent",
                "Astronomer",
                "Micron",
                "J.R. Simplot",
                "Starbucks",
                "Boeing",
                "Nike",
                "Albertsons",
                "Boise Cascade",
                "Safeco",
                "HP",
                "Dell",
                "Cisco",
                "NVIDIA",
              ].map((company) => (
                <div
                  key={company}
                  className="rounded-lg border bg-card px-4 py-3 text-center text-sm font-medium"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Published Work */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-semibold">Published Author</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Books on Active Directory and Microsoft Exchange published by McGraw-Hill and New Riders. Written for IT professionals deploying enterprise infrastructure.
                </p>
              </div>

              {/* Speaking */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-semibold">Speaker</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Three-time Microsoft Executive Briefing Center Speaker of the Year. Top-rated speaker at Microsoft TechEd and Microsoft Management Summit.
                </p>
              </div>
            </div>

            {/* Podcast */}
            <div className="mt-8 rounded-xl border bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Agentic SaaS Talks</h3>
                  <p className="mt-1 text-muted-foreground">
                    A podcast on SaaS, cloud platforms, and agentic architectures—produced in partnership with AWS.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://www.agentic-saas-talks.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Historical Certifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Historical Certifications</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                MCT (Microsoft Certified Instructor), MCSE, CISSP, Citrix Certified Instructor, Cisco Certified Instructor. All expired—I stopped maintaining them when I moved into leadership roles. Listing them because they reflect the foundation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MDC IT History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Tributary&apos;s Foundation</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Tributary operates under Managed Data Communications (MDC IT), a company I founded in Idaho in 1999. MDC IT delivered infrastructure and transformation projects for Idaho enterprises and state agencies—systems that still run today.
              </p>
              <p>
                Past clients include Boise Cascade, Albertson&apos;s, Global Travel, Primary Health, College of Idaho, Cooper Norman, Idaho State Tax Commission, Idaho State Liquor Dispensary, and Idaho State Parks &amp; Recreation.
              </p>
              <p>
                That experience—building systems designed to last, navigating enterprise complexity, working across industries—is what Tributary brings to every engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Point */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Why I Do This</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI is the moment where business begins its next great evolution. Not a tool to bolt onto existing processes—a fundamental shift in how companies operate, compete, and create value.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              I&apos;ve seen what works and what doesn&apos;t—at startups, at enterprises, at the companies in between. The technology is rarely the problem. The problem is organizational drag, fragmented systems, and roadmaps built for a world that no longer exists.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              I want to help companies navigate this change. See clearly. Decide confidently. Move faster.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s Talk
            </h2>
            <p className="mt-4 text-lg text-white/90">
              No pitch deck. No discovery questionnaire. Just a direct conversation about where you are and whether I can help.
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
