"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import {
  Briefcase,
  Code2,
  Cog,
  ArrowRight,
  Building2,
} from "lucide-react";

interface PersonaCard {
  icon: typeof Briefcase;
  title: string;
  subtitle: string;
  painPoints: string[];
}

const PERSONAS: PersonaCard[] = [
  {
    icon: Briefcase,
    title: "Business Leaders",
    subtitle: "CEOs, COOs, GMs",
    painPoints: [
      "You know AI matters but aren't sure where to start",
      "You've seen demos but can't connect them to real ROI",
      "You need a partner who speaks business, not just tech",
      "You want results without hiring a data science team",
    ],
  },
  {
    icon: Code2,
    title: "Technical Leaders",
    subtitle: "CTOs, IT Directors, Engineering VPs",
    painPoints: [
      "Your team can build, but you need strategic direction",
      "You're drowning in vendor pitches and AI hype",
      "You want to avoid expensive pilots that don't scale",
      "You need help aligning tech capabilities with business goals",
    ],
  },
  {
    icon: Cog,
    title: "Operations Leaders",
    subtitle: "COOs, VP Operations, Process Owners",
    painPoints: [
      "Manual processes are eating your margin",
      "You know where the bottlenecks are but not how AI can help",
      "You've automated before but hit complexity walls",
      "You need practical solutions, not science projects",
    ],
  },
];

export function WhoThisIsForSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-sm font-medium text-accent mb-2">
              Who We Work With
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Is This You?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We work best with leaders who are ready to move beyond AI curiosity to AI action.
            </p>
          </motion.div>

          {/* Persona Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {PERSONAS.map((persona, index) => {
              const Icon = persona.icon;
              return (
                <motion.div
                  key={persona.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">{persona.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {persona.subtitle}
                  </p>
                  <ul className="space-y-2">
                    {persona.painPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-accent mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Company Profile Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-xl bg-muted/50 border mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Our Ideal Client Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Companies with <span className="font-medium text-foreground">$10M–$500M revenue</span> exploring AI who need both strategy and implementation. You&apos;re past the &ldquo;should we do AI?&rdquo; question and ready to figure out the &ldquo;how.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">
              Not sure if you&apos;re ready? Take our 5-minute assessment.
            </p>
            <Button asChild size="lg" className="group">
              <Link href={ROUTES.QUIZ}>
                Get Your AI Readiness Score
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
