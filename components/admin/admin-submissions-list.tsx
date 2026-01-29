"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  Mail,
  Building2,
  User,
  BarChart3,
} from "lucide-react";
import type { AdminSubmission } from "@/lib/supabase";

interface AdminSubmissionsListProps {
  submissions: AdminSubmission[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filters: { band?: string; domain?: string }) => void;
  onSelectSubmission: (submission: AdminSubmission) => void;
}

export function AdminSubmissionsList({
  submissions,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onFilterChange,
  onSelectSubmission,
}: AdminSubmissionsListProps) {
  const [searchDomain, setSearchDomain] = useState("");
  const [filterBand, setFilterBand] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSearch = () => {
    onFilterChange({
      domain: searchDomain || undefined,
      band: filterBand || undefined,
    });
  };

  const handleClearFilters = () => {
    setSearchDomain("");
    setFilterBand("");
    onFilterChange({});
  };

  const bandColors: Record<string, string> = {
    "path-b-aligned": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    "foundation-ready": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "crossroads": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    "high-complexity": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "not-ready": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Submissions ({totalCount})
          </CardTitle>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by domain..."
                value={searchDomain}
                onChange={(e) => setSearchDomain(e.target.value)}
                className="pl-9 w-40"
              />
            </div>

            <select
              value={filterBand}
              onChange={(e) => setFilterBand(e.target.value)}
              className="h-10 px-3 rounded-md border bg-background text-sm"
            >
              <option value="">All Bands</option>
              <option value="path-b-aligned">Path B Aligned</option>
              <option value="foundation-ready">Foundation Ready</option>
              <option value="crossroads">Crossroads</option>
              <option value="high-complexity">High Complexity</option>
              <option value="not-ready">Not Ready</option>
            </select>

            <Button variant="outline" size="sm" onClick={handleSearch}>
              <Filter className="h-4 w-4 mr-1" />
              Apply
            </Button>

            {(searchDomain || filterBand) && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No submissions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Company</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Band</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => onSelectSubmission(submission)}
                    >
                      <td className="py-3 px-2 text-sm">
                        {formatDate(submission.created_at)}
                      </td>
                      <td className="py-3 px-2 text-sm">
                        {submission.user_email || <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3 px-2 text-sm">
                        {submission.company_domain || <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3 px-2 text-sm capitalize">
                        {submission.user_role}
                      </td>
                      <td className="py-3 px-2 text-sm font-medium">
                        {Math.round(submission.weighted_percentage)}%
                      </td>
                      <td className="py-3 px-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${bandColors[submission.band] || "bg-gray-100"}`}>
                          {submission.band_name}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => onSelectSubmission(submission)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${bandColors[submission.band] || "bg-gray-100"}`}>
                      {submission.band_name}
                    </span>
                    <span className="text-lg font-bold">{Math.round(submission.weighted_percentage)}%</span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(submission.created_at)}
                    </div>
                    {submission.user_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {submission.user_email}
                      </div>
                    )}
                    {submission.company_domain && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        {submission.company_domain}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="capitalize">{submission.user_role} Leader</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <span className="text-sm px-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
