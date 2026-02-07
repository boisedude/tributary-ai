/**
 * Standardized Result type for error handling.
 *
 * This module provides a type-safe way to handle success and failure cases
 * across the application, following the Result pattern common in Rust and
 * functional programming.
 *
 * @example
 * ```ts
 * async function fetchData(): Promise<Result<Data>> {
 *   try {
 *     const data = await api.getData();
 *     return ok(data);
 *   } catch (error) {
 *     return err(createError("FETCH_FAILED", "Failed to fetch data"));
 *   }
 * }
 *
 * const result = await fetchData();
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   logError(result.error);
 * }
 * ```
 */

/**
 * Error severity levels for categorizing issues.
 */
export type ErrorSeverity = "info" | "warning" | "error" | "critical";

/**
 * Standardized application error format.
 */
export interface AppError {
  /** Unique error code for programmatic handling (e.g., "RATE_LIMITED", "NETWORK_ERROR") */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Severity level for logging and alerting */
  severity: ErrorSeverity;
  /** Optional additional context */
  context?: Record<string, unknown>;
}

/**
 * Success case of a Result.
 */
export interface Success<T> {
  success: true;
  data: T;
}

/**
 * Failure case of a Result.
 */
export interface Failure<E = AppError> {
  success: false;
  error: E;
}

/**
 * Result type - either a Success with data or a Failure with an error.
 */
export type Result<T, E = AppError> = Success<T> | Failure<E>;

/**
 * Create a Success result.
 *
 * @param data - The successful result data
 * @returns A Success result containing the data
 */
export function ok<T>(data: T): Success<T> {
  return { success: true, data };
}

/**
 * Create a Failure result.
 *
 * @param error - The error object
 * @returns A Failure result containing the error
 */
export function err<E = AppError>(error: E): Failure<E> {
  return { success: false, error };
}

/**
 * Create an AppError with default severity.
 *
 * @param code - Error code for programmatic handling
 * @param message - Human-readable message
 * @param severity - Error severity level (default: "error")
 * @param context - Optional additional context
 * @returns An AppError object
 */
export function createError(
  code: string,
  message: string,
  severity: ErrorSeverity = "error",
  context?: Record<string, unknown>
): AppError {
  return { code, message, severity, context };
}

/**
 * Log an error with appropriate severity.
 * In production, this could integrate with error tracking services.
 *
 * @param error - The error to log
 */
export function logError(error: AppError): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${error.severity.toUpperCase()}] ${error.code}: ${error.message}`;

  switch (error.severity) {
    case "critical":
    case "error":
      console.error(logMessage, error.context);
      break;
    case "warning":
      console.warn(logMessage, error.context);
      break;
    case "info":
      console.info(logMessage, error.context);
      break;
  }
}

/**
 * Type guard to check if a Result is a Success.
 */
export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success;
}

/**
 * Type guard to check if a Result is a Failure.
 */
export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result.success;
}

/**
 * Unwrap a Result, throwing if it's a Failure.
 *
 * @param result - The Result to unwrap
 * @returns The data if Success
 * @throws The error if Failure
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwrap a Result with a default value if Failure.
 *
 * @param result - The Result to unwrap
 * @param defaultValue - Value to return if Failure
 * @returns The data if Success, or defaultValue if Failure
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
}
