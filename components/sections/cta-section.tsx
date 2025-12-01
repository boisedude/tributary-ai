"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="bg-gradient-tributary py-24 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to Accelerate Your GTM?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Whether you&apos;re launching on cloud marketplaces, need fractional GTM leadership, or navigating the agentic shift—let&apos;s talk about how we can help.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Strategy Call
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/services">
                <CheckCircle className="mr-2 h-5 w-5" />
                Explore Services
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            No obligation, no sales pressure. Just an honest conversation about your
            GTM challenges and how we might help.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
