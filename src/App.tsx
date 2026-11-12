import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './features/theme/ThemeProvider';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
