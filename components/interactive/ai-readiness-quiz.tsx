"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { UserRole } from "@/lib/quiz";
import {
  QUESTIONS,
  calculateResult,
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
} from "@/lib/quiz";
import { submitQuizResults } from "@/lib/supabase";
import { QuizRoleSelector, QuizQuestion, QuizResults, QuizResumePrompt } from "./quiz";

interface AIReadinessQuizProps {
  embedded?: boolean;
}

export function AIReadinessQuiz({ embedded = false }: AIReadinessQuizProps) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const resultsSubmittedRef = useRef(false);

  // Check for saved progress on mount
  useEffect(() => {
    const savedProgress = loadQuizProgress();
    if (savedProgress && savedProgress.currentQuestion > 0) {
      setShowResumePrompt(true);
    }
    setIsInitialized(true);
  }, []);

  // Save progress when answering (but not when viewing results)
  useEffect(() => {
    if (userRole && !showResults && Object.keys(answers).length > 0) {
      saveQuizProgress({
        userRole,
        currentQuestion,
        answers,
      });
    }
  }, [userRole, currentQuestion, answers, showResults]);

  const handleResume = useCallback(() => {
    const savedProgress = loadQuizProgress();
    if (savedProgress) {
      setUserRole(savedProgress.userRole);
      setCurrentQuestion(savedProgress.currentQuestion);
      setAnswers(savedProgress.answers);
    }
    setShowResumePrompt(false);
  }, []);

  const handleStartFresh = useCallback(() => {
    clearQuizProgress();
    setShowResumePrompt(false);
  }, []);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
        clearQuizProgress(); // Clear progress when quiz is completed
      }
    }, 300);
  }, [currentQuestion]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      clearQuizProgress();
    }
  }, [currentQuestion]);

  const resetQuiz = useCallback(() => {
    setUserRole(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    resultsSubmittedRef.current = false;
    clearQuizProgress();
  }, []);

  // Submit results to Supabase when quiz is completed
  useEffect(() => {
    if (showResults && userRole && !resultsSubmittedRef.current) {
      resultsSubmittedRef.current = true;
      const result = calculateResult(answers);

      submitQuizResults({
        user_role: userRole,
        answers,
        dimension_scores: result.dimensionScores,
        overall_score: result.totalScore,
        weighted_percentage: result.weightedPercentage,
        band: result.band,
        band_name: result.bandName,
        veto_triggered: result.vetoTriggered,
        veto_dimension: result.vetoDimension,
      }).catch(err => {
        console.error("Failed to save quiz results:", err);
      });
    }
  }, [showResults, userRole, answers]);

  // Don't render until we've checked for saved progress
  if (!isInitialized) {
    return null;
  }

  // Resume prompt
  if (showResumePrompt) {
    const savedProgress = loadQuizProgress();
    return (
      <QuizResumePrompt
        savedProgress={savedProgress!}
        onResume={handleResume}
        onStartFresh={handleStartFresh}
        embedded={embedded}
      />
    );
  }

  // Results view
  if (showResults && userRole) {
    const result = calculateResult(answers);
    return (
      <QuizResults
        result={result}
        answers={answers}
        userRole={userRole}
        onReset={resetQuiz}
        embedded={embedded}
      />
    );
  }

  // Role selector view
  if (!userRole) {
    return (
      <QuizRoleSelector
        onSelectRole={setUserRole}
        embedded={embedded}
      />
    );
  }

  // Quiz question view
  return (
    <QuizQuestion
      currentQuestion={currentQuestion}
      answers={answers}
      userRole={userRole}
      onAnswer={handleAnswer}
      onBack={handleBack}
      onNext={handleNext}
      embedded={embedded}
    />
  );
}
