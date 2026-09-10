# DX: should(entry) entry-point overload

Status: proposed

## Problem

Every chain starts with `should().kind(entry)` — the kind is spelled out although the
static type usually already knows it. It is the most verbose part of the API and the first
thing newcomers have to learn.

## Proposed solution

Add an overloaded entry point that infers the verifier from the argument's type;
`should()` with no arguments keeps returning the factory, so the change is fully
backwards-compatible:

```typescript
should(students).ordered({ by: (e) => e?.age }); // ArrayVerifier<Student>
should(name).equals('Art');                      // StringVerifier
should(count).greater(0);                        // NumberVerifier
should(createdAt).before(now);                   // DateVerifier (Date instances)
should(user, saved).equal();                     // ObjectsVerifier (two arguments)
```

Open questions to settle before implementation:

- Ambiguity: strings are valid for both `string()` and `date()`. Proposal: primitives
  always map to their own verifier; a Date check on a string keeps requiring
  `should().date(...)`.
- Overload order matters (arrays before objects, `Date` before `string`); the specs must
  pin the resolution for unions like `string | Date`.

## Affected areas

`src/verifiers/should.func.ts` (overloads), `verifier.factory.ts`, specs, docs (Overview,
Quick Start, Installation). Both lines.
