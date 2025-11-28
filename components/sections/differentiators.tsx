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
    statNumber: "100%",
    statLabel: "senior team involvement",
    title: "Senior-Level Attention",
    description:
      "No junior consultants or account managers. Every engagement is led by experienced practitioners with 25+ years of hands-on expertise in business operations and technology.",
  },
  {
    icon: Zap,
    statNumber: "2-4",
    statLabel: "weeks to first deliverables",
    title: "Speed to Value",
    description:
      "We move fast without sacrificing quality. Our lean approach and deep expertise mean you get actionable insights and working solutions in weeks, not months.",
  },
  {
    icon: Award,
    statNumber: "25+",
    statLabel: "years experience",
    title: "Proven Track Record",
    description:
      "Microsoft Partner of the Year, Google Partner of the Year, and decades of successful engagements with mid-market companies and high-growth startups.",
  },
  {
    icon: Clock,
    statNumber: "3",
    statLabel: "models available",
    title: "Flexible Engagement",
    description:
      "Choose the engagement model that fits your needs and budget—from quick assessments to full implementations to ongoing advisory retainers.",
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
              Why Choose Boutique Over Big Consulting?
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Mid-market companies deserve senior expertise without enterprise overhead
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
