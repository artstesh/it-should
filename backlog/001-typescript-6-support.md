# TypeScript 6 support on the v2 line

Status: in-progress (branch `v2`; implementation complete, release pending)

## Problem

The v2 line pins TypeScript to `^5.0.2` (dev and peer dependency), so consumers on TypeScript 6
cannot install `@artstesh/it-should` without forcing. TypeScript 6 support has already been
proven in the sibling `@artstesh/forger` workspace (ts-patch 4 + `tspc`, ts-jest 29.4), but
it-should's own test pipeline may block the upgrade: it relies on `ttypescript` 1.5.15 and
ts-jest 28 to apply the `@artstesh/forger` AST transformer in specs.

## Proposed solution

Extend the v2 line to TypeScript 6, mirroring the forger approach:

1. Widen the peer range to `>=5.0.2 <7`; move the dev dependency to the latest TS 6.
2. Make the test pipeline TS 6-compatible: replace `ttypescript` with `ts-patch` (`tspc`)
   and/or bump ts-jest to a TS 6-compatible line, keeping the `@artstesh/forger` transformer
   wired into both stages of `npm test`.
3. Run the full spec suite under TypeScript 6; fix whatever the newer compiler flags.
4. Ship as a minor v2 release (peer-range widening), and update the documentation
   (Versions and Installation).

Notes:

- The specs also need the forger transformer to support TS 6 — coordinate with the forger v2
  line before starting.
- v1 (TypeScript `^4`) is out of scope by nature; this is a legitimate v2-only change under the
  sync flow.

## Implementation notes (2026-09-06, v2)

- Forger 2.1.1 (peer `>=5.0.2 <7`, TS 6 transformer guard) is published — the coordination
  blocker is resolved; dev dependency moved to `^2.1.1`.
- Dev toolchain: TS `^6.0.3`, jest 29.7.0, @types/jest 29.5.14, ts-jest 29.4.12, ts-patch
  4.0.1 (replaces `ttypescript`; unused `ts-transformer-keys` and stale `jest-isolated.config.js`
  dropped). `tsconfig.test.json` (dead ttsc-era config) replaced by `tsconfig.spec.json`.
- Pipeline: single-stage `jest` — ts-jest on the `ts-patch/compiler` compiler with the forger
  transformer in `astTransformers.before`, mirroring the forger repo. Verified load-bearing:
  without the transformer 64/92 array-verifier specs fail, with it the full suite passes.
- TS 6 findings fixed along the way: `rootDir` must be explicit next to `outDir` (TS5011) —
  added to `tsconfig.json`; `compilerOptions.types` defaults to `[]` (no auto `@types/*`) —
  `tsconfig.spec.json` sets `types: ["jest"]`; ts-jest forces the deprecated
  `moduleResolution=node10`, and with `noEmitOnError` that skips emit (TS5107) — silenced with
  `ignoreDeprecations: "6.0"` in `tsconfig.spec.json`; definite-assignment analysis is stricter
  for captured variables — the deliberate "entry not defined" specs declare
  `string[] | undefined` / `number[] | undefined` now.
- Verified on TS 6.0.3: `npm test` (8 suites / 442 tests), `npm run build`, `npm run lint`
  (tslint 6.1.3 still works under TS 6).
- Remaining: release as 2.1.0 via `../release.bat v2 minor` (docs in `should-faq` — Versions,
  Installation — already updated in the same wave), then mark this item done.

## Affected areas

`package.json` (dev + peer), `jest.config.js`, `tsconfig*.json`, specs, docs (Versions,
Installation).
