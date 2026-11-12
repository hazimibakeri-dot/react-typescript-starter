import { vi } from 'vitest';

/** Controls what `(prefers-color-scheme: dark)` reports in tests. */
export const systemTheme = { prefersDark: false };

/** jsdom does not implement matchMedia; this stub answers the colour-scheme query. */
export function installMatchMedia(): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('dark') ? systemTheme.prefersDark : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}
