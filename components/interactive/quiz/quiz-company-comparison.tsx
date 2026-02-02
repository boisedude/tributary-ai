"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, TrendingDown, Minus, Building2, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompanyComparison } from "@/lib/supabase";
import type { Dimension } from "@/lib/quiz";
import { DIMENSION_INFO, DIMENSIONS } from "@/lib/quiz";

interface QuizCompanyComparisonProps {
  comparison: CompanyComparison;
  userScore: number;
  userDimensionScores: Record<Dimension, { percentage: number }>;
}

export function QuizCompanyComparison({
  comparison,
  userScore,
  userDimensionScores,
}: QuizCompanyComparisonProps) {
  const { companyDomain, totalSubmissions, averageScore, dimensionAverages, yourRank } = comparison;
  const diff = userScore - averageScore;

  // Format domain for display (remove www. if present)
  const displayDomain = companyDomain.replace(/^www\./, "");

  // Determine rank position text
  const getRankText = () => {
    if (yourRank === 1) return "Top performer";
    if (yourRank === totalSubmissions) return "Room to grow";
    if (yourRank <= Math.ceil(totalSubmissions * 0.25)) return "Above average";
    if (yourRank <= Math.ceil(totalSubmissions * 0.75)) return "Average range";
    return "Below average";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="h-5 w-5 text-accent" />
        <h3 className="font-semibold">Your Company Comparison</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        <span className="font-medium text-foreground">{totalSubmissions} people</span> from{" "}
        <span className="font-medium text-foreground">{displayDomain}</span> have taken this assessment.
      </p>

      {/* Overall comparison */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-background/60 rounded-lg">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Users className="h-3.5 w-3.5" />
            Company Average
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">{averageScore}%</span>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              diff > 0 ? "text-emerald-600 dark:text-emerald-400" :
              diff === 0 ? "text-muted-foreground" :
              "text-amber-600 dark:text-amber-400"
            )}>
              {diff > 0 ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : diff === 0 ? (
                <Minus className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {diff > 0 ? "+" : ""}{diff}%
            </div>
          </div>
        </div>

        <div className="p-3 bg-background/60 rounded-lg">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Medal className="h-3.5 w-3.5" />
            Your Rank
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">#{yourRank}</span>
            <span className="text-xs text-muted-foreground">of {totalSubmissions}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{getRankText()}</p>
        </div>
      </div>

      {/* Dimension comparison */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Dimension comparison:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DIMENSIONS.map((dim) => {
            const info = DIMENSION_INFO[dim];
            const userDimScore = Math.round(userDimensionScores[dim]?.percentage || 0);
            const companyAvg = dimensionAverages[dim] || 0;
            const dimDiff = userDimScore - companyAvg;

            return (
              <div
                key={dim}
                className="flex items-center gap-2 text-sm"
              >
                <span className={cn(info.color, "font-medium")}>{info.title}:</span>
                <DiffIndicator diff={dimDiff} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight */}
      <p className="text-xs text-muted-foreground italic mt-4">
        {diff >= 10
          ? "You're leading your organization in AI readiness. Consider championing AI initiatives."
          : diff >= 0
            ? "You're aligned with your company's overall readiness. Collaboration will be easier."
            : diff >= -10
              ? "You see some challenges others might not. Your perspective is valuable for planning."
              : "You have a unique view of organizational challenges. This awareness can drive improvement."}
      </p>
    </motion.div>
  );
}

function DiffIndicator({ diff }: { diff: number }) {
  if (diff > 5) {
    return (
      <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
        <TrendingUp className="h-3 w-3" />
        +{diff}%
      </span>
    );
  }
  if (diff < -5) {
    return (
      <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
        <TrendingDown className="h-3 w-3" />
        {diff}%
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-muted-foreground">
      <Minus className="h-3 w-3" />
      {diff > 0 ? "+" : ""}{diff}%
    </span>
  );
}
