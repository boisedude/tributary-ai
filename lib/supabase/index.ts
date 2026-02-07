/**
 * Supabase module re-exports.
 *
 * This file maintains backward compatibility with the original lib/supabase.ts
 * by re-exporting all functions and types from the new modular structure.
 */

// Client
export { supabase } from "./client";

// Types
export type {
  QuizSubmission,
  CompanyComparison,
  AdminStats,
  AdminSubmission,
  CompanyRollup,
} from "./types";

// Utilities
export {
  extractDomain,
  isValidEmail,
  generateFingerprint,
  anonymizeEmail,
  aggregateDimensionScores,
} from "./utils";

// Quiz functions
export {
  submitQuizResults,
  retryPendingSubmission,
  getCompanyComparison,
} from "./quiz";

// Admin functions
export {
  getAdminSubmissions,
  getAdminStats,
} from "./admin";

// Analytics functions
export {
  getCompanyRollup,
  getCompaniesForRollup,
} from "./analytics";
