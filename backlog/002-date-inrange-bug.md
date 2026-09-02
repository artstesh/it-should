# Date verifier `inRange` ignores the lower bound

Status: in-progress

## Problem

`DateVerifier.inRange(min, max)` was implemented as:

```typescript
inRange = (min: Date | string, max: Date | string): DateVerifier => {
  return this.before(max) || this.after(min);
};
```

`before(max)` executes its check and returns the verifier instance, which is always truthy —
the `||` short-circuits and `after(min)` never ran. A date earlier than `min` (but before
`max`) passed the range check. Discovered while documenting the date verifier
(`../should-faq`, Dates topic).

## Fix

Implemented on both lines (with `DateError.inRange` message added, the swapped direct/negated
branches of `equals`/`before`/`after` realigned, and below-min spec cases for `Date` and
string entries):

- `v2`: commit `39c19a2` — 442 specs green.
- `v1`: cherry-pick `bdc8319` — 442 specs green (via `npx jest`; see the note below).
- Docs synced in the same change (`../should-faq`: Dates, Caveats, API-Reference-Date-Verifier
  no longer carry the known-issue notes).

## Remaining

- Release both lines (`npm version` on each branch) — the published packages still contain
  the bug until then; the docs describe the fixed behavior.
- Add the changelog entries to the Versions topic at release time.

## Note on the v1 toolchain

`npm test` on `v1` crashes in `ttypescript` 1.5.13 at startup under Node 24
(`Cannot set property constructor` in `loadTypescript.js`) — a pre-existing environment
incompatibility, unrelated to this fix. Verification on `v1` runs jest directly
(`npx jest --config jest.config.js`), which applies the same Forger transformer via ts-jest.
Migrating the pipeline to `ts-patch` (as planned for 001 on v2) is the durable fix.
