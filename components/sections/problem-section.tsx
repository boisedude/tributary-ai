"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, Target, TrendingDown, AlertTriangle, Database } from "lucide-react";
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
              The problem isn&apos;t bad data. It&apos;s inaccessible data.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Most companies think their problem is &ldquo;data quality.&rdquo; That&apos;s a cop-out.
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
                <strong className="text-foreground">The real problem: inaccessible data trapped in fragmented systems.</strong>
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Your CRM has customer data. So does your ERP. So does your support platform. Each system has a record for &ldquo;Acme Corporation&rdquo;—and none of them match. Different addresses. Different contacts. Different account IDs. Which one is right? All of them. And none of them.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                When AI projects fail, it&apos;s rarely because the data is wrong. It&apos;s because the data is scattered across 30 systems that don&apos;t talk to each other.
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* The Evidence */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="text-2xl font-bold">
              The evidence is brutal
            </h3>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-destructive/10 mb-4">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <p className="text-3xl font-bold text-destructive">95%</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    of GenAI projects fail to move from pilot to production
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">MIT, 2025</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-destructive/10 mb-4">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <p className="text-3xl font-bold text-destructive">60%</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    of AI projects will be abandoned by 2026
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">Gartner</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-destructive/10 mb-4">
                    <Database className="h-5 w-5 text-destructive" />
                  </div>
                  <p className="text-3xl font-bold text-destructive">42%</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    of companies abandoned most AI initiatives in 2025
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">S&P Global</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              These aren&apos;t stupid companies. They hired data scientists, bought leading platforms, followed vendor best practices. When the failure rate is this high, the problem isn&apos;t execution. <strong className="text-foreground">It&apos;s structural.</strong>
            </p>
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
