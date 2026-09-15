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

The first visual-system foundation introduces:

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

- a small reusable spacing scale;
- `--section-space` for vertical chapter rhythm;
- `--section-gap` for two-column editorial composition;
- `--content-pad` for card/surface padding;
- `--content-width` remains the global content measure.

### Surfaces

- shared radii from `--radius-xs` through `--radius-lg`;
- `--radius-pill` for status/control pills;
- shared soft/media shadows.

### Motion

- `--motion-fast` / `--motion-medium`;
- `--ease-standard`;
- global `prefers-reduced-motion` continues to collapse non-essential transitions/animations.

## First foundation pass

The first #22 implementation pass deliberately does **not** change JSX, copy, content authority or media.

It:

- expands shared tokens;
- provides a compatibility alias for the previously drifting `--color-text-muted` name;
- migrates Contacto to the canonical `--color-muted` token;
- aligns Home, Nosotros, Backstage, Equipo and Contacto to a shared section rhythm;
- removes redundant nested content-width insets from Backstage and Equipo;
- replaces repeated pill/line/accent literals with shared semantic tokens;
- normalizes the main tablet breakpoint to `48rem` where equivalent behavior was intended;
- leaves larger layout-specific breakpoints in place when they still represent a real component need.

## Foundation production qualification

The foundation pass was qualified against the production build before integration.

### Automated quality

Permanent repository quality completed successfully with:

- Prettier;
- ESLint with zero warnings;
- TypeScript;
- **19/19 Vitest behavior tests**;
- Vite production build.

### Browser qualification

A Chrome **152.0.7977.82** production-build qualification ran at:

- 360 × 900 px;
- 768 × 1024 px;
- 1440 × 1000 px.

The first smoke incorrectly treated below-the-fold lazy images as failed before entering their viewport. The product was not changed to satisfy that false negative. A corrected qualification traversed the page, activated the existing `loading="lazy"` behavior and then validated the rendered state.

The accepted evidence confirmed:

- exactly one H1;
- **zero horizontal overflow** at all three qualified widths;
- all eight promoted images loaded after natural lazy-load traversal;
- every audited chapter uses the same desktop content axis: `left = 128 px`, `right = 1312 px`, `width = 1184 px` at 1440 px viewport;
- aligned chapters: Hero, Nosotros, Servicios, Backstage, Equipo, Contacto, Historia and Reconstrucción;
- Contacto still contains **0 forms** and **0 input/textarea/select/button controls**;
- Contacto privacy/no-collection boundary remains visible;
- Equipo historical/current truth boundary remains visible;
- fresh-page first Tab remains `Saltar al contenido` → `#main-content`;
- reduced-motion forces document scroll behavior to `auto` and collapses transitions;
- machine-readable failure list is empty.

### Visual review

Full-page mobile/tablet/desktop captures were reviewed in addition to the machine checks.

The foundation is accepted because:

- the historical green remains the dominant signal color without turning the UI into a neon redesign;
- Home, Nosotros, Servicios, Backstage, Equipo and Contacto now read as one dark editorial system rather than independently padded migration slices;
- removing the redundant nested Backstage/Equipo containers improves alignment without changing content or provenance;
- the cards/surfaces are consistent enough to support further refinement but deliberately do not attempt the final visual personality yet;
- Contacto reads as archive metadata, not as a disabled operational form;
- mobile stacking stays readable with no horizontal escape;
- the remaining weak point is intentional scope: narrow navigation is still hidden rather than having a dedicated mobile navigation pattern, which belongs to the next shell/navigation pass.

Screenshots/raw QA evidence remain ephemeral CI artifacts rather than committed binaries.

## Historical boundary

Never modernize by editing the historical root just to make the source look newer.

Allowed:

- new tokens;
- new modern layouts;
- improved responsive composition;
- typography/spacing refinement;
- modern focus and interaction states;
- reproducible image derivatives when measured and documented.

Not allowed:

- overwriting historical originals;
- silently changing historical claims;
- replacing historical photos with generated substitutes;
- removing provenance;
- reintroducing old CDN dependencies for visual nostalgia.

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

Related issue: #11.

## Metadata boundary

Visual changes do not authorize fabricated SEO/service claims. Titles, descriptions and social metadata must continue describing the actual historical/reconstruction product.

Related issue: #12.

## Validation

A material visual block is accepted only after:

1. `pnpm check` passes;
2. current behavior tests remain green;
3. browser QA runs against the production build at 360 / 768 / 1440 px;
4. keyboard/focus/reduced-motion regressions are checked;
5. historical truth/privacy boundaries remain visible;
6. promoted images load through their real loading strategy;
7. screenshots are reviewed for hierarchy, density and alignment;
8. temporary qualification tooling is removed before merge.

## Iteration order

The system evolves in recoverable passes:

1. foundation tokens and shared rhythm — **qualified in PR #23**;
2. global shell/header/navigation;
3. Home/hero/archive viewer;
4. Nosotros;
5. Servicios/Backstage;
6. Equipo;
7. Contacto;
8. integrated accessibility/media/metadata pass;
9. only then cutover preparation.

This order makes visual regressions attributable and keeps the historical migration reviewable.
