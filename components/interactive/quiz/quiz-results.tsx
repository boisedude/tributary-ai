"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES, EXTERNAL_LINKS } from "@/lib/constants";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Loader2,
  Calendar,
  FileText,
  RotateCcw,
} from "lucide-react";
import type { QuizResult, Dimension, DimensionScore, UserRole } from "@/lib/quiz";
import { DIMENSION_INFO } from "@/lib/quiz";
import { submitQuizResults, getCompanyComparison, type CompanyComparison } from "@/lib/supabase";
import { QuizBenchmarks } from "./quiz-benchmarks";
import { QuizCompanyComparison } from "./quiz-company-comparison";
import { QuizShare } from "./quiz-share";
import { QuizPdfDownload } from "./quiz-pdf-download";

interface QuizResultsProps {
  result: QuizResult;
  answers: Record<string, number>;
  userRole: NonNullable<UserRole>;
  onReset: () => void;
  embedded?: boolean;
}

export function QuizResults({ result, answers, userRole, onReset, embedded = false }: QuizResultsProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [companyComparison, setCompanyComparison] = useState<CompanyComparison | null>(null);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);

  const isGoodResult = result.band === "foundation-ready" || result.band === "path-b-aligned";
  const isCritical = result.band === "not-ready";

  // Sort dimensions by percentage for display
  const sortedDimensions = Object.entries(result.dimensionScores)
    .sort(([, a], [, b]) => a.percentage - b.percentage) as [Dimension, DimensionScore][];

  /**
   * Handles email form submission to save quiz results.
   *
   * Flow:
   * 1. Validates email format and prevents default form submission
   * 2. Submits quiz results to Supabase via submitQuizResults()
   * 3. On success, sets emailSubmitted=true to show confirmation UI
   * 4. Fetches company comparison data if user's domain has multiple submissions
   * 5. Displays company benchmarks if available (requires 2+ submissions from same domain)
   *
   * Error handling:
   * - Network errors are caught and displayed to user via emailError state
   * - Rate limiting is handled by supabase.ts with client-side throttling
   * - Company comparison failures are silently ignored (optional feature)
   */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setIsSubmitting(true);

    try {
      await submitQuizResults({
        user_email: email,
        user_role: userRole,
        answers,
        dimension_scores: result.dimensionScores,
        overall_score: result.totalScore,
        weighted_percentage: result.weightedPercentage,
        band: result.band,
        band_name: result.bandName,
        veto_triggered: result.vetoTriggered,
        veto_dimension: result.vetoDimension,
      });

      setEmailSubmitted(true);

      // Fetch company comparison data after successful submission
      setIsLoadingComparison(true);
      try {
        const comparison = await getCompanyComparison(email, result.weightedPercentage);
        setCompanyComparison(comparison);
      } catch {
        // Silently fail - comparison is optional
      } finally {
        setIsLoadingComparison(false);
      }
    } catch {
      setEmailError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-4"
        >
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${
            isCritical
              ? "bg-red-100 dark:bg-red-900/30"
              : isGoodResult
                ? "bg-accent/10"
                : "bg-amber-100 dark:bg-amber-900/30"
          }`}>
            {isCritical ? (
              <AlertOctagon className="h-10 w-10 text-red-600 dark:text-red-400" />
            ) : isGoodResult ? (
              <CheckCircle className="h-10 w-10 text-accent" />
            ) : (
              <AlertTriangle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            )}
          </div>
        </motion.div>
        <CardTitle className="text-2xl">{result.bandName}</CardTitle>
        <CardDescription className="text-base">
          Weighted Score: <span className="font-semibold">{Math.round(result.weightedPercentage)}%</span>
          <span className="text-muted-foreground ml-2">({result.totalScore}/{result.maxScore} points)</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Veto warning */}
        {result.vetoTriggered && result.vetoDimension && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-200">Critical Weakness: {DIMENSION_INFO[result.vetoDimension].title}</p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Your score in this dimension is critically low. This must be addressed before any AI initiative can succeed.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          {result.description}
        </motion.p>

        {/* Dimension breakdown visualization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <h3 className="font-semibold">Your Dimension Breakdown:</h3>
          <div className="space-y-2">
            {sortedDimensions.map(([dim, scores], index) => {
              const info = DIMENSION_INFO[dim];
              const Icon = info.icon;
              const isWeak = scores.percentage < 50;
              const isCriticalDim = dim === result.vetoDimension;

              return (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isCriticalDim
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : isWeak
                        ? "bg-amber-50 dark:bg-amber-900/20"
                        : "bg-muted/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${info.bgColor}`}>
                    <Icon className={`h-4 w-4 ${info.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{info.title}</span>
                      <span className={`text-sm font-semibold ${
                        isCriticalDim
                          ? "text-red-600 dark:text-red-400"
                          : isWeak
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground"
                      }`}>
                        {Math.round(scores.percentage)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          isCriticalDim
                            ? "bg-red-500"
                            : isWeak
                              ? "bg-amber-500"
                              : "bg-accent"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${scores.percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground italic">
            Dimensions are weighted: Data (25%), Technology (20%), People (20%), Process (15%), Governance (10%), Politics (10%)
          </p>
        </motion.div>

        {/* Industry Benchmarks */}
        <QuizBenchmarks
          userScore={Math.round(result.weightedPercentage)}
          dimensionScores={result.dimensionScores}
        />

        {/* Company Comparison (shown after email submission if data available) */}
        {companyComparison && (
          <QuizCompanyComparison
            comparison={companyComparison}
            userScore={Math.round(result.weightedPercentage)}
            userDimensionScores={result.dimensionScores}
          />
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold mb-3">Recommendations:</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-6 border-t"
        >
          {!emailSubmitted ? (
            <>
              <h3 className="font-semibold mb-2">Save Your Results</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email to save your results and unlock company benchmarks. You can download a PDF of your results using the button below.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label htmlFor="quiz-email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="quiz-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Save My Results
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-3">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <p className="font-semibold">Results Saved!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your results have been saved. Download a PDF copy using the button below.
              </p>
              {isLoadingComparison && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading company comparison...
                </p>
              )}
              {!isLoadingComparison && companyComparison && (
                <p className="text-xs text-accent mt-2">
                  Company comparison data available above!
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-6 border-t space-y-4"
        >
          <div className="text-center">
            <h3 className="font-semibold mb-2">Ready to Discuss Your Results?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isCritical
                ? "Your results indicate critical gaps that need addressing before AI can succeed. Let's talk about building the right foundation."
                : isGoodResult
                  ? "Your organization shows strong AI readiness. Let's discuss how to capitalize on your position and move quickly."
                  : "Your results reveal specific areas for improvement. A 30-minute call can help prioritize your next steps."}
            </p>
          </div>
          <Button asChild variant="default" className="w-full group" size="lg">
            <a href={EXTERNAL_LINKS.CALENDAR} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            30 minutes. No pressure. We&apos;ll review your results and discuss practical next steps.
          </p>
          <div className="pt-4 border-t">
            <Button asChild variant="outline" className="w-full group">
              <Link href={ROUTES.ASSESSMENT}>
                Learn More About The Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </CardContent>

      <CardFooter className="border-t pt-6 flex flex-col gap-4">
        {/* Share and Download buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <QuizShare result={result} />
          <QuizPdfDownload
            result={result}
            userRole={userRole}
            userEmail={emailSubmitted ? email : undefined}
          />
        </div>

        <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
          <RotateCcw className="mr-2 h-4 w-4" />
          Take Quiz Again
        </Button>
      </CardFooter>
    </Card>
  );
}
