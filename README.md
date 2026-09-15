# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. **El Núcleo CINE** nació como un proyecto audiovisual experimental y una entrega de Coderhouse; la reconstrucción de 2026 no intenta convertir ese origen en una historia comercial más madura de lo que realmente fue.

El objetivo de la modernización fue demostrar evolución real de ingeniería sin borrar el pasado: preservar el sitio original, reconstruir la experiencia con herramientas actuales, mantener provenance de contenido y media, separar hechos históricos de información vigente y efectuar el cambio de autoridad pública mediante un cutover explícito, probado y reversible.

## Estado final

La modernización 2026 está **completa y desplegada en producción**.

Producción moderna:

<https://el-nucleo-producciones.netlify.app/>

Cutover mergeado en `main`:

```text
c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
```

Evidencia final:

- PR #32 mergeado desde un HEAD limpio y calificado;
- Modern app quality #153 verde antes del merge;
- Modern app quality post-merge #154 verde sobre el commit real de `main`;
- 30/30 tests;
- lint, typecheck, formatting y Vite production build verdes;
- deploy preview de Netlify verde;
- smoke de producción real verde por HTTP y Chrome;
- canonical, Open Graph, Twitter image, `robots.txt` y sitemap alineados con el origen productivo;
- CSP y headers de seguridad verificados en producción;
- React renderizando correctamente bajo la CSP productiva;
- Contacto histórico permanece no operativo y no recolecta datos.

La versión moderna **no requiere destruir ni mover la raíz histórica del repositorio**. Netlify publica `modern/dist`, mientras el código 2022 permanece como evidencia de origen.

## Baseline histórico preservado

Referencia histórica estable:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La implementación original incluye:

- HTML multipágina;
- Sass/CSS;
- Bootstrap por CDN;
- Animate.css/AOS;
- Font Awesome remoto;
- responsive manual;
- Home, Nosotros, Servicios, Equipo y Contacto;
- galerías, fotografías e identidad audiovisual propia.

Los archivos históricos no fueron reescritos para hacer parecer moderno el trabajo de 2022.

## Arquitectura final

```text
2022 root files
    ↓
evidencia histórica preservada

modern/src
    ↓
source authority 2026
    ↓
Vite build
    ↓
modern/dist
    ↓
Netlify production
```

Autoridades:

- `index.html`, `views/`, `scss/`, `css/` y assets originales → fuente histórica 2022;
- `modern/src/` → aplicación actual;
- `modern/src/content/` → autoridad de contenido estructurado;
- `modern/public/media/` → media histórica promovida con provenance;
- `modern/dist/` → artifact generado, nunca fuente manual;
- `netlify.toml` → build, publish directory, headers y caching de producción;
- `.nvmrc` → Node 24;
- `modern/package.json#packageManager` → pnpm 11.26.0;
- `modern/pnpm-workspace.yaml` → policy de instalación/supply-chain.

## Stack moderno

- Node.js 24
- pnpm 11.26.0
- React 19
- TypeScript 6.0.3
- Vite 8
- Sass con `@use`
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions
- Netlify

TypeScript 6.0.3 se mantiene deliberadamente porque la línea actual de `typescript-eslint` utilizada por el proyecto soporta TypeScript `<6.1`. ESLint está configurado para fallar si el compilador sale de ese rango sin una revisión explícita.

## Quality contract

El contrato local y de CI es el mismo:

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` ejecuta:

1. formato de la aplicación;
2. formato del README raíz y `docs/**/*.md`;
3. ESLint con cero warnings;
4. TypeScript `--noEmit`;
5. Vitest;
6. build de producción.

Baseline final:

```text
3 test files
30 tests
30 passed
```

Distribución:

- 6 tests de authority / truth / publication / provenance;
- 5 contratos del documento público y deployment/SEO;
- 19 tests de comportamiento visible.

No se agregó un coverage threshold nominal sólo para sumar una métrica.

## Supply-chain

La migración a pnpm 11 fue tratada como un cambio de seguridad, no como un bump cosmético.

`modern/pnpm-workspace.yaml` aplica:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- decisión explícita sobre scripts de instalación/build;
- `@parcel/watcher` denegado porque el producto califica sin ejecutar ese postinstall nativo opcional.

Durante la migración, la policy bloqueó una release transitiva demasiado reciente de `brace-expansion`. La protección no se relajó: el lockfile fue re-resuelto bajo la misma policy.

Además se ejecutó evidencia de advisory audit one-shot sobre el graph congelado:

- producción: sin findings `moderate` o superiores;
- árbol completo: sin findings `high` o superiores.

## Contenido y verdad histórica

La aplicación moderna no presenta automáticamente la información de 2022 como vigente en 2026.

El modelo diferencia:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- publicación `public` / `withheld`.

Arquitectura de contenido:

```text
fuentes históricas + hechos/editorial 2026 revisados
                         ↓
                 LandingContent
                         ↓
              localLandingContent
                         ↓
                    React UI
```

La identidad `El Núcleo / CINE` y su logo se conservan como históricos. El shell editorial que explica la reconstrucción es contenido actual verificado.

Los slots de proyectos actuales y canales actuales de contacto existen, pero permanecen vacíos y withheld porque no se inventaron operaciones, clientes, staff ni medios de contacto vigentes.

## Migración completada

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa original con contexto temporal explícito;
- **Servicios + Backstage** — datasets compartidos y composición moderna sin Bootstrap/autoplay;
- **Equipo + referencias** — conservados como archivo 2022, no como staff/clientes actuales;
- **Contacto** — contrato histórico documentado, sin reproducir el transporte inseguro `GET` + `action=""` y sin backend ficticio.

## Sistema visual y accesibilidad

La dirección 2026 es un archivo editorial / production contact sheet / control surface, no un template SaaS genérico.

Se calificó para:

- 360 / 768 / 1440 px;
- ausencia de overflow global;
- un H1 y landmarks semánticos;
- skip link como primer foco;
- `focus-visible`;
- `prefers-reduced-motion`;
- contraste de pares principales;
- media local con alt útil;
- lazy loading debajo del hero;
- Contacto sin controles que aparenten funcionar.

## Deployment final

Proveedor:

```text
Netlify
```

Origen productivo:

```text
https://el-nucleo-producciones.netlify.app/
```

Build:

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Publish directory:

```text
modern/dist
```

Antes del cutover, tanto Netlify como GitHub Pages servían el sitio histórico 2022. Después del merge de PR #32, un smoke contra **producción real** confirmó el cambio de autoridad 2022 → 2026.

El smoke productivo verificó:

- HTML moderno;
- JS/CSS/media;
- canonical / Open Graph / Twitter metadata;
- CSP;
- Permissions-Policy;
- Referrer-Policy;
- `X-Content-Type-Options`;
- frame denial;
- cache immutable para `/assets/*` fingerprinted;
- `robots.txt`;
- sitemap de una sola URL canónica;
- render React real en Chrome;
- secciones principales;
- ausencia de formulario vivo en Contacto.

## SEO productivo

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
sitemap:   https://el-nucleo-producciones.netlify.app/sitemap.xml
robots:    https://el-nucleo-producciones.netlify.app/robots.txt
```

El sitemap tiene una sola URL porque la aplicación es un documento con anchors semánticos, no una colección de rutas independientes.

## Seguridad de producción

`netlify.toml` versiona una CSP restrictiva basada en el runtime real:

- `default-src 'self'`;
- `object-src 'none'`;
- `frame-ancestors 'none'`;
- `form-action 'none'`;
- scripts/styles/connect desde `self`;
- imágenes desde `self`/`data:`;
- `upgrade-insecure-requests`.

También incluye Permissions-Policy, Referrer-Policy, `nosniff` y frame denial.

No se agregó analytics, CMS, admin, auth, third-party runtime scripts ni un formulario ficticio.

## Rollback

El cutover mantiene dos rutas de recuperación:

1. rollback desde el historial de deploys de Netlify;
2. revert normal del merge de cutover en Git, seguido por quality, redeploy y smoke.

No se requiere force-push ni reescritura de historia.

Baseline histórico permanente:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

## GitHub Pages y protección de `main`

GitHub Pages fue detectado como endpoint histórico antes del cutover y **no es autoridad SEO ni productiva del sitio moderno**.

La acción recomendada es despublicar Pages desde GitHub Settings en lugar de alterar el root histórico sólo para redireccionarlo.

Sobre gobernanza del repositorio:

- el endpoint de rulesets devuelve actualmente una lista vacía;
- el endpoint tradicional de branch protection devuelve `403 Resource not accessible by integration` para esta conexión;
- por lo tanto no se afirma falsamente que exista o no exista protección tradicional de `main`.

Estas dos tareas pertenecen a administración de GitHub Settings, no al runtime productivo ya calificado. Si el repositorio sigue activo, conviene exigir el workflow permanente de quality para `main` desde Settings.

## Hitos principales

- PR #28 — content platform;
- PR #30 — repository-wide audit/hardening;
- PR #31 — handoff documental pre-cutover;
- PR #32 — deployment authority + production cutover;
- cutover merge: `c3342e111ba4d7bbe88f04407c0510bfe0fcd1da`;
- quality post-cutover #154: success;
- production smoke: success.

## Documentación

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — retrospectiva y contratos finales;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — arquitectura de aplicación;
- [`docs/content-platform-2026.md`](docs/content-platform-2026.md) — truth/publication/provenance;
- [`docs/visual-system-2026.md`](docs/visual-system-2026.md) — sistema visual;
- [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md) — auditoría de ingeniería;
- [`docs/deployment-cutover-2026.md`](docs/deployment-cutover-2026.md) — deployment, smoke y rollback;
- [`docs/metadata-seo-2026.md`](docs/metadata-seo-2026.md) — metadata y SEO;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — trazabilidad de media;
- [`docs/accessibility-media-qualification-2026.md`](docs/accessibility-media-qualification-2026.md) — QA visual/accesibilidad/media.

## Principios que quedan como estándar

- preservar la historia del repositorio;
- no inventar claims para hacer más impresionante un portfolio;
- separar verdad de publicación;
- mantener provenance;
- una sola autoridad por dato compartido;
- generated output no es source authority;
- no relajar CI/supply-chain para obtener verde;
- no sumar dependencias sin problema concreto;
- no recolectar datos sin transporte y privacidad reales;
- validar deployment público, no sólo builds locales;
- documentar rollback antes de necesitarlo;
- mantener README y documentación general sincronizados con el estado real.

La modernización general de El Núcleo queda cerrada con la versión 2026 en producción y el sitio histórico preservado como parte explícita de la historia del proyecto.
