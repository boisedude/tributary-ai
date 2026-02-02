import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Lock,
  FileCheck,
  ClipboardList,
  Server,
  ShieldCheck,
} from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Security | Our Approach to Protecting Your Data",
  description:
    "Learn how Tributary AI protects your data through client-centric practices, secure communications, and contractual protections. Security-first consulting for AI initiatives.",
  keywords: [
    "AI consulting security",
    "data protection",
    "secure AI consulting",
    "NDA consulting",
    "enterprise security",
    "AI readiness security",
  ],
  openGraph: {
    title: "Security | Tributary AI",
    description:
      "Our approach to protecting your data. Client-centric practices, secure communications, and contractual protections.",
    type: "website",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/security/`,
  },
};

const securityPrinciples = [
  {
    icon: Server,
    title: "Your Data Stays Yours",
    description:
      "We work inside your systems, not extract data to ours. Client data stays within your infrastructure wherever possible, minimizing transfer and exposure.",
  },
  {
    icon: Lock,
    title: "Secure Communications",
    description:
      "All communications use encrypted channels. File transfers are handled securely. Our systems are protected with multi-factor authentication.",
  },
  {
    icon: FileCheck,
    title: "Contractual Protections",
    description:
      "NDAs are standard on all engagements. We provide clear data handling terms and data protection agreements tailored to your requirements.",
  },
  {
    icon: ClipboardList,
    title: "Vendor Assessment Ready",
    description:
      "We understand enterprise procurement. We're happy to complete security questionnaires and discuss your specific compliance requirements.",
  },
];

const clientBenefits = [
  "Your sensitive data never leaves your environment unnecessarily",
  "Clear contractual protections before any engagement begins",
  "Transparent about what data we access and why",
  "Flexible to work within your existing security policies",
  "No surprises about data handling practices",
];

export default function SecurityPage() {
  return (
    <article>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium tracking-wide text-accent uppercase">
                Security
              </p>
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Security Through Simplicity
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              We don&apos;t collect what we don&apos;t need. We work inside your systems rather than extracting data to ours. Our approach to security is practical, transparent, and built on decades of enterprise security experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Approach</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {securityPrinciples.map((principle, index) => (
                <div key={index} className="border rounded-lg p-6 bg-background">
                  <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent mb-4">
                    <principle.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What This Means for You */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">What This Means for You</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Working with a boutique consultancy shouldn&apos;t mean compromising on security. Here&apos;s what you can expect:
            </p>
            <ul className="space-y-4">
              {clientBenefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border rounded-lg p-8 bg-background">
              <h2 className="text-2xl font-bold mb-4">Security Expertise Built In</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our founder has a background in cybersecurity training and has spent years helping enterprise organizations understand and implement security best practices.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This isn&apos;t just a checkbox for us. We understand the real-world tradeoffs between security, usability, and getting work done. We bring that perspective to every engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Assessment Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="border-2 border-accent/30 rounded-lg p-8 bg-accent/5">
              <div className="inline-flex p-3 rounded-lg bg-accent/10 text-accent mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Is Your Organization Ready for AI—Securely?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                AI initiatives often expose security gaps that have existed for years. Suddenly, questions about data governance, access controls, and information classification become urgent.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We can review your organization&apos;s security policies to ensure you&apos;re ready to adopt AI safely. Data governance isn&apos;t just about compliance—it&apos;s the foundation that makes AI initiatives succeed.
              </p>
              <p className="text-lg font-medium mb-2">A security review can help you:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Identify gaps before they become problems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Establish data governance frameworks that enable AI</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Create policies that protect sensitive information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Build confidence with stakeholders and customers</span>
                </li>
              </ul>
              <Button asChild className="group">
                <Link href="/contact">
                  Discuss a Security Review
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Note */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">A Note on Certifications</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We&apos;re a boutique consultancy, not a large enterprise vendor. We don&apos;t hold SOC 2, ISO 27001, or similar certifications—those are designed for companies that store and process large volumes of customer data.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our model is different: we minimize the data we handle, work within your systems, and put protections in place through contracts and practices rather than third-party audits. For most mid-market engagements, this approach provides the security you need without the overhead costs that get passed on to clients.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions About Security?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              We&apos;re happy to discuss our security practices in detail, complete your vendor questionnaires, or review your requirements before any engagement begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
              >
                <Link href="/about">Learn About Our Founder</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
