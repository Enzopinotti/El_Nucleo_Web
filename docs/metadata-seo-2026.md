# Metadata and SEO contract — 2026 reconstruction

This document defines the public-document metadata boundary for the modern El Núcleo application.

The goal is discoverability **without converting historical material into invented current-business claims**.

## Current authority

The crawler-visible runtime metadata authority remains `modern/index.html`.

The typed content authority introduced under #26 models the same qualified SEO narrative in `localLandingContent.seo`. The deployment/cutover lane now binds both authorities to the selected production origin instead of keeping deployment fields unresolved.

The document describes only what the repository can prove:

- El Núcleo is presented as an audiovisual project/archive;
- the original public project belongs to 2022;
- the current application is a 2026 reconstruction;
- historical identity and visual material are preserved;
- no current production-company operation, client relationship, location/service availability or commercial result is claimed.

## Production authority

The selected modern production origin is:

```text
https://el-nucleo-producciones.netlify.app/
```

This value is not inferred from a preview URL. During #5 the endpoint was probed directly and confirmed as an existing Netlify production site connected to this repository. Before cutover it served the historical 2022 document; PR #32 qualifies the modern build that will replace that deployment authority.

GitHub Pages was also probed at:

```text
https://enzopinotti.github.io/El_Nucleo_Web/
```

It currently serves the historical 2022 root and is **not** the selected canonical modern origin. It must be treated as a historical/transition endpoint until Pages is deliberately disabled or otherwise resolved after the Netlify cutover is proven.

## Metadata present now

The modern document includes:

- UTF-8 and responsive viewport;
- Spanish document language (`es`);
- concise title and description;
- application name;
- dark theme/color-scheme metadata;
- canonical URL bound to the selected Netlify origin;
- Open Graph title, description, type, site name and `es_AR` locale;
- `og:url` bound to the production origin;
- repository-owned absolute `og:image` using the preserved El Núcleo logo;
- Open Graph image alt text;
- Twitter summary-card title/description/image/alt;
- strict-origin referrer policy.

The metadata does **not** include the obsolete `keywords` field.

## Social preview

The social image is intentionally the already-qualified repository-owned historical logo:

```text
https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
```

A dedicated 1200×630 social artwork is not manufactured merely to satisfy a checklist. If a future visual asset is introduced, it must retain the same historical/current truth boundary and be qualified as part of the media contract.

## Sitemap and robots

Because the modern product is a single public document with in-page anchors, the sitemap contains exactly one URL:

```text
https://el-nucleo-producciones.netlify.app/
```

`modern/public/robots.txt` allows crawling and points to:

```text
https://el-nucleo-producciones.netlify.app/sitemap.xml
```

Anchors such as `#nosotros` or `#servicios` are not emitted as fake sitemap routes.

## Content and SEO relationship

The #26 content-platform slice established the structured authority used here:

- `LandingContent` defines the aggregate contract;
- `localLandingContent.seo` carries title/description/social-copy inputs and production URLs;
- the SEO domain remains `verified-current`, not historical;
- `canonicalUrl` and `socialImage` now resolve to the selected production boundary;
- provenance for the SEO domain includes `docs/deployment-cutover-2026.md`.

`modern/index.html` remains the runtime/crawler authority because static metadata is deterministic for this landing. The tests require the static document and typed content model to agree on the selected production URLs.

## Test contract

`modern/src/__tests__/document-contract.test.tsx` now protects that:

- title/description remain meaningful;
- Open Graph site name/locale remain present;
- no `keywords` metadata returns;
- canonical equals the selected Netlify production origin;
- `og:url` equals the same origin;
- `og:image` and `twitter:image` use the same qualified absolute production asset.

`modern/src/content/local-content.test.ts` additionally requires the typed SEO authority to resolve the exact same canonical/social image values and to include deployment provenance.

This replaces the pre-cutover tests that intentionally required those fields to remain `null`/absent.

## Remaining deployment rule

Deploy previews are qualification surfaces only. They do not become canonical URLs, sitemap authorities or social image origins.

If the production hostname changes later — for example through a custom domain — the same change must update together:

- `modern/index.html`;
- `localLandingContent.seo`;
- `robots.txt`;
- `sitemap.xml`;
- metadata/content tests;
- this document;
- the deployment/cutover contract.

There must remain one explicit production-origin authority across the public document and its tests.
