// Types
export * from "./types";

// Configuration
export { DIMENSION_INFO, VETO_THRESHOLD, RESULT_BANDS, DIMENSIONS, INDUSTRY_BENCHMARKS, type IndustryBenchmark } from "./config";

// Questions
export { QUESTIONS } from "./questions";

// Scoring functions
export {
  calculateResult,
  getQuestionText,
  getOptionText,
  formatDimensionBreakdown,
  formatDetailedAnswers,
} from "./scoring";

// Storage (progress save/resume)
export {
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
  hasSavedProgress,
  type QuizProgress,
} from "./storage";

// PDF generation
export { generateQuizPDF } from "./pdf-generator";
export { generateCompanyRollupPDF } from "./company-rollup-pdf";
