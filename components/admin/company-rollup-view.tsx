"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import type { CompanyRollup } from "@/lib/supabase";
import { DIMENSION_INFO, DIMENSIONS, INDUSTRY_BENCHMARKS } from "@/lib/quiz";
import { generateCompanyRollupPDF } from "@/lib/quiz/company-rollup-pdf";

interface CompanyRollupViewProps {
  rollup: CompanyRollup;
  onBack: () => void;
}

export function CompanyRollupView({ rollup, onBack }: CompanyRollupViewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateCompanyRollupPDF(rollup);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const avgBenchmark = INDUSTRY_BENCHMARKS.average.overallPercentage;
  const vsAverage = rollup.averageScore - avgBenchmark;

  const bandColors: Record<string, string> = {
    "path-b-aligned": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    "foundation-ready": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "crossroads": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    "high-complexity": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "not-ready": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const bandLabels: Record<string, string> = {
    "path-b-aligned": "Path B Aligned",
    "foundation-ready": "Foundation Ready",
    "crossroads": "Crossroads",
    "high-complexity": "High Complexity",
    "not-ready": "Not Ready",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6 text-accent" />
              {rollup.domain}
            </h2>
            <p className="text-muted-foreground">
              Company AI Readiness Rollup Report
            </p>
          </div>
        </div>

        <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF Report
            </>
          )}
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rollup.totalSubmissions}</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  rollup.averageScore >= 65 ? "bg-emerald-500/10" :
                  rollup.averageScore >= 50 ? "bg-amber-500/10" :
                  "bg-red-500/10"
                }`}>
                  <TrendingUp className={`h-6 w-6 ${
                    rollup.averageScore >= 65 ? "text-emerald-500" :
                    rollup.averageScore >= 50 ? "text-amber-500" :
                    "text-red-500"
                  }`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rollup.averageScore}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${vsAverage >= 0 ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                  {vsAverage >= 0 ? (
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {vsAverage >= 0 ? "+" : ""}{vsAverage}%
                  </p>
                  <p className="text-sm text-muted-foreground">vs. Industry Avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Role Split</div>
              <div className="flex gap-2">
                {Object.entries(rollup.roleDistribution).map(([role, count]) => (
                  <div key={role} className="flex-1 text-center p-2 bg-muted/50 rounded">
                    <p className="font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">
                      {role === "business" ? "Business" : "Technical"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dimension Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Dimension Analysis</CardTitle>
              <CardDescription>
                Company averages across all 6 dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DIMENSIONS.map((dim) => {
                  const info = DIMENSION_INFO[dim];
                  const Icon = info.icon;
                  const avg = rollup.dimensionAverages[dim] || 0;
                  const isStrength = rollup.strengths.includes(dim);
                  const isWeakness = rollup.weaknesses.includes(dim);

                  return (
                    <div key={dim} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded ${info.bgColor}`}>
                            <Icon className={`h-4 w-4 ${info.color}`} />
                          </div>
                          <span className="font-medium">{info.title}</span>
                          {isStrength && (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          )}
                          {isWeakness && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <span className={`font-bold ${
                          avg >= 65 ? "text-emerald-600 dark:text-emerald-400" :
                          avg >= 50 ? "text-amber-600 dark:text-amber-400" :
                          "text-red-600 dark:text-red-400"
                        }`}>
                          {avg}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            avg >= 65 ? "bg-emerald-500" : avg >= 50 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${avg}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Band Distribution & Recommendations */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Team Distribution</CardTitle>
                <CardDescription>
                  How team members scored across result bands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(rollup.bandDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .map(([band, count]) => (
                      <div key={band} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <span className={`text-sm px-2 py-1 rounded-full ${bandColors[band]}`}>
                          {bandLabels[band] || band}
                        </span>
                        <span className="font-medium">
                          {count} ({Math.round((count / rollup.totalSubmissions) * 100)}%)
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Based on your company's aggregate scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rollup.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-accent font-bold mt-0.5">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Individual Submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Individual Assessments</CardTitle>
            <CardDescription>
              All team member submissions (emails partially anonymized)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Result</th>
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rollup.submissions.map((sub, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-2 text-sm">{sub.email}</td>
                      <td className="py-2 px-2 text-sm capitalize">{sub.role}</td>
                      <td className="py-2 px-2 text-sm font-medium">{sub.score}%</td>
                      <td className="py-2 px-2 text-sm">{sub.band}</td>
                      <td className="py-2 px-2 text-sm text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
