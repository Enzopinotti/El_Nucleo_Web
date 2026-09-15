# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. **El Núcleo CINE** nació en ese contexto como proyecto audiovisual experimental/en desarrollo y como entrega de Coderhouse; no se presenta hoy como una empresa audiovisual operativa ni como una historia comercial más madura de lo que realmente fue.

La reconstrucción de 2026 no intenta borrar ese origen. El objetivo es mostrar una evolución real de ingeniería: preservar el baseline histórico, reconstruir la experiencia por slices recuperables, validar cada cambio con pruebas y CI, y separar explícitamente **archivo histórico**, **información verificada**, **contenido todavía no verificado** y **capacidades futuras**.

## Baseline histórico

El punto de referencia preservado es:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La implementación de 2022 incluye HTML multipágina, Sass/CSS, Bootstrap por CDN, Animate.css/AOS, Font Awesome remoto, responsive manual, Home, Nosotros, Servicios, Equipo, Contacto, galerías, fotografías y una identidad audiovisual propia.

Los archivos históricos siguen versionados y no se reescriben destructivamente durante la migración.

## Stack moderno real

La aplicación nueva vive en [`modern/`](modern/) mientras se completa la transición.

- Node.js 24
- pnpm 9.15.9 + lockfile reproducible
- React 19
- TypeScript 6
- Vite 8
- Sass con `@use`
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions con permisos mínimos y actions fijadas a SHAs inmutables

El contrato local y de CI es el mismo:

```bash
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` ejecuta formato, lint, typecheck, tests y build de producción.

## Estado de la reconstrucción

La foundation, el shell visual, **todos los slices históricos de contenido** y el cierre transversal de calidad ya están integrados y revalidados en `main`:

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa de 2022 con límites explícitos entre fuente histórica y vigencia actual;
- **Servicios + Backstage** — una sola autoridad para las categorías y una composición editorial sin Bootstrap/autoplay;
- **Equipo + referencias históricas** — nombres/fotos preservados como archivo, sin convertirlos en staff o clientes vigentes;
- **Contacto** — conserva el contrato histórico de campos sin reproducir `GET` + `action=""`, sin backend inventado ni recolección falsa de datos;
- **sistema visual 2026** — tokens, shell, navegación responsive, hero y composiciones históricas bajo un único lenguaje editorial/archivo/control-surface;
- **calidad cross-cutting** — metadata honesta, navegación/landmarks, media local/lazy, contraste, reduced-motion, skip-link y límites de Contacto protegidos por tests y browser QA.

La fase activa es **Content platform readiness (#26)**. El primer slice ya implementa en el Draft PR #28 una autoridad de contenido tipada y provenance-aware:

```text
fuentes históricas 2022 + hechos/editorial 2026 revisados
                         ↓
                 LandingContent
                         ↓
              localLandingContent
                         ↓
                    React UI
```

La autoridad distingue explícitamente:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`;
- publicación `public` o `withheld`.

La identidad histórica `El Núcleo / CINE` y su logo viven en un dominio `historical`. El copy editorial de la reconstrucción —por ejemplo `Archivo 2022 · reconstrucción 2026`— vive en un dominio `verified-current`; no se mezclan ambos tiempos bajo una misma etiqueta de verdad.

Los dominios futuros de **proyectos actuales** y **canales actuales de contacto** existen en el contrato pero permanecen deliberadamente vacíos, `unverified` y `withheld`. No se fabrica contenido sólo para llenar la landing.

El quality gate de este slice pasa **29/29 tests**, Prettier, ESLint, TypeScript y build de producción. El browser QA del build de producción se vuelve a ejecutar antes del merge porque el refactor mueve autoridad sin estar autorizado a cambiar el comportamiento visual ya aprobado.

## Objetivo de producto 2026

El Núcleo no debe quedar como “un sitio viejo prolijamente restaurado”. La meta es que tenga la **misma clase de capacidades** que una landing moderna de los proyectos actuales: mantenibilidad, mobile sólido, contenido estructurado, media administrable, SEO/metadata, accesibilidad, calidad reproducible, despliegue controlado y posibilidad futura de edición de contenido.

Eso no significa copiar la arquitectura de otro proyecto ni agregar un CMS por decoración. La regla es:

> **CMS-ready ahora; CMS sólo cuando exista una operación real de contenido que lo justifique.**

La capa implementada en #26 desacopla contenido de presentación y deja una frontera limpia para una futura fuente remota o `/admin` sin obligar al frontend a reescribirse. No agrega todavía una interfaz `ContentProvider` artificial porque hoy sólo existe una fuente real: la autoridad local. Esa abstracción se incorpora cuando exista un segundo proveedor real o semántica asíncrona que justificar.

Cuando se obtenga nueva información de las personas que participaron originalmente, debe ingresar como contenido revisado —con fuente, contexto temporal, permiso/provenance de media y estado de publicación— y no como cambios ad-hoc dispersos en JSX.

## Principios de la reconstrucción

- preservar la historia del repositorio;
- no inventar clientes, trabajos, roles, métricas ni actividad comercial actual;
- distinguir `historical`, `verified-current`, `unverified` y `draft` cuando una afirmación lo requiera;
- separar estado de verdad de estado de publicación;
- mantener provenance de cada asset histórico promovido;
- usar una sola fuente de verdad por contenido compartido;
- evitar dependencias sólo para replicar un efecto visual heredado;
- no habilitar formularios o integraciones que aparenten funcionar sin un contrato real;
- no enviar datos personales por query string ni simular éxito sin entrega;
- trabajar en slices recuperables, con Draft PR, quality gate y browser QA;
- eliminar tooling temporal de QA antes del merge;
- no elegir backend/CMS/auth por novedad: la implementación futura debe responder al flujo editorial real;
- no reemplazar la raíz histórica hasta completar el cutover.

## Evolución visual sin borrar 2022

La identidad histórica es **fuente**, no una cárcel visual y tampoco material descartable.

Se preservan como evidencia:

- la raíz HTML/SCSS/CSS de 2022;
- los assets históricos originales;
- la marca `El Núcleo / CINE`;
- el verde histórico `#83d2b5`;
- las fotografías y categorías con provenance documentado;
- el contexto de proyecto de aprendizaje.

La capa 2026 puede evolucionar composición, escala tipográfica, espaciado, grid, navegación, estados, motion, responsive y accesibilidad. Esa evolución ocurre exclusivamente en `modern/` y debe cumplir estas reglas:

- los originales nunca se sobrescriben para “mejorarlos”;
- los colores históricos pueden convertirse en tokens y expandirse con una paleta moderna, manteniendo trazabilidad;
- derivados de imágenes sólo se crean con proceso reproducible y necesidad medida;
- ningún efecto visual justifica reintroducir dependencias pesadas o CDN heredados;
- motion debe degradar correctamente con `prefers-reduced-motion`;
- contraste, foco, legibilidad y responsive tienen prioridad sobre fidelidad decorativa;
- cambios visuales importantes requieren browser QA y comparación con el contrato histórico, no pixel-copy del sitio 2022.

El objetivo es que se vea claramente **más maduro en 2026** y, al mismo tiempo, siga siendo reconocible como la evolución del proyecto original.

La autoridad visual está documentada en [`docs/visual-system-2026.md`](docs/visual-system-2026.md).

## Metadata y media

La metadata describe únicamente lo que el repositorio puede probar hoy: un proyecto audiovisual iniciado en 2022 y su reconstrucción 2026. No se publican URLs canónicas, `og:url`, `og:image`, sitemap ni decisiones de robots hasta conocer el origen de producción definitivo.

El contrato de contenido ya representa esos inputs SEO, pero `modern/index.html` sigue siendo la autoridad runtime inicial para crawlers mientras no exista una necesidad real de generar metadata desde una pipeline de contenido/build.

Los assets promovidos viven dentro de la frontera de la app moderna, mantienen trazabilidad hasta sus blobs históricos y no dependen de hotlinks esenciales. La política de optimización es medida: WebP/AVIF o derivados responsive se agregan cuando exista evidencia de transferencia/LCP o nuevos medios que lo justifiquen, no para sumar tecnología nominalmente.

## Documentación

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales de la migración;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad, arquitectura, content-platform boundary y cutover;
- [`docs/content-platform-2026.md`](docs/content-platform-2026.md) — contrato tipado, verdad/publicación, provenance, data intake y frontera CMS/provider;
- [`docs/visual-system-2026.md`](docs/visual-system-2026.md) — identidad, tokens, límites históricos y estrategia visual 2026;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — origen exacto, baseline y política de media promovida;
- [`docs/accessibility-media-qualification-2026.md`](docs/accessibility-media-qualification-2026.md) — invariantes de accesibilidad, media, contraste y browser QA;
- [`docs/metadata-seo-2026.md`](docs/metadata-seo-2026.md) — autoridad SEO/social actual y campos deliberadamente diferidos;
- [`docs/home-migration-2026.md`](docs/home-migration-2026.md) — Home;
- [`docs/nosotros-migration-2026.md`](docs/nosotros-migration-2026.md) — Nosotros;
- [`docs/servicios-migration-2026.md`](docs/servicios-migration-2026.md) — Servicios + Backstage;
- [`docs/equipo-migration-2026.md`](docs/equipo-migration-2026.md) — Equipo y referencias históricas;
- [`docs/contacto-migration-2026.md`](docs/contacto-migration-2026.md) — Contacto, privacidad y límite de transporte.

## Lo que sigue

El orden de cierre es deliberado:

1. terminar #26 con browser QA, documentación final, merge controlado y post-merge green;
2. cerrar administrativamente los issues cross-cutting que ya estén realmente satisfechos, sin cerrar #6 mientras quede una auditoría de ingeniería pendiente;
3. ejecutar una **auditoría completa del repositorio**: arquitectura, dependencias/supply-chain, seguridad/privacy, CI/CD, tests, accesibilidad, performance/media, SEO, provenance, deployment/release/cutover y experiencia de contribución;
4. reutilizar issues existentes y crear nuevos sólo para deuda real encontrada;
5. preparar **Deploy + cutover**: elegir origen público, verificar base path/assets, completar canonical/social preview/sitemap/robots según ese origen, documentar rollback y sólo entonces decidir el reemplazo de la raíz histórica.

La planificación principal se sigue en [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1) y el cutover global en [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).

## Deploy y cutover

La raíz histórica sigue siendo la baseline desplegable. Que la aplicación moderna esté completa y validada como producto no implica que haya reemplazado todavía el sitio original.

El cutover se hará únicamente cuando contenido, accesibilidad, identidad visual, metadata, responsive, browser QA, build, deployment path y rollback estén documentados y verdes en conjunto. La URL pública definitiva también será la autoridad para canonical, Open Graph absoluto, sitemap y decisiones de robots.
