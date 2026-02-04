"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

type SubmitState = "idle" | "loading" | "success" | "error";

interface NewsletterSignupProps {
  className?: string;
  variant?: "default" | "compact";
}

/**
 * Newsletter signup form component.
 * Email-only input for lower friction initial capture.
 * Shows success message with link to manage preferences.
 */
export function NewsletterSignup({ className, variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitState("loading");
    setMessage("");

    try {
      const result = await subscribeToNewsletter(email.trim());

      if (!result.success) {
        throw new Error(result.error || "Failed to subscribe");
      }

      setSubmitState("success");
      setMessage(result.isNew
        ? "Thanks for subscribing!"
        : "You're already subscribed!"
      );
      setEmail("");
    } catch (err) {
      setSubmitState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  // Success state
  if (submitState === "success") {
    return (
      <div className={className}>
        <div className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      </div>
    );
  }

  // Compact variant (just input + button in a row)
  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <label htmlFor="newsletter-email-compact" className="sr-only">
          Email Address
        </label>
        <div className="flex gap-2">
          <Input
            id="newsletter-email-compact"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (submitState === "error") {
                setSubmitState("idle");
                setMessage("");
              }
            }}
            disabled={submitState === "loading"}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={submitState === "loading" || !email.trim()}
            size="sm"
          >
            {submitState === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
        {submitState === "error" && message && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{message}</span>
          </div>
        )}
      </form>
    );
  }

  // Default variant (stacked layout)
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-2">
        <label htmlFor="newsletter-email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (submitState === "error") {
              setSubmitState("idle");
              setMessage("");
            }
          }}
          disabled={submitState === "loading"}
        />
        <Button
          type="submit"
          disabled={submitState === "loading" || !email.trim()}
          className="w-full"
        >
          {submitState === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe to Newsletter"
          )}
        </Button>
      </div>
      {submitState === "error" && message && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
