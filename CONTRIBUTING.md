# Contributing

## Versioning

This package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (semver). Update `CHANGELOG.md` for every release.

## Quality bar

- **Lint:** `npm run lint` (ESLint with type-aware rules, zero warnings).
- **Format:** `npm run format:check` (Prettier).
- **Tests:** `npm run test` (Vitest); include unit tests and functor/monad law tests.
- **Coverage:** `npm run test:coverage` must meet configured thresholds (e.g. 90% branches/functions/lines/statements).
- **Build:** `npm run build` must succeed with strict TypeScript (`strict`, `noUncheckedIndexedAccess`).
