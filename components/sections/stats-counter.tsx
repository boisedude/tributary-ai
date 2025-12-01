"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  {
    value: 25,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    value: 100,
    suffix: "+",
    label: "Successful Projects",
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

function Counter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [springValue, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function StatsCounter() {
  return (
    <article>
      <section className="relative py-24 bg-muted/50 overflow-hidden">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Proven Results That Speak for Themselves
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Decades of expertise delivering exceptional outcomes
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative rounded-2xl bg-card p-8 text-center border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                  <div className="relative">
                    <div className="text-5xl font-bold text-gradient mb-2">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-accent/0"
                    whileHover={{
                      borderColor: "oklch(0.70 0.14 180 / 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decoration line */}
          <motion.div
            className="mx-auto mt-16 h-1 w-24 rounded-full bg-gradient-to-r from-accent to-secondary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </section>
    </article>
  );
}
