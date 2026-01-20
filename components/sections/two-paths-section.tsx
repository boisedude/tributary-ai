"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Layers, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Two Paths section explaining Path A (add complexity) vs Path B (simplify).
 * Based on MESSAGING_FRAMEWORK.md "Two Paths" section.
 */
export function TwoPathsSection() {
  return (
    <section className="py-20">
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
              Two paths forward
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              AI will reduce your technology spend. But not in Month 3—in Year 3. The path you choose determines whether you get there.
            </p>
          </motion.div>

          {/* Two Paths Cards */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Path A */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-destructive/30 overflow-hidden">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-destructive/10 to-destructive/5">
                  <Image
                    src="/images/path-complexity.webp"
                    alt="Tangled complexity representing adding AI to existing chaos"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <Layers className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-destructive font-medium">Path A</p>
                      <h3 className="text-xl font-bold">Add AI to Existing Complexity</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    This is the default. Companies layer AI tools onto their existing technology stack, existing processes, existing organizational structure. They automate what they have rather than questioning whether they should have it.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">The result:</strong> AI amplifies complexity instead of reducing it. You&apos;re paying for legacy systems, new AI tools, integration between them, and the people to manage all three.
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    You didn&apos;t automate work. You added a verification step.
                  </p>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      This is how <span className="text-destructive font-semibold">95% of AI projects fail</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Path B */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-accent/50 card-glow-teal overflow-hidden">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                  <Image
                    src="/images/path-simplicity.webp"
                    alt="Clean flowing lines representing simplification through AI"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Minimize2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-accent font-medium">Path B</p>
                      <h3 className="text-xl font-bold">Use AI to Simplify</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    The companies that achieve real cost reduction use AI implementation as an opportunity to question everything. Which systems can be eliminated? Which processes exist only because humans couldn&apos;t handle the volume?
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">This path is harder.</strong> It requires architectural decisions, not just technology decisions. It demands executive alignment on what to keep and what to kill.
                  </p>
                  <p className="text-sm text-accent font-medium">
                    But this path actually bends the curve.
                  </p>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-accent font-semibold">We help you take Path B.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* The J-Curve Reality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">The investment reality</h3>
                <div className="grid gap-4 md:grid-cols-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Year 0</p>
                    <p className="font-semibold">Baseline</p>
                    <p className="text-xs text-muted-foreground mt-1">Current spend</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year 1</p>
                    <p className="font-semibold text-amber-500">+15-30%</p>
                    <p className="text-xs text-muted-foreground mt-1">Assessment, infrastructure, pilots</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year 2</p>
                    <p className="font-semibold">Stabilizes</p>
                    <p className="text-xs text-muted-foreground mt-1">Production deployments</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year 3+</p>
                    <p className="font-semibold text-accent">Net reduction</p>
                    <p className="text-xs text-muted-foreground mt-1">Compounding returns</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground text-center">
                  The companies that skip this curve add AI to existing complexity and wonder why costs keep climbing. The companies that compress it? They simplify first, then automate.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
