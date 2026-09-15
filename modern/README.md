# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` until the final controlled cutover. Historical root HTML/SCSS/CSS/assets stay intact as source evidence while the modern app owns the current runtime, behavior, presentation and typed content authority.

## Runtime

- Node.js 24
- pnpm 9.15.9
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

The runtime declaration is synchronized across root `.nvmrc`, this package's `engines` field and CI.

## Local workflow

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm dev
```

Before a PR is considered reviewable:

```bash
pnpm check
```

`pnpm check` validates:

- modern app formatting;
- root README + repository docs formatting;
- lint with zero warnings;
- TypeScript;
- Vitest behavior/contract tests;
- production build.

The same command is used by GitHub Actions.

## Source authority

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `src/content/landing-content.ts`: presentation-independent aggregate content contract.
- `src/content/local-content.ts`: current provenance-aware local content authority.
- `src/content/historical-home.ts`: canonical four-category historical service dataset.
- `src/content/historical-about.ts`: historical Nosotros statements and source context.
- `src/content/historical-backstage.ts`: Backstage archive and exact provenance.
- `src/content/historical-team.ts`: historical people and client-reference labels from Equipo.
- `src/content/historical-contact.ts`: exact historical Contacto transport/field contract.
- `src/content/public-asset.ts`: application-owned public-media path helper.
- `src/styles/_tokens.scss`: 2026 visual-system token authority.
- `src/styles/`: modern presentation modules only.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.

Repository-level evidence and decisions live in `../docs/`.

## Historical content status

All historical content slices are merged and revalidated on `main`.

### Home

Preserves the `El Núcleo / CINE` identity and historical green, and replaces four duplicate Bootstrap carousels with one controlled archive gallery.

### Nosotros

Preserves what the 2022 project said about itself while keeping historical/current truth boundaries explicit.

### Servicios + Backstage

Servicios reuses one `historicalServices` authority. Backstage exposes the preserved archive as a responsive semantic contact sheet without autoplay or another stateful carousel.

### Equipo

Equipo is a historical record, not a 2026 staff/client directory. Names/photos and client-reference labels remain source-era evidence only.

### Contacto

The historical source used:

```html
<form action="" method="get" enctype="text/plain"></form>
```

No verified delivery backend exists in the repository. The modern app therefore preserves the historical field/transport contract as non-interactive archive metadata rather than pretending submission works.

## Visual and cross-cutting qualification

The accepted direction is an editorial production archive / contact sheet / control surface, not generic SaaS.

The integrated app has been qualified for:

- 360 / 768 / 1440 responsive layouts;
- zero global horizontal overflow;
- one H1 and semantic header/nav/main/footer;
- skip-link as first keyboard stop;
- visible focus and reduced motion;
- local media with useful alt text;
- lazy loading below the hero;
- historical Contacto remaining non-interactive;
- core rendered contrast pairs above 4.5:1;
- metadata that does not invent canonical/social URLs before a production origin exists.

Issues #10, #11, #12 and #22 are complete. Full visual contract: [`../docs/visual-system-2026.md`](../docs/visual-system-2026.md).

## Content platform 2026

Issue #26 is complete through PR #28.

Current architecture:

```text
historical sources + reviewed 2026 editorial facts
                    ↓
             LandingContent
                    ↓
          localLandingContent
                    ↓
               React UI
```

`LandingContent` carries truth/publication semantics:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- `public` / `withheld`.

The local authority composes already-qualified historical modules rather than duplicating them.

A contract invariant separates historical identity from the 2026 editorial shell:

- `siteIdentity` contains only historical `El Núcleo / CINE` identity/logo;
- `shell` owns current reconstruction labels/footer copy.

Current projects and current contact channels have typed slots but remain empty, `unverified` and `withheld` until real evidence exists.

There is deliberately no remote provider, CMS dependency or `/admin`. A real second content source or asynchronous workflow must exist before that abstraction is justified.

Full contract: [`../docs/content-platform-2026.md`](../docs/content-platform-2026.md).

## Quality contract

Every material change must preserve:

1. Node 24 + pnpm 9.15.9 reproducibility;
2. frozen install;
3. `pnpm check` green;
4. 29 existing behavior/contract tests unless intentionally evolved with the same change;
5. historical truth/provenance boundaries;
6. media provenance;
7. no current staff/client/service/company claim without verification;
8. no personal-data collection without real transport/privacy semantics;
9. read-only SHA-pinned permanent GitHub Actions;
10. browser QA when behavior/presentation changes;
11. temporary QA tooling removed before merge.

## Repository audit — active phase

Issue #29 now owns the pre-cutover engineering audit.

The audit matrix is versioned in [`../docs/repository-audit-2026.md`](../docs/repository-audit-2026.md) and classifies findings as:

- `pass`;
- `improve`;
- `defer`;
- `historical`;
- `cutover-blocked`.

The first hardening pass corrects three concrete forms of drift:

- `.nvmrc` Node 22 → Node 24;
- CI now reads Node from `.nvmrc`;
- root README/docs/repository-authority changes now trigger the permanent quality job and are included in formatting checks.

This avoids adding a second docs-only CI stack while keeping documentation-as-code enforceable.

## TypeScript and lint posture

TypeScript remains `strict: true`.

`skipLibCheck: true` is under audit but is not treated as a defect by default for this small dependency surface. Type-aware linting or additional React lint plugins are also deferred until they demonstrate a real bug class instead of merely increasing rule count.

## Testing posture

Current baseline: **29/29 tests across 3 Vitest files**.

No numeric coverage threshold is introduced merely for a badge. Tests are expected to protect behavior, document contracts, content truth/provenance and important interaction state.

A minimal permanent production-browser smoke is still being evaluated in #29; current production-browser evidence already exists for all material migration lanes.

## Media policy

Promote only media used by the accepted modern product. Originals remain untouched and promoted files keep blob-level provenance.

Current promoted baseline: **11 files / 786,374 bytes (~768 KiB)**.

Responsive/WebP/AVIF derivatives require measured need and a reproducible process.

## Security/privacy posture

The modern runtime currently has:

- no third-party runtime scripts;
- no analytics SDK;
- no CMS/admin/auth;
- no live contact transport;
- no fake-success state;
- no modern secret/env contract found by repository audit;
- strict-origin referrer metadata.

CSP/host headers remain deployment work because they depend on the real production host.

## Deployment boundary

The historical root remains the deployable baseline.

The modern application replaces it only through #5 after #29 leaves a cutover-only blocker list and the project has:

- a chosen production host/origin;
- verified base path/assets;
- real canonical/social metadata;
- sitemap/robots decisions where appropriate;
- host-specific security/deploy configuration;
- post-deploy smoke;
- documented rollback to the preserved 2022 baseline.

No placeholder origin is acceptable.
