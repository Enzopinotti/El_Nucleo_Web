# Equipo migration — 2026 historical slice

Issue: #18

## Historical authority

Primary source: `views/equipo.html`

Historical Git blob:

`44e71b9bf1c40cea594246b4773c0898d45e2036`

The 2022 page mixed several concerns that must not be collapsed into one present-day business claim:

1. two named people with local photographs;
2. personal Instagram links attached to those photographs;
3. a `Clientes Habituales` heading;
4. two organization references, one local-logo based and one remote-hotlink based;
5. generic social links in the footer.

The modern slice treats this as archival evidence.

## People authority

`modern/src/content/historical-team.ts` is the typed authority for the two historical people labels:

- André Wilber Coronel Vargas;
- Lautaro Weimer.

The UI preserves the name/photo association from 2022 but explicitly states that it does **not** verify 2026 membership, collaboration, role or current relationship.

No job titles, responsibilities, biographies, dates or present-day contact channels are invented.

## Media promotion

Only the two local photographs needed by the modern archive are promoted:

| Source | Blob SHA | Modern path |
| --- | --- | --- |
| `assets/recursos/fotos-equipo/fotoAndre.jpg` | `ba4b1c118c38c6f4c61e6645cee9f1a65549cbdb` | `modern/public/media/team/andre-2022.jpg` |
| `assets/recursos/fotos-equipo/fotoLauti.jpg` | `58bdaafc1dbc98c62db57f3f4642c1d169f2990c` | `modern/public/media/team/lautaro-2022.jpg` |

The promoted files use the exact historical Git blobs byte-for-byte. Original files remain untouched.

## Client-reference boundary

The source page displayed:

- Argentina Cultura;
- Grupo del Sud;

under `Clientes Habituales`.

The modern UI preserves **that source label and context only**. It does not claim a current client relationship, contract, endorsement, completed project or ongoing commercial link.

A text-first treatment is used instead of a logo wall.

### Why logos are not promoted

- Argentina Cultura used a remote hotlink in the historical page; reintroducing it would create an unnecessary external dependency and visually imply more current authority than the source can support.
- Grupo del Sud has a local historical logo, but the label itself is enough to preserve what the 2022 page showed. The image remains in the historical tree and is documented in `asset-provenance.md` as intentionally unpromoted.

## Personal/social links

The source linked the two people photographs to Instagram profiles. Those links are omitted from the modern slice because their present ownership/relevance has not been reverified and they are not required to preserve the historical record.

Generic Facebook / YouTube / Instagram / Vimeo / Twitter footer links remain excluded for the same reason as previous slices.

## Presentation decision

`HistoricalTeam` uses:

- one semantic `#equipo` section;
- two source-attributed historical person cards;
- lazy-loaded local media;
- visible `Vigencia 2026 · no verificada` status;
- one separate low-emphasis block for the two historical client labels;
- no carousel, modal or custom focus lifecycle.

The section remains part of the single-page editorial migration rather than introducing routing only for Equipo.

## Navigation

Primary navigation adds:

- `Equipo 2022` → `#equipo`.

Existing migrated anchors remain unchanged.

## Test contract

The application suite covers:

- a typed two-person historical team authority;
- the exact two source labels;
- source blob provenance on people data;
- `#equipo` navigation;
- explicit no-current-membership wording;
- two `Vigencia 2026 · no verificada` statuses;
- preservation of the two 2022 client labels;
- explicit non-endorsement/current-relationship copy;
- absence of Instagram, Argentina Cultura and Grupo del Sud external links in the modern surface;
- all prior Home / Nosotros / Servicios / Backstage behavior contracts.

## Closure gate

Equipo is not complete merely because the component renders.

Before controlled merge it must have:

1. permanent `Modern app quality` green on the final branch HEAD;
2. formatter/lint/typecheck/tests/build green without weakening checks;
3. production-build browser QA at mobile, tablet and desktop widths;
4. one H1 and no horizontal overflow;
5. skip-link-first keyboard behavior preserved;
6. reduced-motion behavior preserved;
7. Equipo truth-boundary copy visible in production;
8. exactly two historical team images visible with no remote client-image dependency;
9. no unverified historical social/personal links exposed;
10. temporary browser-QA tooling removed before merge;
11. post-merge validation on `main`.

Browser qualification evidence is recorded only after it has actually run.

## Non-goals

This slice does not add:

- a current staff directory;
- roles or biographies not present in source evidence;
- present-day social/contact links;
- current client or endorsement claims;
- a logo wall;
- a remote image dependency;
- a Team CMS;
- Contact transport;
- root cutover.
