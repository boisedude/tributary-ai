"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Props for the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional callback when error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and handle React rendering errors.
 * Prevents the entire app from crashing when a component throws an error.
 *
 * @example
 * // Wrap sections of the app that might fail
 * <ErrorBoundary>
 *   <BlogPost />
 * </ErrorBoundary>
 *
 * @example
 * // With custom fallback
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 *
 * @example
 * // With error logging callback
 * <ErrorBoundary onError={(error) => logToService(error)}>
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error);
      console.error("Component stack:", errorInfo.componentStack);
    }

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button onClick={this.handleReset} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-6 max-w-full overflow-auto rounded bg-muted p-4 text-left text-xs">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Props for the SectionErrorBoundary component.
 */
interface SectionErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Section name for error messages */
  sectionName?: string;
}

/**
 * Lightweight error boundary for individual page sections.
 * Shows a minimal error state without disrupting the rest of the page.
 *
 * @param {SectionErrorBoundaryProps} props - Component props
 *
 * @example
 * <SectionErrorBoundary sectionName="Services">
 *   <ServicesOverview />
 * </SectionErrorBoundary>
 */
export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `SectionErrorBoundary (${this.props.sectionName || "unknown"}) caught an error:`,
        error
      );
      console.error("Component stack:", errorInfo.componentStack);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center py-12 text-center">
          <div className="max-w-md">
            <p className="text-muted-foreground">
              {this.props.sectionName
                ? `Unable to load ${this.props.sectionName} section.`
                : "Unable to load this section."}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
