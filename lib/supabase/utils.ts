/**
 * Utility functions for supabase operations.
 */

/**
 * Extract domain from an email address.
 *
 * @param email - Email address to extract domain from
 * @returns The domain in lowercase, or null if invalid
 *
 * @example
 * extractDomain("user@example.com") // "example.com"
 * extractDomain("user@Company.Co.Uk") // "company.co.uk"
 * extractDomain("invalid") // null
 */
export function extractDomain(email: string): string | null {
  const match = email.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Validate an email address using a stricter regex than the browser default.
 *
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,63}$/;
  return emailRegex.test(email);
}

/**
 * Generate a simple browser fingerprint for rate limiting.
 * This is intentionally simple - not for tracking, just for rate limiting.
 *
 * @returns A hash string representing the browser fingerprint
 */
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

/**
 * Helper to anonymize email for display.
 *
 * @param email - Email to anonymize
 * @returns Anonymized email showing only first few characters
 *
 * @example
 * anonymizeEmail("john.doe@example.com") // "joh***@example.com"
 */
export function anonymizeEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***@***";
  const visibleChars = Math.min(3, local.length);
  return `${local.slice(0, visibleChars)}***@${domain}`;
}

/**
 * Aggregate dimension scores from a list of submissions.
 * This deduplicates the repeated logic from getCompanyComparison, getAdminStats, and getCompanyRollup.
 *
 * @param submissions - Array of submissions with dimension_scores
 * @returns Record of dimension to average percentage
 */
export function aggregateDimensionScores(
  submissions: Array<{ dimension_scores: Record<string, { percentage: number }> | null }>
): Record<string, number> {
  const dimensionTotals: Record<string, { sum: number; count: number }> = {};

  submissions.forEach(submission => {
    if (submission.dimension_scores) {
      Object.entries(submission.dimension_scores).forEach(([dim, scores]) => {
        if (!dimensionTotals[dim]) {
          dimensionTotals[dim] = { sum: 0, count: 0 };
        }
        dimensionTotals[dim].sum += scores.percentage;
        dimensionTotals[dim].count += 1;
      });
    }
  });

  const dimensionAverages: Record<string, number> = {};
  Object.entries(dimensionTotals).forEach(([dim, totals]) => {
    dimensionAverages[dim] = Math.round(totals.sum / totals.count);
  });

  return dimensionAverages;
}

// Local storage keys
export const SUBMISSION_STORAGE_KEY = "tributary_quiz_submissions";
export const PENDING_SUBMISSION_KEY = "tributary_pending_submission";
