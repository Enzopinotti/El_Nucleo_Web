# Accessibility and media qualification — 2026 reconstruction

This document records the cross-cutting accessibility/media contract for the modern El Núcleo application. It complements the slice-specific behavior tests and visual browser evidence.

## Accessibility authority

The public application must remain understandable and navigable without animation, mouse-only interaction or historical context hidden behind decoration.

The baseline requires:

- one meaningful H1;
- semantic `header`, `nav`, `main`, sections and footer;
- a first-focus skip link targeting `#main-content`;
- real fragment targets for the primary navigation;
- visible `:focus-visible` states;
- no essential information encoded only by color;
- `prefers-reduced-motion` disabling smooth document scrolling and nonessential motion;
- informative historical images with descriptive alt text;
- no current Contacto form until transport/privacy/error behavior is real.

## Automated contract

`modern/src/__tests__/document-contract.test.tsx` adds cross-cutting checks on top of the existing component behavior tests:

1. metadata stays honest while deployment authority is unresolved;
2. exactly one H1 is rendered;
3. the global landmarks remain present;
4. every primary navigation fragment resolves to an element in the rendered app;
5. promoted media is local and has non-empty alt text;
6. all images below the hero use native lazy loading;
7. Contacto remains non-interactive until a real submission boundary exists.

This test is intentionally about public behavior/contracts rather than component implementation details.

## Browser qualification already established

The visual-system lane has exercised production builds at:

- 360 × 900 px;
- 768 × 1024 px;
- 1440 × 1000 px.

Accepted browser evidence established:

- zero document-level horizontal overflow;
- first fresh-page Tab reaches `Saltar al contenido` → `#main-content`;
- reduced-motion document scrolling resolves to `auto`;
- promoted lazy images load after real viewport traversal;
- historical/current truth boundaries remain visible;
- cards do not lose real rendered content at qualified widths.

The final cross-cutting PR must repeat the relevant production-browser checks after its own changes rather than relying only on previous screenshots.

## Core token contrast spot-check

The current semantic token pairs were checked with the WCAG relative-luminance formula. Ratios below are rounded:

| Foreground | Background | Contrast |
| --- | --- | ---: |
| `--color-text` `#f4f7f6` | `--color-bg` `#0b100e` | 17.80:1 |
| `--color-muted` `#a9b7b2` | `--color-bg` `#0b100e` | 9.23:1 |
| `--color-subtle` `#7f918a` | `--color-bg` `#0b100e` | 5.77:1 |
| `--color-accent` `#83d2b5` | `--color-bg` `#0b100e` | 10.83:1 |
| `--color-accent-ink` `#10201a` | `--color-accent` `#83d2b5` | 9.53:1 |
| `--color-subtle` `#7f918a` | `--color-surface` `#16211e` | 4.97:1 |

These core combinations clear the 4.5:1 WCAG AA threshold for normal text. They do **not** replace rendered-page review: transparency, overlays, imagery and future token changes still require visual/browser qualification.

## Media behavior

The promoted-media policy is:

- hero brand mark may load eagerly because it is above the fold;
- archive/service, Backstage and Equipo media use `loading="lazy"` and `decoding="async"`;
- CSS aspect-ratio/container rules reserve layout space;
- essential media comes from the application asset boundary, not third-party hotlinks;
- historical originals remain unchanged and provenance is documented in `docs/asset-provenance.md`.

## Future interactive content

If #26 later adds current projects, richer media, an editor or a live contact route, the accessibility contract expands with the feature. In particular:

- dialogs/drawers require focus lifecycle and Escape behavior;
- upload/edit forms require labels, validation and error summaries where appropriate;
- publish/preview state cannot be represented by color alone;
- dynamic status requires suitable live-region behavior only when user action needs it;
- video needs captions/transcript decisions based on the actual media being published.

A CMS/admin surface is not exempt from the same keyboard, semantic and reduced-motion standards as the public landing.
