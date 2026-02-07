import type { Dimension, DimensionScore, QuizResult, ResultBand, UserRole, QuizQuestion, QuizOption } from "./types";
import { DIMENSION_INFO, VETO_THRESHOLD, RESULT_BANDS, DIMENSIONS, MAX_QUESTION_SCORE, BAND_THRESHOLDS } from "./config";
import { QUESTIONS } from "./questions";

/**
 * Calculate quiz results with weighting and veto logic
 */
export function calculateResult(answers: Record<string, number>): QuizResult {
  const dimensionScores: Record<Dimension, DimensionScore> = {} as Record<Dimension, DimensionScore>;

  // Calculate scores per dimension
  DIMENSIONS.forEach((dim) => {
    const dimQuestions = QUESTIONS.filter(q => q.dimension === dim);
    const dimScore = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const maxScore = dimQuestions.length * MAX_QUESTION_SCORE;
    const percentage = maxScore > 0 ? (dimScore / maxScore) * 100 : 0;
    const weight = DIMENSION_INFO[dim].weight;
    const weightedScore = percentage * weight;

    dimensionScores[dim] = {
      score: dimScore,
      maxScore,
      percentage,
      weight,
      weightedScore,
    };
  });

  // Calculate totals
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxScore = QUESTIONS.length * MAX_QUESTION_SCORE;
  const percentage = (totalScore / maxScore) * 100;

  // Calculate weighted percentage
  const weightedPercentage = DIMENSIONS.reduce((sum, dim) =>
    sum + dimensionScores[dim].weightedScore, 0
  );

  // Check for veto conditions (any dimension average below threshold)
  let vetoTriggered = false;
  let vetoDimension: Dimension | undefined;

  for (const dim of DIMENSIONS) {
    const dimQuestions = QUESTIONS.filter(q => q.dimension === dim);
    const avgScore = dimQuestions.length > 0
      ? dimensionScores[dim].score / dimQuestions.length
      : 0;

    if (avgScore > 0 && avgScore < VETO_THRESHOLD) {
      vetoTriggered = true;
      vetoDimension = dim;
      break;
    }
  }

  // Determine band based on weighted percentage (with veto override)
  let band: ResultBand;

  if (vetoTriggered) {
    band = "not-ready";
  } else if (weightedPercentage <= BAND_THRESHOLDS.HIGH_COMPLEXITY) {
    band = "high-complexity";
  } else if (weightedPercentage <= BAND_THRESHOLDS.CROSSROADS) {
    band = "crossroads";
  } else if (weightedPercentage <= BAND_THRESHOLDS.FOUNDATION_READY) {
    band = "foundation-ready";
  } else {
    band = "path-b-aligned";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    weightedPercentage,
    dimensionScores,
    vetoTriggered,
    vetoDimension,
    ...RESULT_BANDS[band],
  };
}

/**
 * Get role-appropriate question text
 */
export function getQuestionText(question: QuizQuestion, userRole: UserRole): string {
  if (userRole === "business" && question.questionBusiness) {
    return question.questionBusiness;
  }
  if (userRole === "technical" && question.questionTechnical) {
    return question.questionTechnical;
  }
  return question.question;
}

/**
 * Get role-appropriate option text
 */
export function getOptionText(option: QuizOption, userRole: UserRole): string {
  if (userRole === "business" && option.textBusiness) {
    return option.textBusiness;
  }
  if (userRole === "technical" && option.textTechnical) {
    return option.textTechnical;
  }
  return option.text;
}

/**
 * Format dimension breakdown for email/reports
 */
export function formatDimensionBreakdown(dimensionScores: Record<Dimension, DimensionScore>): string {
  return Object.entries(dimensionScores)
    .map(([dim, scores]) =>
      `- ${DIMENSION_INFO[dim as Dimension].title}: ${scores.score}/${scores.maxScore} (${Math.round(scores.percentage)}%)`
    )
    .join('\n');
}

/**
 * Format detailed answers for email/reports
 */
export function formatDetailedAnswers(answers: Record<string, number>): string {
  return QUESTIONS
    .map(q => `- [${DIMENSION_INFO[q.dimension].title}] ${q.question}: ${answers[q.id] || 'Not answered'}/4`)
    .join('\n');
}
