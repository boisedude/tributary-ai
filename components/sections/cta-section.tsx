"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Call-to-action section component with gradient background.
 * Used at the bottom of pages to encourage user engagement.
 */
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
            Ready to Simplify?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Stop adding. Start simplifying. Let&apos;s have a direct conversation about where you are and what it will take to move faster.
          </p>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            No sales pitch. No 47-slide deck. Just a direct conversation about your situation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
