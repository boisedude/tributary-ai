import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Linkedin, Calendar, CheckCircle } from "lucide-react";
import { FAQSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Contact Us - Schedule Your GTM Strategy Call",
  description:
    "Schedule a strategy call with Tributary AI Systems. Cloud marketplace GTM, fractional GTM leadership, and agentic SaaS advisory. Based in Boise, Idaho, serving SaaS companies nationally.",
  keywords: [
    "SaaS GTM consulting contact",
    "cloud marketplace consultation",
    "fractional GTM consultation",
    "schedule strategy call",
    "SaaS go-to-market advisor",
    "contact Tributary AI",
  ],
  openGraph: {
    title: "Contact Tributary AI Systems - Schedule Your Strategy Call",
    description:
      "Schedule a free strategy call to discuss cloud marketplace GTM, fractional leadership, or agentic SaaS advisory.",
    type: "website",
  },
};

const faqs = [
  {
    question: "Do you work with companies outside Idaho?",
    answer: "Yes, we serve SaaS companies nationally. While we&apos;re based in Boise, Idaho, our clients are Series A-C SaaS companies across the United States.",
  },
  {
    question: "What size companies do you work with?",
    answer: "We specialize in Series A-C SaaS companies—typically post-product-market-fit and looking to accelerate GTM through cloud marketplaces or bring in senior GTM leadership on a fractional basis.",
  },
  {
    question: "What&apos;s your experience with cloud marketplaces?",
    answer: "We&apos;ve led teams to Microsoft and Google Partner of the Year recognition, built marketplace programs at Confluent and Astronomer, and have deep experience with AWS, Azure, and GCP co-sell programs.",
  },
  {
    question: "How does fractional GTM leadership work?",
    answer: "We embed as a part-time member of your team—typically 10-20 hours per week—providing the strategic leadership of a CRO or VP without the full-time cost. Engagements are typically 3+ months.",
  },
];

const expectations = [
  {
    title: "No Obligation Consultation",
    description: "Our initial conversation is completely free with no strings attached. We&apos;re here to help you understand your options.",
  },
  {
    title: "30-Minute Discovery Call",
    description: "We'll take time to understand your business, challenges, and goals to determine if AI can add value.",
  },
  {
    title: "Honest Assessment",
    description: "We'll give you a straightforward evaluation of your AI readiness and potential opportunities.",
  },
  {
    title: "Clear Next Steps",
    description: "Whether you&apos;re ready to move forward or not, you'll leave with actionable insights and a clear path forward.",
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
              Schedule a consultation to discuss how AI can transform your business.
              No pressure, no obligation—just an honest conversation about your needs.
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
                Common questions about working with Tributary AI Systems
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
              Ready to Explore AI for Your Business?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s have a conversation about where you are and where you want to go.
              No commitment required.
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
