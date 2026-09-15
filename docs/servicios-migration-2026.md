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

## Test contract

The slice extends the application suite to verify:

- the primary nav targets the migrated sections;
- `historicalServices` remains exactly the four canonical historical categories;
- the service section is explicitly historical and not a current catalog;
- the existing keyboard-operable category gallery still wraps and advances correctly;
- all four Backstage images are present at once and lazy-loaded;
- Backstage introduces no carousel buttons/autoplay controls;
- Backstage copy explicitly rejects current team/client/production assumptions;
- generic unverified social links remain absent;
- existing Home and Nosotros contracts remain green.

## Quality and closure gate

The slice is not complete merely because the JSX renders.

Before merge it must have:

1. `pnpm check` green through the permanent quality workflow;
2. production-build browser QA at mobile, tablet and desktop widths;
3. one H1, no horizontal overflow and preserved skip-link behavior;
4. reduced-motion regression review;
5. service and Backstage truth-boundary copy visible in the production build;
6. no temporary formatter/visual workflow left behind;
7. historical root files unchanged.

Browser qualification evidence is added only after it has actually run; this document does not pre-claim it.

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
