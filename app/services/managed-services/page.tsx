import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Cloud,
  Shield,
  Users,
  TrendingUp,
  Headphones,
  Brain,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { BreadcrumbListSchema, ManagedServicesSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Managed IT Services & Fractional CTO | Tributary AI",
  description:
    "Managed IT services, cloud administration, and fractional CTO/CIO advisory for mid-market companies. AI-powered operations, lower costs.",
  keywords: [
    "managed IT services",
    "fractional CTO",
    "fractional CIO",
    "cloud management",
    "IT outsourcing",
    "AI-powered IT",
    "MSP",
  ],
  openGraph: {
    title: "Managed IT Services & Fractional CTO | Tributary AI",
    description:
      "Managed IT services and fractional CTO/CIO advisory for mid-market companies.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/services/managed-services/",
  },
};

const offerings = [
  {
    title: "IT Management",
    description:
      "Day-to-day IT operations. User support, system administration, vendor management, security monitoring. AI-augmented for faster resolution and lower cost.",
    icon: Headphones,
    buyer: "IT Director, VP IT",
  },
  {
    title: "Cloud Administration",
    description:
      "AWS, Azure, GCP management. Cost optimization, security hardening, performance monitoring, architecture guidance. We keep your cloud running efficiently.",
    icon: Cloud,
    buyer: "CTO, IT Director",
  },
  {
    title: "Fractional CTO/CIO",
    description:
      "Executive-level technology leadership without the full-time cost. Strategic planning, vendor evaluation, team mentorship, board-level reporting.",
    icon: Brain,
    buyer: "CEO, Board",
  },
];

const advantages = [
  {
    title: "AI-Powered Operations",
    description:
      "We use AI for ticket triage, log analysis, documentation, and routine decisions. This lets a smaller team handle more—and pass the savings to you.",
    icon: TrendingUp,
  },
  {
    title: "No Long-Term Lock-In",
    description:
      "Month-to-month engagement. We earn your business continuously, not through contracts that trap you.",
    icon: Users,
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "We implement the security practices large enterprises use—monitoring, access control, incident response—scaled for mid-market budgets.",
    icon: Shield,
  },
];

const includedServices = [
  "24/7 monitoring and alerting",
  "User support and helpdesk",
  "System administration",
  "Security patch management",
  "Backup and disaster recovery",
  "Vendor management",
  "Monthly reporting and reviews",
  "Strategic technology planning",
];

export default function ManagedServicesPage() {
  return (
    <article className="bg-gradient-subtle">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://www.thetributary.ai" },
          { name: "Services", url: "https://www.thetributary.ai/services" },
          { name: "Managed Services", url: "https://www.thetributary.ai/services/managed-services" },
        ]}
      />
      <ManagedServicesSchema />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
              Ongoing Support
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Managed IT Services & Fractional CTO
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Ongoing IT management, cloud administration, and fractional CTO/CIO advisory. AI-powered operations at a fraction of traditional MSP costs.
            </p>
          </div>
          {/* Hero Image */}
          <div className="mx-auto max-w-4xl mt-12">
            <Image
              src="/images/managed-services-hero.webp"
              alt="Managed services: your business protected by cloud, security, support, analytics, and strategic advisory"
              width={1200}
              height={675}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Why AI Changes the Math
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Traditional MSPs charge for headcount. More tickets means more staff means higher bills. We use AI to handle routine work—log analysis, documentation, ticket triage, common fixes—which means we can deliver enterprise-quality service at mid-market prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
            <div className="grid gap-6">
              {offerings.map((offering) => {
                const Icon = offering.icon;
                return (
                  <div
                    key={offering.title}
                    className="border rounded-lg p-6 flex gap-4"
                  >
                    <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent h-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {offering.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        {offering.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Typical buyer:</strong> {offering.buyer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">What&apos;s Included</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {includedServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                >
                  <span className="text-accent">•</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Why Tributary</h2>
            <div className="grid gap-6">
              {advantages.map((advantage) => {
                const Icon = advantage.icon;
                return (
                  <div
                    key={advantage.title}
                    className="border rounded-lg p-6 flex gap-4"
                  >
                    <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent h-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Engagement Model</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Pricing:</strong> Monthly retainer, tailored to your environment and needs
                </p>
                <p>
                  <strong className="text-foreground">Commitment:</strong> Month-to-month; no long-term contracts required
                </p>
                <p>
                  <strong className="text-foreground">Typical buyer:</strong> CEO (fractional exec), IT Director (managed services)
                </p>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  Our heavy use of AI tooling allows us to deliver these services at a fraction of the usual cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisite */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-8 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Hand Off Operations?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We can onboard quickly if you have documentation of your current environment. If not, The Assessment maps your infrastructure, identifies risks, and creates the foundation for a smooth transition.
              </p>
              <Button asChild variant="outline" className="group">
                <Link href={ROUTES.ASSESSMENT}>
                  Learn About The Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Need Ongoing Support?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s discuss your needs and whether The Assessment is the right starting point.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
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
