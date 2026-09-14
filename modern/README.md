# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` while migration is in progress. The historical root HTML/SCSS site stays intact until the replacement has reproducible CI plus visual, accessibility and content QA.

## Runtime

- Node.js 24
- pnpm 9.15.9
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

TypeScript 6 is an intentional compatibility choice. Upgrading compiler/tooling majors is handled as a compatibility change, not as a version-number race.

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

`pnpm check` validates formatting, lint, type safety, behavior tests and the production build.

## Source authority during migration

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.
- `../docs/modern-app-architecture.md`: migration/cutover architecture.
- `../docs/home-migration-2026.md`: Home-specific design and QA decisions.
- `../docs/asset-provenance.md`: exact origin of promoted historical media.

## Current migration state

The foundation is merged and verified on `main`.

The active product slice is **Home**. It replaces the four duplicate Bootstrap carousels from the historical root page with one accessible, manually controlled archive gallery while preserving the historical logo, service categories and `#83d2b5` accent.

The Home copy deliberately distinguishes historical project context from current commercial claims. Team/client/service facts are not promoted as current without review.

Remaining sections (`Nosotros`, `Servicios`, `Equipo`, `Contacto`) are outside the Home slice and stay historical until their own migration work begins.

## Home validation contract

The canonical Home branch must satisfy all of the following before the slice can advance:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. Gallery next/previous navigation and wrap behavior remain covered by tests.
4. Historical media keeps documented source-path and blob-SHA provenance.
5. No historical team/client/service claim is silently promoted to a current claim.
6. The permanent GitHub Actions workflow remains read-only and pinned to immutable action SHAs.
7. Browser QA covers mobile, tablet and desktop widths, focus order, reduced motion, crop quality and horizontal overflow.

The canonical-format checkpoint passed all five automated quality stages with **5/5 tests green**. A human-authored README/documentation checkpoint follows the formatter-bot commit so the permanent pull-request workflow validates the final branch head through its normal trigger.

Automated success is a release gate, not a substitute for visual QA.

## Accessibility baseline

The app includes semantic landmarks, a skip link, visible focus treatment, native gallery controls, useful alt text, mobile-first layout and reduced-motion handling.

Automated tests cover key semantics and archive interaction. Manual keyboard, responsive, contrast and crop review remain required before a visual slice is considered complete.

## Media policy

Do not copy the entire historical asset directory into `modern/`.

Only media used by a migrated slice is promoted. Original assets stay untouched; promoted files keep documented blob-level provenance. Optimization derivatives may be added later only with a reproducible process and visual review.

## Next migration gates

After Home is accepted, migration continues in small reviewable slices rather than one rewrite:

- `Nosotros`: historical narrative, current-truth boundary and semantic editorial layout;
- `Servicios`: service/archive structure plus backstage media only where intentionally used;
- `Equipo`: historical people and client references treated as archive unless separately verified as current;
- `Contacto`: no fake-success form; transport, validation, spam/privacy behavior and failure states must be explicit before the form is presented as operational;
- cutover: only after all migrated slices have green CI, responsive/accessibility review and a documented rollback path.

## Deployment boundary

No production/root cutover is part of the Home slice. The historical root site remains the deployable baseline until the modern application has completed the remaining content slices, responsive/accessibility QA and an explicit deployment/rollback plan.
