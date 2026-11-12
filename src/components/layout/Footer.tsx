import { APP_NAME } from '../../config';
import { Container } from './Container';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {CURRENT_YEAR} {APP_NAME}. Released under the MIT License.
        </p>
        <p>Built with React, TypeScript, Vite and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}
