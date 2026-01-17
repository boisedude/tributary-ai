"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Award, Clock } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

interface Differentiator {
  icon: React.ElementType;
  statNumber: string;
  statLabel: string;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Users,
    statNumber: "30+",
    statLabel: "years in the arena",
    title: "I've Been Here Before",
    description:
      "Client-server to web. On-prem to cloud. Now cloud to agentic. I've navigated every major platform shift at Microsoft, Citrix, Confluent, and Astronomer. This pattern is familiar—and the opportunity for competitive advantage is massive.",
  },
  {
    icon: Zap,
    statNumber: "3",
    statLabel: "cloud marketplaces",
    title: "Marketplace Reality",
    description:
      "AWS, Azure, GCP—I know the programs, the people, and the political dynamics. No theoretical frameworks. Just hard-won knowledge from years inside these ecosystems.",
  },
  {
    icon: Award,
    statNumber: "2x",
    statLabel: "Partner of the Year",
    title: "Results, Not Promises",
    description:
      "Led teams to Microsoft Partner of the Year and Google Partner of the Year. I don't just advise on partnerships—I've built the programs that win.",
  },
  {
    icon: Clock,
    statNumber: "Now",
    statLabel: "is the time to act",
    title: "Speed Matters in 2026",
    description:
      "The competitive window is open now. Companies that move first will capture market share. Those that wait will find themselves playing catch-up. I help you move—fast.",
  },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export function Differentiators() {
  return (
    <article>
      <section className="py-24 bg-muted/30 section-divider-top">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Me? Why Now?
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              The transformation is happening whether you&apos;re ready or not. I can help you navigate it.
            </motion.p>
          </div>

          {/* Differentiators Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <TiltCard key={diff.title} index={index}>
                  <Card className="h-full transition-all hover:shadow-xl card-glow-teal group">
                    <CardHeader>
                      <motion.div
                        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          className="group-hover:animate-none"
                        >
                          <Icon className="h-6 w-6 text-accent" />
                        </motion.div>
                      </motion.div>
                      <div className="mb-2">
                        <div className="text-3xl font-bold text-gradient">
                          {diff.statNumber}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {diff.statLabel}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{diff.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{diff.description}</p>
                    </CardContent>
                  </Card>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
