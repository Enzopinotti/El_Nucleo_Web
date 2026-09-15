# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` until the final controlled cutover. The historical root HTML/SCSS/CSS stays intact as source evidence while the modern app owns the new runtime, behavior, presentation and typed content authority.

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

`pnpm check` validates formatting, lint, type safety, behavior/contract tests and the production build.

## Source authority

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `src/content/landing-content.ts`: presentation-independent aggregate content contract.
- `src/content/local-content.ts`: current provenance-aware local content authority.
- `src/content/historical-home.ts`: canonical four-category historical service dataset.
- `src/content/historical-about.ts`: historical Nosotros statements and source context.
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

## Historical content status

All historical content slices are **merged and independently revalidated on `main`**.

### Home

Home preserves the `El Núcleo / CINE` identity and historical green, and replaces four duplicate Bootstrap carousels with one controlled archive gallery.

### Nosotros

Nosotros preserves what the 2022 project said about itself while making the historical/current boundary explicit. Aspirations, NGO references and historical organization statements are not silently promoted into 2026 facts.

### Servicios + Backstage

Servicios reuses the single `historicalServices` authority from Home. Backstage exposes all four preserved frames as a semantic responsive contact sheet without autoplay or another stateful carousel.

### Equipo

Equipo is represented as a historical record rather than a current staff/client directory. It preserves the two source labels/photos, omits unverified personal links and presents historical client references only with source-era context.

### Contacto

The 2022 source used:

```html
<form action="" method="get" enctype="text/plain"></form>
```

No verified delivery backend exists in the repository. The modern app therefore preserves the contact **contract** instead of pretending the form is operational.

`HistoricalContact` renders no live form or data-entry controls, invents no current email/API/newsletter destination and documents the historical GET + empty-action behavior without reproducing it.

## Visual and cross-cutting qualification

The 2026 presentation direction is an **editorial production archive / contact sheet / control surface**, not generic SaaS.

The integrated app has already been qualified for:

- 360 / 768 / 1440 responsive layouts;
- no global horizontal overflow;
- semantic header/nav/main/footer and a single H1;
- skip-link as the first keyboard stop;
- visible focus and reduced-motion behavior;
- local media with useful alt text and lazy loading below the hero;
- historical Contacto remaining non-interactive;
- core rendered contrast pairs above 4.5:1;
- metadata that does not invent canonical/social URLs before a production origin exists.

Full visual contract: [`../docs/visual-system-2026.md`](../docs/visual-system-2026.md).

## Content platform 2026

Issue #26 introduces the next maintainability boundary without adding a speculative CMS.

The current architecture is:

```text
historical sources + reviewed 2026 editorial facts
                    ↓
             LandingContent
                    ↓
          localLandingContent
                    ↓
               React UI
```

`LandingContent` carries truth/publication semantics for claim-bearing domains:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- `public` / `withheld`.

The local authority composes the already-qualified historical modules; it does not duplicate or overwrite them.

A review-specific invariant keeps **historical identity** separate from the **2026 editorial shell**:

- `siteIdentity` contains only the historical `El Núcleo / CINE` name/tag/logo and remains `historical`;
- `shell` owns `Archivo 2022 · reconstrucción 2026` and the modern footer line and remains `verified-current`.

Future current projects and current contact channels already have typed slots but are empty, `unverified` and `withheld` until real evidence exists.

There is deliberately no remote provider interface, CMS dependency or `/admin` yet. A concrete second provider or asynchronous source semantics must exist before adding that abstraction.

Full contract: [`../docs/content-platform-2026.md`](../docs/content-platform-2026.md).

## Quality contract

Every visual/content slice must continue to satisfy:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. Historical claims/contracts remain represented through typed source/context data.
4. Truth status and publication state cannot be inferred merely from record existence.
5. Promoted historical media keeps path/blob provenance.
6. Historical team/client/service/company claims are not promoted as current without verification.
7. Personal-data collection is not enabled without a real transport/privacy contract.
8. Permanent GitHub Actions remain read-only and pinned to immutable action SHAs.
9. Browser QA covers responsive, keyboard, truth/privacy-boundary and reduced-motion behavior changed by a slice.
10. Temporary formatter/visual qualification workflows are removed before final merge.

The current content-platform branch passes **29/29 tests** plus format, lint, TypeScript and production build before its final browser qualification.

## Accessibility baseline

The app includes semantic landmarks, one H1, a skip link, visible focus treatment, useful alt text, mobile-first layout and reduced-motion handling.

Contacto deliberately avoids disabled or fake controls. A future live form must add accessible labels, validation errors and delivery status tied to actual submission outcomes.

A future editor/admin is held to the same standard; admin UI is not exempt from keyboard/focus/error semantics.

## Media policy

Do not copy the entire historical asset tree into `modern/`.

Only media used by an accepted slice is promoted. Originals remain untouched and promoted files keep documented blob-level provenance. Optimization derivatives require measured need, a reproducible process and visual review.

## Next gates

1. qualify and merge #26 from a clean branch HEAD;
2. verify `main` post-merge;
3. close only the cross-cutting issues whose acceptance criteria are genuinely satisfied;
4. run the promised repository-wide engineering audit;
5. resolve deployment origin/base path/rollback and only then perform cutover.

## Deployment boundary

The historical root site remains the deployable baseline. Completion of content migration or content-platform readiness does not change that boundary.

The modern application replaces the root only through an explicit controlled cutover with verified production origin, assets/base path, metadata, rollback and post-deploy checks.
