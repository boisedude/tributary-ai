import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getServiceById } from "@/data/services";
import { Check, ArrowRight } from "lucide-react";

const service = getServiceById("fractional-gtm");

export const metadata: Metadata = {
  title: "Fractional GTM Leadership",
  description:
    "Part-time CRO, VP Sales, and VP Partnerships services for SaaS companies. Senior GTM leadership without full-time executive overhead. Strategic sales leadership, partnerships strategy, and revenue operations expertise.",
  keywords: [
    "fractional CRO",
    "fractional VP Sales",
    "fractional GTM",
    "part-time sales leadership",
    "SaaS GTM consulting",
    "fractional VP Partnerships",
    "revenue operations consulting",
  ],
  openGraph: {
    title: "Fractional GTM Leadership Services",
    description:
      "Part-time CRO, VP Sales, and VP Partnerships services for SaaS companies. Senior GTM leadership without full-time executive overhead.",
    type: "website",
  },
};

export default function ServicePage() {
  if (!service) {
    return null;
  }

  const Icon = service.icon;

  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: "Services", href: "/services" },
                { label: service.title }
              ]}
            />
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="h-8 w-8 text-accent" />
                </div>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 text-xl font-medium text-accent sm:text-2xl">
              {service.tagline}
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
              {service.description}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
                </div>
              </div>
            </div>
      </section>

      {/* Features & Deliverables */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Features Card */}
              <Card className="card-glow-teal">
                <CardHeader>
                  <CardTitle className="text-2xl">What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Deliverables Card */}
              <Card className="card-glow-teal">
                <CardHeader>
                  <CardTitle className="text-2xl">What You Get</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
                </div>

            {/* Ideal For Section */}
            <div className="mt-12">
              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-2xl">Ideal For</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    {service.idealFor}
                  </p>
                </CardContent>
              </Card>
                </div>
              </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready for Senior GTM Leadership?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Let&apos;s discuss your GTM needs and how fractional leadership can help.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
                <Link href="/services">View All Services</Link>
              </Button>
                </div>
              </div>
            </div>
      </section>
    </article>
  );
}
