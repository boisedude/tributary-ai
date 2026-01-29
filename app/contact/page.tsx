import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Calendar, ArrowRight, CheckCircle, User } from "lucide-react";
import { COMPANY, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - Schedule a Conversation | Tributary AI",
  description:
    "Schedule a 30-minute strategy conversation with Tributary AI. AI consulting and technology strategy for mid-market companies. Based in Boise, Idaho, serving clients nationally.",
  keywords: [
    "AI consulting contact",
    "technology consulting",
    "AI assessment consultation",
    "schedule consultation",
    "mid-market consulting",
    "contact Tributary AI",
  ],
  openGraph: {
    title: "Contact Tributary AI - Schedule a Conversation",
    description:
      "Schedule a conversation about AI strategy, technology simplification, and The Assessment.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thetributary.ai/contact/",
  },
};

const callExpectations = [
  "Understand your business, technology challenges, and timeline",
  "Honest assessment of whether we're the right fit",
  "Clear recommendations on your options—no pressure",
];

const idealFor = [
  "C-level executives exploring AI strategy",
  "Operations leaders looking at process automation",
  "Tech leads managing platform decisions",
  "Companies between $10M-$500M in revenue",
];

const commonQuestions = [
  {
    q: "Is The Assessment right for us?",
    a: "We evaluate Data, People, Process, Technology, and Politics. Most mid-market companies start here—the call determines if it's right for you.",
  },
  {
    q: "How much does implementation cost?",
    a: "It depends on scope. Our heavy use of AI tooling means we deliver at 30-50% of traditional consulting costs. We'll discuss ranges on the call.",
  },
  {
    q: "How much time from our team?",
    a: "The Assessment requires about 5-10 hours from key stakeholders over two weeks. Implementation varies by service.",
  },
  {
    q: "What if we're not ready for AI?",
    a: "That's exactly what The Assessment reveals. We help you build the foundation first. Rushed AI fails—prepared AI succeeds.",
  },
];

export default function ContactPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              30 minutes to understand your situation and determine if we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Left Column - Calendar (3 cols) */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-accent" />
                    Pick a Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "600px" }}>
                    <iframe
                      src="https://cal.com/thetributary?embed=true&layout=month_view&hideBranding=true"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule a consultation with Tributary AI"
                      className="rounded-lg"
                      style={{ border: 0 }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground text-center">
                    Select a meeting type above, then pick a time that works for you.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Info (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* What Happens */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">What Happens in the Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {callExpectations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Who Should Book */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">This Call is For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {idealFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <User className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    Not sure if you fit? That&apos;s what the call is for.
                  </p>
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Reach Out Directly</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <a
                      href={`tel:${COMPANY.PHONE.replace(/[^0-9]/g, '')}`}
                      className="text-accent hover:underline"
                    >
                      {COMPANY.PHONE}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" />
                    <a
                      href="mailto:michael@thetributary.ai"
                      className="text-accent hover:underline"
                    >
                      michael@thetributary.ai
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-accent" />
                    <a
                      href="https://www.linkedin.com/company/tributaryai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions - Compact */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {commonQuestions.map((item, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <p className="font-semibold text-sm">{item.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="bg-gradient-tributary py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold">
              Not Ready to Schedule?
            </h2>
            <p className="mt-3 text-white/90">
              Take our 5-minute quiz to see where you stand, or email us with questions first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={ROUTES.QUIZ}>
                  Get Your AI Readiness Score
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="mailto:sales@thetributary.ai">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us First
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
