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
- `src/content/historical-home.ts`: typed authority for Home/archive content promoted into the modern surface.
- `src/content/historical-about.ts`: typed authority for historical Nosotros statements and their current-truth context.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.
- `../docs/modern-app-architecture.md`: migration/cutover architecture.
- `../docs/home-migration-2026.md`: Home-specific design and qualification evidence.
- `../docs/nosotros-migration-2026.md`: historical narrative/truth-boundary decisions for Nosotros.
- `../docs/asset-provenance.md`: exact origin of promoted historical media.

## Current migration state

The foundation and **Home** are merged and independently revalidated on `main`.

Home replaced four duplicate Bootstrap carousels with one accessible archive gallery and completed production-build browser qualification at mobile, tablet and desktop widths.

The active content slice is **Nosotros** (#14). Its purpose is not to restate the old page as current marketing copy: it preserves what the 2022 project said about itself while making the historical/current boundary explicit.

The old `Somos un colectivo...` and `Visión` statements remain source material with year/path context. The 2026 surface does not infer that the same organization is still operating, that NGO collaborations or a feature film were completed, or that the old service/team model remains current.

Generic Facebook/YouTube/Instagram/Vimeo/Twitter destinations from the old footer are deliberately omitted because they were not verified El Núcleo accounts.

`Servicios`, `Equipo` and `Contacto` remain historical until their own migration lanes begin.

## Quality contract

Every migration slice must continue to satisfy:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. New historical claims are represented through typed source/context data rather than silently rewritten in JSX.
4. Historical media keeps documented source-path and blob-SHA provenance.
5. Historical team/client/service/company claims are not promoted as current without verification.
6. Permanent GitHub Actions remain read-only and pinned to immutable action SHAs.
7. Browser QA covers the responsive and keyboard surface changed by the slice.

## Completed Home evidence

Home has **5/5 behavior tests green** and passed the permanent pull-request quality workflow plus post-merge `main` validation.

Production-build browser evidence at 360 px, 768 px and 1440 px confirmed one H1, no horizontal overflow, the four-state gallery sequence, skip-link-first keyboard focus and reduced-motion behavior.

Temporary formatting/browser evidence workflows were removed after use; they are not part of the permanent repository automation surface.

## Nosotros content model

The current slice introduces a deliberately small model instead of a CMS or generic content engine:

```text
historical source statement
        ↓
source year + path + blob
        ↓
2026 editorial context
        ↓
modern semantic presentation
```

This lets the repository preserve its real history while avoiding false present-tense claims.

## Accessibility baseline

The app includes semantic landmarks, a skip link, visible focus treatment, native gallery controls, useful alt text, mobile-first layout and reduced-motion handling.

Nosotros adds a named semantic section, H2/H3 hierarchy and source-attributed blockquotes without introducing new custom interaction.

Cross-cutting accessibility issue #10 remains open because later slices — especially Contact — introduce form/error/status requirements not present here.

## Media policy

Do not copy the entire historical asset directory into `modern/`.

Only media used by a migrated slice is promoted. Original assets stay untouched; promoted files keep documented blob-level provenance. Optimization derivatives may be added later only with a reproducible process and visual review.

## Next migration gates

Migration continues in small reviewable slices rather than one rewrite:

- `Nosotros`: historical narrative + explicit current-truth boundary (active);
- `Servicios`: service/archive structure plus backstage media only where intentionally used;
- `Equipo`: historical people and client references treated as archive unless separately verified as current;
- `Contacto`: no fake-success form; transport, validation, spam/privacy behavior and failure states must be explicit before the form is presented as operational;
- cutover: only after all migrated slices have green CI, responsive/accessibility review and a documented rollback path.

## Deployment boundary

The historical root site remains the deployable baseline. Neither Home nor Nosotros qualification changes that boundary; the modern application will replace the root only after the remaining content slices, final QA and rollback/deployment plan are complete.
