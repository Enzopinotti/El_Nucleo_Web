# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` until the final controlled cutover. Historical root HTML/SCSS/CSS/assets stay intact as source evidence while the modern app owns the current runtime, behavior, presentation and typed content authority.

## Runtime

- Node.js 24
- pnpm 11.26.0
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

Runtime/package-manager authority is intentionally single-sourced:

- root `.nvmrc` owns Node 24;
- `package.json#packageManager` owns pnpm 11.26.0;
- `package.json#engines` rejects an incompatible Node major;
- GitHub Actions reads both authorities instead of duplicating version literals.

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

## Dependency and supply-chain policy

`pnpm-workspace.yaml` is the package-install security policy for the modern app.

It currently enforces:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- explicit denial of the optional `@parcel/watcher` install/build script.

The 24-hour release-age boundary is deliberate. During the pnpm 11 migration it rejected a transitively selected `brace-expansion` release that had been published less than one day earlier. The policy was kept and the lockfile was re-resolved instead of whitelisting the young release.

Sass brings `@parcel/watcher` as an optional dependency. The app's install, tests and Vite production build pass with its install script denied, so the repository does not grant native build-script execution that the product does not require.

The final pnpm 11 graph was also checked with a one-shot dependency audit:

- production graph: no `moderate`-or-higher finding;
- complete graph: no `high`-or-higher finding.

Registry-backed advisory checks remain evidence rather than a permanent CI dependency. Frozen installation plus the version-age/build-script policy are the durable local/CI contracts.

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
- `pnpm-workspace.yaml`: pnpm 11 supply-chain/install policy.
- `pnpm-lock.yaml`: reproducible dependency resolution under that policy.
- `dist/`: generated production output; never hand-edit.

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

1. Node 24 + pnpm 11.26.0 reproducibility;
2. frozen install under the committed pnpm policy;
3. `pnpm check` green;
4. 29 existing behavior/contract tests unless intentionally evolved with the same change;
5. historical truth/provenance boundaries;
6. media provenance;
7. no current staff/client/service/company claim without verification;
8. no personal-data collection without real transport/privacy semantics;
9. read-only SHA-pinned permanent GitHub Actions;
10. browser QA when behavior/presentation changes;
11. temporary qualification tooling removed before merge.

## Repository audit — active phase

Issue #29 owns the pre-cutover engineering audit.

The audit matrix is versioned in [`../docs/repository-audit-2026.md`](../docs/repository-audit-2026.md) and classifies findings as:

- `pass`;
- `improve`;
- `defer`;
- `historical`;
- `cutover-blocked`.

The hardening pass has already corrected concrete drift:

- `.nvmrc` Node 22 → Node 24;
- CI now reads Node from `.nvmrc`;
- pnpm 9 → pnpm 11.26.0;
- CI now reads pnpm from `packageManager`;
- release-age/build-script supply-chain rules are explicit;
- root README/docs/repository-authority changes trigger permanent quality;
- repository Markdown is covered by the Prettier contract;
- unsupported TypeScript versions fail lint instead of producing a soft warning.

## TypeScript and lint posture

TypeScript remains `strict: true` on 6.0.3.

TypeScript 7 exists, but the current `typescript-eslint` toolchain officially supports TypeScript `<6.1`. The repository therefore stays on the latest compatible TypeScript line and configures `onUnsupportedTypeScriptVersion: "error"` so a future incompatible bump cannot enter silently.

`skipLibCheck: true` remains deliberate for the current small dependency surface. Type-aware linting or additional React lint plugins are deferred until they demonstrate a real bug class instead of merely increasing rule count.

## Testing posture

Current baseline: **29/29 tests across 3 Vitest files**.

The suite is risk-oriented:

- 6 content authority tests for truth/publication/provenance;
- 4 public-document contracts;
- 19 visible behavior tests.

No numeric coverage threshold is introduced merely for a badge. Existing tests protect behavior, document contracts, content truth/provenance and important interaction state.

A permanent Playwright/screenshot suite is not introduced in #29. Major presentation changes have already been qualified against the production build, and the most valuable stable DOM invariants live in Vitest/Testing Library. A real URL smoke belongs to #5 after deployment because it should verify the environment users actually receive.

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
- strict-origin referrer metadata;
- a dependency graph re-resolved under pnpm 11 supply-chain rules;
- clean one-shot advisory evidence at the chosen severity thresholds.

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
