import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  ThemeContext,
  type ResolvedTheme,
  type ThemeContextValue,
  type ThemePreference,
} from './theme-context';
import { readStoredPreference, writeStoredPreference } from './theme-storage';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystemTheme(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
}

function getServerTheme(): ResolvedTheme {
  return 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
  /** Used when the user has not saved a preference. Defaults to following the OS. */
  defaultPreference?: ThemePreference;
}

export function ThemeProvider({ children, defaultPreference = 'system' }: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    () => readStoredPreference() ?? defaultPreference,
  );
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme);
  const resolvedTheme: ResolvedTheme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    writeStoredPreference(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolvedTheme, setPreference, toggleTheme }),
    [preference, resolvedTheme, setPreference, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
