"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface EngagementModel {
  name: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  highlighted?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

const engagementModels: EngagementModel[] = [
  {
    name: "Assessment",
    tagline: "Discover Your Opportunities",
    description:
      "Quick-start diagnostic to identify AI readiness and map your transformation roadmap.",
    price: "Starting at $5,000",
    duration: "2-4 weeks",
    features: [
      "AI readiness evaluation",
      "Technology stack assessment",
      "Prioritized opportunity roadmap",
      "Quick wins identification",
      "Budget and timeline estimates",
    ],
    cta: {
      text: "Start Assessment",
      href: "/contact",
    },
  },
  {
    name: "Implementation",
    tagline: "Turn Strategy Into Reality",
    description:
      "Full-service implementation of AI systems, integrations, and intelligent workflows.",
    price: "$15,000-$75,000",
    duration: "1-3 months",
    features: [
      "Everything in Assessment",
      "AI solution implementation",
      "System integration and setup",
      "Team training and enablement",
      "Success metrics and dashboards",
      "Ongoing optimization support",
    ],
    highlighted: true,
    cta: {
      text: "Get Started",
      href: "/contact",
    },
  },
  {
    name: "Advisory Retainer",
    tagline: "Strategic Partnership",
    description:
      "Ongoing strategic guidance and support as your trusted AI and business transformation advisor.",
    price: "$3,000-$10,000/mo",
    duration: "Ongoing",
    features: [
      "Monthly strategic sessions",
      "On-demand advisory access",
      "Market intelligence and trends",
      "Vendor and tool evaluation",
      "Executive stakeholder support",
      "Continuous roadmap refinement",
    ],
    cta: {
      text: "Learn More",
      href: "/contact",
    },
  },
];

export function EngagementModels() {
  return (
    <article>
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Engagement Models
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Flexible options designed around your needs and budget
            </motion.p>
          </div>

          {/* Engagement Models Grid */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {model.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full transition-all hover:shadow-lg ${
                    model.highlighted
                      ? "border-accent shadow-lg card-glow-teal ring-2 ring-accent/20"
                      : "card-glow-teal"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{model.name}</CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {model.tagline}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      {model.description}
                    </p>
                    <div className="pt-4 border-t mt-4">
                      <div className="text-3xl font-bold">{model.price}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {model.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {model.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={model.highlighted ? "default" : "outline"}
                      className="w-full group"
                    >
                      <Link href={model.cta.href}>
                        {model.cta.text}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
