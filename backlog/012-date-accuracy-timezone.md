# Date accuracy truncation is timezone-dependent

Status: proposed

## Problem

`DateVerifier.equals(expected, accuracy)` truncates both dates in **local** time, but the
documentation examples claim timezone-independent results. The Quick-Start/Dates example

```typescript
should().date('2024-05-06T10:00:00.000Z').equals('2024-05-06T22:15:30.000Z', 'day'); // "ok"
```

passes only in UTC and western zones; on UTC+3 the second timestamp is already May 7
local, and the check throws. Found empirically: the CI tarball-smoke sample (backlog 010)
copied the documented example and failed on a developer machine east of UTC while passing
on a UTC CI runner.

## Proposed solution

1. Decide the semantics: keep local-time truncation (then document it explicitly) or
   switch to UTC truncation (a behavior change — specs and consumers relying on local
   truncation would shift).
2. Fix the Quick-Start and Dates examples to timezone-safe pairs (or `'year'` accuracy,
   as the smoke sample does now).
3. Add a Caveats entry and specs pinning the chosen semantics on both lines.

## Affected areas

`src/verifiers/date.verifier.ts`, `spec/verifiers/date.verifier.spec.ts`, docs (Dates,
Quick-Start, Caveats). Both lines.
