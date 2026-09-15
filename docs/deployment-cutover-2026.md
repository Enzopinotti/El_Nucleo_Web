# Production deployment + controlled cutover — 2026

Issue: #5  
Parent roadmap: #1  
Standards: #6  
Audit prerequisite: #29 / PR #30

## Final status

The production cutover is complete.

```text
Provider: Netlify
Production origin: https://el-nucleo-producciones.netlify.app/
Route/base path: /
Deploy source: main
Publish artifact: modern/dist
Cutover merge: c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
Post-merge quality: #154 success
Production smoke: success
```

The 2022 root remains preserved in Git as historical source evidence. The modern source remains under `modern/` and Netlify publishes only the generated production artifact.

## Historical rollback baseline

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Pre-cutover hardening merge:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

Repository handoff before the cutover lane:

```text
905b72478212131c4ef6b6b5b62d0d02c951b22d
```

## Public endpoint discovery before cutover

A temporary read-only CI workflow probed both known public endpoints before selecting authority.

### Netlify

```text
https://el-nucleo-producciones.netlify.app/
HTTP 200
Title: El núcleo | Producciones
Authority: historical-2022
```

### GitHub Pages

```text
https://enzopinotti.github.io/El_Nucleo_Web/
HTTP 200
Title: El núcleo | Producciones
Authority: historical-2022
```

Both public endpoints therefore served the historical implementation before #5.

## Production authority decision

Netlify became the modern authority because it was already connected to the repository, produced real PR deploy previews and supported a version-controlled deployment contract.

Canonical production origin:

```text
https://el-nucleo-producciones.netlify.app/
```

The deploy-preview hostname is never canonical authority.

GitHub Pages is not part of the modern SEO or deployment contract.

## Source and artifact authority

```text
2022 root files
    → historical source evidence

modern/src
    → current source authority

modern/dist
    → generated production artifact

netlify.toml
    → build/header/cache authority
```

Physical promotion of `modern/` to repository root was deliberately avoided because deployment does not require destroying or rewriting historical evidence.

## Netlify build contract

Repository root remains the build base so `.nvmrc` stays the single Node authority.

```toml
[build]
  command = "cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build"
  publish = "modern/dist"
```

This preserves:

- Node 24 from `.nvmrc`;
- pnpm 11.26.0 from `modern/package.json#packageManager`;
- frozen installation;
- `modern/pnpm-lock.yaml`;
- `modern/pnpm-workspace.yaml` supply-chain policy;
- generated output separation.

## Security headers

`netlify.toml` applies the following to production:

- Content-Security-Policy;
- Permissions-Policy;
- Referrer-Policy;
- `X-Content-Type-Options`;
- `X-Frame-Options`.

CSP:

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

The application has no runtime requirement for third-party scripts, remote fonts, iframes, live form submission or external data transports, so the policy does not whitelist unnecessary origins.

The same enforced CSP was tested with Chrome against deploy preview and production.

## Cache policy

Vite fingerprinted files under `/assets/*` receive:

```text
Cache-Control: public, max-age=31536000, immutable
```

HTML and non-fingerprinted historical/public media are not forced into the same immutable policy.

## Production metadata

Once production authority was proven, the deployment-specific SEO inputs were resolved:

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
robots:    https://el-nucleo-producciones.netlify.app/robots.txt
sitemap:   https://el-nucleo-producciones.netlify.app/sitemap.xml
```

The social image uses a repository-owned qualified historical logo.

The sitemap contains one URL because the application is a single document with semantic anchors, not separate routes.

## Preview qualification

Before merge, PR #32 deployed the modern product to:

```text
https://deploy-preview-32--el-nucleo-producciones.netlify.app/
```

The final preview smoke validated:

- modern title and document;
- canonical/Open Graph/Twitter production URLs;
- JS/CSS/media availability;
- CSP and security headers;
- immutable asset cache;
- `robots.txt`;
- one-URL sitemap;
- React render in headless Chrome;
- primary sections;
- no live Contacto form.

Temporary qualification tooling was deleted before merge.

## Final clean PR head

```text
054e760a27d6b9751723115c288b68fb44434088
```

Permanent Modern app quality #153: **success**.

That run confirmed:

- Node 24;
- pnpm 11.26.0;
- frozen install;
- supply-chain policy;
- application formatting;
- docs formatting;
- ESLint;
- TypeScript;
- 30/30 tests;
- Vite production build.

Netlify deploy preview on that same clean head: **success**.

## Controlled merge

PR #32 was merged with expected-head protection.

Merge commit:

```text
c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
```

Post-merge Modern app quality #154 executed on the actual `main` commit and passed.

## Production smoke

After the Netlify deploy from `main`, a one-shot workflow polled the real production origin until it stopped serving the 2022 document and began serving the modern 2026 document.

The production smoke then validated:

- modern 2026 title;
- production canonical;
- Open Graph URL/image;
- Twitter image;
- JS/CSS/media availability;
- CSP;
- Permissions-Policy;
- Referrer-Policy;
- `nosniff`;
- frame denial;
- immutable Vite asset cache;
- `robots.txt`;
- sitemap with exactly one canonical URL;
- React rendering in Chrome under the enforced production CSP;
- main application sections;
- historical Contacto remaining non-interactive.

Result: **success**.

The temporary production-smoke workflow was deleted after capturing this evidence.

## Rollback

### Provider rollback

If a deployment-specific regression appears, restore a previously known-good deploy from Netlify deploy history.

### Git rollback

If the repository cutover itself must be reversed:

1. revert the cutover merge commit;
2. do not rewrite Git history;
3. run the permanent quality contract;
4. redeploy the reverted state;
5. repeat the production smoke.

Permanent historical reference:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

## GitHub Pages

GitHub Pages was confirmed as a historical endpoint before cutover and is not modern canonical authority.

The preferred administrative action is to unpublish/disable Pages in GitHub Settings rather than changing historical root files only to force a redirect.

This action is outside the connected tool permissions available during the cutover and is intentionally not claimed as completed.

## Branch protection / rulesets

Repository rulesets API returned:

```text
[]
```

The traditional branch-protection endpoint returned:

```text
403 Resource not accessible by integration
```

Therefore no unsupported claim is made about traditional `main` protection.

If the repository remains actively maintained, GitHub Settings should require the permanent Modern app quality check for changes to `main`.

This is an administrative hardening recommendation, not an unresolved application/runtime blocker.

## Definition of Done — final

Completed:

- production provider selected;
- production origin explicit;
- base path explicit;
- source/artifact authority documented;
- versioned Netlify config;
- security headers qualified;
- canonical/social metadata qualified;
- robots/sitemap qualified;
- preview smoke passed;
- clean PR quality passed;
- expected-head merge completed;
- post-merge quality passed;
- real production cutover observed;
- production smoke passed;
- rollback documented;
- historical root preserved;
- temporary qualification tooling removed;
- repository README/docs synchronized through the closure PR.

Administrative notes retained transparently:

- GitHub Pages can be unpublished from Settings;
- traditional branch protection must be inspected/configured from Settings because the integration cannot read that endpoint.

The application cutover itself is complete.
