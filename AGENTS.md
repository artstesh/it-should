# AGENTS.md — @artstesh/it-should

`@artstesh/it-should` is a fluent assertion toolkit for TypeScript tests: `should()` opens a
chain, the factory picks a verifier for the type kind, and checks throw a `ShouldError` with a
readable message when they fail — e.g. `should().array(students).ordered({by: e => e?.age})`.
Workspace-wide rules (English-only docs, backlog, docs sync) live in the root `../AGENTS.md`
and apply here as well.

## How it works

1. **Entry.** `should()` (`src/verifiers/should.func.ts`) returns the singleton
   `VerifierFactory` (`src/verifiers/verifier.factory.ts`).
2. **Dispatch.** A factory method per type kind — `array`, `number`, `string`, `date`,
   `objects`, plus the immediate `true` / `false` boolean checks — creates the matching
   verifier, wired to its error manager from `src/errors/`.
3. **Verification.** Verifiers extend `GeneralVerifier` (stores the examined entry, adds
   `defined()`), which extends `AbstractVerifier` (adds the `not` modifier and `manage()`,
   which throws `ShouldError` with a message built by the error manager). Check methods are
   arrow-function properties returning `this`, so checks chain; `not` inverts every following
   check in the chain.

Key consequence: assertions report failure only by throwing `ShouldError`, so error wording is
part of observable behavior — specs assert on it and the documentation quotes it.

## Version lines and branches

Two published lines are maintained in parallel; every change is ported between them (see the
sync flow below).

| Branch   | Line | TypeScript | Role                                                                   |
|----------|------|------------|-------------------------------------------------------------------------|
| `v2`     | 2.x  | `^5.0.2`   | **Primary working line.** All changes land here first.                  |
| `v1`     | 1.x  | `^4.3.5`   | Legacy line; receives a port of every v2 change that compiles on TS 4.  |
| `master` | 2.x  | —          | Fast-forward mirror of `v2`, updated after every v2 release.            |
| `wip1`   | 1.x  | —          | Legacy scratch branch; do not use.                                     |

### Sync flow (v2 → v1)

1. Author and merge the change on `v2`; `npm test` must pass there.
2. Port it to `v1` in the same wave: `git checkout v1 && git cherry-pick -x <sha>` — the `-x`
   trailer keeps the traceability link back to the v2 commit. Adapt the code where TS 4
   requires it.
3. `npm test` must pass on `v1` too; a port may not skip specs.
4. A change is only **done** when it lives on both lines — or is recorded in `backlog/` as
   v2-only with the reason (e.g. it relies on TS 5+ syntax or tooling).

Hard rules:

- The lines have diverged: never merge `v1` into `v2` or back — port with `cherry-pick` only.
- Never mix changes for different lines in one commit/PR.
- Releases are independent per line (`2.x` on `v2`, `1.x` on `v1`, both published to npm);
   after a v2 release, fast-forward `master` to `v2`.
- Documentation (`../should-faq`) describes the `v2` line; v1-only deviations are covered by
  the Versions article. Don't touch docs for changes that live only on `v1`.

## Layout

| Path                                        | Purpose                                                                   |
|---------------------------------------------|---------------------------------------------------------------------------|
| `src/verifiers/should.func.ts`              | Public entry point: `should()`.                                            |
| `src/verifiers/verifier.factory.ts`         | `VerifierFactory` — the single dispatch point for verifiers.               |
| `src/verifiers/abstract.verifier.ts`        | `not` modifier and `manage()` throwing `ShouldError`.                      |
| `src/verifiers/general.verifier.ts`         | Typed base: stores the entry, adds `defined()`.                            |
| `src/verifiers/<kind>.verifier.ts`          | One verifier per type kind: number, string, array, date, objects. `method.verifier.ts` is WIP and intentionally not exported. |
| `src/verifiers/managers/object.manager.ts`  | Deep key traversal for object comparison.                                  |
| `src/verifiers/utils/`                      | `TimesCounter`, `OrderingComparer`, `VerifyFunc`.                          |
| `src/errors/`                               | Error-message managers, one per kind; `common.error.ts` is the base.       |
| `src/models/`                               | `ShouldError`, `ArrayOrderedSettings`.                                     |
| `src/index.ts`                              | Package exports — only what is exported here is public API.                |
| `spec/`                                     | Jest specs mirroring the `src/` structure.                                 |
| `backlog/`                                  | Features to implement — one Markdown file per feature (see `backlog/README.md`). |
| `lib/`, `src/**/*.js|*.d.ts|*.map`          | Build/test artifacts, gitignored — never edit or commit manually.          |

## Commands (run inside `it-should/`)

The commands are identical on every line — run them on the checked-out branch (`v2` or `v1`).

| Command            | Action                                                                   |
|--------------------|--------------------------------------------------------------------------|
| `npm test`         | Compile the specs with `ttsc` into `src/`, then run jest.                 |
| `npm run build`    | Compile the package into `lib/` (also runs on `npm install` via `prepare`). |
| `npm run lint`     | tslint.                                                                   |
| `npm run format`   | prettier over `src/**/*.ts`.                                              |

The test pipeline applies the `@artstesh/forger` AST transformer (see `jest.config.js` and
`tsconfig.test.json`), so specs may use `Forger.create<T>()` to build test data. Running jest
with a bare config, or compiling the specs with plain `tsc`, drops the transformer — don't.

Releasing: use `../release.bat` from the workspace root (run `../release.bat setup` once per
machine; `../release.bat check [v1|v2|both]` before a release). `release.bat <v1|v2|both>
<patch|minor|major>` runs the whole flow per line: preflights (clean tree, branch up to date,
ssh key in the agent, valid npm token) → `npm version` (hooks: lint, format, tag, push) →
`npm publish --access public` (runs tests via `prepublishOnly`) → for a v2 release it also
fast-forwards `master` to `v2` and pushes it. The script needs no interactive input once the
one-time setup is done (Windows ssh-agent + git `core.sshCommand` pointing at Windows OpenSSH,
and a valid npm token in `~/.npmrc` — an Automation/Granular token from npmjs.com never
triggers the browser login). The v1 line publishes with `--tag v1-latest`: npm refuses to move
`latest` onto a version lower than the current one, so `latest` stays on 2.x and the legacy
line is installed via `@artstesh/it-should@v1-latest` or a `^1` semver range.

## Testing conventions

- Specs live in `spec/` and mirror the source layout; file names are `*.spec.ts`.
- Test data comes from `@artstesh/forger`, mocks from `ts-mockito` — follow the style of the
  neighboring specs.
- Specs assert both the happy path and the failure path, including the expected `ShouldError`
  message.

## Change rules

1. **Comments and JSDoc in English.**
2. **Keep this file current.** A change that alters architecture, public API, commands, or
   conventions updates this `AGENTS.md` in the same change.
3. **Port to v1.** A change merged on `v2` follows the sync flow above — ported to `v1` or
   recorded as v2-only in `backlog/` — before it counts as done.
4. **Docs sync.** A change affecting observable behavior (verifier methods, settings, defaults,
   error messages) updates the matching topic in `../should-faq/should-site/Writerside/topics/`
   in the same change (the area-to-topic map lives in `../should-faq/AGENTS.md`).
5. **Backlog.** New feature ideas and postponed work go to `backlog/` as separate files.
6. **New verifier pattern.** A verifier in `src/verifiers/` extending `GeneralVerifier`, an
   error manager in `src/errors/` extending `CommonError`, a factory method on
   `VerifierFactory`, an export in `src/index.ts`, and a spec in `spec/verifiers/` — all in
   the same change.
