# Home migration — 2022 to 2026

This note records how the first product-facing slice of the modern application maps back to the original Home experience.

## Historical Home

The 2022 root page used Bootstrap and repeated four nearly identical carousel instances. Each carousel rotated through the same four service images but started on a different active item.

That implementation remains preserved in Git history and in the historical root site during migration.

## 2026 Home decision

The modern Home replaces those duplicate carousels with **one controlled archive gallery**.

Reasons:

- one source of truth for the historical service set;
- no autoplay or competing motion;
- explicit previous/next native buttons;
- active item announced through `aria-live`;
- CSS `aspect-ratio` reserves media space;
- below-fold historical media uses lazy loading;
- gallery behavior is covered by tests;
- the interface states clearly that the archive is not automatically a current commercial catalog.

## Content truth boundary

Home may describe what the 2022 project was created to represent because that is documented by the historical source.

It must **not** infer that the same collective, client list, team, service availability or commercial activity remains current in 2026.

That distinction is intentional in the hero copy, archive note and later migration lanes.

## Visual continuity

The reconstruction preserves:

- `El Núcleo / CINE` naming;
- the historical logo;
- `#83d2b5` as a design token;
- the four original service categories;
- a dark, image-led audiovisual character.

It does not reproduce Bootstrap cards/carousels or the original page pixel-for-pixel.

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

Home keeps:

- one H1;
- semantic header/nav/main/footer;
- a keyboard-first skip link;
- visible focus treatment;
- native gallery controls with accessible names;
- useful image alternative text;
- no autoplay;
- `prefers-reduced-motion` behavior;
- readable mobile-first layout.

Automated DOM tests complement browser-level interaction and visual review.

## Automated quality evidence

The canonical Home branch was validated with the repository quality contract using the committed lockfile:

- `pnpm install --frozen-lockfile`;
- Prettier check;
- ESLint with zero warnings;
- TypeScript `tsc --noEmit`;
- Vitest: **5/5 tests passing**;
- Vite production build.

At the qualification checkpoint the production bundle reported approximately 9.24 kB of CSS and 227.42 kB of JavaScript before gzip. These are slice evidence, not permanent performance budgets.

The permanent `Modern app quality` pull-request workflow also passed on a human-authored branch head after canonical formatting was committed.

## Browser / responsive qualification

Home was then served from the **production Vite build** and inspected with Google Chrome 152.0.7977.82 through Chrome DevTools Protocol.

Evidence was generated for real responsive viewports rather than oversized fake full-page windows:

| Viewport | Rendered document |
| --- | ---: |
| 360 px mobile | 360 × 4231 px |
| 768 px tablet | 768 × 3226 px |
| 1440 px desktop | 1440 × 3651 px |

The browser qualification verified:

- full-page rendering at mobile, tablet and desktop widths;
- no horizontal overflow at 360 px or 1440 px;
- exactly one H1;
- logo legibility and editorial hierarchy across all three widths;
- all four gallery states render cleanly on mobile and desktop: Videoclips → Publicidad → Cortometrajes → Coberturas;
- historical image crops remain readable in every gallery state;
- the first real `Tab` target is the visible `Saltar al contenido` link;
- subsequent tab order continues through brand, primary navigation, hero actions and gallery controls;
- `prefers-reduced-motion: reduce` changes document scroll behavior to `auto` and collapses transition duration to the reduced-motion override;
- the production preview responds correctly from the expected Vite root base path.

Screenshots and machine-readable evidence were generated as short-lived CI artifacts for review. They are deliberately **not** committed to the repository as permanent binary noise.

The dedicated browser-smoke workflow was a bounded migration tool and is removed in the same closing commit after evidence is accepted. The repository keeps only its normal read-only quality workflow.

## Home completion boundary

This slice is considered qualified when the closing branch head passes the permanent quality workflow after the temporary QA tooling has been removed.

Home qualification does **not** authorize a root/GitHub Pages cutover. The historical implementation remains the deployable baseline until the remaining content slices and final rollback/deployment plan are complete.

The next content lane is `Nosotros`, with the 2022 wording treated as historical source material rather than a current commercial claim.
