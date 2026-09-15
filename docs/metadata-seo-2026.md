# Metadata and SEO contract — 2026 reconstruction

This document defines the public-document metadata boundary for the modern El Núcleo application.

The goal is discoverability **without converting historical material into invented current-business claims**.

## Current authority

The runtime metadata authority remains `modern/index.html`.

The typed content authority introduced under #26 also models the qualified SEO narrative in `localLandingContent.seo`. That model exists so future build/content integration can reuse the same truth boundary; it does **not** currently replace the crawler-visible static HTML authority.

The document deliberately describes what the site can prove today:

- El Núcleo is presented as an audiovisual project/archive;
- the original public project belongs to 2022;
- the current application is a 2026 reconstruction;
- historical identity and visual material are preserved;
- no current production-company operation, client relationship, location/service availability or commercial result is claimed.

## Metadata present now

The modern document includes:

- UTF-8 and responsive viewport;
- Spanish document language (`es`);
- concise title and description;
- application name;
- dark theme/color-scheme metadata;
- Open Graph title, description, type, site name and `es_AR` locale;
- Twitter summary-card title/description;
- strict-origin referrer policy.

The metadata does **not** include the obsolete `keywords` field.

## Deliberately deferred fields

The following remain absent until deployment authority exists:

- `<link rel="canonical">`;
- `og:url`;
- `og:image` / social preview absolute URL;
- `sitemap.xml`;
- deployment-specific `robots.txt` decisions.

This is intentional. Those values require a stable public origin and route/cutover decision. A fake domain, repository preview URL or temporary branch URL must not become canonical SEO authority.

When production is selected, the cutover PR must update both this document and the automated document-contract test.

## Social preview rule

If a social preview is added later:

1. it must be a repository-owned or deployment-owned asset;
2. it must use a stable absolute production URL in social metadata;
3. its copy must follow the same historical/current truth boundary as the page;
4. it must not imply current clients, staff or operations unless those facts have been verified.

## Content and SEO relationship

The #26 content-platform slice establishes the structured authority needed to keep SEO and public content semantically aligned:

- `LandingContent` defines the aggregate contract;
- `localLandingContent.seo` carries title/description/social-copy inputs plus unresolved deployment fields;
- the SEO domain is `verified-current`, not historical;
- `canonicalUrl` and `socialImage` remain explicitly `null` until deployment establishes stable values.

For now, `modern/index.html` intentionally remains the runtime/crawler authority because React runtime injection would not improve this static landing's crawler determinism. If a future build pipeline starts generating metadata from the content authority, that change must make one source authoritative rather than maintaining two independently editable narratives.

## Test contract

`modern/src/__tests__/document-contract.test.tsx` protects the current runtime phase by checking that:

- title/description remain meaningful;
- Open Graph site name/locale remain present;
- no `keywords` metadata returns;
- canonical, `og:url` and `og:image` remain absent while production authority is unresolved.

`modern/src/content/local-content.test.ts` additionally protects the content-platform side by requiring deployment-specific SEO inputs to remain unresolved (`null`) until that authority exists.

Once a real production origin exists, those expectations must be changed in the same reviewed change that introduces the canonical/social URLs.