import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

let shouldThrow = true;

function Flaky() {
  if (shouldThrow) throw new Error('Boom');
  return <p>Recovered content</p>;
}

describe('ErrorBoundary', () => {
  // React logs caught render errors to the console; silence that expected noise.
  beforeEach(() => {
    shouldThrow = true;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('renders children when nothing throws', () => {
    shouldThrow = false;
    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });

  it('shows the default fallback and recovers after reset', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');

    shouldThrow = false;
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });

  it('supports a custom fallback and reports the error', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError} fallback={({ error }) => <p>Custom: {error.message}</p>}>
        <Flaky />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom: Boom')).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error);
  });

  it('wraps non-Error values thrown during render', () => {
    function ThrowsString(): never {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- testing non-Error throws
      throw 'plain string';
    }
    render(
      <ErrorBoundary fallback={({ error }) => <p>Caught: {error.message}</p>}>
        <ThrowsString />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Caught: plain string')).toBeInTheDocument();
  });
});
