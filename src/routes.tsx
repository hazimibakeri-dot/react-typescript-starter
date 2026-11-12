import type { RouteObject } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { AboutPage } from './pages/AboutPage';
import { ErrorDemoPage } from './pages/ErrorDemoPage';
import { FormPage } from './pages/FormPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteErrorPage } from './pages/RouteErrorPage';

/**
 * Application routes. Exported separately from the router instance so tests can
 * mount the same tree with `createMemoryRouter`.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'form', element: <FormPage /> },
      { path: 'error-demo', element: <ErrorDemoPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
