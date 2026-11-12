import { createContext } from 'react';

export type ResolvedTheme = 'light' | 'dark';
export type ThemePreference = ResolvedTheme | 'system';

export interface ThemeContextValue {
  /** What the user chose. `system` follows the operating system setting. */
  preference: ThemePreference;
  /** The theme actually applied to the document. */
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  /** Switches between light and dark, based on the theme currently shown. */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
