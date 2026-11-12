import { Link } from 'react-router';
import { Container } from '../components/layout/Container';
import { buttonClassName } from '../components/ui/button-styles';
import { Card } from '../components/ui/Card';
import { ScrollRegion } from '../components/ui/ScrollRegion';
import { APP_NAME } from '../config';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FEATURES = [
  {
    title: 'Routing',
    description:
      'React Router with a shared layout route, active link states, a 404 page and a route error screen.',
  },
  {
    title: 'Light and dark themes',
    description:
      'Follows the operating system by default, remembers a manual choice, and avoids a flash on load.',
  },
  {
    title: 'Error boundaries',
    description:
      'A reusable boundary with a reset action, plus a route-level error element for router failures.',
  },
  {
    title: 'Accessible forms',
    description:
      'Labelled fields, inline errors linked with aria-describedby and a focusable error summary.',
  },
  {
    title: 'Quality tooling',
    description:
      'Strict TypeScript, type-aware ESLint with accessibility rules, and Prettier with Tailwind class sorting.',
  },
  {
    title: 'Tests included',
    description: 'Vitest and Testing Library, with automated axe-core checks for each page.',
  },
] as const;

export function HomePage() {
  useDocumentTitle();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            Starter template
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            A dependable foundation for your next React application
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted">
            {APP_NAME} bundles the essentials most projects need on day one, configured with
            sensible defaults and kept small enough to read in an afternoon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/form" className={buttonClassName('primary', 'lg')}>
              See the form example
            </Link>
            <Link to="/about" className={buttonClassName('secondary', 'lg')}>
              Project structure
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-2xl font-bold tracking-tight">What is included</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <Card className="h-full">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </Card>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-2xl font-bold tracking-tight">Quick start</h2>
        <ScrollRegion
          label="Quick start commands"
          className="mt-4 rounded-xl border border-border bg-surface"
        >
          <pre className="w-max p-4 font-mono text-sm">
            <code>{`npm install\nnpm run dev`}</code>
          </pre>
        </ScrollRegion>
      </Container>
    </>
  );
}
