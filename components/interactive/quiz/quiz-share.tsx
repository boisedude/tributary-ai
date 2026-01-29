"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, Twitter, Link2, Check, MessageCircle } from "lucide-react";
import type { QuizResult } from "@/lib/quiz";
import { SITE_METADATA, EXTERNAL_LINKS } from "@/lib/constants";

interface QuizShareProps {
  result: QuizResult;
}

export function QuizShare({ result }: QuizShareProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Create shareable text based on result
  const getShareText = () => {
    const score = Math.round(result.weightedPercentage);
    const baseText = `I just took the AI Readiness Assessment and scored ${score}% (${result.bandName}).`;

    if (result.band === "path-b-aligned" || result.band === "foundation-ready") {
      return `${baseText} Ready to accelerate with AI!`;
    } else if (result.band === "crossroads") {
      return `${baseText} Time to build some foundations before diving into AI.`;
    } else {
      return `${baseText} Every journey starts somewhere.`;
    }
  };

  const shareText = getShareText();
  const shareUrl = `${SITE_METADATA.URL}/quiz`;

  // LinkedIn share
  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=600");
  };

  // Twitter/X share
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&via=tributaryai`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  // Copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\nTake the quiz: ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = `${shareText}\n\nTake the quiz: ${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share Results
      </Button>

      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 p-2 bg-background border rounded-lg shadow-lg z-10 min-w-[200px]"
          >
            <p className="text-xs text-muted-foreground mb-2 px-2">Share your results:</p>

            <div className="space-y-1">
              <button
                onClick={handleLinkedInShare}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                LinkedIn
              </button>

              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Twitter className="h-4 w-4" />
                X (Twitter)
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Preview of share text */}
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground px-2 line-clamp-2">
                "{shareText}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
