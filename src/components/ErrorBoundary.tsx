import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorFallbackProps {
  error: Error;
  /** Clears the error and renders the children again. */
  reset: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI. Receives the error and a reset function. */
  fallback?: (props: ErrorFallbackProps) => ReactNode;
  /** Called once per caught error, e.g. to report it to a monitoring service. */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

/**
 * Catches render errors in its subtree and shows a fallback instead of a blank screen.
 * Error boundaries do not catch errors in event handlers, async code or server rendering.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  override componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.onError?.(toError(error), info);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback({ error, reset: this.reset });
    return <DefaultErrorFallback error={error} reset={this.reset} />;
  }
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="mx-auto my-12 max-w-lg rounded-xl border border-danger/40 bg-danger-soft p-6 text-fg"
    >
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted">
        An unexpected error stopped this part of the page from loading. You can try again.
      </p>
      {import.meta.env.DEV && (
        <pre className="mt-4 rounded-md bg-canvas p-3 font-mono text-xs break-words whitespace-pre-wrap">
          {error.message}
        </pre>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg hover:bg-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}
