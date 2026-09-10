# Ship the method verifier

Status: done (released as 2.2.0 on v2 / 1.3.0 on v1, 2026-09-10; `master` mirrored to v2)

## Problem

`MethodVerifier` (`src/verifiers/method.verifier.ts`) has existed since 1.2.0 as internal
groundwork: it has its `MethodError`, a spec (`spec/verifiers/method.verifier.spec.ts`), but
intentionally no factory method and no export from `src/index.ts` — users cannot verify
functions with it. The only check is a no-argument `throws()`, and the constructor throws
eagerly on an undefined entry instead of following the `defined()` conventions of the other
verifiers.

## Proposed solution

Make it public and complete, on both lines:

```typescript
should().method(() => service.cancel(id)).throws();
should().method(() => service.get(id)).not.throws();

// invokes the function, asserts it did not throw, returns the value for chaining
const age = should().method(() => user.age).returns();
should().number(age).positive();
```

- `method(entry)` factory method on `VerifierFactory`; export `MethodVerifier` from
  `src/index.ts`.
- `throws(...args)` — invoke with arguments; optional follow-up: accept a predicate on the
  thrown error (message/type).
- `returns(...args)` — invoke, assert no throw, return the result for further chains.
- Drop the eager constructor throw; use the standard `defined()` guard like every other
  verifier.

## Affected areas

`src/verifiers/method.verifier.ts`, `verifier.factory.ts`, `src/index.ts`,
`src/errors/method.error.ts`, `spec/verifiers/method.verifier.spec.ts`, docs
(API-Reference, a new Methods topic), `AGENTS.md` (layout table: no longer WIP).

## Implementation notes (2026-09-10, v2)

- Implemented as sketched: `MethodVerifier<R>` is generic now (`returns()` yields `R |
  undefined`), the eager constructor throw is replaced by the standard `defined()` guard,
  `throws(...args)` and `returns(...args)` invoke the function with the given arguments.
  `MethodError.returns(direct)` added; `throws()` messages unchanged.
- `not` semantics: `not.returns()` asserts the invocation throws and yields `undefined`
  (documented in Methods and the API reference). The error's shape is not inspected — any
  exception counts; a predicate on the thrown error remains a possible follow-up.
- Wired per the new-verifier pattern: `method<R>()` factory method, export in
  `src/index.ts`, specs extended (args, returns direct/not, definedness) — 452 tests green,
  build and lint clean, prettier-clean.
- Docs synced in the same wave: new Methods chapter + API-Reference-Method-Verifier page
  (registered in `s.tree`), VerifierFactory reference row, Concepts/Overview/
  General-Assertions lists, Versions changelog entry for 2.2.0.
- Remaining: port to `v1` (TS 4-safe code — no adaptation expected), release both lines
  (2.2.0 / 1.3.0), then mark this item done.

## Release

- v1 port: cherry-picks `09fe773` (implementation) and `bc185f7` (backlog proposals) — 452
  specs green under TS 4.3.5, lint clean.
- Released 2026-09-10: `2.2.0` on v2 (`latest`), `1.3.0` on v1 (`v1-latest`), `master`
  fast-forwarded to v2.
