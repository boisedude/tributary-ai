"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Call-to-action section component with gradient background.
 * Used at the bottom of pages to encourage user engagement (booking calls, exploring services).
 *
 * @returns {JSX.Element} CTA section with animated content and action buttons
 *
 * @example
 * // Used at the bottom of homepage and service pages
 * <CTASection />
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
            The Clock Is Ticking
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Every week you wait, your competitors get further ahead. The agentic transition won&apos;t wait for your next planning cycle. Let&apos;s have a direct conversation about where you are and what it will take to move.
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
                Start the Conversation
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
                See How I Work
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            No sales theater. No 47-slide decks. Just honest assessment and real talk about what you&apos;re facing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
