import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

interface ScrollRegionProps extends ComponentProps<'div'> {
  /** Accessible name announced when the region receives focus. */
  label: string;
}

/**
 * A horizontally scrollable area that keyboard users can reach. Content wider than the screen
 * (code, tables) can only be scrolled with arrow keys if its container is focusable
 * (WCAG 2.1.1 Keyboard; axe rule `scrollable-region-focusable`).
 */
export function ScrollRegion({ label, className, ...props }: ScrollRegionProps) {
  return (
    <div
      role="region"
      aria-label={label}
      // eslint-disable-next-line jsx-a11y-x/no-noninteractive-tabindex -- scrollable content must be focusable to be scrolled with a keyboard
      tabIndex={0}
      className={cn('overflow-x-auto', className)}
      {...props}
    />
  );
}
