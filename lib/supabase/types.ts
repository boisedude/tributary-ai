/**
 * Types for quiz submissions and admin functionality.
 */

/**
 * A quiz submission record from the database.
 */
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

/**
 * Company comparison data for users from the same domain.
 */
export interface CompanyComparison {
  companyDomain: string;
  totalSubmissions: number;
  averageScore: number;
  dimensionAverages: Record<string, number>;
  bandDistribution: Record<string, number>;
  yourRank: number; // 1 = best, N = worst
}

/**
 * Admin dashboard statistics.
 */
export interface AdminStats {
  totalSubmissions: number;
  averageScore: number;
  bandDistribution: Record<string, number>;
  roleDistribution: Record<string, number>;
  topCompanies: { domain: string; count: number; avgScore: number }[];
  recentSubmissions: number; // last 7 days
  dimensionAverages: Record<string, number>;
}

/**
 * Admin submission with required fields.
 */
export interface AdminSubmission extends QuizSubmission {
  id: string;
  created_at: string;
}

/**
 * Company rollup analysis data.
 */
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
