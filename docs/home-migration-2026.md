# Home migration — 2022 to 2026

This note records how the first product-facing slice of the modern application maps back to the original Home experience.

## Historical Home

The 2022 root page used Bootstrap and repeated four nearly identical carousel instances. Each carousel rotated through the same four service images but started on a different active item.

That implementation is preserved in Git history and remains untouched in the root site during this migration.

## 2026 Home decision

The modern Home replaces those duplicate carousels with **one controlled archive gallery**.

Reasons:

- one source of truth for the historical service set;
- no autoplay or competing motion;
- explicit previous/next buttons work with standard keyboard activation;
- active item is announced through an `aria-live` status;
- image space is reserved with CSS `aspect-ratio` to reduce layout shift;
- below-fold historical media is lazy loaded;
- gallery behavior is covered by tests;
- the interface states clearly that the archive is not automatically a current commercial catalog.

## Content truth boundary

The Home may say what the 2022 project was created to represent, because that is documented by the historical source.

It must **not** infer that the same collective, client list, team, service availability or commercial activity remains current in 2026.

That distinction is intentional in the hero copy, archive note and later migration issues.

## Visual continuity

The reconstruction preserves:

- `El Núcleo / CINE` naming;
- the historical logo;
- the historical accent `#83d2b5` as a design token;
- the four service categories used by the original site;
- a dark, image-led audiovisual character.

It does not try to reproduce Bootstrap cards/carousels or the original page layout pixel-for-pixel.

## Source architecture

```text
modern/src/
  components/
    ArchiveGallery.tsx
  content/
    historical-home.ts
  styles/
    _tokens.scss
    _base.scss
    _home.scss
    index.scss
```

Historical content paths are represented in `historical-home.ts`; promoted media provenance is documented in `asset-provenance.md`.

## Accessibility contract

Home must keep:

- one H1;
- semantic header/nav/main/footer;
- skip link;
- visible focus styles;
- native buttons for gallery controls;
- useful image alternative text;
- no autoplay;
- `prefers-reduced-motion` behavior;
- readable layout from small mobile widths upward.

Automated tests cover DOM semantics and interaction but do not replace manual keyboard, contrast and responsive review.

## QA still required before Home is considered complete

The PR for this slice should remain Draft until the following are visually checked in a browser:

- ~320–375 px mobile;
- ~768 px tablet;
- ~1280–1440 px desktop;
- logo legibility against the new hero treatment;
- service-image crop quality for all four archive items;
- focus visibility and tab order;
- reduced-motion experience;
- no unintended horizontal overflow;
- production build served using the expected Vite base path.

No root/GitHub Pages cutover belongs to this Home slice.
