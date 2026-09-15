# Production deployment + controlled cutover — 2026

Issue: #5  
Parent roadmap: #1  
Standards: #6  
Audit prerequisite: #29 / PR #30

## Purpose

Define the deployment boundary before changing root authority.

This document deliberately separates:

1. facts already proven by the repository;
2. a deployment candidate being qualified;
3. production-origin facts that are still unresolved;
4. destructive cutover actions that remain forbidden until rollback and public smoke are proven.

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

Quality evidence:

- PR #30 final quality #131: success;
- PR #30 post-merge quality #132: success;
- PR #31 documentation quality #133: success;
- PR #31 post-merge quality #134: success.

The modern product is therefore already qualified independently of the hosting decision.

## Current deployment evidence

Known from repository/provider integration:

- GitHub repository metadata reports Pages as enabled;
- the repository does not contain a `CNAME`;
- the repository does not contain a Pages deployment workflow;
- root `index.html` is still the preserved 2022 implementation;
- Netlify is connected to the repository and produces successful PR deploy previews under the `el-nucleo-producciones` site slug;
- before this lane there was no versioned `netlify.toml` deployment contract.

What is **not** yet treated as fact:

- the final production hostname;
- whether a current Netlify production URL is intended to be canonical;
- whether GitHub Pages has a public URL that should remain supported;
- whether a custom domain will be introduced;
- whether `modern/` should ever be physically promoted to repository root.

No canonical or SEO authority is derived from a preview/site slug.

## Deployment candidate — Netlify

Netlify is the first candidate to qualify because it is already part of the actual pull-request workflow and supports version-controlled build, headers and caching policy.

Selecting Netlify as the candidate does **not** yet select a canonical public origin.

### Why the build base remains repository root

The repository has one Node authority:

```text
/.nvmrc → Node 24
```

Netlify resolves `.nvmrc` from the build base. Moving the build base to `modern/` would either lose that authority or require duplicating it.

The file-based deployment contract therefore keeps the default repository-root base and runs the modern build explicitly:

```toml
[build]
  command = "cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build"
  publish = "modern/dist"
```

This keeps:

- Node authority at root `.nvmrc`;
- pnpm authority at `modern/package.json#packageManager`;
- dependency resolution under `modern/pnpm-lock.yaml` + `modern/pnpm-workspace.yaml`;
- only generated `modern/dist` inside the deployment artifact.

`dist/` remains generated output and never becomes manually edited source authority.

## Versioned security-header policy

The candidate Netlify configuration applies the following to the deployed modern site:

- `Content-Security-Policy`;
- `Permissions-Policy`;
- `Referrer-Policy`;
- `X-Content-Type-Options`;
- `X-Frame-Options`.

The CSP is intentionally based on the current runtime evidence:

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

Current modern source has no required third-party runtime scripts, remote fonts, iframe, live form submission, fetch/WebSocket transport or inline style/script contract that would justify relaxing this policy.

If a future product capability needs an additional origin, that origin must be added as a reviewable product/security decision rather than through a broad wildcard.

### Deliberately not configured yet

- HSTS — defer until the actual production hostname/domain and HTTPS ownership are confirmed;
- cross-origin isolation headers — no current product requirement;
- permissive analytics/third-party script origins — no analytics runtime exists;
- form destination — Contacto remains non-collecting;
- SPA rewrite — the app currently uses one document + hash anchors, not client-side route URLs.

## Caching

Vite-generated fingerprinted files under `/assets/*` receive:

```text
Cache-Control: public, max-age=31536000, immutable
```

Historical/public media under `/media/` is not given the same immutable policy because those filenames are not content-hashed.

HTML is not forced into a long cache policy so new releases remain observable without stale-document authority.

## Preview qualification — required before merge

The cutover-preparation PR must prove all of the following on its Netlify deploy preview:

- Netlify accepts the versioned `netlify.toml`;
- build uses the modern package rather than historical root HTML;
- build succeeds under Node 24 and pnpm 11.26.0;
- frozen install passes the committed supply-chain policy;
- deploy serves the modern HTML/title/content;
- JS/CSS assets resolve;
- security headers are present;
- CSP does not prevent the application from rendering;
- `/assets/*` immutable cache header is present;
- primary modern anchors/content are present;
- Contacto remains non-interactive;
- no production canonical/`og:url` is invented in preview.

A temporary preview-only smoke workflow may be used to gather this evidence and must be removed before merge.

## Production-origin selection gate

After preview qualification, production authority still requires an explicit origin.

The chosen origin must be recorded here before metadata changes:

```text
Provider: unresolved
Production origin: unresolved
Custom domain: unresolved
Root/subpath: unresolved
```

Only after those fields are real may the repository add:

- canonical URL;
- `og:url`;
- absolute social preview image URL;
- sitemap URL set;
- host-specific robots policy;
- HSTS if appropriate.

A Netlify deploy-preview URL is never canonical authority.

## Source authority after deployment

Preferred non-destructive model unless production evidence proves otherwise:

```text
2022 root files            → preserved historical source evidence
modern/src                 → current application source authority
modern/dist                → generated deploy artifact
netlify.toml               → versioned Netlify deployment/header authority
```

This model allows production cutover without physically deleting or rewriting the historical root.

Physical promotion of the modern source to repository root remains a separate destructive-boundary decision, not a prerequisite for serving the modern product.

## Rollback contract

Rollback must be possible at two levels.

### Provider rollback

If Netlify becomes the production provider, retain the ability to restore the previously known-good deploy through Netlify deploy history.

The exact provider procedure must be verified against the production site before closing #5.

### Repository rollback

For any merged cutover PR:

1. identify the exact cutover merge commit;
2. revert that commit rather than rewriting Git history;
3. verify permanent quality on the revert;
4. redeploy the reverted state;
5. run the same public smoke used for cutover validation.

Historical source reference remains permanently available at:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

The pre-cutover modern app remains separately reconstructable from Git history even if provider rollback is unavailable.

## Public smoke — final cutover gate

Once a real production origin exists, smoke must check the user-facing environment, not only local/preview build output:

- HTTPS and expected hostname;
- final redirect/canonical hostname behavior;
- HTTP success for document, JS, CSS and representative images;
- expected security headers;
- no CSP-blocking runtime errors;
- one H1 and expected landmarks;
- primary navigation anchors;
- no global horizontal overflow on representative mobile/desktop widths;
- skip link/focus baseline;
- reduced-motion behavior;
- current/historical truth labels;
- Contacto remains non-collecting;
- canonical/OG/social metadata match the real origin;
- no historical root document is accidentally served as production authority.

This is the appropriate place for durable browser smoke if #5 determines one is worth keeping.

## GitHub repository protection gate

Before #5 closes, verify directly in GitHub Settings:

- branch protection and/or ruleset for `main`;
- required quality status as appropriate;
- force-push and branch-deletion policy;
- intended merge strategy after cutover.

Current connector permissions cannot reliably read the traditional branch-protection endpoint, so this must not be inferred from API absence.

## External documentation consulted

Deployment configuration decisions are based on current Netlify documentation for:

- monorepo/base/package directory behavior;
- file-based `netlify.toml` configuration;
- Node `.nvmrc` resolution;
- `packageManager`/Corepack pnpm selection;
- custom security headers;
- Vite build/publish behavior.

The deployment contract remains repository-owned even if provider defaults later change.

## Definition of Done

#5 can close only when:

- candidate preview is qualified;
- production provider/origin is explicit;
- production metadata uses that real origin;
- host security configuration is verified;
- public smoke passes;
- rollback is executable;
- post-cutover source/artifact authority is documented;
- repository protection is verified;
- root README and architecture docs describe the actual deployed state;
- #1 can be closed truthfully.
