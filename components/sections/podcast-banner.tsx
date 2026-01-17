"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radio, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EXTERNAL_LINKS } from "@/lib/constants";

/**
 * Podcast banner section promoting the Agentic SaaS Talks podcast.
 * Highlights the AWS partnership and provides a direct link to the podcast.
 *
 * @returns {JSX.Element} Podcast banner with animated content and CTA
 *
 * @example
 * // Used on the homepage between Hero and StatsCounter
 * <PodcastBanner />
 */
export function PodcastBanner() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Radio className="h-7 w-7 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">Agentic SaaS Talks</h3>
                  <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300">
                    AWS Partner
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Exploring SaaS, cloud platforms, and agentic system architectures
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="group shrink-0">
              <Link
                href={EXTERNAL_LINKS.PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
