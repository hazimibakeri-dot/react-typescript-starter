import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { ScrollRegion } from '../components/ui/ScrollRegion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const STRUCTURE = `src/
├── components/
│   ├── layout/      App shell, header, footer, container
│   ├── ui/          Button, Card and form field primitives
│   └── ErrorBoundary.tsx
├── features/
│   ├── contact/     Form example and validation rules
│   └── theme/       Theme provider, hook and toggle
├── hooks/           Reusable hooks
├── pages/           One component per route
├── test/            Test setup and helpers
├── routes.tsx       Route definitions
└── main.tsx         Entry point`;

const SCRIPTS = [
  ['npm run dev', 'Start the development server'],
  ['npm run build', 'Type-check and create a production build in dist/'],
  ['npm run preview', 'Serve the production build locally'],
  ['npm run lint', 'Run ESLint'],
  ['npm run format', 'Format files with Prettier'],
  ['npm test', 'Run the test suite once'],
  ['npm run check', 'Lint, format check, test and build'],
] as const;

export function AboutPage() {
  useDocumentTitle('About');

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader eyebrow="Guide" title="About this starter">
        <p>
          The structure groups code by feature where it helps and keeps shared building blocks in
          one place. Nothing here is mandatory: rename, move or delete what you do not need.
        </p>
      </PageHeader>

      <section aria-labelledby="structure-heading" className="mt-12">
        <h2 id="structure-heading" className="text-xl font-bold">
          Project structure
        </h2>
        <ScrollRegion
          label="Directory tree"
          className="mt-4 rounded-xl border border-border bg-surface"
        >
          <pre className="w-max p-4 font-mono text-sm leading-relaxed">
            <code>{STRUCTURE}</code>
          </pre>
        </ScrollRegion>
      </section>

      <section aria-labelledby="scripts-heading" className="mt-12">
        <h2 id="scripts-heading" className="text-xl font-bold">
          Scripts
        </h2>
        <ScrollRegion label="Scripts table" className="mt-4 rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Command
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {SCRIPTS.map(([command, purpose]) => (
                <tr key={command} className="border-t border-border">
                  <td className="px-4 py-3 font-mono whitespace-nowrap">{command}</td>
                  <td className="px-4 py-3 text-muted">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </section>
    </Container>
  );
}
