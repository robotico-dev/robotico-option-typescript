# @robotico-dev/option

**Option (Maybe)** type for TypeScript: `Some(value) | None`. Immutable; use `match`, `map`, and `bind` to transform. Aligned with Robotico.Option (C#) and dev.robotico.option (Kotlin).

## Install

```bash
npm install @robotico-dev/option
```

**Requirements:** Node.js >= 18.

## Quick start

```ts
import {
  some,
  none,
  fromNullable,
  match,
  map,
  bind,
  getValueOr,
  getValueOrElse,
  getValueOrDefault,
  isSome,
  isNone,
} from "@robotico-dev/option";

const a = some(42);
const b = fromNullable(null); // none
const c = fromNullable(0);    // some(0)

match(a, (x) => x + 1, () => 0);     // 43
match(b, (x) => x + 1, () => 0);     // 0
map(a, (x) => x * 2);                // some(84)
bind(a, (x) => (x > 0 ? some(x) : none));

getValueOr(a, 0);       // 42 (eager default)
getValueOrElse(b, () => expensive()); // lazy default
getValueOrDefault(a);   // 42 | undefined
```

## When to use which

| Need | Use |
|------|-----|
| Create from value (non-null) | `some(value)` — throws if null/undefined |
| Create from nullable | `fromNullable(value)` → Some or None |
| Pattern match | `match(opt, onSome, onNone)` |
| Transform value | `map(opt, fn)` |
| Chain with Option-returning fn | `bind(opt, fn)` |
| Value or eager default | `getValueOr(opt, default)` |
| Value or lazy default | `getValueOrElse(opt, () => default)` |
| Value or undefined | `getValueOrDefault(opt)` |
| Convert to nullable | `toNullable(opt)` → T \| null |

## Extensions

```ts
import { tap, tapNone, recoverWith, toNullable } from "@robotico-dev/option";

tap(opt, (v) => console.log(v));   // side effect when Some; returns same option
tapNone(opt, () => console.log("none"));
recoverWith(opt, fallbackOption);   // opt if Some, else fallback
toNullable(opt);                    // value or null
```

## Async

```ts
import { mapAsync, bindAsync } from "@robotico-dev/option";

const opt = some(userId);
await mapAsync(opt, (id) => fetchUser(id));  // Promise<Option<User>>
await bindAsync(opt, (id) => fetchUserOption(id));
```

## Quality and coverage

- **Principal quality bar (10/10):** Strict TypeScript, type-aware ESLint, full JSDoc, law-based tests (functor and monad laws for Option), and coverage thresholds: **≥90%** for branches, statements, functions, and lines. CI fails if thresholds are not met. See [CHANGELOG.md](./CHANGELOG.md). Versioning: [Semantic Versioning](https://semver.org/).

## API docs

Run `npm run docs` to generate API documentation in `docs/` (requires [TypeDoc](https://typedoc.org/)).

## License

MIT. See [repository](https://github.com/robotico-dev/robotico-option-typescript) for more.
