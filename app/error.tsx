"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

/**
 * Error page component for handling runtime errors in the application.
 * Automatically catches errors in child components and displays a recovery UI.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Page error:", error);
    }
  }, [error]);

  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-6">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>

      <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>

      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        We encountered an unexpected error while loading this page. Please try again or return to the homepage.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={reset} size="lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={ROUTES.HOME}>
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 max-w-2xl">
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Error details (development only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-4 text-xs">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        </div>
      )}
    </main>
  );
}
