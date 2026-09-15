# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` until the final controlled cutover. The historical root HTML/SCSS/CSS stays intact as source evidence while the modern app owns the new runtime, behavior and presentation system.

## Runtime

- Node.js 24
- pnpm 9.15.9
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

## Local workflow

```bash
cd modern
pnpm install --frozen-lockfile
pnpm dev
```

Before a PR is considered reviewable:

```bash
pnpm check
```

`pnpm check` validates formatting, lint, type safety, behavior tests and the production build.

## Source authority

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `src/content/historical-home.ts`: canonical four-category historical service dataset.
- `src/content/historical-about.ts`: historical Nosotros statements plus current-truth context.
- `src/content/historical-backstage.ts`: Backstage archive and exact provenance.
- `src/content/historical-team.ts`: historical people and client-reference labels from Equipo.
- `src/content/historical-contact.ts`: exact historical Contacto transport/field contract.
- `src/content/public-asset.ts`: shared application-owned public-media path helper.
- `src/styles/_tokens.scss`: shared 2026 visual-system authority.
- `src/styles/`: modern presentation modules only; they do not rewrite historical Sass.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.

Repository-level migration evidence lives in `../docs/`.

## Content migration status

All historical content slices are **merged and independently revalidated on `main`**.

### Home

Home preserves the `El Núcleo / CINE` identity and historical green, and replaces four duplicate Bootstrap carousels with one controlled archive gallery.

### Nosotros

Nosotros preserves what the 2022 project said about itself while making the historical/current boundary explicit. Aspirations, NGO references and historical organization statements are not silently promoted into 2026 facts.

### Servicios + Backstage

Servicios reuses the single `historicalServices` authority from Home. Backstage exposes all four preserved frames as a semantic responsive contact sheet without autoplay or another stateful carousel. The closure state completed 12/12 behavior tests plus browser qualification at 360 / 768 / 1440 px.

### Equipo

Equipo is represented as a historical record rather than a current staff/client directory. It preserves the two source labels/photos, omits unverified personal links and presents `Argentina Cultura` / `Grupo del Sud` only as source-attributed 2022 labels.

The closure state completed **16/16 tests**, permanent quality and Chrome **152.0.7977.82** browser qualification at 360 / 768 / 1440 px, then passed post-merge `main` validation.

### Contacto

The 2022 source used:

```html
<form action="" method="get" enctype="text/plain"></form>
```

No verified delivery backend exists in the repository. The modern app therefore preserves the contact **contract** instead of pretending the form is operational.

`HistoricalContact`:

- exposes a semantic `#contacto` archive chapter;
- lists the historical fields and required/optional state;
- preserves the 400-character consultation limit;
- records the literal `Newslatter` source wording with context;
- states that 2026 data collection/transmission is not enabled;
- explains why GET + empty action is not reproduced;
- renders no `<form>`, textbox, checkbox or submit button;
- invents no current email, API endpoint, newsletter provider or success state.

The closure state completed:

- **19/19 Vitest tests**;
- Prettier, ESLint, TypeScript and Vite production build;
- Chrome **152.0.7977.82** production browser QA at 360 / 768 / 1440 px;
- one H1;
- zero Contacto forms or data-entry controls;
- exact five historical field labels;
- visible no-collection, GET and empty-action boundaries;
- zero unverified contact/transport links;
- zero generic external social links;
- zero horizontal overflow at all qualified widths;
- fresh-page first Tab on `Saltar al contenido` → `#main-content`;
- reduced-motion scroll behavior = `auto`;
- zero machine-readable browser failures;
- post-merge `main` quality green.

## Active phase — visual system 2026

Issue #22 owns the next phase: turning the already-correct migration slices into one coherent visual system without modifying historical source files.

The direction is **editorial production archive / contact sheet / control surface**, not generic SaaS.

Historical anchors remain traceable:

- `El Núcleo / CINE`;
- `#83d2b5` as the primary historical accent;
- audiovisual character;
- provenance-backed photography;
- archive/current truth boundaries.

The first foundation pass consolidates semantic color, type, spacing, surface, radius and motion tokens; aligns section rhythm; removes duplicated nested insets; and normalizes equivalent breakpoints. It intentionally does not change JSX, content authority or asset paths.

Full contract: [`../docs/visual-system-2026.md`](../docs/visual-system-2026.md).

## Quality contract

Every visual/content slice must continue to satisfy:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. Historical claims/contracts remain represented through typed source/context data.
4. Promoted historical media keeps path/blob provenance.
5. Historical team/client/service/company claims are not promoted as current without verification.
6. Personal-data collection is not enabled without a real transport/privacy contract.
7. Permanent GitHub Actions remain read-only and pinned to immutable action SHAs.
8. Browser QA covers responsive, keyboard, truth/privacy-boundary and reduced-motion behavior changed by a slice.
9. Temporary formatter/visual qualification workflows are removed before final merge.

## Visual evolution contract

The modern app is allowed to look materially better than the 2022 site. It is not allowed to erase the evidence it evolved from.

- original HTML/SCSS/CSS and archival assets remain untouched historical authority;
- `modern/src/styles/` owns the 2026 presentation system;
- new spacing, type scales, layout, surfaces, states and motion are introduced through explicit modern tokens/modules;
- historical image originals are not destructively recompressed or overwritten;
- image derivatives need a reproducible reason/process and provenance;
- visual changes cannot reduce semantic quality, keyboard usability, focus visibility, contrast or reduced-motion support;
- no legacy CDN/dependency is reintroduced only for visual nostalgia;
- meaningful visual changes receive production browser QA rather than relying on screenshots alone.

## Accessibility baseline

The app includes semantic landmarks, one H1, a skip link, visible focus treatment, useful alt text, mobile-first layout and reduced-motion handling.

Contacto deliberately avoids disabled or fake controls. A future live form must add accessible labels, validation errors and delivery status tied to actual submission outcomes.

## Media policy

Do not copy the entire historical asset tree into `modern/`.

Only media used by an accepted slice is promoted. Originals remain untouched and promoted files keep documented blob-level provenance. Optimization derivatives require measured need, a reproducible process and visual review.

## Next gates

- content slices: all merged + post-merge validated;
- visual-system foundation: active under #22;
- global shell + per-slice visual refinement: next inside #22;
- #10 accessibility, #11 media and #12 metadata: integrated cross-cutting closure;
- cutover: only after complete responsive/accessibility/browser QA plus deployment/base-path and rollback documentation.

## Deployment boundary

The historical root site remains the deployable baseline. Completion of content migration does not change that boundary. The modern application replaces the root only through an explicit controlled cutover.
