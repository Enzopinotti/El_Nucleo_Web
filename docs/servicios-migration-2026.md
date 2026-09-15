# Servicios migration — 2026 archive slice

Issue: #16

## Historical authority

Primary source: `views/servicios.html`

Historical Git blob:

`2588eef93cec31a02f25f3e389ef0f238463c13c`

The 2022 page contains two distinct archival surfaces:

1. **Servicios Ofrecidos** — Videoclips, Publicidad, Cortometrajes and Coberturas;
2. **Galería Backstage** — four photographs shown through a Bootstrap autoplay carousel.

The 2026 migration preserves both as historical evidence without turning either into a current commercial claim.

## One service-category authority

Home already introduced `historicalServices` in `modern/src/content/historical-home.ts` and promoted the exact four historical service images.

Servicios deliberately **reuses that same array and those same files**. There is no second hard-coded service dataset, no second media copy and no current-price/availability model.

The shared public-asset path helper moved to `modern/src/content/public-asset.ts` so the new Backstage content can use the same application-media boundary without duplicating path logic.

## Historical truth boundary

The source heading `Servicios Ofrecidos` is not reproduced as an unqualified 2026 sales statement.

The modern copy states that:

- the four categories describe what the project presented in 2022;
- the material remains an archive;
- current service availability is not assumed;
- no price, current client, production capacity or outcome is invented;
- Backstage images do not prove a current team, client, production or relationship.

Generic Facebook / YouTube / Instagram / Vimeo / Twitter links from the historical page remain excluded because they were generic destinations rather than verified El Núcleo accounts.

## Backstage presentation decision

The old Bootstrap carousel is not recreated.

`BackstageArchive` renders all four images in a semantic responsive contact sheet/editorial grid. That choice:

- exposes the complete small archive without extra interaction state;
- removes autoplay;
- avoids another next/previous control set beside the existing service-category gallery;
- lazy-loads all below-fold frames;
- reserves media geometry through CSS to reduce layout shift;
- preserves full photographs with `object-fit: contain` instead of silently cropping them.

## Media provenance

Four historical Backstage blobs are promoted byte-for-byte into `modern/public/media/backstage/`.

Exact source paths and blob SHAs are recorded in `docs/asset-provenance.md` and duplicated in the typed Backstage source model for reviewability.

The historical originals remain untouched.

## Navigation and semantics

The primary navigation now exposes:

- `Nosotros` → `#nosotros`;
- `Servicios 2022` → `#servicios`;
- `Backstage` → `#backstage`;
- `Historia` → `#historia`.

The existing Home CTA continues to target `#archivo`, whose child service section is the same canonical service archive.

There is still one H1 for the product identity; Servicios and Backstage are H2 sections.

## Automated test contract

The final permanent quality run validates **12/12 Vitest tests** plus Prettier, ESLint, TypeScript and the Vite production build.

The suite covers:

- primary navigation targets;
- one canonical four-category service authority;
- historical-not-current service wording;
- existing gallery controls/wrapping;
- four simultaneous lazy-loaded Backstage frames;
- no Backstage carousel controls;
- Backstage truth boundary;
- continued omission of unverified social links;
- existing Home and Nosotros regressions.

## Production browser qualification

A bounded one-shot browser workflow qualified the production Vite build with **Google Chrome 152.0.7977.82**. Screenshots and machine-readable evidence were uploaded as short-lived CI artifacts rather than committed as repository noise.

The production build was checked at:

- **360 × 900 px** — full page width 360, no horizontal overflow;
- **768 × 1024 px** — full page width 768, no horizontal overflow;
- **1440 × 1000 px** — full page width 1440, no horizontal overflow.

Machine-readable assertions confirmed:

- exactly **one H1**;
- Servicios H2 present;
- the current-catalog truth boundary visible in the production DOM;
- Backstage H2 present;
- **4/4 Backstage images loaded successfully**;
- **0 Backstage buttons/controls**, so no hidden carousel interaction returned;
- Backstage current-team/client/production truth boundary visible;
- **0** unverified Facebook/YouTube/Instagram/Vimeo/Twitter links;
- fresh-page first Tab focuses `Saltar al contenido` with `href="#main-content"`;
- `prefers-reduced-motion: reduce` resolves document scroll behavior to `auto`.

Visual review of the captured mobile and desktop frames also confirmed that:

- the service viewer keeps readable controls and category hierarchy at 360 px;
- the service media retains its intended collage framing without horizontal clipping;
- the Backstage grid stacks cleanly on mobile and resolves to a balanced two-column contact sheet on desktop;
- historical photographs are shown without silent cropping;
- captions remain visually subordinate to the archive imagery and do not read as current commercial proof.

The one-shot browser workflow is removed before final review. The repository keeps only its permanent read-only quality workflow.

## Closure result

Servicios satisfies its slice-level closure contract:

1. permanent `pnpm check` is green;
2. browser QA covers mobile/tablet/desktop;
3. one H1 and no horizontal overflow were confirmed;
4. skip-link-first keyboard behavior is preserved;
5. reduced-motion behavior is preserved;
6. service and Backstage truth boundaries are visible in the production build;
7. all four Backstage assets retain explicit source/blob provenance;
8. the historical root remains unchanged and deployable;
9. temporary visual tooling is removed before merge.

## Non-goals

This slice does not add:

- current commercial pricing or availability;
- a CMS;
- Bootstrap, WOW, Animate.css or Font Awesome runtime dependencies;
- autoplay;
- a generic gallery engine;
- Team/client migration;
- Contact form transport;
- root cutover;
- image-optimization derivatives without measured need.
