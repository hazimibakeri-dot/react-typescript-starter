export interface NavItem {
  to: string;
  label: string;
  /** Only mark as current on an exact match (used for the home route). */
  end?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/form', label: 'Form example' },
  { to: '/error-demo', label: 'Error boundary' },
  { to: '/about', label: 'About' },
];
