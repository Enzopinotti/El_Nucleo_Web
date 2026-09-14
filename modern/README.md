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
- `../docs/home-migration-2026.md`: Home-specific design and qualification evidence.
- `../docs/asset-provenance.md`: exact origin of promoted historical media.

## Current migration state

The foundation is merged and verified on `main`.

The **Home** slice has completed its technical and browser qualification in its dedicated PR lane. It replaces the four duplicate Bootstrap carousels from the historical root page with one accessible, manually controlled archive gallery while preserving the historical logo, service categories and `#83d2b5` accent.

Home copy deliberately distinguishes historical project context from current commercial claims. Team/client/service facts are not promoted as current without review.

The next content slice after Home is `Nosotros`. `Servicios`, `Equipo` and `Contacto` remain historical until their own migration work begins.

## Home validation contract

The qualified Home slice satisfies all of the following:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. Gallery next/previous navigation and wrap behavior are covered by tests.
4. Historical media keeps documented source-path and blob-SHA provenance.
5. No historical team/client/service claim is silently promoted to a current claim.
6. The permanent GitHub Actions workflow remains read-only and pinned to immutable action SHAs.
7. Production-build browser QA covers mobile, tablet and desktop widths, gallery crops, focus order, reduced motion and horizontal overflow.

The canonical Home checkpoint has **5/5 tests green** and passed its permanent pull-request quality workflow.

Browser evidence was generated from the production Vite preview at 360 px, 768 px and 1440 px. Chrome-level checks confirmed one H1, no horizontal overflow in required widths, the expected four-state gallery sequence, skip-link-first keyboard focus and the reduced-motion override.

Temporary formatting/browser evidence workflows are migration tools only; they are removed after use and are not part of the permanent repository automation surface.

## Accessibility baseline

The app includes semantic landmarks, a skip link, visible focus treatment, native gallery controls, useful alt text, mobile-first layout and reduced-motion handling.

Browser qualification confirmed the first Tab target exposes the skip link visibly and that focus then proceeds through brand, navigation, hero actions and gallery controls. Reduced-motion emulation resolves document smooth scrolling to `auto`.

Cross-cutting accessibility issue #10 remains open because later slices — especially Contact — introduce additional form/error/status requirements.

## Media policy

Do not copy the entire historical asset directory into `modern/`.

Only media used by a migrated slice is promoted. Original assets stay untouched; promoted files keep documented blob-level provenance. Optimization derivatives may be added later only with a reproducible process and visual review.

## Next migration gates

Migration continues in small reviewable slices rather than one rewrite:

- `Nosotros`: preserve the 2022 narrative as archive context, establish current-truth boundaries and build a semantic editorial section;
- `Servicios`: service/archive structure plus backstage media only where intentionally used;
- `Equipo`: historical people and client references treated as archive unless separately verified as current;
- `Contacto`: no fake-success form; transport, validation, spam/privacy behavior and failure states must be explicit before the form is presented as operational;
- cutover: only after all migrated slices have green CI, responsive/accessibility review and a documented rollback path.

## Deployment boundary

Home qualification does not change the production/root deployment boundary. The historical root site remains the deployable baseline until the modern application has completed the remaining content slices, responsive/accessibility review and an explicit deployment/rollback plan.
