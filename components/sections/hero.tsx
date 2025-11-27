"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Where Business Experience</span>
            <span className="block mt-2 text-gradient">
              Meets Intelligent Innovation
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-xl text-muted-foreground sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Preparing Your Business for the Agentic Era
          </motion.p>

          {/* Description */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We help companies modernize systems, processes, and strategy for
            AI-driven operations. From readiness assessment to implementation,
            we guide you through the transformation to intelligent business.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start Your AI Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </motion.div>

          {/* Credentials Bar */}
          <motion.div
            className="mt-16 border-t pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-sm font-medium text-muted-foreground">
              Trusted Expertise
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">25+</span> Years
                Experience
              </div>
              <div className="hidden sm:block">•</div>
              <div>Microsoft Partner of the Year</div>
              <div className="hidden sm:block">•</div>
              <div>Google Partner of the Year</div>
              <div className="hidden sm:block">•</div>
              <div>Cloud Marketplace Expert</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </section>
    </article>
  );
}
