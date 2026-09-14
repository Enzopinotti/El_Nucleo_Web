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

The slice must preserve the Home guarantees and add:

- a named semantic `section` for Nosotros;
- correct H2/H3 hierarchy under the existing single H1;
- readable blockquotes with source attribution;
- current-context notes outside the quoted historical text;
- no fake social links;
- no keyboard traps or new custom controls;
- responsive layouts without horizontal overflow.

## Automated contract

Tests must prove that:

- there is still exactly one H1;
- the historical collective wording is present as archive content;
- the 2026 context explicitly says current operation is not confirmed;
- historical NGO/feature-film aspirations are not presented as completed facts;
- generic social links from the 2022 page do not appear in the modern surface;
- the navigation points to `#nosotros`;
- existing Home/gallery behavior continues to pass.

`pnpm check` remains the authority for format, lint, typecheck, tests and production build.

## QA boundary

Before merging this slice, the production build should be reviewed at mobile, tablet and desktop widths with focus on:

- heading hierarchy and line lengths;
- readability of both historical quotations;
- distinction between quote and editorial context;
- the `2026 / Contexto, no revalidación` panel;
- four-item header navigation at tablet/desktop widths;
- no regression to Home/archive gallery;
- no horizontal overflow;
- skip-link-first keyboard sequence.

The historical root `views/nosotros.html` remains deployable and unchanged. No root/GitHub Pages cutover is part of this slice.
