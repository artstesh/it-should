# Async support: a promise verifier

Status: proposed

## Problem

Everything in the library is synchronous. For promises users `await` manually and assert on
the value; rejection checks stay hand-rolled `try/catch`. Async service boundaries are
exactly the code it-should aims to make pleasant to test.

## Proposed solution

Keep it minimal and composable — resolve/reject semantics live in one verifier, value
checks stay with the existing verifiers on the resolved value:

```typescript
const user = await should().promise(client.load(1)).resolves();
should().objects(user, expected).equal();

await should().promise(client.load(-1)).rejects();
```

- `PromiseVerifier<T>`: `resolves()` — returns a `Promise<T>` of the value, throws
  `ShouldError` (message includes the rejection reason) if the promise rejects;
  `rejects()` — the mirror image.
- `not` rules apply (`not.resolves()` = must reject).
- `promise(entry)` factory method; async specs follow the existing style.

## Affected areas

New `src/verifiers/promise.verifier.ts`, `src/errors/promise.error.ts`,
`verifier.factory.ts`, `src/index.ts`, specs (async), docs (a new Async topic, Quick
Start). Both lines.
