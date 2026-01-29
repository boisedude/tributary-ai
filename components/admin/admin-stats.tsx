"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Building2,
  Clock,
  BarChart3,
  Database,
  Server,
  Workflow,
  Shield,
  Scale,
} from "lucide-react";
import type { AdminStats } from "@/lib/supabase";
import { DIMENSION_INFO, DIMENSIONS } from "@/lib/quiz";

interface AdminStatsOverviewProps {
  stats: AdminStats;
}

export function AdminStatsOverview({ stats }: AdminStatsOverviewProps) {
  const statCards = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Companies",
      value: stats.topCompanies.length,
      icon: Building2,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Last 7 Days",
      value: stats.recentSubmissions,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  // Band colors
  const bandColors: Record<string, string> = {
    "path-b-aligned": "bg-emerald-500",
    "foundation-ready": "bg-green-500",
    "crossroads": "bg-amber-500",
    "high-complexity": "bg-orange-500",
    "not-ready": "bg-red-500",
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
      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Band Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Result Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.bandDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([band, count]) => {
                    const percentage = Math.round((count / stats.totalSubmissions) * 100);
                    return (
                      <div key={band} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{bandLabels[band] || band}</span>
                          <span className="text-muted-foreground">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bandColors[band] || "bg-gray-500"}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dimension Averages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Dimension Averages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DIMENSIONS.map((dim) => {
                  const info = DIMENSION_INFO[dim];
                  const Icon = info.icon;
                  const avg = stats.dimensionAverages[dim] || 0;
                  return (
                    <div key={dim} className="flex items-center gap-3">
                      <div className={`p-1.5 rounded ${info.bgColor}`}>
                        <Icon className={`h-4 w-4 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{info.title}</span>
                          <span className="font-medium">{avg}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              avg >= 65 ? "bg-emerald-500" : avg >= 50 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${avg}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Role Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {Object.entries(stats.roleDistribution).map(([role, count]) => {
                  const percentage = Math.round((count / stats.totalSubmissions) * 100);
                  return (
                    <div key={role} className="flex-1 text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-sm text-muted-foreground">
                        {role === "business" ? "Business Leaders" : "Technical Leaders"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">({percentage}%)</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Top Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topCompanies.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No company data available yet
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.topCompanies.slice(0, 5).map((company, index) => (
                    <div
                      key={company.domain}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-5">{index + 1}.</span>
                        <span className="font-medium">{company.domain}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{company.count} submissions</span>
                        <span className="font-medium">{company.avgScore}% avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
