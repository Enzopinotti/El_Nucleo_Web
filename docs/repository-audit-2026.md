# Repository audit 2026 — pre-cutover hardening

Issue: #29  
Standards authority: #6  
Cutover owner: #5

## Purpose

This document is the durable audit record for the repository after the historical-content migration, visual-system work, cross-cutting accessibility/media/metadata qualification and content-platform boundary have already landed in `main`.

The audit starts from `b6571067eaa08fbbdc0e2af3f2cf6320a0ca257a` and deliberately separates five outcomes:

- **pass** — the repository already satisfies the intended standard;
- **improve** — a concrete, bounded change provides meaningful value now;
- **defer** — useful only when a real future requirement exists;
- **historical** — belongs to the preserved 2022 implementation and must not be rewritten merely to make the archive look current;
- **cutover-blocked** — cannot be completed honestly until deployment/origin decisions exist.

The goal is not to accumulate tooling. The goal is to make the repository truthful, reproducible, maintainable and ready for a controlled cutover.

## Executive status

| Area | Status | Current conclusion |
| --- | --- | --- |
| Historical preservation | **pass** | 2022 source remains inspectable and is not destructively rewritten. |
| Runtime/package-manager authority | **improve → addressed in #29 hardening PR** | `.nvmrc` was stale at Node 22 while package/CI/docs use Node 24; Node 24 becomes the shared authority. |
| Dependency surface | **pass** | Runtime dependencies remain only React + ReactDOM; no backend/UI/animation dependency creep. |
| Lockfile/install reproducibility | **pass** | pnpm 9.15.9 + committed lockfile + frozen install in CI. |
| CI permissions/supply chain | **pass** | Read-only contents, finite timeout, concurrency cancellation and immutable action SHAs. |
| CI path coverage | **improve → addressed in #29 hardening PR** | README/docs/repository-authority files were able to change without the permanent quality workflow running. |
| Local/CI contract equivalence | **improve → addressed in #29 hardening PR** | `pnpm check` now includes repository documentation formatting in addition to app checks. |
| TypeScript baseline | **pass / review** | `strict: true`; `skipLibCheck: true` remains a deliberate review item, not an automatic failure. |
| ESLint baseline | **pass / review** | Zero-warning lint exists; type-aware/React-specific rules need evidence before adoption. |
| Tests | **pass / review** | 29 behavior/contract tests are green; coverage percentage is not adopted merely as a badge. |
| Browser QA | **pass / review** | Material slices were qualified in production Chrome; permanence of a minimal smoke remains under evaluation. |
| Modern runtime external scripts | **pass** | `modern/index.html` has no third-party script/embed runtime dependency. |
| Secrets/env usage | **pass** | Repository search found no modern `process.env`/`import.meta.env` secret contract or credential-like runtime configuration. |
| Contact/privacy boundary | **pass** | No live form, personal-data transport or fake-success state exists. |
| Media/provenance | **pass** | Promoted historical media is local, provenance-backed and lazy below the hero where appropriate. |
| Metadata truthfulness | **pass** | Current title/description/OG fields do not fabricate current operations or deployment URLs. |
| Canonical/origin/social preview | **cutover-blocked** | Requires the real production origin. |
| sitemap/robots | **cutover-blocked** | Requires final origin/route/host strategy. |
| Root replacement | **cutover-blocked** | Must remain in #5 after audit completion. |
| Rulesets | **defer/review** | Repository rulesets API currently returns an empty set. |
| Branch protection | **unknown from current connector** | The integration cannot read the branch-protection endpoint; absence must not be inferred from that restriction. |
| Automated dependency updates | **defer/review** | No updater is added until maintenance-noise vs value is evaluated for this small dependency surface. |
| CONTRIBUTING/SECURITY/LICENSE | **defer/review** | Add only if they improve the real public-repository contract; do not create boilerplate files for appearance. |

## A. Repository authority and documentation

### What is already correct

- Root historical HTML/SCSS/CSS/assets remain source evidence.
- `modern/src/` is the 2026 runtime source authority.
- `modern/dist/` is generated output and ignored.
- Content authority is centralized under `modern/src/content/`.
- Media provenance is documented down to historical paths/blob SHAs.
- The content platform separates historical truth from verified-current editorial copy.

### Findings

1. The root README and `modern/README.md` still described #26 as the active lane after PR #28 had already merged.
2. `docs/modernization-2026.md` still described #22 as active.
3. Documentation is intentionally part of the engineering contract, but CI previously ignored root README/docs-only changes.

### Action

The first #29 hardening PR synchronizes these documents and adds repository-doc formatting to the permanent quality contract.

## B. Runtime, package manager and dependencies

### Runtime authority

Before #29:

- root `.nvmrc`: Node 22;
- `modern/package.json`: `>=24 <25`;
- CI: Node 24;
- documentation: Node 24.

That disagreement is repository debt because a developer using `nvm use` receives a different runtime from the one CI and package metadata require.

### Action

- `.nvmrc` becomes `24`;
- GitHub Actions reads Node from `.nvmrc` through `node-version-file`;
- package `engines` remains the compatibility guard;
- pnpm remains 9.15.9 through package metadata and CI setup.

### Dependency policy

Current runtime dependencies:

- React;
- ReactDOM.

No router, UI kit, animation library, state library, CMS SDK, analytics SDK or backend client exists without a product requirement.

This is a **pass** and should not be made “more enterprise” by adding packages that solve no present problem.

## C. CI and supply chain

### Permanent workflow strengths

`modern-quality.yml` already provides:

- `permissions: contents: read`;
- SHA-pinned third-party actions;
- Ubuntu 24.04 runner;
- finite timeout;
- concurrency cancellation;
- frozen pnpm install;
- one canonical `pnpm check` command;
- production build inside the quality contract.

### Path-coverage gap

Before #29 the workflow was triggered only by:

- `modern/**`;
- `.github/workflows/modern-quality.yml`.

That meant root README/docs/runtime-authority files could drift without a permanent check.

### Action

The hardening PR expands the trigger to repository-authority files including:

- `README.md`;
- `docs/**`;
- `.editorconfig`;
- `.gitignore`;
- `.nvmrc`.

The app remains small enough that running the same complete quality job for those changes is preferable to creating a second duplicated workflow.

## D. Formatting, TypeScript and lint

### Formatting

`pnpm check` now has two explicit formatting scopes:

1. modern application/configuration files;
2. root README + `docs/**/*.md`.

This keeps documentation-as-code enforceable without moving the project into a monorepo/root-package setup that it does not need.

### TypeScript

Current useful guarantees:

- `strict: true`;
- `noEmit`;
- Bundler module resolution;
- isolated modules;
- consistent file casing;
- no JS admission into the TypeScript program.

`skipLibCheck: true` is not treated as a defect by itself. The project has a small, modern dependency surface and the option avoids spending CI signal on third-party declaration internals. It should only change if a concrete declaration/integration risk appears.

### ESLint

Current lint is zero-warning and includes TypeScript recommended rules plus consistent type imports/no-unused-vars.

Potential future additions such as type-aware linting or React-specific plugins are **deferred pending evidence**. Adding them must catch a real class of bug or architectural drift, not merely increase rule count.

## E. Tests and browser QA

### Current permanent test baseline

After PR #28:

- 3 Vitest files;
- 29/29 tests;
- content truth/publication/provenance contracts;
- DOM/document contracts;
- visible app behavior.

### Coverage policy

No numeric coverage threshold is introduced in the first hardening pass.

Reason: the existing suite is intentionally contract/behavior-oriented. A percentage target would be useful only if it reveals untested risk rather than rewarding incidental lines.

### Browser QA

Production-browser qualification has already checked, where relevant:

- 360 / 768 / 1440 widths;
- horizontal overflow;
- H1 and landmarks;
- anchor targets;
- local media/loading behavior;
- skip link/focus order;
- reduced motion;
- Contacto non-interactivity;
- historical/current truth rendering.

A small permanent browser smoke remains an audit question. It should be adopted only if the stable invariants justify the maintenance/runtime cost and can avoid brittle screenshot-driven tests.

## F. Security and privacy

### Modern runtime

Current review found:

- no third-party runtime scripts in `modern/index.html`;
- no live contact transport;
- no analytics SDK;
- no CMS/admin auth surface;
- no modern environment-secret contract found by repository search;
- strict-origin referrer metadata is present.

### Historical source

The 2022 site contains historical CDN/script/form patterns that would not be selected today. Those are classified **historical**, not silently rewritten.

### Security headers/CSP

A production CSP and host-level security headers are not authored blindly in source before the hosting boundary is chosen. They are **cutover/deployment work** because actual header configuration differs by provider and asset/origin strategy.

## G. Performance and media

Current known baseline:

- promoted historical media: 11 files / 786,374 bytes (~768 KiB);
- above-fold mark eager;
- below-fold media lazy where rendered;
- modern production build is part of every quality run;
- no remote font/CDN runtime dependency in the modern app.

No WebP/AVIF/responsive-derivative pipeline is added solely for technology parity. The trigger for that work is measured deployment/LCP/transfer evidence or materially larger future media.

## H. Accessibility regression protection

Issue #10 is complete. The audit treats its guarantees as permanent invariants rather than an active redesign lane:

- one H1;
- semantic landmarks;
- skip link;
- keyboard/focus visibility;
- reduced motion;
- useful alt text;
- contrast-qualified token pairs;
- no global overflow at qualified widths;
- Contacto remains non-interactive until a real accessible submission workflow exists.

## I. SEO and deployment boundary

Already valid:

- Spanish document language;
- meaningful title/description;
- Open Graph title/description/type/site name/locale;
- Twitter summary metadata;
- no obsolete keywords field;
- no fake current-business/location claims.

Deliberately unresolved until #5:

- production origin;
- canonical URL;
- `og:url`;
- absolute social-preview image;
- sitemap;
- robots strategy;
- final base path;
- host-specific security/deploy configuration.

Those are not audit defects. They are explicit cutover dependencies.

## J. Cutover and rollback

The audit does not replace the historical root.

Before #5 can perform cutover it must resolve:

1. production host and public origin;
2. whether the app is deployed at `/` or a subpath;
3. canonical/social metadata using that real origin;
4. sitemap/robots if appropriate to the final route structure;
5. deployment artifact/source authority;
6. post-deploy smoke contract;
7. rollback path to baseline `6b23035cb6fffebbdd8ecd57c6752eae36f09b31`;
8. whether `modern/` stays as source location or is deliberately promoted to the root in the cutover change.

No placeholder domain is acceptable.

## K. Developer experience

Current target workflow remains intentionally small:

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

The hardening pass makes `nvm use` consistent with CI and makes `pnpm check` cover the repository documentation contract.

A root package/workspace, Makefile, task runner or container is not justified for this static React/Vite project at the current complexity level.

## Explicit non-adoptions in the first hardening pass

The following are **not** introduced merely to look complete:

- Docker;
- a monorepo/workspace wrapper;
- Storybook;
- a UI component framework;
- analytics;
- CMS/admin/auth;
- coverage thresholds;
- screenshot-regression infrastructure;
- type-aware ESLint churn without demonstrated findings;
- responsive-image generation without measured need;
- fake canonical/deployment URLs.

Each can be reconsidered when a concrete product or maintenance requirement appears.

## Next audit blocks

After the first hardening PR is green:

1. inspect dependency/lockfile/update strategy and any actionable vulnerability signal available to the repository;
2. inspect TypeScript/lint boundaries for concrete missed defects;
3. map all 29 tests to product risks and identify only high-value missing contracts;
4. decide whether a tiny permanent production-browser smoke is worth keeping;
5. complete the security/privacy/deployment matrix;
6. update #1 and #6 with the final audit status;
7. hand #5 a cutover-only blocker list.

## Definition of Done

The audit is complete when every relevant area has an explicit classification, high-confidence repository hardening is merged, remaining work is either genuinely deferred or isolated as cutover dependency, and the repository no longer carries stale phase/runtime authority in its main documentation or CI contracts.
