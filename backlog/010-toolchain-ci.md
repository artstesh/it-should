# Toolchain and CI

Status: proposed

## Problem

- tslint has been unmaintained since 2019. It happens to run under TS 6, but nothing
  guarantees it under TS 7 — the lint story hangs on a dead tool.
- Nothing runs the suite automatically: regressions surface only when a human remembers
  `npm test` or the release preflights.

## Proposed solution

v2-only (the v1 line keeps its legacy toolchain):

- Migrate tslint → eslint with `@typescript-eslint`, porting the tslint.json rules that
  still matter; update the `lint` script and `AGENTS.md`.
- GitHub Actions on push/PR for `v2` and `v1`: `npm ci && npm test && npm run lint` per
  line.
- A packed-tarball smoke job: `npm pack`, install the tarball into a temp project on TS 5
  and TS 6, import and run a chain — the same empirical verification the forger workspace
  used for its TS 6 rollout.
- Optional, separate commit: prettier 2 → 3 (the forger repo has already moved).

## Affected areas

`package.json` (lint deps, scripts), `.eslintrc`, `.github/workflows`, `AGENTS.md`
(commands). v2-only; record as such per the sync-flow rules.
