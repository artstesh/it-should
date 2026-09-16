# String verifier: startsWith/endsWith checks

Status: done (v2 + v1, specs, docs)

## Problem

The string verifier can assert full equality (`equals`), substring presence (`contains`) and
regex matching, but has no prefix/suffix checks — among the most common string assertions in
spec code (a `'#'`-prefixed selector, a `'px'`-suffixed CSS value, a URL path prefix). Users
fall back to `match(/^#/)`-style detours, which report a generic "does not match" failure
instead of a descriptive one.

An external feature request (reported against 2.0.1, still absent on 2.2.1) also asks for
`includes(...)`. That capability already exists as `contains(expected, counter?)` plus the
`IgnoreCase` variants, so no new method is planned for it — an alias would only duplicate the
API surface. The request answer should point the user to `contains()`.

## Proposed solution

Add two case-sensitive checks following the established `equals` pattern — definedness guard,
`not` support, dedicated error messages:

```typescript
should().string('#header').startsWith('#');    // passes
should().string('header.css').endsWith('.css'); // passes
should().string('header').not.startsWith('#');  // passes
// null/undefined entry always throws 'The entry is not defined.'
```

Open question: whether to expose the native optional `position`/`endPosition` parameters or
keep the minimal single-argument form, consistent with the rest of the API.

Settled: minimal single-argument form — no existing check takes optional positioning
arguments, and `match()` covers the rare anchored-position cases.

## Affected areas

`src/verifiers/string.verifier.ts`, `src/errors/string.error.ts`,
`spec/verifiers/string.verifier.spec.ts`, docs (`Strings.md`,
`API-Reference-String-Verifier.md`). Both lines — the checks use ES2015
`String.prototype` methods and both lines already compile with lib ES2021, so the v1 port
needs no adaptation.
