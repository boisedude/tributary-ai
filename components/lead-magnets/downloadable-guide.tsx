"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { ExternalLink, FileText, CheckCircle, Loader2 } from "lucide-react";

interface DownloadableGuideProps {
  title: string;
  description: string;
  pdfUrl: string;
}

export function DownloadableGuide({ title, description, pdfUrl }: DownloadableGuideProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const isHtmlGuide = pdfUrl.endsWith('.html');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Save email to Supabase (adds to contacts as newsletter subscriber)
      const result = await subscribeToNewsletter(email);

      if (!result.success) {
        setError(result.error || "An error occurred. Please try again.");
        return;
      }

      setIsSuccess(true);
      // Open guide - HTML in new tab, PDF as download
      if (isHtmlGuide) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfUrl.split("/").pop() || "guide.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="card-glow-teal flex h-full flex-col">
      <CardHeader>
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
          <FileText className="h-7 w-7 text-accent" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor={`email-${title}`} className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id={`email-${title}`}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Access Guide
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
            <div className="rounded-full bg-accent/10 p-3">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Guide Opened!</p>
              <p className="text-sm text-muted-foreground">
                Your guide should open in a new tab. If it doesn&apos;t,{" "}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:no-underline"
                >
                  click here
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          We respect your privacy. Your email will only be used to send you valuable AI insights.
        </p>
      </CardFooter>
    </Card>
  );
}
