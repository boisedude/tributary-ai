"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Check } from "lucide-react";
import type { QuizResult, UserRole } from "@/lib/quiz";
import { generateQuizPDF } from "@/lib/quiz";

interface QuizPdfDownloadProps {
  result: QuizResult;
  userRole: NonNullable<UserRole>;
  userEmail?: string;
}

export function QuizPdfDownload({ result, userRole, userEmail }: QuizPdfDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateQuizPDF(result, userRole, userEmail);
      setIsComplete(true);
      setTimeout(() => setIsComplete(false), 2000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : isComplete ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          Downloaded!
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}
