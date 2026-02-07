/**
 * Quiz-related supabase functions.
 */

import { supabase } from "./client";
import type { QuizSubmission, CompanyComparison } from "./types";
import {
  extractDomain,
  generateFingerprint,
  aggregateDimensionScores,
  SUBMISSION_STORAGE_KEY,
  PENDING_SUBMISSION_KEY,
} from "./utils";

/**
 * Check if we've submitted recently (client-side throttle).
 */
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

/**
 * Record a submission timestamp.
 */
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

/**
 * Store pending submission for retry.
 */
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

/**
 * Clear pending submission.
 */
function clearPendingSubmission(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PENDING_SUBMISSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Submit quiz results to Supabase with retry logic.
 *
 * @param submission - Quiz submission data (without id, created_at, company_domain, client_fingerprint)
 * @param options - Options including maxRetries
 * @returns Success/failure result with optional error message and rate limited flag
 */
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

/**
 * Retry any pending submissions (call on page load).
 */
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

// Personal email domains to skip for company comparison
const PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
];

/**
 * Get company comparison data (for users from the same domain).
 *
 * @param email - User email to extract domain from
 * @param userScore - User's weighted percentage score
 * @returns Company comparison data or null if not enough data
 */
export async function getCompanyComparison(
  email: string,
  userScore: number
): Promise<CompanyComparison | null> {
  const domain = extractDomain(email);
  if (!domain) return null;

  // Skip common personal email domains
  if (PERSONAL_DOMAINS.includes(domain)) return null;

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

    // Calculate dimension averages using utility
    const dimensionAverages = aggregateDimensionScores(data);

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
