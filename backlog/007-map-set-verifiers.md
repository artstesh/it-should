# Map and Set verifiers

Status: proposed

## Problem

`should()` dispatches by type kind, but `Map` and `Set` — first-class TypeScript
collections — have no verifier. Users destructure to arrays to reuse `ArrayVerifier`,
losing the readable failure messages and the chain style.

## Proposed solution

```typescript
should().map(cache).size(2).has('user').hasValue(userDto);
should().set(tags).has('new').subsetOf(allTags);
```

- `MapVerifier<K, V>`: `size(expected)`, `has(key)`, `hasValue(value, identifier?)`,
  `containAll(entries)`, `equal(other)` — order-independent, keyed by key with the
  identifier convention for non-primitive values.
- `SetVerifier<T>`: `size(expected)`, `has(element)`, `subsetOf(other)`, `equal(other)`.
- Follow the new-verifier pattern from `AGENTS.md` (verifier + error manager + factory
  method + export + spec, all in one change); docs get new topics and API-reference pages.

## Affected areas

New `src/verifiers/map.verifier.ts`, `set.verifier.ts`, `src/errors/map.error.ts`,
`set.error.ts`, `verifier.factory.ts`, `src/index.ts`, specs, docs. Both lines.
