# Contributing

Thanks for taking the time to improve this project. Bug reports, documentation fixes and focused
pull requests are all welcome.

## Before you start

- For anything larger than a small fix, open an issue first so the approach can be discussed.
- Keep pull requests focused on one change. Smaller pull requests are reviewed faster.
- Do not include credentials, personal data or code you do not have the right to share.

## Development setup

```bash
npm install
npm run dev
```

Use the Node.js version in `.nvmrc` (Node 24 LTS).

## Checks

Run the full set of checks before opening a pull request. CI runs the same steps.

```bash
npm run check
```

This runs ESLint, the Prettier format check, the test suite and a production build (which includes
the TypeScript check).

## Guidelines

- Write TypeScript with strict types; avoid `any`.
- Add or update tests for behaviour you change.
- Keep components accessible: label every control, keep focus visible and support keyboard use.
- Use the semantic colour tokens from `src/index.css` instead of raw colour values.
- Update the README when you change scripts, structure or behaviour described there.

## Commit messages

Write short, imperative commit subjects, for example `Add password field example` or
`Fix focus order in mobile menu`.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
