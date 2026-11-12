import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';
import { SkipLink } from './SkipLink';

/** Layout route: skip link, header, routed page content and footer. */
export function AppShell() {
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const { pathname } = useLocation();

  // After client-side navigation, move focus to the main region so keyboard and
  // screen reader users start at the new content (the initial load is left alone).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink targetId="main-content" />
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
