"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Briefcase, Code2 } from "lucide-react";
import type { UserRole } from "@/lib/quiz";

interface QuizRoleSelectorProps {
  onSelectRole: (role: NonNullable<UserRole>) => void;
  embedded?: boolean;
}

export function QuizRoleSelector({ onSelectRole, embedded = false }: QuizRoleSelectorProps) {
  return (
    <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">AI Readiness Assessment</CardTitle>
        <CardDescription className="text-base">
          First, tell us about your role so we can tailor the questions to your perspective.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onSelectRole("business")}
          aria-label="Select Business Leader role - for CEO, COO, GM, VP Operations, or similar. You'll see questions focused on business outcomes, ROI, and strategic readiness."
          className="w-full p-6 rounded-xl border bg-card hover:border-accent hover:shadow-lg transition-all text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0 group-hover:bg-accent/20 transition-colors">
              <Briefcase className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">I&apos;m a Business Leader</h3>
              <p className="text-sm text-muted-foreground mb-2">
                CEO, COO, GM, VP Operations, or similar
              </p>
              <p className="text-sm text-muted-foreground">
                You&apos;ll see questions focused on business outcomes, ROI, and strategic readiness.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </div>
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelectRole("technical")}
          aria-label="Select Technical Leader role - for CTO, IT Director, VP Engineering, or similar. You'll see questions with more technical depth around infrastructure and implementation."
          className="w-full p-6 rounded-xl border bg-card hover:border-accent hover:shadow-lg transition-all text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0 group-hover:bg-accent/20 transition-colors">
              <Code2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">I&apos;m a Technical Leader</h3>
              <p className="text-sm text-muted-foreground mb-2">
                CTO, IT Director, VP Engineering, or similar
              </p>
              <p className="text-sm text-muted-foreground">
                You&apos;ll see questions with more technical depth around infrastructure and implementation.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </div>
        </motion.button>
      </CardContent>

      <CardFooter className="border-t pt-6 justify-center">
        <p className="text-sm text-muted-foreground text-center">
          This helps us show you the most relevant questions. Your results will be personalized to your role.
        </p>
      </CardFooter>
    </Card>
  );
}
