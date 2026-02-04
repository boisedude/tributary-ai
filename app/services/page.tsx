import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Cog,
  Code,
  Headphones,
  ClipboardCheck,
  Database,
} from "lucide-react";
import { ROUTES, SITE_URL } from "@/lib/constants";
import { BreadcrumbListSchema, FAQSchema } from "@/components/structured-data/schemas";
import { FAQAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "AI Consulting & Technology Services",
  description:
    "AI consulting and managed IT services for mid-market companies. Assessment, automation, custom development, and fractional CTO support.",
  keywords: [
    "AI consulting services",
    "AI readiness assessment",
    "data readiness",
    "AI automation",
    "AI development",
    "managed IT services",
    "fractional CTO",
    "technology consulting",
  ],
  openGraph: {
    title: "AI Consulting & Technology Services",
    description:
      "AI consulting and managed IT services for mid-market companies.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tributary AI - Technology Consulting for the AI Era",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting & Technology Services | Tributary AI",
    description:
      "AI consulting and managed IT services for mid-market companies.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/services/`,
  },
};

const serviceFAQs = [
  {
    question: "What service is right if we need to automate specific processes?",
    answer: "AI Automation & Deployment is designed for automating specific workflows using RPA, process automation, and AI agents. If you know what's broken, we implement the fix.",
  },
  {
    question: "What if we want to build an AI-powered product or tool?",
    answer: "AI Application Development provides custom software from prototype to production, including internal tools and customer-facing products that give you a competitive edge.",
  },
  {
    question: "What if our data is a mess and not ready for AI?",
    answer: "Data Readiness services help you consolidate, clean, and govern your data—creating the foundation that makes AI actually work. Most AI failures trace back to data quality issues.",
  },
  {
    question: "What service covers ongoing tech leadership or IT support?",
    answer: "Managed Services offers fractional CTO/CIO advisory, IT management, and cloud administration on a monthly retainer with no long-term contracts required.",
  },
  {
    question: "Where should we start if we're not sure what we need?",
    answer: "The Assessment is a 2-3 week diagnostic that evaluates Data, People, Process, Technology, and Politics to identify your best path forward. Most clients start here.",
  },
  {
    question: "Who will actually work on my project?",
    answer: "When you work with Tributary, you work directly with Michael Cooper—a senior consultant with 30 years of enterprise experience. There's no bait-and-switch with junior staff. For larger engagements, we bring in vetted specialists from our network, but Michael remains your primary point of contact and is involved in all strategic decisions.",
  },
  {
    question: "How much time will my team need to commit?",
    answer: "We design engagements to minimize disruption to your operations. For The Assessment, expect 4-6 hours total from key stakeholders over 2-3 weeks—mostly interviews and a leadership presentation. Implementation projects vary, but we handle the heavy lifting. Your team's involvement is typically 2-4 hours per week for feedback and approvals, not full-time dedication.",
  },
  {
    question: "What's the typical timeline from assessment to seeing results?",
    answer: "The Assessment takes 2-3 weeks and delivers immediate clarity on your AI readiness. From there, timelines depend on your starting point. Quick wins (process automation, reporting dashboards) can deliver value in 4-8 weeks. Larger initiatives like data consolidation or custom AI applications typically run 3-6 months. We'll give you a realistic timeline based on your specific situation—not an optimistic sales pitch.",
  },
  {
    question: "What if the Assessment reveals we're not ready for AI?",
    answer: "That's actually a valuable outcome—it means we've saved you from wasting money on premature AI projects. The Assessment includes a prioritized roadmap showing exactly what to fix first, whether that's data quality, process documentation, or organizational alignment. Many clients spend 3-6 months on foundational work before pursuing AI, and that's the smart path. We can help with that foundation, or you can handle it internally with our roadmap as your guide.",
  },
  {
    question: "What does your satisfaction guarantee actually mean?",
    answer: "For The Assessment: if you don't find the findings valuable and actionable, you don't pay. It's that simple. You decide if you're satisfied—not us. For implementation projects, we define success criteria upfront and tie our work to measurable outcomes. We'd rather have a difficult conversation early than deliver something that doesn't meet your needs.",
  },
  {
    question: "How do you handle data security and confidentiality?",
    answer: "Your data stays yours. We sign NDAs before any engagement, use encrypted connections for all data transfers, and never share client information with third parties. We access only the data necessary for the engagement and can work within your security requirements—including on-premises work if needed. For regulated industries, we're familiar with HIPAA, SOC 2, and similar compliance frameworks.",
  },
  {
    question: "Can we start small and expand later?",
    answer: "Absolutely—that's our recommended approach. The Assessment is designed as a low-risk entry point. From there, you can tackle one high-impact project, prove value, and expand. There are no long-term contracts required. Many clients start with a single automation project, see results, and then engage us for broader initiatives. You control the pace.",
  },
  {
    question: "Is Tributary a good fit for a company our size?",
    answer: "We specialize in mid-market companies—typically $10M to $500M in revenue. You're large enough to benefit from AI but may not have the internal expertise or budget for Big Four consultants. That's our sweet spot. We've deliberately structured our services and pricing for organizations where every dollar needs to show ROI, not enterprises with unlimited budgets.",
  },
];

const services = [
  {
    title: "The Assessment",
    subtitle: "Entry Point",
    description:
      "A 2-3 week diagnostic that shows you exactly where you stand, what's holding you back, and what to change. Evaluates Data, People, Process, Technology, and Politics.",
    href: ROUTES.ASSESSMENT,
    icon: ClipboardCheck,
    pricing: "$12K - $25K",
    timeline: "2-3 weeks",
    highlight: true,
  },
  {
    title: "Data Readiness",
    subtitle: "Foundation",
    description:
      "Get your data AI-ready. Data quality assessment, consolidation, governance, and integration. The foundation that makes AI actually work.",
    href: ROUTES.DATA_READINESS,
    icon: Database,
    pricing: "$25K - $50K",
    timeline: "4-12 weeks",
  },
  {
    title: "AI Automation & Deployment",
    subtitle: "Implementation",
    description:
      "Implementing AI into existing workflows. RPA, process automation, AI agent deployment. Turn assessment findings into working automation.",
    href: ROUTES.AI_AUTOMATION,
    icon: Cog,
    pricing: "$40K - $100K",
    timeline: "4-12 weeks",
  },
  {
    title: "AI Application Development",
    subtitle: "Implementation",
    description:
      "Custom AI-powered applications. Internal tools, customer-facing products. From prototype to production.",
    href: ROUTES.AI_DEVELOPMENT,
    icon: Code,
    pricing: "$55K - $165K",
    timeline: "8-16 weeks",
  },
  {
    title: "Managed Services",
    subtitle: "Ongoing Support",
    description:
      "Ongoing IT management, cloud administration, fractional CTO/CIO advisory. AI-powered operations at a fraction of traditional MSP costs.",
    href: ROUTES.MANAGED_SERVICES,
    icon: Headphones,
    pricing: "$5K - $10K/month",
    timeline: "Ongoing",
  },
];

export default function ServicesPage() {
  return (
    <article className="bg-gradient-subtle">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
        ]}
      />
      <FAQSchema faqs={serviceFAQs} />
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              AI Consulting & Technology Services
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Technology consulting and managed IT services powered by AI. We help mid-market companies deliver enterprise-quality outcomes at a fraction of the usual cost.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="p-6 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Most clients start with <strong>The Assessment</strong>—a 2-3 week diagnostic that gives you clarity on where you stand and what to change.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Already know what you need? We can jump straight to implementation. Either way, let&apos;s talk about your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Which Service */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Which Service Is Right for You?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border rounded-lg p-6">
                <p className="font-semibold mb-2">&ldquo;Our data is fragmented and unreliable.&rdquo;</p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Data Readiness</strong> — Clean, consolidate, and govern your data before AI.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <p className="font-semibold mb-2">&ldquo;We need to automate specific processes.&rdquo;</p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">AI Automation & Deployment</strong> — You know what&apos;s broken. We implement the fix.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <p className="font-semibold mb-2">&ldquo;We want to build an AI-powered product or tool.&rdquo;</p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">AI Application Development</strong> — Custom software that gives you a competitive edge.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <p className="font-semibold mb-2">&ldquo;We need ongoing tech leadership or IT support.&rdquo;</p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Managed Services</strong> — Fractional CTO, cloud admin, day-to-day IT. Continuous support.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <p className="font-semibold mb-2">&ldquo;We&apos;re not sure what we need yet.&rdquo;</p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">The Assessment</strong> — 2-3 weeks to clarity. We&apos;ll figure it out together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className={`group block border rounded-lg p-6 sm:p-8 transition-all hover:border-accent hover:shadow-lg ${
                      service.highlight ? "sm:col-span-2 bg-muted/30" : "bg-background"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 p-3 rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                          {service.subtitle}
                        </p>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="font-semibold">{service.pricing}</span>
                          <span className="text-muted-foreground">
                            {service.timeline}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Why We Cost Less
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We practice what we preach. Heavy use of AI tooling—coding assistants, automation frameworks, AI-powered analysis—means we can deliver enterprise-quality work with a smaller team in less time. You get the same outcomes at a fraction of what traditional consultancies charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <FAQAccordion faqs={serviceFAQs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s Talk
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Tell us what you&apos;re trying to accomplish. We&apos;ll help you figure out the right starting point—whether that&apos;s The Assessment or jumping straight to implementation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/quiz">
                  Get Your AI Readiness Score
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Strategy Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
