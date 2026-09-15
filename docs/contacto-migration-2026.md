# Contacto migration — 2026 privacy-safe historical slice

Issue: #20

## Historical authority

Primary source: `views/contacto.html`

Historical Git blob:

`e8a550ad30c708a0893ad31b3b289b15bcf8e118`

The historical form declared:

```html
<form action="" method="get" enctype="text/plain">
```

That is a critical part of the source contract. The 2022 repository does not contain a verified delivery endpoint that can support a real contact workflow.

## Historical fields

`modern/src/content/historical-contact.ts` records the source contract as typed data:

| Source label | Kind | Required in 2022 | Source name | Historical limit |
| --- | --- | --- | --- | --- |
| Nombre | text | yes | `userName` | — |
| Apellido | text | yes | `userSurname` | — |
| Correo | email | yes | `userMail` | — |
| ¿Desea suscribirse a nuestro Newslatter? | checkbox | no | `newslatter` | — |
| Consulta | textarea | yes | `consultas` | 400 chars |

The source typo `Newslatter` is preserved as historical wording and explicitly contextualized rather than silently corrected into a claim that a newsletter service exists.

## Product decision: preserve intent, not fake operation

`HistoricalContact` is deliberately **not a live form**.

The modern surface:

- exposes a semantic `#contacto` section;
- explains that the reconstruction does not collect or transmit personal information;
- exposes the exact historical method/action boundary;
- represents historical fields as archive metadata;
- preserves the source's 400-character consultation limit as evidence;
- shows the source promise as a quotation, not a current service-level promise;
- has no submit button, textbox, checkbox or hidden transport.

This is safer and more truthful than reproducing the old UI with a local success state.

## Why the old GET transport is not recreated

A GET-based contact submission can place form values in a URL and browser history. The historical page requested names, email and a consultation message, so copying that transport would create a privacy regression without delivering a real product capability.

The 2026 reconstruction therefore does not:

- send personal data through query strings;
- invent an API endpoint;
- invent an email address;
- log contact content;
- simulate successful delivery;
- imply a working newsletter subscription.

## Future live-contact contract

A future operational Contacto is a separate product requirement. Before accepting data it must define, at minimum:

1. a verified destination/owner;
2. server-side or trusted-provider transport;
3. field validation and size limits;
4. loading, success and failure states tied to real delivery outcomes;
5. spam/abuse handling;
6. retention/privacy expectations;
7. accessible labels, errors and status messaging;
8. tests covering failure as well as success.

No dependency is added before that need exists.

## Accessibility decision

Because there is no operational transport, fake disabled controls are avoided. Static archive metadata is more understandable for keyboard and screen-reader users than a disabled form that cannot complete its advertised purpose.

The section uses:

- named semantic region;
- H2/H3 hierarchy;
- explicit `Estado del contacto en 2026` aside;
- textual required/optional metadata;
- no custom focus lifecycle;
- no interactive control without an action.

## Test contract

The suite verifies:

- exact source path/blob;
- `GET` + empty action authority;
- the five historical labels in source order;
- 400-character historical consultation limit;
- `Contacto 2022` navigation;
- explicit no-collection/no-transmission copy;
- absence of `<form>`, textbox, checkbox and submit button in the modern Contacto section;
- newsletter wording preserved with a no-current-subscription boundary;
- all prior Home / Nosotros / Servicios / Backstage / Equipo contracts remain green.

## Closure gate

Before controlled merge:

1. permanent `Modern app quality` green;
2. formatting/lint/typecheck/tests/build green without relaxed checks;
3. production browser QA at 360 / 768 / 1440 px;
4. one H1 and no horizontal overflow;
5. `#contacto` truth/privacy boundary visible in production;
6. no form controls or accidental transport in rendered output;
7. fresh-page skip-link-first keyboard behavior preserved;
8. reduced-motion behavior preserved;
9. temporary QA tooling removed;
10. post-merge `main` validation green.

Browser evidence is documented only after it actually runs.

## Non-goals

- no invented email address;
- no new backend for portfolio optics;
- no fake success state;
- no newsletter provider;
- no CAPTCHA without a real submission channel;
- no analytics;
- no generic historical social links;
- no root cutover in this slice.
