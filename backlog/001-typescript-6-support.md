# TypeScript 6 support on the v2 line

Status: proposed

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

## Affected areas

`package.json` (dev + peer), `jest.config.js`, `tsconfig*.json`, specs, docs (Versions,
Installation).
