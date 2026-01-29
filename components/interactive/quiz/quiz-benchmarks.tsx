"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BarChart3, Trophy, Target } from "lucide-react";
import type { Dimension, DimensionScore } from "@/lib/quiz";
import { DIMENSION_INFO, INDUSTRY_BENCHMARKS } from "@/lib/quiz";

interface QuizBenchmarksProps {
  userScore: number;
  dimensionScores: Record<Dimension, DimensionScore>;
}

export function QuizBenchmarks({ userScore, dimensionScores }: QuizBenchmarksProps) {
  const avgBenchmark = INDUSTRY_BENCHMARKS.average;
  const topBenchmark = INDUSTRY_BENCHMARKS.topQuartile;
  const successBenchmark = INDUSTRY_BENCHMARKS.aiSuccessful;

  const vsAverage = userScore - avgBenchmark.overallPercentage;
  const vsTop = userScore - topBenchmark.overallPercentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Industry Benchmarks</h3>
      </div>

      {/* Overall comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BenchmarkCard
          label={avgBenchmark.label}
          benchmarkValue={avgBenchmark.overallPercentage}
          userValue={userScore}
          icon={<Target className="h-4 w-4" />}
        />
        <BenchmarkCard
          label={topBenchmark.label}
          benchmarkValue={topBenchmark.overallPercentage}
          userValue={userScore}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <BenchmarkCard
          label={successBenchmark.label}
          benchmarkValue={successBenchmark.overallPercentage}
          userValue={userScore}
          icon={<Trophy className="h-4 w-4" />}
        />
      </div>

      {/* Dimension comparison vs average */}
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium mb-3">Your scores vs. industry average:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(dimensionScores).map(([dim, score]) => {
            const dimension = dim as Dimension;
            const info = DIMENSION_INFO[dimension];
            const avgDim = avgBenchmark.dimensionPercentages[dimension];
            const diff = Math.round(score.percentage) - avgDim;

            return (
              <div
                key={dim}
                className="flex items-center gap-2 text-sm"
              >
                <span className={`${info.color} font-medium`}>{info.title}:</span>
                <DiffIndicator diff={diff} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Contextual insight */}
      <p className="text-xs text-muted-foreground italic">
        {vsAverage >= 15
          ? "You're significantly above average! Your organization has strong AI readiness foundations."
          : vsAverage >= 0
            ? "You're performing at or above the industry average. Focus on closing gaps in weaker dimensions."
            : vsAverage >= -15
              ? "You're slightly below average, which is common. Targeted improvements can move you up quickly."
              : "You're below average, but this means there's clear room for improvement with focused effort."}
      </p>
    </motion.div>
  );
}

interface BenchmarkCardProps {
  label: string;
  benchmarkValue: number;
  userValue: number;
  icon: React.ReactNode;
}

function BenchmarkCard({ label, benchmarkValue, userValue, icon }: BenchmarkCardProps) {
  const diff = userValue - benchmarkValue;
  const isAbove = diff > 0;
  const isEqual = diff === 0;

  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        {icon}
        {label}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold">{benchmarkValue}%</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isAbove ? "text-emerald-600 dark:text-emerald-400" :
          isEqual ? "text-muted-foreground" :
          "text-amber-600 dark:text-amber-400"
        }`}>
          {isAbove ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : isEqual ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {isAbove ? "+" : ""}{diff}%
        </div>
      </div>
    </div>
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
