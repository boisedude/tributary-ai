import type { UserRole } from "./types";

const STORAGE_KEY = "tributary_quiz_progress";

export interface QuizProgress {
  userRole: NonNullable<UserRole>;
  currentQuestion: number;
  answers: Record<string, number>;
  savedAt: number;
}

/**
 * Save quiz progress to localStorage
 */
export function saveQuizProgress(progress: Omit<QuizProgress, "savedAt">): void {
  if (typeof window === "undefined") return;

  try {
    const data: QuizProgress = {
      ...progress,
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Load quiz progress from localStorage
 * Returns null if no progress exists or if it's older than 24 hours
 */
export function loadQuizProgress(): QuizProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const progress: QuizProgress = JSON.parse(stored);

    // Expire after 24 hours
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (Date.now() - progress.savedAt > twentyFourHours) {
      clearQuizProgress();
      return null;
    }

    // Validate data structure
    if (!progress.userRole || typeof progress.currentQuestion !== "number" || !progress.answers) {
      clearQuizProgress();
      return null;
    }

    return progress;
  } catch {
    clearQuizProgress();
    return null;
  }
}

/**
 * Clear saved quiz progress
 */
export function clearQuizProgress(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Check if there's saved progress without loading it
 */
export function hasSavedProgress(): boolean {
  return loadQuizProgress() !== null;
}
