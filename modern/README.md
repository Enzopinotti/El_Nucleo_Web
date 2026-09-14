# El Núcleo — modern app foundation

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It is intentionally isolated under `modern/` while migration is in progress. The historical root HTML/SCSS site remains untouched until the replacement has reproducible CI and visual/accessibility QA.

## Runtime

- Node.js 24
- pnpm 9.15.9
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

TypeScript 6 is an intentional compatibility choice for the first migration slice. The current TypeScript ESLint line explicitly supports TS6 while TS7 support is still a separate ecosystem consideration. Upgrading compiler/tooling majors is handled as a compatibility change, not as a version-number race.

## Local workflow

```bash
cd modern
pnpm install --frozen-lockfile
pnpm dev
```

Before a PR is considered reviewable:

```bash
pnpm check
```

`pnpm check` runs formatting validation, lint, typecheck, behavior tests and a production build.

## Source authority during migration

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution; committed after bootstrap.
- `../docs/modern-app-architecture.md`: migration/cutover architecture.

## Current scope

The current shell proves the technical foundation and preserves visible project identity. It does **not** yet claim that all historical company/team/client/service information remains commercially current.

The first content migration after this foundation is Home. Remaining pages are migrated only after that slice is accepted.

## Accessibility baseline

The shell includes semantic landmarks, a skip link, visible focus treatment, mobile-first layout and reduced-motion handling. Automated tests complement rather than replace keyboard and visual QA.

## Deployment boundary

No production cutover is part of this phase. The historical root site remains the deployable baseline until the modern app has green CI, content review, responsive QA, accessibility review and an explicit deployment/rollback plan.
