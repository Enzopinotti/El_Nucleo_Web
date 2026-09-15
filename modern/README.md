# El Núcleo — modern app

`modern/` contiene la reconstrucción 2026 del sitio original de El Núcleo.

La aplicación ya está **integrada en `main` y desplegada en producción**. El root histórico de 2022 permanece versionado como evidencia de origen; Netlify publica el artifact generado desde `modern/dist`, por lo que el cutover no requirió borrar ni mover los archivos históricos.

Producción:

<https://el-nucleo-producciones.netlify.app/>

Cutover merge:

```text
c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
```

Post-merge Modern app quality #154: **success**.  
Smoke de producción HTTP + Chrome: **success**.

## Runtime

- Node.js 24
- pnpm 11.26.0
- React 19
- Vite 8
- TypeScript 6.0.3
- Sass
- Vitest + Testing Library
- ESLint + Prettier

Autoridades:

- `../.nvmrc` → Node 24;
- `package.json#packageManager` → pnpm 11.26.0;
- `package.json#engines` → major de Node permitida;
- `pnpm-workspace.yaml` → policy supply-chain/install;
- `pnpm-lock.yaml` → graph reproducible;
- `../netlify.toml` → build, publish directory, security headers y cache productivos.

TypeScript permanece en 6.0.3 porque la versión actual de `typescript-eslint` del proyecto soporta TypeScript `<6.1`. ESLint usa `onUnsupportedTypeScriptVersion: "error"` para impedir un upgrade incompatible silencioso.

## Local workflow

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm dev
```

Quality completo:

```bash
pnpm check
```

`pnpm check` ejecuta:

1. Prettier sobre la app;
2. Prettier sobre README/docs del repositorio;
3. ESLint con cero warnings;
4. TypeScript `--noEmit`;
5. Vitest;
6. Vite production build.

Baseline final:

```text
3 test files
30 tests
30 passed
```

## Source authority

```text
../index.html + ../views + ../scss + ../css
    → implementación histórica 2022

src/
    → aplicación 2026

src/content/
    → contenido estructurado + truth/publication/provenance

public/media/
    → media histórica promovida y trazable

dist/
    → output generado; nunca editar manualmente

../netlify.toml
    → deployment authority de producción
```

Módulos principales de contenido:

- `src/content/landing-content.ts` — contrato agregado independiente de presentación;
- `src/content/local-content.ts` — autoridad local actual;
- `src/content/historical-home.ts` — identidad/servicios históricos;
- `src/content/historical-about.ts` — Nosotros 2022;
- `src/content/historical-backstage.ts` — archivo Backstage;
- `src/content/historical-team.ts` — personas/referencias históricas;
- `src/content/historical-contact.ts` — contrato exacto de Contacto histórico;
- `src/content/public-asset.ts` — paths de media propiedad de la app.

## Content truth boundary

La aplicación diferencia explícitamente:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- `public` / `withheld`.

La identidad histórica `El Núcleo / CINE` no se mezcla con el shell editorial 2026.

Los slots de proyectos actuales y canales actuales de contacto permanecen vacíos y withheld porque no existe evidencia suficiente para inventarlos.

## Contacto

La fuente histórica usaba:

```html
<form action="" method="get" enctype="text/plain"></form>
```

No existe un backend de entrega verificable en el repositorio. La app moderna preserva ese formulario como contrato histórico no interactivo y no simula envíos exitosos ni recopila datos personales.

## Visual / accessibility contract

La dirección aceptada es editorial: archivo de producción / contact sheet / control surface.

Se calificó para:

- 360 / 768 / 1440 px;
- cero overflow global;
- un H1;
- landmarks semánticos;
- skip link;
- `focus-visible`;
- `prefers-reduced-motion`;
- contraste principal;
- media local con alt útil;
- lazy loading debajo del hero;
- Contacto no interactivo.

## Supply-chain policy

`pnpm-workspace.yaml` aplica:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- decisiones explícitas sobre install/build scripts.

`@parcel/watcher` permanece explícitamente denegado porque llega de forma opcional por Sass y el producto instala, testea y compila sin ejecutar su postinstall nativo.

La policy detectó durante la migración una release transitiva demasiado reciente de `brace-expansion`; se mantuvo la protección y se re-resolvió el lockfile en lugar de whitelistearla.

## Deployment

Build de Netlify:

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Publish directory:

```text
modern/dist
```

Producción canónica:

```text
https://el-nucleo-producciones.netlify.app/
```

`netlify.toml` aplica una CSP restrictiva, Permissions-Policy, Referrer-Policy, `nosniff`, frame denial y cache immutable para los assets fingerprinted de Vite.

El deploy final fue validado contra la URL productiva, no sólo contra local/preview. El smoke comprobó HTML, metadata, assets, headers, `robots.txt`, sitemap y render de React en Chrome bajo la CSP productiva.

## SEO

El documento productivo usa:

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
```

`robots.txt` referencia el sitemap productivo y `sitemap.xml` contiene una única URL porque el sitio es un documento con anchors, no un router multipágina.

## Rollback

Rollback preferido:

1. restaurar un deploy anterior desde Netlify si el problema es de deployment;
2. o revertir el merge de cutover en Git;
3. ejecutar quality;
4. redeploy;
5. repetir smoke productivo.

Baseline histórico:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

## Invariantes

- no inventar clientes, staff, proyectos ni actividad comercial vigente;
- no perder provenance histórica;
- no convertir `dist/` en fuente manual;
- no relajar CI o supply-chain para obtener verde;
- no agregar CMS/admin/auth/analytics sin necesidad real;
- no recolectar datos sin transporte y privacidad definidos;
- temporary qualification tooling se elimina después de capturar evidencia;
- el README general y `docs/` deben permanecer sincronizados con el estado real.

Documentación completa del cierre: [`../docs/modernization-2026.md`](../docs/modernization-2026.md) y [`../docs/deployment-cutover-2026.md`](../docs/deployment-cutover-2026.md).
