"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CREDENTIALS } from "@/lib/constants";

/**
 * Hero section component displayed at the top of the homepage.
 * Features animated headline, value proposition, and CTA.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <article>
      <section ref={ref} className="relative overflow-hidden hero-animated-gradient">
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          style={{ y, opacity }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Fewer systems. Fewer handoffs.
            </motion.span>
            <motion.span
              className="block mt-3 md:mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Faster decisions.
            </motion.span>
            <motion.span
              className="block mt-3 md:mt-4 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We help you get there.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/assessment">
                Start with The Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Credentials Bar */}
          <motion.div
            className="mt-16 border-t pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              {CREDENTIALS.map((credential, index) => (
                <div key={credential} className="flex items-center gap-4 sm:gap-6">
                  {index > 0 && <span className="hidden sm:block text-muted-foreground/50">•</span>}
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Illustration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-illustration.webp"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
    </article>
  );
}
