import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Briefcase, Mail } from "lucide-react";
import { EMAILS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Tributary. We're building a firm of architects and operators — people who've led transformations, not just advised on them.",
  keywords: ["careers", "AI consulting jobs", "technology careers", "Boise Idaho jobs"],
  openGraph: {
    title: "Careers | Tributary AI",
    description:
      "Join Tributary. We're building a firm of architects and operators.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Tributary AI",
    description: "Join Tributary. We're building a firm of architects and operators - people who've led transformations, not just advised on them.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/careers/`,
  },
};

const jobs = [
  {
    title: "IT Help Desk Support (Level II)",
    location: "Boise, ID",
    type: "Full-time",
    salary: "$42,000 - $65,000",
    description: "Provide technical support and troubleshooting for our managed services clients in the Boise area.",
    responsibilities: [
      "Diagnose and resolve hardware, software, and network issues",
      "Manage Active Directory user accounts and permissions",
      "Troubleshoot Microsoft Office and M365 applications",
      "Document solutions and maintain knowledge base",
      "Provide excellent customer service and de-escalation",
    ],
    requirements: [
      "2+ years IT support experience",
      "Strong knowledge of Windows OS and Microsoft 365",
      "Understanding of Active Directory, DNS, and DHCP",
      "Excellent communication and customer service skills",
      "CompTIA A+ or Network+ preferred",
    ],
  },
  {
    title: "IT Help Desk Engineer (Level III)",
    location: "Boise, ID",
    type: "Full-time",
    salary: "$65,000 - $90,000",
    description: "Senior technical role handling escalations and complex infrastructure issues for managed services clients.",
    responsibilities: [
      "Handle escalated technical issues from Level I and II support",
      "Design and implement network solutions",
      "Manage server infrastructure and cloud environments",
      "Lead technical projects and client implementations",
      "Mentor junior team members",
    ],
    requirements: [
      "5+ years IT support or systems administration experience",
      "Strong networking knowledge (TCP/IP, firewalls, VPNs)",
      "Experience with Azure and/or AWS cloud platforms",
      "Server administration (Windows Server, Active Directory)",
      "MCSE, CCNA, or equivalent certifications preferred",
    ],
  },
  {
    title: "Systems Administrator",
    location: "Boise, ID",
    type: "Full-time",
    salary: "$70,000 - $120,000",
    description: "Manage and maintain IT infrastructure for multiple managed services clients across the Boise region.",
    responsibilities: [
      "Administer Windows Server and cloud infrastructure",
      "Implement and manage backup and disaster recovery solutions",
      "Monitor system performance and security",
      "Plan and execute infrastructure upgrades and migrations",
      "Develop automation scripts to improve efficiency",
    ],
    requirements: [
      "5+ years systems administration experience",
      "Expert knowledge of Windows Server and Active Directory",
      "Experience with Microsoft Azure or AWS",
      "Strong scripting skills (PowerShell, Python)",
      "Security certifications (Security+, CISSP) a plus",
    ],
  },
];

export default function CareersPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Join Tributary
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              We&apos;re building a firm of architects and operators — people who&apos;ve led transformations, not just advised on them.
            </p>
          </div>
        </div>
      </section>

      {/* Why Tributary */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Why Tributary</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                If you&apos;ve spent years inside enterprises watching initiatives stall, and you know what actually works, we want to talk.
              </p>
              <p>
                We value people who balance leadership with building — who can architect solutions and also roll up their sleeves when needed. Our team works directly with clients, not through layers of management.
              </p>
              <p>
                Based in Eagle, Idaho, we&apos;re growing our managed services practice while expanding our strategic consulting work with mid-market companies nationally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">What We Look For</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Technical Excellence</h3>
                <p className="text-muted-foreground">
                  Deep enterprise technology experience. You&apos;ve built and maintained systems that matter.
                </p>
              </li>
              <li className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Simplification Mindset</h3>
                <p className="text-muted-foreground">
                  Bias toward simplification over complexity. You solve problems, not add tools.
                </p>
              </li>
              <li className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Client Focus</h3>
                <p className="text-muted-foreground">
                  Comfort with ambiguity and client-facing work. You communicate clearly and build trust.
                </p>
              </li>
              <li className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Idaho-Based</h3>
                <p className="text-muted-foreground">
                  For MSP roles: based in or willing to relocate to the Boise area.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-accent">
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-2">Responsibilities</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.responsibilities.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Button asChild>
                        <a href={`mailto:${EMAILS.CAREERS}?subject=Application: ${job.title}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Apply for this position
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* No Open Role */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">
              No Open Role That Fits?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We&apos;re always interested in exceptional people. If you have enterprise technology experience and share our philosophy about simplification, reach out.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href={`mailto:${EMAILS.CAREERS}`}>
                <Mail className="mr-2 h-5 w-5" />
                {EMAILS.CAREERS}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Learn More About Tributary
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Understand what we do and how we help companies simplify.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/about">
                  Meet Our Founder
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
