# Content platform 2026

## Purpose

El Núcleo needs to accept better information in the future without turning every new fact into an ad-hoc JSX edit and without rewriting the incomplete history of the 2022 project.

The first content-platform slice therefore establishes a **typed authority boundary** before any CMS, remote API or `/admin` route exists.

The operating rule is:

> **CMS-ready now; CMS only when justified by real content operations.**

## Current architecture

```text
2022 preserved sources + reviewed 2026 editorial facts
                    ↓
          LandingContent contract
                    ↓
       localLandingContent registry
                    ↓
              public React UI
```

`modern/src/content/landing-content.ts` owns the presentation-independent content shape.

`modern/src/content/local-content.ts` is the current local authority. It composes already-qualified historical modules instead of duplicating or mutating their source data.

`App.tsx` now reads navigation, hero/editorial copy, historical collections, timeline, reconstruction principles and footer presentation from that registry.

This is intentionally **not yet** a remote-provider abstraction. A provider interface becomes useful when another real source exists or asynchronous loading semantics are required; adding one now would create ceremony without an actual second implementation.

## Historical identity vs 2026 editorial shell

The content review exposed an important boundary that is now encoded in the model:

- `siteIdentity` is `historical` and contains only the preserved `El Núcleo / CINE` name/tag and logo;
- `shell` is `verified-current` and owns 2026 editorial labels such as `Archivo 2022 · reconstrucción 2026` and the reconstruction footer line;
- `hero`, `history`, `reconstruction` and `seo` are also explicit 2026 editorial/reconstruction domains rather than being smuggled into the historical identity record.

This prevents a mixed object from being marked `historical` while silently containing present-day editorial claims.

## Truth status contract

Claim-bearing domains carry an explicit status:

- `historical` — supported as a statement about the preserved 2022 project/source;
- `verified-current` — supported as a statement about the actual 2026 reconstruction or another verified current fact;
- `unverified` — known to be unresolved and therefore not promoted as current truth;
- `draft` — proposed content that is not public.

Publication is independent from truth status:

- `public` — the domain may feed the public landing;
- `withheld` — the domain is structurally represented but intentionally absent from public presentation.

This prevents a future editor or provider from treating “exists in storage” as equivalent to “safe to publish”.

## Provenance

A claim-bearing domain can reference repository provenance with:

- source path;
- blob SHA when known;
- source year/context;
- an optional explanatory note.

Existing media models keep their item-level source paths and blob SHAs. The registry adds domain-level provenance and does not replace `docs/asset-provenance.md`.

## Explicit empty current domains

Two future-facing domains are deliberately present but empty:

### Projects

`current.projects` is `unverified` + `withheld` and contains no entries. No work sample is manufactured from historical service categories, client labels or aspirational copy.

### Contact channels

`current.contactChannels` is `unverified` + `withheld` and contains no email, WhatsApp, form or social destination. A channel becomes publishable only after ownership, destination, privacy and operational behavior are verified.

These empty domains are product state, not missing implementation.

## SEO boundary

The content contract carries the qualified SEO inputs already represented in `modern/index.html`, while deployment-specific values remain unresolved:

- canonical URL: `null`;
- social preview image: `null`.

The static HTML remains the runtime authority for initial document metadata today. A later build-time/content pipeline may derive both from one source only if it improves determinism and crawler behavior.

## Future data intake

When new information arrives from former participants, each proposed item should record where practical:

1. the claim/content itself;
2. whether it describes 2022 history or current activity;
3. the source/person/document supporting it;
4. relevant date and context;
5. media provenance/permission where applicable;
6. publication state.

The preferred path becomes a reviewed change to the content authority, not scattered component edits.

## Remote provider semantics — deferred, but constrained

A future remote source must preserve the same truth metadata and distinguish at least:

- valid data;
- valid empty data;
- transport failure;
- invalid/malformed payload.

Valid empty data must not silently become unrelated historical fallback content. Fallback policy must be explicit per domain.

Remote data must be validated before entering the UI and must not erase `historical`/`verified-current`/`unverified`/`draft` semantics.

## Admin/editor boundary — deferred

No admin route is justified yet because there is no verified operator workflow or volume of current content to manage.

When that changes, evaluate the real constraints first: authentication, editor ownership, media storage, previews, drafts/publishing, audit/version history, security, deployment and rollback.

The public UI must remain decoupled from that vendor/implementation choice through the content contract.

## Non-goals of this slice

- no CMS dependency;
- no remote API;
- no speculative authentication;
- no invented current company status;
- no invented projects, clients or metrics;
- no fake-success contact workflow;
- no destructive edit to the historical 2022 root.

## Qualification

The registry is covered by contract tests that verify:

- every public archive domain remains explicitly historical;
- the 2026 shell remains `verified-current` and cannot drift back into historical identity;
- current projects/contact channels remain empty and withheld;
- historical collection counts do not drift silently;
- deployment-specific SEO fields remain unresolved;
- identity and contact provenance remains attached.

The qualified branch contract currently contains **29/29 tests** across content authority, document-level contracts and application behavior, in addition to Prettier, ESLint, TypeScript and production build.

Browser qualification is performed against the built production app before final merge so this refactor is required to preserve the already-qualified rendered behavior, responsive layout, accessibility/media invariants and Contacto truth/privacy boundary.
