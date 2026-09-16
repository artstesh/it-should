# Factory-level absence checks: undefined/null

Status: done (v2 + v1, specs, docs)

## Problem

The factory's only untyped immediate checks are `true()` / `false()`. There is no
`should().undefined(x)` / `should().null(x)` for arbitrary values. Typed verifiers expose
`defined()` (invertible via `not`), but a spec holding an `unknown` or union value must
detour through booleans or force a verifier kind, losing the descriptive failure message.
An external feature request (reported against 2.0.1, still absent on 2.2.1) asks exactly for
`should().undefined(x)`.

## Proposed solution

Follow the `true` / `false` immediate-check pattern on `VerifierFactory`:

```typescript
should().undefined(value); // throws unless value is undefined
should().null(value);      // throws unless value is null
```

Open questions to settle before implementation:

- Strictness: strict comparison (`=== undefined` / `=== null`) or the loose `== null`
  semantics of the verifiers' definedness guard? A strict pair is the least surprising; a
  combined absent (null or undefined) check is an alternative worth weighing.
- Error wording, aligned with `CommonError.defined` ("The entry is not defined.").
- Whether a positive `should().defined(value)` belongs to the same change.

Settled: strict comparisons (`=== undefined` / `=== null`), messages `The entry expected to
be undefined.` / `The entry expected to be null.` (matching the `true`/`false` wording), no
positive `defined()` on the factory — `not.defined()` on a verifier already covers the
combined case, and `should(x)` overload (backlog 009) is the natural home for a generic
positive check if it lands.

## Affected areas

`src/verifiers/verifier.factory.ts`, possibly `src/errors/common.error.ts`,
`spec/verifiers/verifier.factory.spec.ts`, docs (`General-Assertions.md`,
`API-Reference-VerifierFactory.md`). Both lines — no syntax beyond the existing
`true` / `false` checks, so the v1 port is direct.
