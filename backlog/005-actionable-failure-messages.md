# Actionable failure messages (and export ShouldError)

Status: proposed

## Problem

Error wording is part of the observable API, but several array checks stop at "aren't
equal":

- `array().equal()` / `equalUnordered()` never say where the arrays diverge — no sizes, no
  first differing index, no values.
- `array().ordered()` does not point at the first unordered pair.

`objects().equal()` already reports the property path with both values
(`ObjectsError.differentValues`), so arrays are below the library's own bar.

Separately, the Caveats topic documents that `ShouldError` is not exported from the package
root — users cannot catch assertion failures precisely.

## Proposed solution

- `equal`: the message includes both sizes and the first differing index with both values
  (through `identifier` when provided).
- `ordered`: the message includes the index and the compared `by(...)` values of the first
  unordered pair.
- Export `ShouldError` from `src/index.ts`.
- Optional, decide during implementation: a `because(reason)` modifier on
  `AbstractVerifier` that prefixes every failure message with the reason.

Note: messages are observable behavior — specs assert on them and the docs quote them, so
this ships as a minor release with a changelog entry and a docs sync in the same wave.

## Affected areas

`src/errors/array.error.ts`, `src/verifiers/array.verifier.ts`, `src/index.ts`, specs
(message assertions), docs (Arrays, Caveats, API-Reference-Array-Verifier). Both lines.
