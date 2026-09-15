# Production deployment + controlled cutover — 2026

Issue: #5  
Parent roadmap: #1  
Standards: #6  
Audit prerequisite: #29 / PR #30

## Purpose

Define and qualify the production boundary before changing public authority.

The modern source stays isolated under `modern/`; production cutover is a deployment decision, not permission to erase the 2022 root from Git.

## Proven pre-cutover baseline

Historical rollback reference:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Pre-cutover hardened `main` after repository audit:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

Repository-documentation handoff after PR #31:

```text
905b72478212131c4ef6b6b5b62d0d02c951b22d
```

Quality evidence before #5:

- PR #30 final quality #131: success;
- PR #30 post-merge quality #132: success;
- PR #31 documentation quality #133: success;
- PR #31 post-merge quality #134: success.

The product was therefore qualified independently of hosting before the production lane began.

## Public endpoint discovery

A temporary read-only discovery/smoke workflow probed both known public endpoints on 2026-09-15.

### Netlify production site

```text
Requested: https://el-nucleo-producciones.netlify.app/
HTTP: 200
Final URL: https://el-nucleo-producciones.netlify.app/
Title before cutover: El núcleo | Producciones
Authority before cutover: historical-2022
```

### GitHub Pages

```text
Requested: https://enzopinotti.github.io/El_Nucleo_Web/
HTTP: 200
Final URL: https://enzopinotti.github.io/El_Nucleo_Web/
Title before cutover: El núcleo | Producciones
Authority before cutover: historical-2022
```

This removes the earlier ambiguity: both public endpoints existed and both served the preserved historical root before #5.

## Selected modern production authority

```text
Provider: Netlify
Production origin: https://el-nucleo-producciones.netlify.app/
Custom domain: none selected for this cutover
Route/base path: /
Deploy source: main branch through the connected Netlify site
Publish artifact: modern/dist
```

Netlify is selected because:

- it is already connected to the real repository workflow;
- deploy previews are available on pull requests;
- the exact production endpoint exists and was probed directly;
- file-based build/header configuration can be versioned in the repository;
- the modern preview was successfully rendered under the proposed security policy before production cutover.

The deploy-preview hostname is **not** canonical authority. Canonical points to the production origin above.

## GitHub Pages after the Netlify cutover

GitHub Pages is not selected as the modern canonical origin.

Because the root historical files are intentionally preserved, Pages currently remains capable of serving the 2022 site. The preferred resolution is to disable/unpublish Pages in GitHub Settings after the Netlify production cutover is verified, rather than mutating the historical root solely to force a redirect.

Until that Settings action is verified:

- Pages is a historical/transition endpoint;
- it must not appear in canonical, sitemap or social metadata;
- it must not be described as the current modern product.

## Versioned Netlify build contract

The repository has one Node authority:

```text
/.nvmrc → Node 24
```

The Netlify build therefore keeps the repository root as its base and enters the modern package explicitly:

```toml
[build]
  command = "cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build"
  publish = "modern/dist"
```

This preserves:

- Node authority at root `.nvmrc`;
- pnpm authority at `modern/package.json#packageManager`;
- dependency resolution under `modern/pnpm-lock.yaml` + `modern/pnpm-workspace.yaml`;
- pnpm 11 release-age/exotic/build-script supply-chain policy;
- `modern/src` as source authority;
- only generated `modern/dist` inside the deployment artifact.

`dist/` remains generated output and never becomes manually edited source authority.

## Security-header policy

The Netlify configuration applies:

- `Content-Security-Policy`;
- `Permissions-Policy`;
- `Referrer-Policy`;
- `X-Content-Type-Options`;
- `X-Frame-Options`.

The enforced CSP is:

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'none';
img-src 'self' data:;
font-src 'self';
style-src 'self';
script-src 'self';
connect-src 'self';
upgrade-insecure-requests
```

This is based on actual source/runtime evidence: the modern app has no required third-party runtime scripts, remote fonts, iframe, live form submission, fetch/WebSocket transport or inline style/script contract.

A future product capability that needs another origin must update the policy explicitly rather than using broad wildcards.

### Deliberate header decisions

Not added merely for completeness:

- custom HSTS: the selected `netlify.app` origin is already HTTPS; a custom-domain HSTS policy should be decided only if a custom hostname is introduced;
- cross-origin isolation: no present product requirement;
- third-party analytics origins: no analytics runtime exists;
- form destination: Contacto remains non-collecting;
- SPA rewrite: the product is one public document with hash anchors, not client-side route URLs.

## Caching

Vite-generated fingerprinted files under `/assets/*` receive:

```text
Cache-Control: public, max-age=31536000, immutable
```

Media under `/media/` is not assigned the same immutable browser policy because those filenames are not content-hashed.

HTML remains revalidatable so a new deployment does not leave stale document authority in the browser.

## Preview qualification evidence

PR #32 deploy preview:

```text
https://deploy-preview-32--el-nucleo-producciones.netlify.app/
```

The temporary smoke workflow validated over the public network:

- HTTP success for the preview document;
- modern 2026 document title rather than historical root HTML;
- generated JS and CSS asset references;
- successful retrieval of JS/CSS;
- CSP header with `default-src 'self'` and `form-action 'none'`;
- Permissions-Policy;
- strict-origin referrer header;
- `nosniff`;
- frame denial;
- immutable one-year cache header on hashed `/assets/*` output;
- Chrome rendered the React application under the enforced CSP;
- rendered shell contains `Archivo 2022 · reconstrucción 2026`;
- `main-content`, Nosotros, Servicios, Backstage, Equipo, Contacto and Historia all rendered;
- no live `<form>` appeared.

The same temporary workflow also produced the endpoint-discovery evidence recorded above.

Temporary smoke tooling must be removed before merge. Its evidence remains recorded here and in PR #32.

## Production metadata authority

Now that provider/origin/root path are selected, the cutover slice resolves the fields that were intentionally deferred before #5:

```text
Canonical: https://el-nucleo-producciones.netlify.app/
og:url: https://el-nucleo-producciones.netlify.app/
Social image: https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
Sitemap: https://el-nucleo-producciones.netlify.app/sitemap.xml
Robots: https://el-nucleo-producciones.netlify.app/robots.txt
```

The repository-owned historical logo is used for the current summary-card/social image rather than inventing unrelated artwork.

The single-page sitemap contains only the canonical document URL. Hash anchors are not fake pages.

These values must stay synchronized across:

- `modern/index.html`;
- `localLandingContent.seo`;
- document/content tests;
- `robots.txt`;
- `sitemap.xml`;
- SEO/deployment documentation.

If a custom domain is introduced later, all of those authorities change together.

## Source authority after deployment

The selected non-destructive model is:

```text
2022 root files            → preserved historical source evidence
modern/src                 → current application source authority
modern/dist                → generated Netlify deploy artifact
netlify.toml               → versioned Netlify deployment/header authority
```

The modern product can become the public production site without physically moving source files to repository root.

There is therefore no current technical justification for a destructive `modern/` → root source migration.

## Rollback contract

Rollback exists at two levels.

### Provider rollback

Netlify keeps deploy history for the connected site. If production verification fails after merge, restore the previously known-good historical deployment from the provider deploy history while repository rollback is prepared.

The actual production smoke after merge must confirm that the connected `main` deployment completed before #5 is considered closed.

### Repository rollback

For the cutover merge commit:

1. identify the exact merge SHA;
2. revert the merge commit instead of rewriting Git history;
3. require permanent quality on the revert;
4. let Netlify redeploy the reverted `main`;
5. run the production smoke again.

Historical source remains permanently available at:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Pre-cutover modern source and all audit evidence remain separately recoverable from Git history.

## Final production smoke — required after merge

After PR #32 merges and Netlify deploys `main`, verify the actual production origin:

- HTTPS 200 at `https://el-nucleo-producciones.netlify.app/`;
- modern title/content instead of the historical document;
- JS/CSS/media success;
- security headers;
- CSP-compatible render in Chrome;
- canonical equals the production origin;
- `og:url` equals the production origin;
- social image resolves;
- `robots.txt` resolves and references the production sitemap;
- `sitemap.xml` resolves and contains exactly the canonical document URL;
- one H1 and expected landmarks;
- primary anchors render;
- Contacto remains non-collecting;
- no global horizontal overflow at representative widths;
- historical/current truth labels remain correct.

Only this production smoke can prove that public authority has actually moved from 2022 to 2026.

## GitHub repository protection gate

Before #5 closes, verify directly in GitHub Settings:

- branch protection and/or ruleset for `main`;
- required quality status as appropriate;
- force-push and branch-deletion policy;
- intended merge strategy after cutover;
- GitHub Pages is disabled/unpublished if Netlify remains the sole modern public authority.

Current connector permissions cannot reliably read the traditional branch-protection endpoint and do not provide a supported Pages mutation action. These settings must not be inferred from API absence.

## External documentation consulted

Deployment configuration decisions were checked against current Netlify documentation for:

- monorepo/base/package directory behavior;
- file-based `netlify.toml` configuration;
- Node `.nvmrc` resolution;
- `packageManager`/Corepack pnpm selection;
- custom security headers/CSP;
- Vite build/publish behavior;
- static asset caching.

The deployment contract remains repository-owned even if provider defaults later change.

## Definition of Done

#5 can close only when:

- final branch quality is green;
- Netlify preview with production metadata is qualified;
- temporary smoke tooling is removed;
- PR #32 is merged through its qualified head;
- post-merge repository quality is green;
- Netlify production deploy serves the modern 2026 app;
- final production smoke passes;
- rollback is executable/documented;
- source/artifact authority is documented;
- root README and architecture docs describe the actual deployed state;
- GitHub branch protection/ruleset and Pages state are verified directly;
- #1 can be closed truthfully as a completed modernization.
