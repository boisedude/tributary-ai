/**
 * Admin-related supabase functions.
 */

import { supabase } from "./client";
import type { AdminStats, AdminSubmission } from "./types";
import { aggregateDimensionScores } from "./utils";

/**
 * Fetch all submissions for admin dashboard.
 *
 * @param options - Pagination, sorting, and filtering options
 * @returns Submissions, total count, and optional error
 */
export async function getAdminSubmissions(options: {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filterBand?: string;
  filterDomain?: string;
} = {}): Promise<{ data: AdminSubmission[]; count: number; error?: string }> {
  const {
    limit = 50,
    offset = 0,
    orderBy = "created_at",
    orderDirection = "desc",
    filterBand,
    filterDomain,
  } = options;

  try {
    let query = supabase
      .from("quiz_submissions")
      .select("*", { count: "exact" })
      .order(orderBy, { ascending: orderDirection === "asc" })
      .range(offset, offset + limit - 1);

    if (filterBand) {
      query = query.eq("band", filterBand);
    }
    if (filterDomain) {
      query = query.eq("company_domain", filterDomain);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching admin submissions:", error);
      return { data: [], count: 0, error: error.message };
    }

    return { data: data || [], count: count || 0 };
  } catch (err) {
    console.error("Error in getAdminSubmissions:", err);
    return { data: [], count: 0, error: "Failed to fetch submissions" };
  }
}

/**
 * Get admin statistics.
 *
 * @returns Admin stats or null on error
 */
export async function getAdminStats(): Promise<AdminStats | null> {
  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("weighted_percentage, band, user_role, company_domain, dimension_scores, created_at");

    if (error || !data) {
      console.error("Error fetching admin stats:", error);
      return null;
    }

    const totalSubmissions = data.length;
    if (totalSubmissions === 0) {
      return {
        totalSubmissions: 0,
        averageScore: 0,
        bandDistribution: {},
        roleDistribution: {},
        topCompanies: [],
        recentSubmissions: 0,
        dimensionAverages: {},
      };
    }

    // Average score
    const averageScore = Math.round(
      data.reduce((sum, s) => sum + s.weighted_percentage, 0) / totalSubmissions
    );

    // Band distribution
    const bandDistribution: Record<string, number> = {};
    data.forEach(s => {
      bandDistribution[s.band] = (bandDistribution[s.band] || 0) + 1;
    });

    // Role distribution
    const roleDistribution: Record<string, number> = {};
    data.forEach(s => {
      roleDistribution[s.user_role] = (roleDistribution[s.user_role] || 0) + 1;
    });

    // Top companies by submission count
    const companyData: Record<string, { count: number; totalScore: number }> = {};
    data.forEach(s => {
      if (s.company_domain) {
        if (!companyData[s.company_domain]) {
          companyData[s.company_domain] = { count: 0, totalScore: 0 };
        }
        companyData[s.company_domain].count += 1;
        companyData[s.company_domain].totalScore += s.weighted_percentage;
      }
    });

    const topCompanies = Object.entries(companyData)
      .map(([domain, stats]) => ({
        domain,
        count: stats.count,
        avgScore: Math.round(stats.totalScore / stats.count),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recent submissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSubmissions = data.filter(
      s => new Date(s.created_at) > sevenDaysAgo
    ).length;

    // Dimension averages using utility
    const dimensionAverages = aggregateDimensionScores(data);

    return {
      totalSubmissions,
      averageScore,
      bandDistribution,
      roleDistribution,
      topCompanies,
      recentSubmissions,
      dimensionAverages,
    };
  } catch (err) {
    console.error("Error in getAdminStats:", err);
    return null;
  }
}
