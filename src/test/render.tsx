import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '../features/theme/ThemeProvider';
import { routes } from '../routes';

/** Renders the full application at `path` using an in-memory router. */
export function renderRoute(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const user = userEvent.setup();
  const result = render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
  return { ...result, router, user };
}
