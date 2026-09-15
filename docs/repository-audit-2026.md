# Repository audit 2026 — pre-cutover hardening

Issue: #29  
Hardening PR: #30  
Standards authority: #6  
Cutover owner: #5

## Purpose

This document is the durable audit record for the repository after the historical-content migration, visual-system work, cross-cutting accessibility/media/metadata qualification and content-platform boundary have already landed in `main`.

The audit started from `b6571067eaa08fbbdc0e2af3f2cf6320a0ca257a` and deliberately separates five outcomes:

- **pass** — the repository already satisfies the intended standard;
- **improve** — a concrete, bounded change provides meaningful value now;
- **defer** — useful only when a real future requirement exists;
- **historical** — belongs to the preserved 2022 implementation and must not be rewritten merely to make the archive look current;
- **cutover-blocked** — cannot be completed honestly until deployment/origin decisions exist.

The goal is not to accumulate tooling. The goal is to make the repository truthful, reproducible, maintainable and ready for a controlled cutover.

## Executive status

| Area                                     | Status                             | Current conclusion                                                                                                                |
| ---------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Historical preservation                  | **pass**                           | 2022 source remains inspectable and is not destructively rewritten.                                                               |
| Node authority                           | **improve → addressed in PR #30**  | `.nvmrc` was Node 22 while package/CI/docs required Node 24; `.nvmrc` now owns Node 24 and CI reads it.                           |
| pnpm authority                           | **improve → addressed in PR #30**  | pnpm moves from 9.15.9 to 11.26.0; `packageManager` becomes the version authority consumed by CI.                                 |
| Dependency surface                       | **pass**                           | Runtime dependencies remain only React + ReactDOM; no backend/UI/animation dependency creep.                                      |
| Lockfile/install reproducibility         | **improve → addressed in PR #30**  | Lockfile was rebuilt with pnpm 11 and frozen installation remains the permanent contract.                                         |
| Release-age supply-chain policy          | **improve → addressed in PR #30**  | New/transitive releases must be at least 24 hours old under strict enforcement.                                                   |
| Dependency build scripts                 | **improve → addressed in PR #30**  | Install/build scripts require explicit trust; optional `@parcel/watcher` remains denied because the product qualifies without it. |
| Dependency vulnerability evidence        | **pass**                           | One-shot audit: no production `moderate+` findings and no complete-tree `high+` findings.                                         |
| CI permissions/actions                   | **pass**                           | Read-only permanent workflow, finite timeout, concurrency cancellation and immutable action SHAs.                                 |
| CI path coverage                         | **improve → addressed in PR #30**  | README/docs/runtime-authority/workflow changes now trigger the permanent quality contract.                                        |
| Local/CI contract equivalence            | **improve → addressed in PR #30**  | `pnpm check` includes application + repository documentation formatting, lint, TS, tests and build.                               |
| TypeScript baseline                      | **pass**                           | `strict: true`; TS 6.0.3 is intentionally retained because the current parser/linter supports `<6.1`.                             |
| Unsupported TypeScript drift             | **improve → addressed in PR #30**  | ESLint now treats an unsupported TypeScript version as an error.                                                                  |
| `skipLibCheck`                           | **defer**                          | No concrete declaration-risk evidence justifies spending signal on third-party declaration internals.                             |
| Type-aware/React-specific lint expansion | **defer**                          | No concrete missed defect justifies extra plugin/rule complexity now.                                                             |
| Tests                                    | **pass**                           | 29 risk-oriented behavior/contract tests are green; no percentage target is needed.                                               |
| Numeric coverage threshold               | **defer**                          | Would reward line coverage more than demonstrated product-risk coverage at current scope.                                         |
| Production browser evidence              | **pass**                           | Material migration lanes already qualified production builds at 360/768/1440 and key keyboard/media invariants.                   |
| Permanent E2E/screenshot suite           | **defer to cutover**               | Stable DOM contracts are already automated; the highest-value persistent browser smoke is the final public URL after deployment.  |
| Modern runtime external scripts          | **pass**                           | `modern/index.html` has no third-party script/embed runtime dependency.                                                           |
| Secrets/env usage                        | **pass**                           | Repository search found no modern secret/env contract or credential-like runtime configuration.                                   |
| Contact/privacy boundary                 | **pass**                           | No live form, personal-data transport or fake-success state exists.                                                               |
| Media/provenance                         | **pass**                           | Promoted historical media is local, provenance-backed and lazy below the hero where appropriate.                                  |
| Media derivative pipeline                | **defer**                          | Current ~768 KiB promoted archive does not justify derivative tooling without deployment measurements.                            |
| Metadata truthfulness                    | **pass**                           | Current title/description/OG fields do not fabricate current operations or deployment URLs.                                       |
| Canonical/origin/social preview          | **cutover-blocked**                | Requires the real production origin.                                                                                              |
| sitemap/robots                           | **cutover-blocked**                | Requires final origin/route/host strategy.                                                                                        |
| CSP/security headers                     | **cutover-blocked**                | Must be configured against the selected hosting boundary and real asset/origin policy.                                            |
| Root replacement                         | **cutover-blocked**                | Must remain in #5 after audit completion.                                                                                         |
| Rulesets                                 | **review/defer**                   | Rulesets API returns an empty set; no ruleset is created merely for appearance.                                                   |
| Traditional branch protection            | **unknown from current connector** | The integration cannot read that endpoint; absence is not inferred. Verify in repository settings before final cutover.           |
| Automated dependency updater             | **defer**                          | Small dependency surface + strict lock/install policy reduces urgency; add only if update maintenance becomes repetitive.         |
| CONTRIBUTING                             | **defer**                          | Single-owner historical portfolio currently has no contributor workflow that needs extra boilerplate.                             |
| SECURITY.md                              | **defer**                          | No service/backend/user-data attack surface exists today; add a reporting policy when the public product surface warrants one.    |
| LICENSE                                  | **defer**                          | Do not assign a license retroactively without an explicit decision covering historical code and media rights.                     |

## A. Repository authority and documentation

### What was already correct

- Root historical HTML/SCSS/CSS/assets remain source evidence.
- `modern/src/` is the 2026 runtime source authority.
- `modern/dist/` is generated output and ignored.
- Content authority is centralized under `modern/src/content/`.
- Media provenance is documented down to historical paths/blob SHAs.
- The content platform separates historical truth from verified-current editorial copy.

### Findings and action

Before #29:

1. root README and `modern/README.md` still described #26 as active after PR #28 merged;
2. `docs/modernization-2026.md` still described earlier lanes as current;
3. root README/docs-only changes could bypass permanent CI;
4. several historical Markdown files had never passed the repository's current Prettier version.

PR #30:

- synchronizes phase/status docs;
- adds `docs:check` to the canonical quality contract;
- expands CI trigger coverage;
- normalizes existing Markdown using the exact repository Prettier version rather than manual whitespace edits.

## B. Runtime, package manager and dependencies

### Node authority

Before #29:

- root `.nvmrc`: Node 22;
- `modern/package.json`: `>=24 <25`;
- CI: Node 24;
- documentation: Node 24.

That disagreement meant `nvm use` selected a different runtime from the package/CI contract.

PR #30 changes the contract to:

- `.nvmrc` = Node 24;
- package `engines` remains the compatibility guard;
- GitHub Actions uses `node-version-file: .nvmrc`.

### pnpm authority

The repository originally pinned pnpm 9.15.9 independently in package metadata and workflow YAML.

The audit upgrades to pnpm 11.26.0 and removes duplicated version ownership:

- `modern/package.json#packageManager` is the source of truth;
- `pnpm/action-setup` reads that file directly;
- permanent CI still runs an explicit frozen install.

pnpm 12 is not adopted in this audit. A major-version number is not a goal by itself; the repository stays on the current stable 11 line while the newly released 12 line accumulates real-world compatibility evidence.

### Dependency currency

The audited application already sits on current releases for the principal stack used by this repository: React, Vite, Sass, ESLint, Prettier and Vitest.

TypeScript is the deliberate exception: 7.x exists, but the installed `typescript-eslint` line officially supports TypeScript `<6.1`. The project therefore keeps TypeScript 6.0.3 and now makes an unsupported TypeScript version a lint error.

### Runtime dependency surface

Current production dependencies remain:

- React;
- ReactDOM.

There is no router, UI kit, animation library, state library, CMS SDK, analytics SDK or backend client without a product requirement.

This is a **pass** and should not be made “more enterprise” by adding packages that solve no present problem.

## C. pnpm 11 supply-chain policy

### Why pnpm 11 added real value

The first pnpm 11 frozen install rejected an existing lockfile entry because `brace-expansion@5.0.10` had been published less than 24 hours earlier.

The response was **not** to disable the safety feature or whitelist that version.

Instead, the repository now explicitly owns this policy in `modern/pnpm-workspace.yaml`:

```yaml
minimumReleaseAge: 1440
minimumReleaseAgeStrict: true
blockExoticSubdeps: true
allowBuilds:
  "@parcel/watcher": false
```

The lockfile was then regenerated under that policy and the complete quality contract passed.

### Build-script policy

pnpm 11 also surfaced an ignored build script for `@parcel/watcher@2.6.0`.

Repository inspection showed it enters as an **optional dependency of Sass 1.104.1**. Vite/Sass compilation and the full test/build contract succeed without running that native install script, so the repository explicitly denies it rather than granting unused code execution.

### Advisory evidence

After lockfile migration, a read-only one-shot workflow ran:

- `pnpm audit --prod --audit-level=moderate`;
- `pnpm audit --audit-level=high`.

Both passed on the frozen graph.

Accepted evidence: workflow run `34969694556`.

The advisory lookup is **not** a permanent quality gate because it depends on an external registry/advisory service and can introduce unrelated availability noise. Frozen resolution, release-age protection and explicit build-script policy remain the deterministic CI contract.

## D. CI and supply chain

### Permanent workflow strengths

`modern-quality.yml` now provides:

- `permissions: contents: read`;
- SHA-pinned third-party actions;
- Ubuntu 24.04 runner;
- finite timeout;
- concurrency cancellation;
- Node from `.nvmrc`;
- pnpm from `packageManager`;
- frozen install;
- one canonical `pnpm check` command;
- production build inside the quality contract.

### Trigger coverage

Before #29 the workflow was triggered only by `modern/**` and itself.

The hardening PR expands trigger coverage to:

- `modern/**`;
- `README.md`;
- `docs/**`;
- `.editorconfig`;
- `.gitignore`;
- `.nvmrc`;
- `.github/workflows/**`.

Running one existing quality job is preferable to duplicating setup in a second docs-only workflow at this repository size.

### Temporary workflows

Two bounded write-enabled workflows were used during hardening:

- canonical Markdown formatting;
- pnpm 11 lockfile migration.

One read-only workflow was used for dependency advisory evidence.

All are temporary qualification/migration tooling and are removed before merge. Permanent CI remains read-only.

## E. Formatting, TypeScript and lint

### Formatting

`pnpm check` has two explicit formatting scopes:

1. modern application/configuration files;
2. root README + `docs/**/*.md`.

This keeps documentation-as-code enforceable without inventing a root package/monorepo wrapper.

### TypeScript

Current useful guarantees:

- `strict: true`;
- `noEmit`;
- Bundler module resolution;
- isolated modules;
- consistent file casing;
- no JS admission into the TypeScript program.

`skipLibCheck: true` is deliberately retained. The project has a small modern dependency surface and no observed declaration mismatch; removing it would primarily spend CI time/signals on third-party declarations.

### ESLint

Current lint is zero-warning and includes TypeScript recommended rules plus consistent type imports/no-unused-vars.

The audit adds:

```text
onUnsupportedTypeScriptVersion = error
```

so a future unsupported TypeScript upgrade fails instead of producing a soft compatibility warning.

Type-aware linting and additional React plugins remain **deferred pending evidence**. No current missed-defect class justifies their configuration/runtime cost.

## F. Tests and browser QA

### Current permanent test baseline

The 29-test suite was mapped by product risk:

- **6** `localLandingContent` tests protect truth/publication/provenance, current-domain emptiness and SEO deployment boundaries;
- **4** document-contract tests protect metadata, semantic structure/navigation, media behavior and Contacto non-interactivity;
- **19** visible behavior tests protect historical identity, Nosotros truth boundaries, service/gallery interaction, Backstage, Equipo/client history, exact Contacto source contract and skip-link behavior.

A small possible extra assertion — forward wrap from the final gallery item — would be redundant with already tested state changes and reverse wrap. It is not added merely to increase a count.

### Coverage policy

No numeric coverage threshold is introduced.

The present suite is intentionally contract/behavior-oriented. A percentage gate would be useful only if it revealed a concrete untested risk, not as a portfolio badge.

### Browser QA decision

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

A permanent Playwright/screenshot suite is **not** added in #29.

Reason:

- stable DOM/product contracts are already covered by Vitest/Testing Library;
- screenshot tests would add dependency/runtime/brittleness without a current visual-change cadence that justifies them;
- the most valuable persistent browser check is a **post-deploy smoke against the final public URL**, which belongs to #5 and can validate the host/base-path/headers/assets that local CI cannot.

## G. Security and privacy

### Modern runtime

Current review found:

- no third-party runtime scripts in `modern/index.html`;
- no live contact transport;
- no analytics SDK;
- no CMS/admin auth surface;
- no modern environment-secret contract found by repository search;
- strict-origin referrer metadata is present;
- dependency graph is frozen and qualified under explicit pnpm 11 supply-chain policy;
- one-shot advisory evidence is clean at the documented severity thresholds.

### Historical source

The 2022 site contains CDN/script/form patterns that would not be selected today. Those are classified **historical**, not silently rewritten.

### Security headers/CSP

A production CSP and host-level security headers are not authored blindly before the hosting boundary is chosen. They are **cutover-blocked** because exact directives/configuration depend on provider, public origin and asset strategy.

## H. Performance and media

Current known baseline:

- promoted historical media: 11 files / 786,374 bytes (~768 KiB);
- above-fold mark eager;
- below-fold media lazy where rendered;
- modern production build is part of every quality run;
- no remote font/CDN runtime dependency in the modern app.

No WebP/AVIF/responsive-derivative pipeline is added solely for technology parity. The trigger for that work is measured deployment/LCP/transfer evidence or materially larger future media.

## I. Accessibility regression protection

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

## J. SEO and deployment boundary

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
- host-specific CSP/security/deploy configuration.

Those are not audit defects. They are explicit cutover dependencies.

## K. Repository governance / maintenance files

### Rulesets and branch protection

The repository rulesets API currently returns an empty set.

The connected integration cannot read the traditional branch-protection endpoint, so this audit does **not** claim that `main` is unprotected. That setting must be verified directly in repository settings before final cutover.

No ruleset is created merely to produce a green audit row. If the repository will continue receiving active changes after cutover, requiring the permanent quality check before merging to `main` is a sensible governance decision to make with the owner in the GitHub settings boundary.

### Automated dependency updater

Dependabot/Renovate is not added in PR #30.

The dependency surface is small, most principal packages are already current, and pnpm's strict install policy now prevents “latest semver wins immediately” behavior. Automated update PRs become useful when update maintenance becomes repetitive enough to outweigh notification/PR noise.

### CONTRIBUTING / SECURITY / LICENSE

These files are not manufactured as portfolio decoration:

- **CONTRIBUTING**: single-owner historical repo has no active contributor contract today;
- **SECURITY.md**: no backend/auth/data service is currently operated; add a reporting policy if the deployed product gains a meaningful vulnerability-reporting surface;
- **LICENSE**: historical code and visual/media rights should not be retroactively assigned a license without an explicit owner decision.

## L. Cutover and rollback

The audit does not replace the historical root.

Before #5 can perform cutover it must resolve:

1. production host and public origin;
2. whether the app is deployed at `/` or a subpath;
3. canonical/social metadata using that real origin;
4. sitemap/robots if appropriate to the final route structure;
5. host-specific CSP/security headers;
6. deployment artifact/source authority;
7. post-deploy smoke against the real public URL;
8. rollback path to baseline `6b23035cb6fffebbdd8ecd57c6752eae36f09b31`;
9. whether `modern/` stays as source location or is deliberately promoted to the root in the cutover change;
10. repository protection/ruleset verification for the post-cutover maintenance model.

No placeholder domain is acceptable.

## M. Developer experience

Current target workflow remains intentionally small:

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

The hardening pass makes `nvm use`, pnpm selection, supply-chain policy and CI agree with each other, while `pnpm check` also covers repository documentation.

A root package/workspace, Makefile, generic task runner or container is not justified for this static React/Vite project at the current complexity level.

## Explicit non-adoptions

The following are **not** introduced merely to look complete:

- Docker;
- a root monorepo/workspace wrapper;
- Storybook;
- a UI component framework;
- analytics;
- CMS/admin/auth;
- coverage thresholds;
- permanent screenshot-regression infrastructure;
- Playwright before a public deployment smoke has real value;
- type-aware ESLint churn without demonstrated findings;
- responsive-image generation without measured need;
- permanent registry-backed `pnpm audit` gate;
- automated dependency PR noise before maintenance volume justifies it;
- fake canonical/deployment URLs.

Each can be reconsidered when a concrete product, risk or maintenance requirement appears.

## Audit closure sequence

PR #30 is accepted only after:

1. all temporary write/read qualification workflows are removed;
2. permanent `modern-quality` passes on the clean final branch head using Node from `.nvmrc` and pnpm from `packageManager`;
3. Netlify/deploy-preview status, if present, remains successful;
4. PR description records the supply-chain migration and advisory evidence;
5. merge is SHA-guarded and post-merge permanent quality passes on `main`.

After post-merge verification:

- update #1 to show modernization/audit complete and cutover as the remaining lane;
- update #6 with the standards actually proven by this repository;
- hand #5 the explicit cutover blocker list above;
- close #29 as completed if no new actionable debt appears during final qualification.

## Definition of Done

The audit is complete when every relevant area has an explicit classification, high-confidence repository hardening is merged, remaining work is either deliberately deferred or isolated as cutover dependency, temporary audit tooling is gone, and the repository no longer carries stale phase/runtime/dependency authority in its main documentation or CI contracts.
