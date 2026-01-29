import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for quiz submissions
export interface QuizSubmission {
  id?: string;
  company_name?: string;
  company_domain?: string;
  user_email?: string;
  user_role: "business" | "technical";
  answers: Record<string, number>;
  dimension_scores: Record<string, {
    score: number;
    maxScore: number;
    percentage: number;
    weight: number;
    weightedScore: number;
  }>;
  overall_score: number;
  weighted_percentage: number;
  band: string;
  band_name: string;
  veto_triggered: boolean;
  veto_dimension?: string;
  client_fingerprint?: string;
  created_at?: string;
}

// Helper to extract domain from email
export function extractDomain(email: string): string | null {
  const match = email.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  return match ? match[1].toLowerCase() : null;
}

// Generate a simple browser fingerprint for rate limiting
// This is intentionally simple - not for tracking, just for rate limiting
export function generateFingerprint(): string {
  if (typeof window === "undefined") return "";

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];

  // Simple hash function
  const str = components.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Local storage key for tracking submissions
const SUBMISSION_STORAGE_KEY = "tributary_quiz_submissions";
const PENDING_SUBMISSION_KEY = "tributary_pending_submission";

// Check if we've submitted recently (client-side throttle)
function hasRecentSubmission(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const submissions = JSON.parse(localStorage.getItem(SUBMISSION_STORAGE_KEY) || "[]");
    const oneHourAgo = Date.now() - (60 * 60 * 1000);

    // Filter to only recent submissions
    const recentSubmissions = submissions.filter((ts: number) => ts > oneHourAgo);

    // Update storage with only recent
    localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(recentSubmissions));

    // Allow up to 5 submissions per hour client-side too
    return recentSubmissions.length >= 5;
  } catch {
    return false;
  }
}

// Record a submission timestamp
function recordSubmission(): void {
  if (typeof window === "undefined") return;

  try {
    const submissions = JSON.parse(localStorage.getItem(SUBMISSION_STORAGE_KEY) || "[]");
    submissions.push(Date.now());
    localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(submissions));
  } catch {
    // Ignore storage errors
  }
}

// Store pending submission for retry
function storePendingSubmission(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PENDING_SUBMISSION_KEY, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch {
    // Ignore storage errors
  }
}

// Clear pending submission
function clearPendingSubmission(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PENDING_SUBMISSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

// Submit quiz results to Supabase with retry logic
export async function submitQuizResults(
  submission: Omit<QuizSubmission, "id" | "created_at" | "company_domain" | "client_fingerprint">,
  options: { maxRetries?: number } = {}
): Promise<{ success: boolean; error?: string; rateLimited?: boolean }> {
  const { maxRetries = 3 } = options;

  // Client-side rate limit check
  if (hasRecentSubmission()) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
      rateLimited: true,
    };
  }

  // Extract domain from email if provided
  const company_domain = submission.user_email
    ? extractDomain(submission.user_email)
    : null;

  // Generate fingerprint for rate limiting
  const client_fingerprint = generateFingerprint();

  const payload = {
    ...submission,
    company_domain,
    client_fingerprint,
  };

  // Retry loop with exponential backoff
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { error } = await supabase
        .from("quiz_submissions")
        .insert(payload);

      if (error) {
        // Check if it's a rate limit error from RLS
        if (error.message.includes("rate") || error.code === "42501") {
          return {
            success: false,
            error: "Too many submissions. Please try again later.",
            rateLimited: true,
          };
        }

        // If last attempt, fail
        if (attempt === maxRetries - 1) {
          console.error("Supabase error after retries:", error);
          storePendingSubmission(payload);
          return { success: false, error: error.message };
        }

        // Wait before retry (exponential backoff: 1s, 2s, 4s)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        continue;
      }

      // Success!
      recordSubmission();
      clearPendingSubmission();
      return { success: true };

    } catch (err) {
      // Network error - retry
      if (attempt === maxRetries - 1) {
        console.error("Quiz submission error after retries:", err);
        storePendingSubmission(payload);
        return { success: false, error: "Network error. Your results have been saved locally." };
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }

  // Should never reach here, but just in case
  return { success: false, error: "Failed to save quiz results" };
}

// Retry any pending submissions (call on page load)
export async function retryPendingSubmission(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const pending = localStorage.getItem(PENDING_SUBMISSION_KEY);
    if (!pending) return;

    const { data, timestamp } = JSON.parse(pending);

    // Only retry if less than 24 hours old
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      clearPendingSubmission();
      return;
    }

    // Try to submit
    const { error } = await supabase
      .from("quiz_submissions")
      .insert(data);

    if (!error) {
      clearPendingSubmission();
      console.log("Pending quiz submission recovered successfully");
    }
  } catch {
    // Ignore errors on retry
  }
}

// Company comparison types
export interface CompanyComparison {
  companyDomain: string;
  totalSubmissions: number;
  averageScore: number;
  dimensionAverages: Record<string, number>;
  bandDistribution: Record<string, number>;
  yourRank: number; // 1 = best, N = worst
}

// Get company comparison data (for users from the same domain)
export async function getCompanyComparison(
  email: string,
  userScore: number
): Promise<CompanyComparison | null> {
  const domain = extractDomain(email);
  if (!domain) return null;

  // Skip common personal email domains
  const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com"];
  if (personalDomains.includes(domain)) return null;

  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("weighted_percentage, dimension_scores, band")
      .eq("company_domain", domain);

    if (error || !data || data.length < 2) {
      // Need at least 2 submissions (including current user) to compare
      return null;
    }

    // Calculate averages
    const totalSubmissions = data.length;
    const averageScore = data.reduce((sum, s) => sum + s.weighted_percentage, 0) / totalSubmissions;

    // Calculate dimension averages
    const dimensionTotals: Record<string, { sum: number; count: number }> = {};
    data.forEach(submission => {
      if (submission.dimension_scores) {
        Object.entries(submission.dimension_scores).forEach(([dim, scores]) => {
          if (!dimensionTotals[dim]) {
            dimensionTotals[dim] = { sum: 0, count: 0 };
          }
          dimensionTotals[dim].sum += (scores as { percentage: number }).percentage;
          dimensionTotals[dim].count += 1;
        });
      }
    });

    const dimensionAverages: Record<string, number> = {};
    Object.entries(dimensionTotals).forEach(([dim, totals]) => {
      dimensionAverages[dim] = Math.round(totals.sum / totals.count);
    });

    // Band distribution
    const bandDistribution: Record<string, number> = {};
    data.forEach(submission => {
      const band = submission.band || "unknown";
      bandDistribution[band] = (bandDistribution[band] || 0) + 1;
    });

    // Calculate rank (1 = best)
    const sortedScores = data.map(s => s.weighted_percentage).sort((a, b) => b - a);
    const yourRank = sortedScores.findIndex(score => score <= userScore) + 1;

    return {
      companyDomain: domain,
      totalSubmissions,
      averageScore: Math.round(averageScore),
      dimensionAverages,
      bandDistribution,
      yourRank: yourRank || totalSubmissions,
    };
  } catch (err) {
    console.error("Error fetching company comparison:", err);
    return null;
  }
}

// =============================================================================
// ADMIN FUNCTIONS
// =============================================================================

export interface AdminStats {
  totalSubmissions: number;
  averageScore: number;
  bandDistribution: Record<string, number>;
  roleDistribution: Record<string, number>;
  topCompanies: { domain: string; count: number; avgScore: number }[];
  recentSubmissions: number; // last 7 days
  dimensionAverages: Record<string, number>;
}

export interface AdminSubmission extends QuizSubmission {
  id: string;
  created_at: string;
}

// Fetch all submissions for admin dashboard
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

// Get admin statistics
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

    // Dimension averages
    const dimensionTotals: Record<string, { sum: number; count: number }> = {};
    data.forEach(s => {
      if (s.dimension_scores) {
        Object.entries(s.dimension_scores).forEach(([dim, scores]) => {
          if (!dimensionTotals[dim]) {
            dimensionTotals[dim] = { sum: 0, count: 0 };
          }
          dimensionTotals[dim].sum += (scores as { percentage: number }).percentage;
          dimensionTotals[dim].count += 1;
        });
      }
    });

    const dimensionAverages: Record<string, number> = {};
    Object.entries(dimensionTotals).forEach(([dim, totals]) => {
      dimensionAverages[dim] = Math.round(totals.sum / totals.count);
    });

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

// =============================================================================
// COMPANY ROLLUP
// =============================================================================

export interface CompanyRollup {
  domain: string;
  totalSubmissions: number;
  averageScore: number;
  dimensionAverages: Record<string, number>;
  bandDistribution: Record<string, number>;
  roleDistribution: Record<string, number>;
  submissions: {
    email: string;
    role: string;
    score: number;
    band: string;
    createdAt: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// Get company rollup data (requires 3+ submissions)
export async function getCompanyRollup(domain: string): Promise<CompanyRollup | null> {
  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("*")
      .eq("company_domain", domain)
      .order("created_at", { ascending: false });

    if (error || !data || data.length < 3) {
      return null;
    }

    const totalSubmissions = data.length;

    // Average score
    const averageScore = Math.round(
      data.reduce((sum, s) => sum + s.weighted_percentage, 0) / totalSubmissions
    );

    // Dimension averages
    const dimensionTotals: Record<string, { sum: number; count: number }> = {};
    data.forEach(s => {
      if (s.dimension_scores) {
        Object.entries(s.dimension_scores).forEach(([dim, scores]) => {
          if (!dimensionTotals[dim]) {
            dimensionTotals[dim] = { sum: 0, count: 0 };
          }
          dimensionTotals[dim].sum += (scores as { percentage: number }).percentage;
          dimensionTotals[dim].count += 1;
        });
      }
    });

    const dimensionAverages: Record<string, number> = {};
    Object.entries(dimensionTotals).forEach(([dim, totals]) => {
      dimensionAverages[dim] = Math.round(totals.sum / totals.count);
    });

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

    // Individual submissions (anonymized emails)
    const submissions = data.map(s => ({
      email: s.user_email ? anonymizeEmail(s.user_email) : "Anonymous",
      role: s.user_role,
      score: Math.round(s.weighted_percentage),
      band: s.band_name,
      createdAt: s.created_at,
    }));

    // Identify strengths and weaknesses
    const sortedDimensions = Object.entries(dimensionAverages)
      .sort(([, a], [, b]) => b - a);

    const strengths = sortedDimensions
      .filter(([, score]) => score >= 65)
      .slice(0, 2)
      .map(([dim]) => dim);

    const weaknesses = sortedDimensions
      .filter(([, score]) => score < 50)
      .slice(-2)
      .map(([dim]) => dim);

    // Generate recommendations based on weaknesses
    const recommendations = generateCompanyRecommendations(dimensionAverages, averageScore);

    return {
      domain,
      totalSubmissions,
      averageScore,
      dimensionAverages,
      bandDistribution,
      roleDistribution,
      submissions,
      strengths,
      weaknesses,
      recommendations,
    };
  } catch (err) {
    console.error("Error in getCompanyRollup:", err);
    return null;
  }
}

// Helper to anonymize email for display
function anonymizeEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***@***";
  const visibleChars = Math.min(3, local.length);
  return `${local.slice(0, visibleChars)}***@${domain}`;
}

// Generate company-specific recommendations
function generateCompanyRecommendations(
  dimensionAverages: Record<string, number>,
  averageScore: number
): string[] {
  const recommendations: string[] = [];

  // Overall score recommendation
  if (averageScore < 40) {
    recommendations.push(
      "Your organization has significant foundational gaps. Consider a comprehensive AI readiness assessment before investing in AI initiatives."
    );
  } else if (averageScore < 60) {
    recommendations.push(
      "Focus on strengthening your weakest dimensions before pursuing ambitious AI projects. Quick wins can build momentum."
    );
  } else {
    recommendations.push(
      "Your organization has solid foundations. Prioritize high-impact AI use cases that leverage your strengths."
    );
  }

  // Dimension-specific recommendations
  if (dimensionAverages.data < 50) {
    recommendations.push(
      "Data readiness is a critical gap. Invest in data quality, governance, and accessibility before AI implementation."
    );
  }

  if (dimensionAverages.technology < 50) {
    recommendations.push(
      "Technology integration needs attention. Focus on API connectivity and reducing data silos."
    );
  }

  if (dimensionAverages.people < 50) {
    recommendations.push(
      "Leadership AI literacy is low. Consider executive education on AI capabilities and limitations."
    );
  }

  if (dimensionAverages.process < 50) {
    recommendations.push(
      "Process documentation is insufficient for AI automation. Document and standardize key workflows first."
    );
  }

  if (dimensionAverages.governance < 50) {
    recommendations.push(
      "AI governance framework is needed. Establish policies before scaling AI adoption."
    );
  }

  if (dimensionAverages.politics < 50) {
    recommendations.push(
      "Executive alignment on AI priorities is weak. Facilitate alignment discussions before major investments."
    );
  }

  return recommendations.slice(0, 5); // Max 5 recommendations
}

// Get list of companies eligible for rollup (3+ submissions)
export async function getCompaniesForRollup(): Promise<{ domain: string; count: number }[]> {
  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("company_domain");

    if (error || !data) {
      return [];
    }

    // Count submissions per domain
    const domainCounts: Record<string, number> = {};
    data.forEach(s => {
      if (s.company_domain) {
        domainCounts[s.company_domain] = (domainCounts[s.company_domain] || 0) + 1;
      }
    });

    // Filter to domains with 3+ submissions
    return Object.entries(domainCounts)
      .filter(([, count]) => count >= 3)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count);
  } catch (err) {
    console.error("Error in getCompaniesForRollup:", err);
    return [];
  }
}
