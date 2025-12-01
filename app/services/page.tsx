import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ArrowRight, Check } from "lucide-react";
import { EngagementModels } from "@/components/sections/engagement-models";

export const metadata: Metadata = {
  title: "SaaS GTM Services | Tributary AI",
  description:
    "SaaS go-to-market services: Cloud marketplace GTM for AWS, Azure, and GCP. Fractional GTM leadership for Series A-C companies. Agentic SaaS advisory for the outcome-based future.",
  keywords: [
    "SaaS GTM services",
    "cloud marketplace GTM",
    "AWS marketplace consulting",
    "Azure marketplace strategy",
    "fractional GTM leadership",
    "fractional CRO",
    "agentic SaaS advisory",
    "SaaS go-to-market",
    "co-sell programs",
  ],
  openGraph: {
    title: "SaaS GTM Services - Tributary AI",
    description:
      "Cloud marketplace GTM, fractional leadership, and agentic SaaS advisory for Series A-C SaaS companies.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              GTM Services for SaaS Companies
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Cloud marketplace acceleration, fractional GTM leadership, and strategic
              advisory for SaaS companies navigating the agentic era.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex flex-col justify-center ${isEven ? "" : "lg:order-2"}`}>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                    <p className="mt-2 text-lg font-medium text-accent">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="mt-6 space-y-2">
                      <p className="font-semibold">Ideal for:</p>
                      <p className="text-muted-foreground">{service.idealFor}</p>
                    </div>

                    <div className="mt-6">
                      <Button asChild size="lg" className="group">
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className={isEven ? "" : "lg:order-1"}>
                    <Card className="card-glow-teal">
                      <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <EngagementModels />

      {/* CTA Section */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Not Sure Where to Start?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Schedule a consultation and we&apos;ll help you determine the right
              approach for your business.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
