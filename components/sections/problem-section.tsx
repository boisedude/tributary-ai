"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Problem section explaining why companies need external help.
 * Based on MESSAGING_FRAMEWORK.md "Core Positioning" section.
 */
export function ProblemSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Your roadmap is already outdated.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Most organizations are treating AI as another initiative on the to-do list. That misses the point.
            </p>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
          <Card className="mb-12">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong className="text-foreground">AI isn&apos;t additive—it&apos;s a forcing function to rethink how work gets done entirely.</strong>
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Any IT or systems project started before 2026 needs a hard look. The technology landscape shifted faster than most roadmaps anticipated. Companies are burning resources executing plans that no longer make sense.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Internal teams have too much momentum—and too much sunk cost—to call it.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Why They Can't Do It Themselves */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold">
              Why your team can&apos;t do this assessment
            </h3>
            <p className="mt-2 text-muted-foreground">
              Not because they lack talent—because they&apos;re running the business.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
            <Card className="card-glow-teal h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">No time to step back</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Day-to-day operations consume every available hour.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
            <Card className="card-glow-teal h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Eye className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">No visibility across functions</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Silos prevent seeing the full picture.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
            <Card className="card-glow-teal h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Can&apos;t recommend against own work</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No one wants to kill their own projects or restructure their own teams.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
