import type { ThemePreference } from './theme-context';

/** Keep in sync with the inline script in index.html. */
export const THEME_STORAGE_KEY = 'starter-theme';

/** Reads the saved preference. Returns `null` when nothing valid is stored or storage is unavailable. */
export function readStoredPreference(): ThemePreference | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/** Saves the preference. `system` clears the saved value so the OS setting applies. */
export function writeStoredPreference(preference: ThemePreference): void {
  try {
    if (preference === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // Storage may be blocked; the theme still applies for the current session.
  }
}
