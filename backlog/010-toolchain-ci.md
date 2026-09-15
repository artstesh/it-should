# Toolchain and CI

Status: in-progress (branch `v2`; lint migration and CI implemented, release pending)

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

## Implementation notes (2026-09-15, v2)

- Lint: eslint 10.10.0 + typescript-eslint 8.70.0 (peer `typescript <6.1` — the TS 6.0.3
  dev toolchain is officially supported). Flat config in `eslint.config.mjs`; `tslint`,
  `tslint-config-prettier`, and `tslint.json` removed. Rule parity with the old
  `tslint:recommended` + prettier setup: `no-explicit-any`/`no-empty-object-type` off
  (deliberate API choices), `no-shadow` off, `no-extra-boolean-cast` off (the `!!x` idiom),
  unused catch bindings not reported. Lint scope stays `src/`.
- eslint found one real issue on migration: the unused `compareOnly<K>` type parameter —
  fixed in a separate portable commit.
- 26 stale in-place compile artifacts (`src/**/*.js|*.d.ts|*.js.map`, gitignored) from the
  ttsc era deleted; the eslint config ignores them defensively.
- CI: `.github/workflows/ci.yml` — on push to `v2`/`v1`/`master` and PRs to `v2`/`v1`:
  a `test` job per line (`npm ci`, `npm test`, `npm run lint`) and a `tarball smoke` job
  that packs v2, installs the tarball into a consumer project on TS 5.0.2 / latest 5 / 6,
  compiles and runs `.github/smoke/sample.ts`. The smoke steps were validated locally on
  all three TS versions before committing.
- Finding from the smoke sample: the documented `equals(..., 'day')` examples are
  timezone-dependent (truncation is local) — split off as backlog 012.
- The workflow file itself is line-agnostic (commands are identical) and is ported to v1;
  the eslint migration stays v2-only.
- Not taken: prettier 2 → 3 (optional in the proposal) — a cosmetic follow-up commit.
- Remaining: release as 2.2.1 (patch: tooling and CI, no public API change — the
  `compareOnly<K>` removal is a compile-time-only cleanup invisible to inference callers).
