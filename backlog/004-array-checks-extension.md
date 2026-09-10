# Extend the array verifier: length bounds, startsWith/endsWith, elementAt

Status: proposed

## Problem

`ArrayVerifier` ends with the author's own sketch of missing checks
(`src/verifiers/array.verifier.ts`, bottom of the file):

```
// HaveSameCount([])
// HaveCountGreaterThan
// HaveCountLessThan
// StartWith([],identifier)
// EndWith([],identifier)
// ?? HaveElementAt(2, 5)
```

These are routine needs around collections; today users break the chain style and hand-roll
them with raw runner expects.

## Proposed solution

Implement the sketch in the library's naming style, all with the usual definedness guard,
`not` support, `identifier` parameter where elements are compared, and messages in
`ArrayError`:

```typescript
should().array(items).lengthGreaterThan(2).lengthLessThan(10);
should().array(items).sameCountAs(otherCollection);
should().array(items).startsWith([first, second]); // + identifier
should().array(items).endsWith([last]);            // + identifier
should().array(items).elementAt(2, expected);      // + identifier
```

## Affected areas

`src/verifiers/array.verifier.ts`, `src/errors/array.error.ts`,
`spec/verifiers/array.verifier.spec.ts`, docs (Arrays, API-Reference-Array-Verifier).
Both lines (TS 4-safe syntax).
