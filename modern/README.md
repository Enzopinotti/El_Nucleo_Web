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
- `src/content/historical-home.ts`: single typed authority for the four historical service categories already used by Home and Servicios.
- `src/content/historical-about.ts`: typed authority for historical Nosotros statements and their current-truth context.
- `src/content/historical-backstage.ts`: typed authority for the four Backstage frames and their exact historical provenance.
- `src/content/public-asset.ts`: shared helper for application-owned public media paths.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.
- `../docs/modern-app-architecture.md`: migration/cutover architecture.
- `../docs/home-migration-2026.md`: Home-specific design and qualification evidence.
- `../docs/nosotros-migration-2026.md`: historical narrative/truth-boundary decisions and browser qualification for Nosotros.
- `../docs/servicios-migration-2026.md`: service/archive authority, Backstage design decision and browser qualification.
- `../docs/asset-provenance.md`: exact origin of promoted historical media.

## Current migration state

The foundation, **Home** and **Nosotros** are merged and independently revalidated on `main`.

Home replaced four duplicate Bootstrap carousels with one accessible archive gallery and completed production-build browser qualification at mobile, tablet and desktop widths.

Nosotros preserves what the 2022 project said about itself while making the historical/current boundary explicit. The old `Somos un colectivo...` and `Visión` statements remain source material with year/path context; the 2026 surface does not infer that the same organization is still operating, that NGO collaborations or a feature film were completed, or that the old service/team model remains current.

**Servicios** (#16) is implemented and fully qualified on its migration branch. It reuses the existing four-category archive authority rather than inventing another catalog, promotes only the four historical Backstage frames needed by the slice and replaces the historical Bootstrap autoplay carousel with a static responsive contact sheet.

Generic Facebook/YouTube/Instagram/Vimeo/Twitter destinations from the old footer remain deliberately omitted because they were not verified El Núcleo accounts.

`Equipo` and `Contacto` remain historical until their own migration lanes begin.

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

## Completed Nosotros evidence

Nosotros completed the full repository contract with **9/9 Vitest tests green**, plus Prettier, ESLint, TypeScript and Vite production build before its controlled merge.

Production-build browser qualification with **Chrome 152** covered:

- full-page renders at 360 / 768 / 1440 px;
- one H1 and correct Nosotros H2/H3 hierarchy;
- no horizontal overflow at mobile or desktop widths;
- no unverified historical social links;
- explicit `No asumida` current-truth status;
- fresh-page first Tab on the skip link;
- reduced-motion behavior;
- visual separation between historical quotations and 2026 editorial context;
- regression review of Home/archive after adding the new section.

## Completed Servicios evidence

Servicios completes the current repository contract with **12/12 Vitest tests green**, plus Prettier, ESLint, TypeScript and the Vite production build.

Production-build browser qualification with **Chrome 152.0.7977.82** covered:

- full-page renders at 360 / 768 / 1440 px;
- no horizontal overflow at any qualified width;
- exactly one H1;
- service-category truth-boundary copy visible in the production DOM;
- Backstage H2 present with all **4/4 historical images loaded**;
- zero Backstage carousel buttons/controls;
- explicit no-current-team/client/production interpretation;
- no unverified historical social links;
- fresh-page first Tab on the skip link;
- reduced-motion scroll behavior resolving to `auto`;
- visual review of the service viewer and Backstage contact sheet on mobile and desktop.

The browser evidence is retained only as short-lived CI artifacts. The temporary smoke workflow is removed before final review and does not become permanent automation.

## Servicios content model

```text
2022 service categories ──→ existing historicalServices authority ──→ one archive gallery

2022 Backstage files ──→ exact Git blobs + provenance ──→ semantic contact sheet
```

The service categories remain historical source material. `Servicios Ofrecidos` is not silently converted into a current 2026 commercial offer.

The four Backstage photographs are likewise archival evidence; they do not establish a current team, client, production or relationship.

## Accessibility baseline

The app includes semantic landmarks, a skip link, visible focus treatment, native gallery controls, useful alt text, mobile-first layout and reduced-motion handling.

Nosotros adds a named semantic section, H2/H3 hierarchy and source-attributed blockquotes without introducing new custom interaction.

Servicios keeps the existing keyboard-operable category gallery and adds Backstage without new controls, autoplay or custom focus management.

Cross-cutting accessibility issue #10 remains open because later slices — especially Contact — introduce form/error/status requirements not present here.

## Media policy

Do not copy the entire historical asset directory into `modern/`.

Only media used by a migrated slice is promoted. Original assets stay untouched; promoted files keep documented blob-level provenance. Optimization derivatives may be added later only with a reproducible process and visual review.

## Next migration gates

Migration continues in small reviewable slices rather than one rewrite:

- `Home`: merged + post-merge validated;
- `Nosotros`: merged + post-merge validated;
- `Servicios`: implemented + automated/browser qualified; ready for final merge once the permanent gate passes on the closure commit;
- `Equipo`: historical people and client references treated as archive unless separately verified as current;
- `Contacto`: no fake-success form; transport, validation, spam/privacy behavior and failure states must be explicit before the form is presented as operational;
- cutover: only after all migrated slices have green CI, responsive/accessibility review and a documented rollback path.

## Deployment boundary

The historical root site remains the deployable baseline. Qualification of migrated slices does not change that boundary; the modern application will replace the root only after the remaining content slices, final QA and rollback/deployment plan are complete.
