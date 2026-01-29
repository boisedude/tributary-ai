"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  List,
  Building2,
  RefreshCw,
  Loader2,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminStatsOverview } from "@/components/admin/admin-stats";
import { AdminSubmissionsList } from "@/components/admin/admin-submissions-list";
import { CompanyRollupView } from "@/components/admin/company-rollup-view";
import {
  getAdminStats,
  getAdminSubmissions,
  getCompaniesForRollup,
  getCompanyRollup,
  type AdminStats,
  type AdminSubmission,
  type CompanyRollup,
} from "@/lib/supabase";

const PAGE_SIZE = 25;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data state
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ band?: string; domain?: string }>({});

  // Company rollup state
  const [companiesForRollup, setCompaniesForRollup] = useState<{ domain: string; count: number }[]>([]);
  const [selectedCompanyRollup, setSelectedCompanyRollup] = useState<CompanyRollup | null>(null);
  const [isLoadingRollup, setIsLoadingRollup] = useState(false);

  // Selected submission for detail view
  const [selectedSubmission, setSelectedSubmission] = useState<AdminSubmission | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  // Load data when authenticated
  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      // Load stats
      const statsData = await getAdminStats();
      if (statsData) {
        setStats(statsData);
      }

      // Load submissions
      const { data, count, error: subError } = await getAdminSubmissions({
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        filterBand: filters.band,
        filterDomain: filters.domain,
      });

      if (subError) {
        setError(subError);
      } else {
        setSubmissions(data);
        setSubmissionsCount(count);
      }

      // Load companies for rollup
      const companies = await getCompaniesForRollup();
      setCompaniesForRollup(companies);

    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading admin data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, currentPage, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: { band?: string; domain?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectCompany = async (domain: string) => {
    setIsLoadingRollup(true);
    try {
      const rollup = await getCompanyRollup(domain);
      setSelectedCompanyRollup(rollup);
    } catch (err) {
      console.error("Error loading company rollup:", err);
    } finally {
      setIsLoadingRollup(false);
    }
  };

  // Show login if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  // Show loading state
  if (isLoading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // Show company rollup view if selected
  if (selectedCompanyRollup) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <CompanyRollupView
            rollup={selectedCompanyRollup}
            onBack={() => setSelectedCompanyRollup(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quiz Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage and analyze quiz submissions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Refresh</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive">{error}</p>
          </motion.div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              <List className="h-4 w-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {stats ? (
              <AdminStatsOverview stats={stats} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No data available yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <AdminSubmissionsList
              submissions={submissions}
              totalCount={submissionsCount}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
              onFilterChange={handleFilterChange}
              onSelectSubmission={setSelectedSubmission}
            />

            {/* Submission Detail Modal would go here */}
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Rollups
                </CardTitle>
                <CardDescription>
                  Companies with 3+ submissions are eligible for rollup reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {companiesForRollup.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No companies have enough submissions for a rollup yet.</p>
                    <p className="text-sm mt-2">Companies need at least 3 submissions.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {companiesForRollup.map((company) => (
                      <motion.div
                        key={company.domain}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleSelectCompany(company.domain)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Building2 className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium">{company.domain}</p>
                            <p className="text-sm text-muted-foreground">
                              {company.count} submissions
                            </p>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" disabled={isLoadingRollup}>
                          {isLoadingRollup ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "View Rollup"
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
