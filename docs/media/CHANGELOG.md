# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-03-29

### Added

- `verify` script (lint, build, coverage, docs).

## [0.1.0] - Initial release

### Added

- **Option&lt;T&gt;** — Discriminated union `Some(value) | None`; immutable.
- **some** / **none** — Constructors; `some` throws if value is null/undefined.
- **fromNullable** — Convert nullable to Option.
- **match**, **map**, **bind** — Pattern match and transformations.
- **getValueOr**, **getValueOrElse**, **getValueOrDefault**, **toNullable** — Value extraction.
- **tap**, **tapNone**, **recoverWith** — Extensions for side effects and fallback.
- **mapAsync**, **bindAsync** — Async mapping and binding.
- Law-based tests (functor and monad laws); 90% coverage thresholds.

[Unreleased]: https://github.com/robotico-dev/robotico-option-typescript/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/robotico-dev/robotico-option-typescript/releases/tag/v0.1.0
