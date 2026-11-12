# React TypeScript Starter

A production-oriented starter template for React applications. It gives you routing, light and dark
themes, error handling, accessible form validation and a complete quality toolchain, and stays
small enough to read and adapt quickly.

## Features

- **React 19 + TypeScript 6 + Vite 8**, with strict type checking
- **Tailwind CSS 4** with semantic design tokens (`bg-canvas`, `text-muted`, `bg-accent`, …)
- **Routing** with React Router: shared layout route, active link state (`aria-current`), 404 page
  and a route error screen
- **Responsive application shell**: sticky header, mobile menu (Escape closes it), skip link and
  footer
- **Light and dark themes** that follow the operating system, remember a manual choice and are
  applied before first paint
- **Error boundary** with a reset action, demonstrated on its own page
- **Accessible form example**: labelled fields, inline errors linked with `aria-describedby`, and an
  error summary that receives focus on a failed submit
- **Focus management** on client-side navigation and visible focus indicators
- **ESLint** (type-aware rules plus React Hooks and JSX accessibility rules) and **Prettier** (with
  Tailwind class sorting)
- **Vitest + Testing Library** tests, including automated axe-core checks for every route
- **GitHub Actions** workflow that lints, checks formatting, tests and builds

## Requirements

- Node.js 22.22 or later (Node 24 LTS is recommended; see `.nvmrc`)
- npm 10 or later

## Getting started

```bash
git clone https://github.com/hazimibakeri-dot/react-typescript-starter.git my-app
cd my-app
npm install
npm run dev
```

Vite prints the local URL (by default <http://localhost:5173>).

To rename the app, copy `.env.example` to `.env.local` and set `VITE_APP_NAME`. Only variables
prefixed with `VITE_` reach the browser, so never put secrets in them.

## Scripts

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload       |
| `npm run build`        | Type-check and build for production into `dist/`   |
| `npm run preview`      | Serve the production build locally                 |
| `npm run typecheck`    | Run the TypeScript compiler without emitting files |
| `npm run lint`         | Run ESLint (`lint:fix` to apply safe fixes)        |
| `npm run format`       | Format all files with Prettier                     |
| `npm run format:check` | Check formatting without writing                   |
| `npm test`             | Run the test suite once                            |
| `npm run test:watch`   | Run tests in watch mode                            |
| `npm run coverage`     | Run tests with a V8 coverage report                |
| `npm run check`        | Lint, check formatting, test and build             |

## Project structure

```text
src/
├── components/
│   ├── layout/          AppShell, Header, Footer, Container, PageHeader, SkipLink
│   ├── ui/              Button, Card and form field primitives
│   └── ErrorBoundary.tsx
├── features/
│   ├── contact/         Form example and its validation rules
│   └── theme/           ThemeProvider, useTheme hook and ThemeToggle
├── hooks/               useDocumentTitle
├── pages/               One component per route
├── test/                Test setup, axe helper and render helpers
├── config.ts            App name and other settings
├── routes.tsx           Route definitions
└── main.tsx             Entry point
```

## Customising

### Colours and fonts

Design tokens live in [`src/index.css`](src/index.css). The `@theme` block defines the light theme
and the `.dark` block overrides the same variables for dark mode. Components only use the semantic
names, so changing a token updates every component that uses it.

### Routes

Add a page component in `src/pages/`, then register it in [`src/routes.tsx`](src/routes.tsx). Add a
link to `NAV_ITEMS` in `src/components/layout/navigation.ts` if it belongs in the main navigation.
Call `useDocumentTitle('Your page')` in the page so the browser tab title updates.

### Forms

`src/features/contact/` shows the pattern: a pure `validate` function that is easy to unit test, and
a component that decides when errors become visible. The example does not send data; replace
`handleValidSubmit` in `ContactForm.tsx` with your API call and keep validating on the server, since
client-side checks can be bypassed.

### Error reporting

`<ErrorBoundary onError={(error, info) => …}>` is the place to send errors to a monitoring service.
Error boundaries catch errors thrown while rendering. They do not catch errors in event handlers or
asynchronous code, so handle those where they happen.

## Accessibility

What is in place:

- one `<h1>` per page, landmark regions and a skip link
- visible `:focus-visible` outlines on every interactive element
- focus moves to the main region after client-side navigation
- form fields have labels; hints and errors are linked with `aria-describedby`
- the theme toggle exposes its state with `aria-pressed`
- `prefers-reduced-motion` disables transitions

What is tested automatically: axe-core runs against each route and the form's error state in jsdom.
jsdom has no layout engine, so colour contrast is **not** checked by the unit tests. Check it in a
real browser (for example with Lighthouse or axe DevTools). Automated tools find only part of all
accessibility problems, so test keyboard navigation and screen reader output manually before release.

## Deployment

`npm run build` writes static files to `dist/`. Because the app uses browser history routing, your
host must serve `index.html` for unknown paths (a "single-page app fallback"), or direct visits to
URLs such as `/about` will return 404. Most static hosts have a setting or rewrite rule for this.
If yours does not, switch to `createHashRouter` in `src/App.tsx`.

The production bundle does not include source maps. Enable `build.sourcemap` in `vite.config.ts` if
you upload maps to an error monitoring service.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
