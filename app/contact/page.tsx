import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Calendar, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { FAQSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Contact Us - Schedule a Conversation",
  description:
    "Schedule a conversation with Tributary AI. AI consulting and technology strategy for mid-market companies. Based in Boise, Idaho, serving clients nationally.",
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
};

const faqs = [
  {
    question: "Do you work with companies outside Idaho?",
    answer: "Yes, we serve clients nationally. While we're based in Boise, Idaho, we work with mid-market companies across the United States.",
  },
  {
    question: "What size companies do you work with?",
    answer: "We specialize in mid-market companies—typically $10M-$500M in revenue—that are looking to simplify their technology stack and leverage AI to reduce costs and move faster.",
  },
  {
    question: "What is The Assessment?",
    answer: "The Assessment is a two-week diagnostic that evaluates your organization across four dimensions: People, Process, Technology, and Politics. You get a detailed findings document, leadership presentation, and prioritized roadmap. Investment is $25K-$35K with a satisfaction guarantee.",
  },
  {
    question: "What happens after The Assessment?",
    answer: "You'll have a clear picture of where you stand and a prioritized roadmap for moving forward. Some clients implement on their own, others engage us for implementation support. There's no pressure either way—you'll have what you need to decide.",
  },
];

const expectations = [
  {
    title: "No Obligation",
    description: "Our initial conversation is completely free with no strings attached. No sales pitch, no pressure.",
  },
  {
    title: "30-Minute Discovery Call",
    description: "We'll take time to understand your business, technology challenges, and where AI might help.",
  },
  {
    title: "Honest Assessment",
    description: "We'll give you a straightforward take on your situation—including whether we're the right fit.",
  },
  {
    title: "Clear Next Steps",
    description: "You'll leave with clarity on your options and a path forward, whether that includes us or not.",
  },
];

export default function ContactPage() {
  return (
    <article className="bg-gradient-subtle">
      <FAQSchema faqs={faqs} />
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              No 47-slide deck. No sales pitch. Just a direct conversation about where you are and whether we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Calendly Embed */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Schedule a Meeting
                  </CardTitle>
                  <CardDescription>
                    Choose a time that works best for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-hidden rounded-lg border bg-muted/30" style={{ height: "600px" }}>
                    <iframe
                      src="https://calendly.com/tributary-ai/30min"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule a consultation with Tributary AI"
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-8">
              <Card className="card-glow-teal">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Reach out directly or connect with us on LinkedIn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a
                        href={`tel:${COMPANY.PHONE.replace(/[^0-9]/g, '')}`}
                        className="text-accent hover:underline"
                      >
                        {COMPANY.PHONE}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:sales@thetributary.ai"
                        className="text-accent hover:underline"
                      >
                        sales@thetributary.ai
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Or reach Michael directly:{" "}
                        <a
                          href="mailto:michael@thetributary.ai"
                          className="text-accent hover:underline"
                        >
                          michael@thetributary.ai
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">Boise, Idaho</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Serving clients nationally
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Linkedin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/company/tributaryai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Follow us on LinkedIn
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What to Expect Card */}
              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                  <CardDescription>
                    Here&apos;s what happens when you schedule a consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {expectations.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Common questions about working with Tributary AI
              </p>
            </div>

            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
              Prefer Email?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              If scheduling doesn&apos;t work, reach out directly. We&apos;ll get back to you within one business day.
            </p>
            <div className="mt-8">
              <a
                href="mailto:sales@thetributary.ai"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-lg font-medium text-primary shadow-sm transition-all hover:bg-white/90"
              >
                <Mail className="h-5 w-5" />
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
