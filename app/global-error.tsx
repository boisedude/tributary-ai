"use client";

import { useEffect } from "react";

/**
 * Global error boundary for the entire application.
 * This catches errors in the root layout and provides a minimal recovery UI.
 * Uses inline styles because global CSS may not be available during errors.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
            }}
          >
            ⚠️
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              color: "#a1a1aa",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            We encountered a critical error. Please try refreshing the page.
          </p>

          <button
            onClick={reset}
            style={{
              backgroundColor: "#14b8a6",
              color: "#0a0a0a",
              border: "none",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "0.5rem",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              backgroundColor: "transparent",
              color: "#fafafa",
              border: "1px solid #27272a",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Go Home
          </button>
        </div>
      </body>
    </html>
  );
}
