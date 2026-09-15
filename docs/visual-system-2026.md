# Visual system 2026 — evolution contract

Issue: #22

## Purpose

Define how the modern El Núcleo interface can evolve substantially without erasing the 2022 project it comes from.

The visual system is a **new presentation authority** under `modern/src/styles/`. It does not replace historical evidence: the root HTML, Sass/CSS and original assets remain preserved exactly as historical source.

## Identity anchors

The 2026 system keeps these historical anchors traceable:

- `El Núcleo / CINE`;
- historical accent `#83d2b5`;
- audiovisual/editorial character;
- historical photography and media with provenance;
- the distinction between archive evidence and current claims.

These anchors do not require reproducing Bootstrap layouts, CDN fonts, old animation packages or 2022 spacing decisions.

## Direction

The intended language is **editorial production archive / contact sheet / control surface**, not generic SaaS.

Characteristics:

- near-black, subtly green-tinted foundations;
- historical green as the primary signal color;
- restrained surfaces and borders;
- large editorial display hierarchy;
- compact technical metadata labels;
- photography given priority when source media exists;
- subtle film/grid/frame cues implemented with CSS only when they support hierarchy;
- restrained motion that is never required to understand content.

Avoid:

- neon decoration without purpose;
- template-like gradient overload;
- glassmorphism as a visual gimmick;
- cosmetic UI frameworks;
- animation libraries without a product need;
- pixel-copying the 2022 layout.

## Token authority

`modern/src/styles/_tokens.scss` owns shared visual primitives.

### Identity and color

- `--color-accent`: exact historical green `#83d2b5`;
- accent soft variants;
- semantic background/surface/text/muted/subtle tokens;
- soft/default/strong border tokens.

### Typography

- `--font-sans` for interface/editorial text;
- `--font-mono` for technical/source metadata where appropriate;
- `--label-tracking` for compact archive labels.

No remote font dependency is required for the system contract.

### Spacing and layout

- reusable spacing scale;
- `--section-space` for vertical chapter rhythm;
- `--section-gap` for two-column editorial composition;
- `--content-pad` for card/surface padding;
- `--content-width` as global content measure;
- `--sticky-offset` as shared shell/content sticky boundary.

### Surfaces and motion

- shared radii from `--radius-xs` through `--radius-lg`;
- `--radius-pill` for status/control pills;
- shared soft/media shadows;
- `--motion-fast` / `--motion-medium`;
- `--ease-standard`;
- global `prefers-reduced-motion` collapses non-essential transitions/animations and smooth document scrolling.

## Qualified implementation passes

The system evolved through recoverable PRs rather than a single redesign.

### PR #23 — visual foundation

Established shared tokens/rhythm, normalized historical-green usage, removed redundant nested insets and aligned the historical sections under one visual system without changing content authority.

### PR #24 — shell, navigation and hero

Established:

- global header/shell;
- responsive navigation that remains available at narrow widths;
- desktop/tablet sticky-header behavior without trapping mobile viewport height;
- shared sticky offsets below the header;
- hero/archive composition and primary page hierarchy;
- production-browser qualification for responsive overflow, focus and media behavior.

### PR #25 — historical section compositions

Refined the already-migrated content without changing historical authority:

- Nosotros as editorial archive + explicit truth boundary;
- Backstage as film/contact-sheet composition with uncropped source media;
- Equipo as source-backed historical dossiers;
- Contacto as historical contract ledger with no live form;
- historical client labels remain references, not endorsements.

The accepted section browser qualification used the real source counts: 2 Nosotros cards, 4 Backstage frames, 2 historical people, 2 client references and 5 Contacto fields. Contacto remained 0 forms / 0 interactive controls.

### PR #27 — integrated accessibility, media and metadata qualification

The integrated pass converts cross-cutting decisions into repository contracts instead of adding another visual layer.

Permanent quality on the clean branch head passed:

- Prettier;
- ESLint with zero warnings;
- TypeScript;
- **23/23 Vitest tests**;
- Vite production build.

The new document contract guards:

- honest metadata while production URL authority is unresolved;
- one H1 and the global landmark structure;
- all primary navigation fragment targets;
- local, described media;
- eager hero mark + lazy below-the-fold media;
- Contacto remaining non-interactive.

## Integrated production-browser evidence

Accepted run: **34929130233** using Chrome **152.0.7977.82** against the production build.

Qualified viewports:

- 360 × 900 px;
- 768 × 1024 px;
- 1440 × 1000 px.

Machine-readable evidence reports **`failures: []`**.

The accepted evidence confirms:

- zero document-level horizontal overflow at all three widths;
- exactly one global H1, `.site-header`, primary navigation, `main#main-content` and `.site-footer`;
- three valid quote-internal `<footer>` elements remain semantic and are not confused with the global footer;
- all six primary navigation fragments resolve to real targets;
- all eight rendered/promoted images load successfully, use local asset paths and meaningful alt text;
- the hero historical mark is eager while all rendered media below the hero is lazy;
- Contacto contains 0 forms and 0 `input`/`textarea`/`select`/`button` controls;
- document language, title, description, Open Graph site name/locale and Twitter summary metadata are present;
- obsolete `keywords` is absent;
- canonical, `og:url` and `og:image` remain absent until a real production origin exists;
- first fresh-page Tab is `Saltar al contenido` → `#main-content`;
- reduced-motion resolves document scroll behavior to `auto`;
- core token pairs all exceed the 4.5:1 normal-text contrast threshold.

### Core contrast evidence

| Pair | Ratio |
| --- | ---: |
| text / background | 17.80:1 |
| muted / background | 9.23:1 |
| subtle / background | 5.77:1 |
| accent / background | 10.83:1 |
| accent ink / accent | 9.53:1 |
| subtle / surface | 4.97:1 |

The first integrated browser smoke incorrectly required the document to contain only one `<footer>` total. That was a QA error: the page correctly uses internal `<footer>` elements for historical blockquote attribution. The product was not changed to satisfy the false negative. V2 qualified one **global** `.site-footer` plus three quote footers separately and passed without exceptions.

Full-page mobile/tablet/desktop captures were also reviewed; screenshots remain ephemeral CI evidence rather than committed binaries.

## Historical boundary

Never modernize by editing the historical root just to make the source look newer.

Allowed:

- new tokens;
- new modern layouts;
- improved responsive composition;
- typography/spacing refinement;
- modern focus and interaction states;
- reproducible image derivatives when measured and documented;
- future content-provider/admin capabilities that preserve historical/current status explicitly.

Not allowed:

- overwriting historical originals;
- silently changing historical claims;
- replacing historical photos with generated substitutes;
- removing provenance;
- reintroducing old CDN dependencies for visual nostalgia;
- presenting a historical person/client/service as current without verification.

## Accessibility invariants

Visual evolution must preserve or improve:

- one semantic H1;
- valid heading hierarchy;
- keyboard navigation;
- visible focus;
- sufficient text/background contrast;
- reduced-motion behavior;
- meaningful alt strategy;
- no essential information communicated only by color/motion;
- zero horizontal overflow at qualified widths.

Related issue: #10.

## Media invariants

Historical originals remain archival source. Promoted media remains provenance-backed. Any derivative must have a reproducible source/process and measured reason.

The current promoted boundary is 11 historical files totaling 786,374 bytes (~768 KiB); optimization remains evidence-driven rather than format-driven.

Related issue: #11.

## Metadata boundary

Visual changes do not authorize fabricated SEO/service claims. Titles, descriptions and social metadata describe the actual historical/reconstruction product.

Canonical URL, absolute social preview metadata, sitemap and robots decisions belong to the future deployment/cutover change once a real production origin exists.

Related issue: #12.

## Content-platform boundary

The content-platform lane in #26 now moves page authority out of scattered presentation without reopening the visual system.

The implementation adds:

- a typed `LandingContent` authority;
- explicit `historical`, `verified-current`, `unverified` and `draft` truth status;
- independent `public` / `withheld` publication state;
- provenance-aware `localLandingContent`;
- explicit empty/withheld current project and contact-channel domains;
- a clean future managed-provider/editor boundary without adding a speculative CMS.

The historical `El Núcleo / CINE` identity remains a historical domain while 2026 shell/editorial copy is a separate `verified-current` domain. That distinction lets the same visual system render both eras without flattening their truth status.

Any future admin/editor must reuse the same accessibility and visual-system standards unless a genuinely different operator need justifies a distinct surface.

## Validation rule

A material future block is accepted only after:

1. `pnpm check` passes;
2. current behavior/document-contract tests remain green;
3. browser QA runs against the production build at the relevant widths;
4. keyboard/focus/reduced-motion regressions are checked;
5. historical truth/privacy boundaries remain visible;
6. promoted images load through their real loading strategy;
7. screenshots are reviewed for hierarchy, density and alignment when presentation changes;
8. temporary qualification tooling is removed before merge.

## Iteration status

1. foundation tokens and shared rhythm — **qualified in PR #23**;
2. global shell/header/navigation — **qualified in PR #24**;
3. Home/hero/archive viewer — **qualified in PR #24**;
4. Nosotros — **qualified in PR #25**;
5. Servicios/Backstage — **qualified in PR #25**;
6. Equipo — **qualified in PR #25**;
7. Contacto — **qualified in PR #25**;
8. integrated accessibility/media/metadata pass — **qualified in PR #27**;
9. content-platform readiness — **implemented and qualified in PR #28 / #26**;
10. repository-wide engineering audit — **next quality lane**;
11. deployment/cutover preparation — **still explicit and separate**.

The visual-system lane itself is complete since PR #27. PR #28 extends content authority without reopening a generic redesign; future work should add capabilities only where the audit, content operations or deployment requirements justify them.