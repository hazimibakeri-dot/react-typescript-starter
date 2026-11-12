import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { systemTheme } from '../../test/media';
import { ThemeProvider } from './ThemeProvider';
import { THEME_STORAGE_KEY } from './theme-storage';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './useTheme';

function PreferenceReadout() {
  const { preference, resolvedTheme, setPreference } = useTheme();
  return (
    <div>
      <p>
        preference: {preference}, resolved: {resolvedTheme}
      </p>
      <button type="button" onClick={() => setPreference('system')}>
        Use system theme
      </button>
    </div>
  );
}

function renderWithTheme() {
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeToggle />
      <PreferenceReadout />
    </ThemeProvider>,
  );
  return { user, toggle: screen.getByRole('button', { name: 'Dark theme' }) };
}

describe('ThemeProvider', () => {
  it('follows the system light theme by default', () => {
    const { toggle } = renderWithTheme();
    expect(document.documentElement).not.toHaveClass('dark');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('preference: system, resolved: light')).toBeInTheDocument();
  });

  it('follows the system dark theme by default', () => {
    systemTheme.prefersDark = true;
    renderWithTheme();
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('toggles the theme and remembers the choice', async () => {
    const { user, toggle } = renderWithTheme();
    await user.click(toggle);
    expect(document.documentElement).toHaveClass('dark');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    await user.click(toggle);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('restores a saved preference over the system setting', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    renderWithTheme();
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByText('preference: dark, resolved: dark')).toBeInTheDocument();
  });

  it('ignores invalid stored values', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'purple');
    renderWithTheme();
    expect(screen.getByText('preference: system, resolved: light')).toBeInTheDocument();
  });

  it('clears the saved value when switching back to the system theme', async () => {
    const { user, toggle } = renderWithTheme();
    await user.click(toggle);
    await user.click(screen.getByRole('button', { name: 'Use system theme' }));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(screen.getByText('preference: system, resolved: light')).toBeInTheDocument();
  });

  it('throws a helpful error when used outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ThemeToggle />)).toThrow('useTheme must be used inside <ThemeProvider>.');
    consoleError.mockRestore();
  });
});
