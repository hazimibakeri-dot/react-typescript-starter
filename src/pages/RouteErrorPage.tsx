import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { Container } from '../components/layout/Container';
import { buttonClassName } from '../components/ui/button-styles';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function describeError(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

/** Rendered by the router when a route fails to render or load. */
export function RouteErrorPage() {
  const error = useRouteError();
  useDocumentTitle('Error');

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div role="alert" className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mt-4 text-muted">
            This page could not be displayed. Please try again later.
          </p>
          {import.meta.env.DEV && (
            <pre className="mt-6 rounded-md border border-border bg-surface p-3 font-mono text-xs break-words whitespace-pre-wrap">
              {describeError(error)}
            </pre>
          )}
        </div>
        <Link to="/" className={buttonClassName('primary', 'md', 'mt-8')}>
          Go to the home page
        </Link>
      </Container>
    </main>
  );
}
