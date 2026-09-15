# Nosotros migration — historical narrative boundary

This note records how the 2022 `Nosotros` page is represented inside the 2026 reconstruction without turning historical copy into current commercial claims.

## Source authority

Historical source:

- path: `views/nosotros.html`
- Git blob: `67f5a0857639095d619aeff41c5341b8e6b4df75`
- source year: 2022

The original file remains untouched. The modern application references its meaning through typed content under `modern/src/content/historical-about.ts`.

## Statements preserved

Two statements are kept because they explain what El Núcleo wanted to communicate in 2022:

1. the `Nosotros` description presenting El Núcleo as an entrepreneurial audiovisual/advertising collective;
2. the `Visión` paragraph describing artistic development, awareness campaigns, NGO collaboration and a first feature film.

The text is preserved as **archive material**. It is not rewritten into present-tense 2026 claims.

## Current-truth boundary

The modern surface explicitly distinguishes three things:

- **historical statement** — what the source page said in 2022;
- **source context** — year/path/provenance of that statement;
- **2026 editorial interpretation** — what can and cannot be inferred today.

Without independent evidence, the reconstruction does not claim that:

- El Núcleo currently operates as the same collective/company;
- the historical team is still active;
- the historical services are currently offered;
- the NGO collaborations happened or remain active;
- the first feature film was completed;
- any historical client/work relationship remains current.

Preserving source text is not the same as revalidating it.

## Unverified social links

The 2022 footer linked to generic top-level destinations for Facebook, YouTube, Instagram, Vimeo and Twitter rather than verified El Núcleo profiles.

Those links are intentionally **not migrated**. The modern app must not create the appearance of verified project accounts where none have been established.

## Frontend decision

`Nosotros` becomes a semantic in-page section rather than a new routed page for this migration stage.

Reasons:

- the modern application is currently a compact editorial archive;
- navigation to `#nosotros` is sufficient for the content and requires no new runtime dependency;
- introducing a router solely to imitate the historical multi-page structure would add architecture before there is a product need;
- a future routing decision can still be made during final information-architecture/cutover work.

Implementation responsibility is split into:

```text
modern/src/
  content/
    historical-about.ts
  components/
    HistoricalAbout.tsx
  styles/
    _about.scss
```

`App.tsx` only composes the section and adds the navigation anchor.

## Accessibility contract

The slice preserves the Home guarantees and adds:

- a named semantic `section` for Nosotros;
- correct H2/H3 hierarchy under the existing single H1;
- readable blockquotes with source attribution;
- current-context notes outside the quoted historical text;
- no fake social links;
- no keyboard traps or new custom controls;
- responsive layouts without horizontal overflow.

## Automated contract

The final implementation validates that:

- there is exactly one H1;
- the historical collective wording is present as archive content;
- the 2026 context explicitly says current operation is not confirmed;
- historical NGO/feature-film aspirations are not presented as completed facts;
- generic social links from the 2022 page do not appear in the modern surface;
- the navigation points to `#nosotros`;
- existing Home/gallery behavior continues to pass.

`pnpm check` remains the authority for format, lint, typecheck, tests and production build. The qualified branch completed **9/9 Vitest tests** after canonical formatting, with ESLint, TypeScript and the Vite production build green.

At the browser-qualification checkpoint the production bundle reported approximately 11.58 kB of CSS and 231.15 kB of JavaScript before gzip. These values are evidence for this slice, not permanent performance budgets.

## Production browser qualification

The production Vite preview was qualified with **Google Chrome 152** through Chrome DevTools Protocol. Evidence was generated as ephemeral CI artifacts rather than committed screenshots.

Full-page renders were captured with real viewport dimensions:

- mobile: 360 px viewport, document `360 × 6711`;
- tablet: 768 px viewport, document `768 × 5310`;
- desktop: 1440 px viewport, document `1440 × 5321`.

The qualification confirmed:

- exactly one H1 remains on the page;
- `#nosotros` exposes the expected H2 `Lo que El Núcleo decía de sí mismo`;
- the `No asumida` current-truth marker is rendered;
- no Facebook, YouTube, Instagram, Vimeo or Twitter links are exposed by the modern surface;
- there is no horizontal overflow at 360 px or 1440 px;
- a fresh-page first `Tab` lands on `Saltar al contenido` / `#main-content`;
- `prefers-reduced-motion: reduce` resolves document scrolling to `auto` and effectively neutralizes transitions;
- the historical quotations and 2026 context remain visually distinct across mobile, tablet and desktop;
- Home/archive layout remains visually intact after adding Nosotros.

The first browser harness attempt produced a false negative because it tried to reset keyboard focus with `document.body.focus()`, while `body` is not focusable by default. The harness was corrected to reload the page and test from Chrome's natural initial focus state; the second run passed without changing product code.

## Workflow hygiene

The formatter and browser-qualification workflows are one-shot migration tooling only. They are removed before the slice is considered review-ready.

The permanent repository automation surface remains the read-only `Modern app quality` workflow with third-party actions pinned to immutable commit SHAs.

## Merge boundary

Browser qualification makes the slice **review-ready**, not automatically merged. The historical root `views/nosotros.html` remains deployable and unchanged, and no root/GitHub Pages cutover belongs to this slice.
