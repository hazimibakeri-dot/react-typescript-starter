import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { APP_NAME } from '../../config';
import { ThemeToggle } from '../../features/theme/ThemeToggle';
import { cn } from '../../lib/cn';
import { Container } from './Container';
import { NAV_ITEMS } from './navigation';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navListId = useId();

  // Close the mobile menu with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <Link to="/" className="mr-auto rounded-md text-base font-bold tracking-tight">
          {APP_NAME}
        </Link>

        <div className="flex items-center gap-2 md:order-last">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium md:hidden"
            aria-expanded={menuOpen}
            aria-controls={navListId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
            Menu
          </button>
        </div>

        <nav aria-label="Main" className="w-full md:w-auto">
          <ul
            id={navListId}
            className={cn(
              'flex-col gap-1 pb-2 md:flex md:flex-row md:items-center md:gap-1 md:pb-0',
              menuOpen ? 'flex' : 'hidden',
            )}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent-soft text-fg'
                        : 'text-muted hover:bg-surface hover:text-fg',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
