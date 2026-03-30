# Option invariants

1. **Tagged union** — A value is exactly one of `Some` or `None`; `isSome` / `isNone` are mutually exclusive.
2. **No null in `Some`** — `some(x)` requires a defined payload; use `none` for absence (law tests enforce this where applicable).
3. **Functor laws** — `map` / `flatMap` preserve `None` and only transform `Some`.
4. **Interop** — `fromNullable` / `toNullable` round-trip null/absence consistently.
