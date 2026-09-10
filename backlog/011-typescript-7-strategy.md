# TypeScript 7 strategy

Status: proposed

## Problem

TypeScript 7 (the Go-based compiler) is already `latest` on npm as 7.0.x, and the v2 peer
`>=5.0.2 <7` excludes it — consumer projects adopting the native compiler will hit the same
peer wall TS 6 users hit before 2.1.0.

## Proposed solution

Mirror the forger workspace's `002-typescript-7-strategy`:

1. Verify empirically what actually breaks under `tsgo`: the shipped declarations are a
   plain types package (no build-time transformer), so the peer question is mostly about
   declaration-level compatibility.
2. The spec pipeline is the real risk: the `@artstesh/forger` AST transformer may not run
   under the native compiler at all. If so, keep the JS-based TS 6 for the internal test
   pipeline while widening the peer — the published package does not depend on which
   compiler consumers use.
3. Coordinate with the forger v2 line before starting; its verdict on transformer support
   under tsgo decides step 2.
4. On success: widen the peer (e.g. `>=5.0.2 <8`), run the suite, update the Versions and
   Installation topics.

## Affected areas

`package.json` (peer), possibly the jest pipeline, docs (Versions, Installation). v2-only
by nature.
