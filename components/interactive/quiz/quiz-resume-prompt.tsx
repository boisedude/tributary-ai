"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, RotateCcw, Clock } from "lucide-react";
import type { QuizProgress } from "@/lib/quiz";
import { QUESTIONS } from "@/lib/quiz";

interface QuizResumePromptProps {
  savedProgress: QuizProgress;
  onResume: () => void;
  onStartFresh: () => void;
  embedded?: boolean;
}

export function QuizResumePrompt({
  savedProgress,
  onResume,
  onStartFresh,
  embedded = false,
}: QuizResumePromptProps) {
  const answeredCount = Object.keys(savedProgress.answers).length;
  const totalQuestions = QUESTIONS.length;
  const percentComplete = Math.round((answeredCount / totalQuestions) * 100);

  // Format the saved time
  const savedDate = new Date(savedProgress.savedAt);
  const timeAgo = getTimeAgo(savedDate);

  return (
    <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
      <CardHeader className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
          <Clock className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription className="text-base">
          You have an assessment in progress from {timeAgo}.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress summary */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{answeredCount} of {totalQuestions} questions</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Role: <span className="font-medium text-foreground">
              {savedProgress.userRole === "business" ? "Business Leader" : "Technical Leader"}
            </span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button onClick={onResume} size="lg" className="w-full group">
            <PlayCircle className="mr-2 h-5 w-5" />
            Continue Where I Left Off
          </Button>
          <Button onClick={onStartFresh} variant="outline" size="lg" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Fresh
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-6 justify-center">
        <p className="text-xs text-muted-foreground text-center">
          Your progress is saved locally and will expire after 24 hours.
        </p>
      </CardFooter>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString();
}
