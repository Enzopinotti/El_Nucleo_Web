# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

Historical root HTML/SCSS/CSS/assets remain intact as source evidence. `modern/src` is the current application source authority and `modern/dist` is generated deployment output.

## Current phase

The application, historical-content migration, visual system, cross-cutting qualification, content-platform boundary and repository-wide audit are complete.

The only active lane is **#5 — production deploy and controlled root cutover**, currently implemented in PR #32.

The selected modern production authority is:

```text
https://el-nucleo-producciones.netlify.app/
```

The cutover is not considered complete until PR #32 merges, Netlify deploys the qualified `main` state and the real production URL passes the final smoke contract.

## Runtime

- Node.js 24
- pnpm 11.26.0
- React 19
- Vite 8
- TypeScript 6.0.3
- Sass
- Vitest + Testing Library
- ESLint + Prettier

Runtime/package-manager authority is intentionally single-sourced:

- root `.nvmrc` owns Node 24;
- `package.json#packageManager` owns pnpm 11.26.0;
- `package.json#engines` rejects an incompatible Node major;
- GitHub Actions reads those authorities instead of duplicating version literals;
- ESLint rejects a TypeScript version outside the supported `typescript-eslint` range.

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

It enforces:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- explicit denial of the optional `@parcel/watcher` install/build script.

The 24-hour release-age boundary is deliberate. During the pnpm 11 migration it rejected a transitively selected `brace-expansion` release that had been published less than one day earlier. The policy was kept and the lockfile was re-resolved instead of whitelisting the young release.

The final dependency graph also passed bounded advisory evidence at `moderate+` for production and `high+` for the complete tree.

## Source authority

- `../index.html`, `../views/`, `../scss/`, `../css/`: preserved historical 2022 source evidence.
- `src/`: source authority for the 2026 application.
- `src/content/landing-content.ts`: presentation-independent aggregate content contract.
- `src/content/local-content.ts`: current provenance-aware local content authority, including production SEO inputs.
- `src/content/historical-home.ts`: canonical four-category historical service dataset.
- `src/content/historical-about.ts`: historical Nosotros statements and source context.
- `src/content/historical-backstage.ts`: Backstage archive and exact provenance.
- `src/content/historical-team.ts`: historical people and client-reference labels from Equipo.
- `src/content/historical-contact.ts`: exact historical Contacto transport/field contract.
- `src/content/public-asset.ts`: application-owned public-media path helper.
- `src/styles/_tokens.scss`: 2026 visual-system token authority.
- `src/styles/`: modern presentation modules only.
- `public/media/`: qualified historical media promoted into the modern app.
- `public/robots.txt`: production crawl policy.
- `public/sitemap.xml`: single-document production sitemap.
- `pnpm-workspace.yaml`: pnpm 11 supply-chain/install policy.
- `pnpm-lock.yaml`: reproducible dependency resolution under that policy.
- `dist/`: generated deployment output; never hand-edit.
- `../netlify.toml`: Netlify build, publish, security-header and hashed-asset cache authority.

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
- core rendered contrast pairs above 4.5:1.

Issues #10, #11, #12 and #22 are complete. Full visual contract: [`../docs/visual-system-2026.md`](../docs/visual-system-2026.md).

## Content platform 2026

Issue #26 is complete through PR #28.

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

Current projects and current contact channels have typed slots but remain empty, `unverified` and `withheld` until real evidence exists.

There is deliberately no remote provider, CMS dependency or `/admin`.

## Repository audit — complete

Issue #29 / PR #30 are complete.

The final audit merge is:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

Post-merge Modern app quality #132 passed on that `main` state. The later repository-documentation handoff PR #31 also passed post-merge quality #134.

Audit matrix: [`../docs/repository-audit-2026.md`](../docs/repository-audit-2026.md).

## Quality contract

Every material change must preserve:

1. Node 24 + pnpm 11.26.0 reproducibility;
2. frozen install under the committed pnpm policy;
3. `pnpm check` green;
4. the current behavior/content/document contracts unless intentionally evolved with the same change;
5. historical truth/provenance boundaries;
6. media provenance;
7. no current staff/client/service/company claim without verification;
8. no personal-data collection without real transport/privacy semantics;
9. read-only SHA-pinned permanent GitHub Actions;
10. relevant browser QA for public deployment changes;
11. temporary qualification tooling removed before merge;
12. repository-level README/docs synchronized when project authority changes.

The #5 cutover extends the suite to **30 tests across 3 Vitest files** by adding a production-origin contract for canonical/robots/sitemap alongside the existing truth/provenance/behavior coverage.

## TypeScript and lint posture

TypeScript remains `strict: true` on 6.0.3.

TypeScript 7 exists, but the current `typescript-eslint` toolchain officially supports TypeScript `<6.1`. The repository therefore stays on the compatible TypeScript line and configures `onUnsupportedTypeScriptVersion: "error"` so an incompatible bump cannot enter silently.

`skipLibCheck: true` remains deliberate for the current small dependency surface. Type-aware linting or additional React lint plugins are deferred until they demonstrate a real bug class instead of merely increasing rule count.

## Production deployment authority

PR #32 selects Netlify as the modern production provider.

Production origin:

```text
https://el-nucleo-producciones.netlify.app/
```

Build contract from repository root:

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Publish directory:

```text
modern/dist
```

Keeping the repository root as Netlify's build base preserves root `.nvmrc` as the Node authority while Corepack resolves pnpm from this package's `packageManager` field.

## Production metadata authority

The pre-cutover `null` metadata slots are now resolved because a real production origin has been selected:

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
sitemap:   https://el-nucleo-producciones.netlify.app/sitemap.xml
robots:    https://el-nucleo-producciones.netlify.app/robots.txt
```

`index.html`, `localLandingContent.seo`, tests, `robots.txt`, sitemap and deployment/SEO docs are required to agree on the same origin.

The sitemap contains one document URL only; hash anchors are not modeled as separate pages.

## Security/privacy posture

The modern runtime has:

- no third-party runtime scripts;
- no analytics SDK;
- no CMS/admin/auth;
- no live contact transport;
- no fake-success state;
- no modern secret/env contract found by repository audit;
- strict-origin referrer metadata;
- a dependency graph resolved under pnpm 11 supply-chain rules.

`../netlify.toml` adds an enforced CSP based on those actual runtime constraints plus Permissions-Policy, `nosniff` and frame denial.

The CSP was executed successfully in a public Netlify deploy preview and Chrome rendered the React app without requiring a policy relaxation.

## Preview qualification for cutover

PR #32 preview:

```text
https://deploy-preview-32--el-nucleo-producciones.netlify.app/
```

The final preview smoke validates:

- modern 2026 HTML;
- JS/CSS/media;
- production canonical/OG/Twitter values;
- security headers;
- immutable cache for Vite fingerprinted assets;
- `robots.txt` and one-URL sitemap;
- Chrome render under the enforced CSP;
- all primary page sections;
- no live Contacto form.

Before selecting Netlify, the same qualification lane directly probed both known public endpoints and proved that Netlify production and GitHub Pages still served the historical 2022 document.

## GitHub Pages transition state

GitHub Pages is not the modern canonical authority.

Because it serves the preserved historical root, the preferred cleanup after Netlify production is verified is to disable/unpublish Pages in GitHub Settings rather than rewriting historical files merely to redirect them.

That Settings action, along with direct verification of branch protection/rulesets, cannot be completed through the currently connected GitHub actions and remains an explicit final manual verification item in #5.

## Rollback

The deployment contract keeps two recovery paths:

- Netlify deploy-history rollback;
- Git revert of the cutover merge followed by permanent quality, redeploy and public smoke.

Historical baseline:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Full contract: [`../docs/deployment-cutover-2026.md`](../docs/deployment-cutover-2026.md).

## Remaining closure sequence

1. normalize and pass the final PR #32 quality contract;
2. remove temporary preview-smoke tooling;
3. require a clean-head quality + Netlify preview success;
4. merge only that qualified SHA;
5. require post-merge quality on `main`;
6. verify Netlify production now serves the modern app;
7. run the public production smoke;
8. document the final merge/deploy evidence;
9. verify GitHub Pages and branch protection/ruleset directly in Settings;
10. close #5 and #1 when no real blocker remains.
