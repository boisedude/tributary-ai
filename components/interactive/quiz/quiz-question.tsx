"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, BookOpen, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/quiz";
import { DIMENSION_INFO, QUESTIONS, getQuestionText, getOptionText } from "@/lib/quiz";

interface QuizQuestionProps {
  currentQuestion: number;
  answers: Record<string, number>;
  userRole: NonNullable<UserRole>;
  onAnswer: (questionId: string, score: number) => void;
  onBack: () => void;
  onNext: () => void;
  embedded?: boolean;
}

export function QuizQuestion({
  currentQuestion,
  answers,
  userRole,
  onAnswer,
  onBack,
  onNext,
  embedded = false,
}: QuizQuestionProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const dimensionInfo = question ? DIMENSION_INFO[question.dimension] : null;
  const DimensionIcon = dimensionInfo?.icon;
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const hasAnswered = answers[question?.id] !== undefined;

  return (
    <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
      <CardHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {dimensionInfo && DimensionIcon && (
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium w-fit mb-2",
            dimensionInfo.bgColor,
            dimensionInfo.color
          )}>
            <DimensionIcon className="h-4 w-4" />
            {dimensionInfo.title}
            <span className="text-xs opacity-70">({Math.round(dimensionInfo.weight * 100)}% weight)</span>
          </div>
        )}

        <CardTitle className="text-xl leading-relaxed">
          {question ? getQuestionText(question, userRole) : ""}
        </CardTitle>

        {/* Why we ask this - expandable explanation */}
        {question?.explanation && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="inline-flex items-center gap-1.5 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-foreground focus-visible:underline"
              aria-expanded={showExplanation}
            >
              <HelpCircle className="h-4 w-4" />
              Why we ask this
              {showExplanation ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {question?.learnMoreUrl && (
          <Link
            href={question.learnMoreUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mt-2"
          >
            <BookOpen className="h-4 w-4" />
            Learn more about this topic
          </Link>
        )}
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {question?.options.map((option, index) => {
              const isSelected = answers[question.id] === option.score;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => onAnswer(question.id, option.score)}
                  className={cn(
                    "w-full text-left p-4 min-h-[48px] rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    isSelected
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                      : "border-border hover:border-accent/50 hover:bg-muted/50"
                  )}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm">{getOptionText(option, userRole)}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="border-t pt-6 flex justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentQuestion === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {hasAnswered && (
          <Button onClick={onNext} className="group">
            {isLastQuestion ? "See Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
