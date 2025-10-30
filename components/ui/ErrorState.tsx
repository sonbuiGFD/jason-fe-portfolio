import { ReactNode } from "react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

/**
 * ErrorState Component
 *
 * Displays error messaging with optional retry functionality.
 * Shows error details in development mode.
 *
 * @example
 * ```tsx
 * <ErrorState
 *   title="Failed to load content"
 *   message="We encountered an error while fetching data."
 *   onRetry={refetchData}
 * />
 * ```
 */
export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this content. Please try again.",
  error,
  onRetry,
  action,
  className = "",
}: ErrorStateProps) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div
      className={`error-state ${className}`.trim()}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-state__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="error-state__title">{title}</h2>
      <p className="error-state__message">{message}</p>

      {isDevelopment && errorMessage && (
        <details className="error-state__details">
          <summary>Error details (development only)</summary>
          <pre className="error-state__details__code">{errorMessage}</pre>
        </details>
      )}

      {(onRetry || action) && (
        <div className="error-state__actions">
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try again
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
