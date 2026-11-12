import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { installMatchMedia, systemTheme } from './media';

beforeEach(() => {
  systemTheme.prefersDark = false;
  installMatchMedia();
  // jsdom does not implement scrolling; the router's scroll restoration calls it.
  vi.stubGlobal('scrollTo', vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  window.localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
});
