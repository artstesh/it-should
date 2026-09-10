# String verifier consistency: definedness guard and Unicode whitespace

Status: proposed

## Problem

Two sharp edges the Caveats topic tells users to live with:

1. `equalsIgnoreCase` skips the definedness guard — it compares
   `undefined?.toUpperCase() === undefined?.toUpperCase()`-style expressions, so two absent
   sides pass instead of throwing `The entry is not defined.` like every other check.
2. `whitespace()` strips ASCII spaces only — `'\t'`, `'\n'`, `'\u00A0'` fail, and users are
   advised to roll their own `match(/^\s*$/)`.

## Proposed solution

1. Bug-level fix: `equalsIgnoreCase` runs `checkDefined()` like its case-sensitive sibling.
   Two absent sides throw; `defined()` first remains the documented pattern.
2. Additive: a new `blank()` check with `/^\s*$/` semantics (empty or any Unicode
   whitespace). `whitespace()` keeps its spaces-only meaning — widening it would be a
   breaking change for specs that rely on tabs failing.

## Affected areas

`src/verifiers/string.verifier.ts`, `src/errors/string.error.ts`,
`spec/verifiers/string.verifier.spec.ts`, docs (Strings, Caveats,
API-Reference-String-Verifier). Both lines.
