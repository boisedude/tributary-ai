"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ServicesOverview() {
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
            Our Services
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Comprehensive solutions to prepare your business for the AI-driven future
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg card-glow-teal">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <p className="text-sm font-medium text-accent">
                      {service.tagline}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{service.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Ideal for:</p>
                      <p className="text-sm text-muted-foreground">
                        {service.idealFor}
                      </p>
                    </div>

                    <Button asChild variant="outline" className="w-full group">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
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
