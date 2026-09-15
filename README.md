# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. **El Núcleo CINE** nació en ese contexto como proyecto audiovisual experimental/en desarrollo y como entrega de Coderhouse; no se presenta hoy como una empresa audiovisual operativa ni como una historia comercial más madura de lo que realmente fue.

La reconstrucción de 2026 no intenta borrar ese origen. El objetivo es mostrar una evolución real de ingeniería: preservar el baseline histórico, reconstruir la experiencia por slices recuperables, validar cada cambio con pruebas y CI, separar explícitamente **archivo histórico**, **información verificada**, **contenido todavía no verificado** y **capacidades futuras**, y efectuar el reemplazo de autoridad pública únicamente mediante un cutover explícito y reversible.

## Estado actual

La reconstrucción funcional, visual, de contenido y de ingeniería ya está completa. La única fase activa es [#5 — Production deploy and controlled root cutover](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5), implementada en el Draft PR #32.

Ya están completados:

- preservación del sitio 2022;
- foundation moderna;
- Home, Nosotros, Servicios, Backstage, Equipo y Contacto histórico;
- sistema visual 2026;
- accesibilidad, media/provenance y metadata baseline;
- content platform tipada y provenance-aware;
- auditoría completa de repositorio;
- Node/pnpm authority hardening;
- pnpm 11 supply-chain policy;
- documentación como código;
- deployment contract versionado para Netlify;
- CSP y headers de seguridad calificados en deploy preview;
- origen moderno de producción seleccionado;
- canonical, Open Graph, social image, `robots.txt` y sitemap alineados con ese origen;
- preview final ejecutado en Chrome bajo la CSP real.

El **cutover público todavía no se considera cerrado** hasta que PR #32 sea mergeado, Netlify despliegue `main`, el smoke contra la URL productiva confirme que la autoridad cambió de 2022 → 2026 y se verifiquen las opciones de protección/Pages en GitHub Settings.

## Baseline histórico

El punto de referencia preservado es:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La implementación de 2022 incluye HTML multipágina, Sass/CSS, Bootstrap por CDN, Animate.css/AOS, Font Awesome remoto, responsive manual, Home, Nosotros, Servicios, Equipo, Contacto, galerías, fotografías y una identidad audiovisual propia.

Los archivos históricos siguen versionados y **no se eliminan ni se reescriben para hacer el cutover**. El hosting moderno puede publicar `modern/dist` sin convertir el root histórico en source authority actual.

## Stack moderno real

La aplicación actual vive en [`modern/`](modern/).

- Node.js 24
- pnpm 11.26.0 + lockfile reproducible
- React 19
- TypeScript 6.0.3
- Vite 8
- Sass con `@use`
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions con permisos mínimos y actions fijadas a SHAs inmutables
- Netlify como deployment provider seleccionado para la versión moderna

La autoridad de runtime/package manager está centralizada:

- `.nvmrc` define Node 24 y CI/Netlify parten de esa autoridad;
- `modern/package.json#packageManager` define pnpm 11.26.0;
- `modern/package.json#engines` impide ejecutar el proyecto con una major de Node incompatible;
- ESLint falla si TypeScript sale del rango soportado por `typescript-eslint`.

## Quality contract

El contrato local y de CI es el mismo:

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` valida:

1. formato de la aplicación moderna;
2. formato del README raíz y `docs/**/*.md`;
3. lint sin warnings;
4. TypeScript;
5. tests de comportamiento/contrato;
6. build de producción.

La suite ahora incluye **30 contratos de Vitest en 3 archivos**: 6 de authority/truth/provenance, 5 del documento público/SEO y 19 de comportamiento visible.

Los cambios en `modern/**`, `README.md`, `docs/**`, `netlify.toml`, `.nvmrc`, `.editorconfig`, `.gitignore` y `.github/workflows/**` disparan el workflow permanente.

## Supply-chain y dependencias

La migración a pnpm 11 fue un cambio de seguridad, no sólo de versión.

`modern/pnpm-workspace.yaml` codifica:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- denegación explícita del build/install script de `@parcel/watcher`, porque entra de forma opcional por Sass y el producto califica sin ejecutar ese postinstall nativo.

Durante la migración, esta política detectó una versión transitiva de `brace-expansion` publicada hacía menos de 24 horas. La protección se mantuvo y el lockfile fue reconstruido bajo la policy hasta seleccionar una resolución suficientemente madura.

El graph final fue además auditado con evidencia one-shot:

- producción: sin findings `moderate` o superiores;
- árbol completo: sin findings `high` o superiores.

El advisory scan remoto no queda como gate permanente; frozen install + política de resolución/build scripts sí quedan versionados y reproducibles.

## Contenido histórico migrado

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa 2022 con límite explícito entre fuente histórica y vigencia actual;
- **Servicios + Backstage** — autoridad compartida y composición editorial sin Bootstrap/autoplay;
- **Equipo + referencias históricas** — nombres/fotos preservados como archivo, sin convertirlos en staff o clientes vigentes;
- **Contacto** — conserva el contrato histórico sin reproducir `GET` + `action=""`, sin backend inventado ni recolección falsa de datos.

## Sistema visual y calidad transversal

El sistema visual 2026 usa una dirección editorial de archivo/producción/control-surface y fue calificado para:

- 360 / 768 / 1440 px;
- cero overflow global;
- un H1 y landmarks correctos;
- skip-link como primer foco;
- `focus-visible`;
- `prefers-reduced-motion`;
- contraste de los pares principales;
- media local con alt útil y lazy loading debajo del hero;
- Contacto sin forms/controles operativos;
- metadata que distingue el archivo histórico de cualquier actividad actual.

Los issues #10, #11, #12 y #22 están cerrados.

## Content platform readiness

Issue #26 / PR #28 están completos.

```text
fuentes históricas 2022 + hechos/editorial 2026 revisados
                         ↓
                 LandingContent
                         ↓
              localLandingContent
                         ↓
                    React UI
```

El modelo distingue:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- publicación `public` / `withheld`.

La identidad histórica `El Núcleo / CINE` y su logo permanecen `historical`. El shell editorial de la reconstrucción es `verified-current`.

Los dominios de proyectos actuales y canales actuales de contacto existen en el contrato, pero permanecen vacíos, `unverified` y `withheld` mientras no exista evidencia real.

No se agregó un CMS, `/admin` ni una interfaz remota artificial.

## Auditoría pre-cutover completada

Issue #29 / PR #30 están completos.

Merge de hardening:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

El quality post-merge #132 pasó sobre el commit real de `main`. La matriz completa está en [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md).

El handoff documental posterior se integró en PR #31 y su quality post-merge #134 también quedó verde.

## Deployment 2026 — estado de #5

### Evidencia pública previa al cutover

El discovery realizado desde CI confirmó que existían dos endpoints públicos y que ambos servían todavía el documento histórico de 2022:

```text
https://el-nucleo-producciones.netlify.app/
→ HTTP 200
→ El núcleo | Producciones
→ histórico 2022

https://enzopinotti.github.io/El_Nucleo_Web/
→ HTTP 200
→ El núcleo | Producciones
→ histórico 2022
```

### Autoridad moderna seleccionada

La versión moderna usa como origen productivo:

```text
https://el-nucleo-producciones.netlify.app/
```

Netlify fue seleccionado porque ya estaba conectado al repositorio, ofrece deploy previews reales y permite versionar build, publish directory, headers y cache en `netlify.toml`.

La arquitectura de deploy elegida es:

```text
2022 root files → evidencia histórica preservada
modern/src      → source authority 2026
modern/dist     → artifact generado de deployment
netlify.toml    → autoridad de build/headers/cache de Netlify
```

No hace falta mover físicamente `modern/` a la raíz para publicar la versión actual.

### Build de Netlify

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Publish directory:

```text
modern/dist
```

El build usa Node desde `.nvmrc` y pnpm desde `packageManager`, manteniendo la policy supply-chain del repositorio.

### Preview calificado

PR #32 fue validado sobre:

```text
https://deploy-preview-32--el-nucleo-producciones.netlify.app/
```

El smoke público comprobó:

- documento moderno 2026;
- JS/CSS/media accesibles;
- CSP enforced compatible con React/Vite;
- Permissions-Policy, Referrer-Policy, `nosniff` y frame denial;
- cache immutable de assets fingerprinted;
- canonical/OG/Twitter apuntando al origen productivo seleccionado;
- `robots.txt`;
- sitemap de una única URL canónica;
- render real en Chrome;
- todas las secciones principales;
- Contacto sin formulario vivo.

## Metadata y SEO productivos

Al existir una autoridad productiva real, dejaron de estar `null`/diferidos:

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
sitemap:   https://el-nucleo-producciones.netlify.app/sitemap.xml
robots:    https://el-nucleo-producciones.netlify.app/robots.txt
```

El social image reutiliza el logo histórico ya calificado y propiedad del repositorio. No se fabricó una pieza 1200×630 sólo para cumplir un checklist.

Los anchors de la landing no aparecen como rutas falsas en el sitemap.

## Seguridad de producción

`netlify.toml` versiona una CSP restrictiva basada en el runtime real:

- recursos de runtime desde `self`;
- `object-src 'none'`;
- `frame-ancestors 'none'`;
- `form-action 'none'`;
- imágenes locales/data;
- sin orígenes externos para scripts/fonts/connect;
- `upgrade-insecure-requests`.

También versiona Permissions-Policy, Referrer-Policy, `X-Content-Type-Options` y frame denial.

No se agregó HSTS manual sobre el dominio `netlify.app`; esa política se reevalúa si se introduce un custom domain.

## GitHub Pages durante la transición

GitHub Pages sigue siendo un endpoint histórico mientras esté habilitado. **No es canonical ni autoridad moderna**.

Después de comprobar el cutover real en Netlify, el paso preferido es despublicar/deshabilitar Pages desde GitHub Settings en lugar de modificar el root histórico sólo para forzar una redirección.

Esa acción y la verificación de branch protection/rulesets requieren revisión directa de Settings porque el conector actual no tiene permisos suficientes para afirmar/modificar esos controles.

## Rollback

El cutover mantiene dos niveles de recuperación:

- rollback de deployment desde el historial de Netlify;
- revert del merge de cutover en Git, seguido de quality + redeploy + smoke.

El baseline histórico permanece disponible en:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Ver [`docs/deployment-cutover-2026.md`](docs/deployment-cutover-2026.md).

## Lo que falta para cerrar #5 y #1

1. terminar el quality limpio de PR #32;
2. retirar el workflow temporal de preview smoke;
3. mergear PR #32 sólo desde su HEAD calificado;
4. confirmar quality post-merge en `main`;
5. esperar/confirmar el deploy productivo de Netlify;
6. ejecutar el mismo smoke contra `https://el-nucleo-producciones.netlify.app/`;
7. documentar el SHA final y la evidencia de producción;
8. verificar/despublicar GitHub Pages desde Settings;
9. verificar branch protection/ruleset de `main` directamente en Settings;
10. actualizar nuevamente este README con el estado productivo final y cerrar #5/#1 si no queda deuda real.

## Principios de la reconstrucción

- preservar la historia del repositorio;
- no inventar clientes, trabajos, roles, métricas ni actividad comercial actual;
- distinguir estado de verdad de estado de publicación;
- mantener provenance de cada asset histórico promovido;
- usar una sola autoridad por contenido compartido;
- evitar dependencias que no resuelvan un problema real;
- no habilitar formularios o integraciones que aparenten funcionar sin contrato real;
- trabajar en slices recuperables, con PR, quality gate y QA relevante;
- eliminar tooling temporal antes del merge;
- no reemplazar la raíz histórica cuando el hosting puede publicar el artifact moderno sin destruirla;
- mantener el README general sincronizado con cada cambio de fase.

## Documentación principal

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad y arquitectura;
- [`docs/content-platform-2026.md`](docs/content-platform-2026.md) — truth/publication/provenance y frontera CMS;
- [`docs/visual-system-2026.md`](docs/visual-system-2026.md) — sistema visual;
- [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md) — auditoría cerrada pre-cutover;
- [`docs/deployment-cutover-2026.md`](docs/deployment-cutover-2026.md) — deployment, smoke y rollback;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — media histórica promovida;
- [`docs/accessibility-media-qualification-2026.md`](docs/accessibility-media-qualification-2026.md) — browser/accessibility/media evidence;
- [`docs/metadata-seo-2026.md`](docs/metadata-seo-2026.md) — metadata y autoridad SEO productiva.

## Seguimiento

- roadmap general: [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1);
- estándares: [#6](https://github.com/Enzopinotti/El_Nucleo_Web/issues/6);
- auditoría completada: [#29](https://github.com/Enzopinotti/El_Nucleo_Web/issues/29);
- fase activa de deploy/cutover: [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).
