"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Services overview section displaying all available services in a card grid.
 * Renders service data from the centralized services data file with animated cards.
 *
 * @returns {JSX.Element} Grid of service cards with hover animations
 *
 * @example
 * // Used in app/page.tsx
 * <ServicesOverview />
 *
 * @see {@link services} from data/services.ts for service definitions
 * @see {@link SERVICE_IDS} from lib/constants.ts for service identifiers
 */
export function ServicesOverview() {
  return (
    <article>
      <section className="py-24 section-divider-top">
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
            What I Actually Do
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Practical GTM work for SaaS companies navigating the agentic shift
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="h-full"
                >
                  <Card className="h-full transition-all hover:shadow-2xl card-glow-teal group relative overflow-hidden">
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />

                    <CardHeader className="relative z-10">
                      <motion.div
                        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -10, 10, 0],
                          backgroundColor: "oklch(0.70 0.14 180 / 0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Icon className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                      </motion.div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <p className="text-sm font-medium text-accent">
                        {service.tagline}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      <p className="text-muted-foreground">{service.description}</p>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Ideal for:</p>
                        <p className="text-sm text-muted-foreground">
                          {service.idealFor}
                        </p>
                      </div>

                      <Button asChild variant="outline" className="w-full group/button">
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000"
                      initial={false}
                    />
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
    </article>
  );
}
