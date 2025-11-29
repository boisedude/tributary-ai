import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Linkedin, Calendar, CheckCircle } from "lucide-react";
import { FAQSchema } from "@/components/structured-data/schemas";

export const metadata: Metadata = {
  title: "Contact Us - Schedule Your AI Consultation",
  description:
    "Schedule a consultation with Tributary AI Systems. Based in Boise, Idaho, serving clients nationally. Get expert guidance on your AI transformation journey. Free initial consultation.",
  keywords: [
    "AI consulting contact",
    "schedule AI consultation",
    "Boise AI consultant",
    "AI strategy consultation",
    "business AI advisor",
    "contact Tributary AI",
  ],
  openGraph: {
    title: "Contact Tributary AI Systems - Schedule Your Consultation",
    description:
      "Schedule a free consultation to discuss your AI transformation journey. Expert guidance for mid-market companies and startups.",
    type: "website",
  },
};

const faqs = [
  {
    question: "Do you work with companies outside Idaho?",
    answer: "Yes, we serve clients nationally. While we&apos;re based in Boise, Idaho, we work with mid-market companies and startups across the United States.",
  },
  {
    question: "What size companies do you work with?",
    answer: "We work with mid-market companies and startups from seed stage to growth. Our services are designed to scale with your needs, whether you&apos;re just exploring AI or ready to implement comprehensive solutions.",
  },
  {
    question: "Do you offer fractional/part-time engagements?",
    answer: "Yes, we offer flexible engagement models including fractional and part-time arrangements. We understand that not every company needs full-time support, and we&apos;re happy to work with you to find the right fit.",
  },
  {
    question: "How do I know if my business is ready for AI?",
    answer: "That&apos;s exactly what we help determine. Our initial consultation and readiness assessment are designed to give you an honest evaluation of where you are and what steps make sense for your business.",
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
                      src="https://calendly.com/your-calendly-link"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule a consultation"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
                      <div className="text-center p-6">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-accent" />
                        <p className="text-lg font-semibold mb-2">Calendly Integration Placeholder</p>
                        <p className="text-sm text-muted-foreground">
                          Replace the iframe src with your actual Calendly link
                        </p>
                      </div>
                    </div>
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
                        href="mailto:mcooper@mcooper.com"
                        className="text-accent hover:underline"
                      >
                        mcooper@mcooper.com
                      </a>
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
                href="mailto:mcooper@mcooper.com"
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
