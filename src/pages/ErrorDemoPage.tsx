import { useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/** Throws during render once the button is pressed, to demonstrate the boundary. */
function UnstableWidget() {
  const [shouldThrow, setShouldThrow] = useState(false);
  if (shouldThrow) {
    throw new Error('Demo error: this widget failed on purpose.');
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">This widget is working normally.</p>
      <Button variant="secondary" onClick={() => setShouldThrow(true)}>
        Trigger a render error
      </Button>
    </div>
  );
}

export function ErrorDemoPage() {
  useDocumentTitle('Error boundary');

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader eyebrow="Example" title="Error boundary">
        <p>
          When a component throws while rendering, the nearest error boundary shows a fallback and
          the rest of the page keeps working.
        </p>
      </PageHeader>

      <Card className="mt-10 max-w-xl">
        <h2 className="mb-4 font-semibold">Isolated widget</h2>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <div
              role="alert"
              className="space-y-3 rounded-lg border border-danger/40 bg-danger-soft p-4"
            >
              <p className="font-semibold">The widget crashed.</p>
              <p className="text-sm text-muted">{error.message}</p>
              <Button size="sm" onClick={reset}>
                Reset widget
              </Button>
            </div>
          )}
        >
          <UnstableWidget />
        </ErrorBoundary>
      </Card>
    </Container>
  );
}
