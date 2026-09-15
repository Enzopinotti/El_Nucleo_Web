# El Núcleo — modern app

This directory contains the 2026 reconstruction of the original 2022 El Núcleo site.

It remains intentionally isolated under `modern/` while migration is in progress. The historical root HTML/SCSS site stays intact until the replacement has reproducible CI plus visual, accessibility, content and cutover QA.

## Runtime

- Node.js 24
- pnpm 9.15.9
- React 19
- Vite 8
- TypeScript 6
- Sass
- Vitest + Testing Library
- ESLint + Prettier

TypeScript 6 is an intentional compatibility choice. Toolchain majors change when compatibility is verified, not to chase version numbers.

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

## Source authority during migration

- `../index.html`, `../views/`, `../scss/`, `../css/`: historical 2022 implementation.
- `src/`: source authority for the 2026 application.
- `src/content/historical-home.ts`: canonical four-category historical service dataset.
- `src/content/historical-about.ts`: historical Nosotros statements plus current-truth context.
- `src/content/historical-backstage.ts`: Backstage archive and exact provenance.
- `src/content/historical-team.ts`: historical people and client-reference labels from Equipo.
- `src/content/public-asset.ts`: shared application-owned public-media path helper.
- `public/media/`: only historical media intentionally promoted into the modern app.
- `dist/`: generated production output; never hand-edit.
- `pnpm-lock.yaml`: reproducible dependency resolution.

Repository-level migration evidence lives in `../docs/`.

## Current migration state

The foundation, **Home**, **Nosotros** and **Servicios + Backstage** are merged and independently revalidated on `main`.

### Home

Home preserves the `El Núcleo / CINE` identity and the historical green, and replaces four duplicate Bootstrap carousels with one controlled archive gallery. It passed behavior tests, permanent CI and production-build browser qualification.

### Nosotros

Nosotros preserves what the 2022 project said about itself while making the historical/current boundary explicit. Aspirations, NGO references and the historical organization statement are not silently promoted into 2026 facts.

### Servicios + Backstage

Servicios reuses the single `historicalServices` authority from Home rather than creating another catalog. Backstage exposes all four preserved frames as a semantic responsive contact sheet, without autoplay or another stateful carousel.

The slice completed 12/12 behavior tests plus production browser qualification at 360 / 768 / 1440 px before controlled merge.

### Equipo — active lane

Equipo is being migrated as a historical record, not as a current staff/client directory.

The source page associated two local photographs with:

- André Wilber Coronel Vargas;
- Lautaro Weimer.

The modern UI may preserve those source labels and exact historical photos, but explicitly states that 2026 membership, collaboration, role and relationship status are not verified.

The source also placed `Argentina Cultura` and `Grupo del Sud` under `Clientes Habituales`. The modern app treats those as **source-attributed labels from the 2022 page**, not as current endorsements or commercial relationships.

Personal Instagram links and the old remote Argentina Cultura logo are not promoted as modern dependencies.

## Quality contract

Every slice must continue to satisfy:

1. `pnpm install --frozen-lockfile` succeeds on Node 24 with pnpm 9.15.9.
2. `pnpm check` passes Prettier, ESLint, TypeScript, Vitest and the Vite production build.
3. Historical claims are represented through typed source/context data rather than silently rewritten in JSX.
4. Promoted historical media keeps path/blob provenance.
5. Historical team/client/service/company claims are not promoted as current without verification.
6. Permanent GitHub Actions remain read-only and pinned to immutable action SHAs.
7. Browser QA covers responsive, keyboard, truth-boundary and reduced-motion behavior changed by the slice.
8. Temporary formatter/visual qualification workflows are removed before final merge.

## Completed qualification evidence

### Home

- 5/5 behavior tests on its closure state;
- production browser evidence at 360 / 768 / 1440 px;
- one H1;
- no horizontal overflow;
- skip-link-first keyboard focus;
- reduced-motion behavior.

### Nosotros

- 9/9 behavior tests on its closure state;
- Chrome 152 production-build qualification;
- one H1 and correct heading hierarchy;
- no horizontal overflow;
- no unverified historical social links;
- explicit current-truth boundary;
- skip-link-first focus;
- reduced-motion behavior.

### Servicios + Backstage

- 12/12 behavior tests on its closure state;
- Prettier, ESLint, TypeScript and production build green;
- Chrome 152.0.7977.82 browser qualification at 360 / 768 / 1440 px;
- four Backstage images present;
- zero Backstage controls/autoplay;
- one H1;
- no horizontal overflow;
- no unverified generic social links;
- fresh-page first Tab on `#main-content` skip link;
- reduced-motion scroll behavior = `auto`.

## Accessibility baseline

The app includes semantic landmarks, one H1, a skip link, visible focus treatment, useful alt text, mobile-first layout and reduced-motion handling.

Historical content sections are explicitly named and use source/context copy to prevent archival material from being mistaken for current business information.

Cross-cutting accessibility issue #10 remains open because Contact introduces form/error/status requirements that earlier archive slices do not need.

## Media policy

Do not copy the entire historical asset tree into `modern/`.

Only media used by an accepted slice is promoted. Originals remain untouched and promoted files keep documented blob-level provenance. Optimization derivatives require measured need, a reproducible process and visual review.

For Equipo, the two people photographs are promoted byte-for-byte. Client logos are not required to preserve the source claim, so the remote government hotlink is not reintroduced and the local client logo stays historical unless a later decision justifies promotion.

## Next gates

- `Home`: merged + post-merge validated.
- `Nosotros`: merged + post-merge validated.
- `Servicios + Backstage`: merged + post-merge validated.
- `Equipo`: active implementation/qualification lane.
- `Contacto`: next; no fake-success submission and no invented transport.
- cross-cutting accessibility / metadata / performance: final pass after content migration.
- cutover: only after complete responsive/accessibility/browser QA plus rollback documentation.

## Deployment boundary

The historical root site remains the deployable baseline. Qualification of migrated slices does not change that boundary. The modern application replaces the root only through an explicit controlled cutover.
