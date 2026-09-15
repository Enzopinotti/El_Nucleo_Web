# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. **El Núcleo CINE** nació en ese contexto como proyecto audiovisual experimental/en desarrollo y como entrega de Coderhouse; no se presenta hoy como una empresa audiovisual operativa ni como una historia comercial más madura de lo que realmente fue.

La reconstrucción de 2026 no intenta borrar ese origen. El objetivo es mostrar una evolución real de ingeniería: preservar el baseline histórico, reconstruir la experiencia por slices recuperables, validar cada cambio con pruebas y CI, separar explícitamente **archivo histórico**, **información verificada**, **contenido todavía no verificado** y **capacidades futuras**, y llegar al cutover únicamente cuando el repositorio completo esté calificado.

## Baseline histórico

El punto de referencia preservado es:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La implementación de 2022 incluye HTML multipágina, Sass/CSS, Bootstrap por CDN, Animate.css/AOS, Font Awesome remoto, responsive manual, Home, Nosotros, Servicios, Equipo, Contacto, galerías, fotografías y una identidad audiovisual propia.

Los archivos históricos siguen versionados y no se reescriben destructivamente durante la modernización.

## Stack moderno real

La aplicación nueva vive en [`modern/`](modern/) hasta el cutover controlado.

- Node.js 24
- pnpm 9.15.9 + lockfile reproducible
- React 19
- TypeScript 6
- Vite 8
- Sass con `@use`
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions con permisos mínimos y actions fijadas a SHAs inmutables

La autoridad de runtime se mantiene alineada entre `.nvmrc`, `modern/package.json` y CI.

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
5. tests;
6. build de producción.

## Estado real de la reconstrucción

La reconstrucción visual, de contenido y de autoridad de datos ya está integrada en `main`.

### ✅ Contenido histórico migrado

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa 2022 con límite explícito entre fuente histórica y vigencia actual;
- **Servicios + Backstage** — autoridad compartida y composición editorial sin Bootstrap/autoplay;
- **Equipo + referencias históricas** — nombres/fotos preservados como archivo, sin convertirlos en staff o clientes vigentes;
- **Contacto** — conserva el contrato histórico sin reproducir `GET` + `action=""`, sin backend inventado ni recolección falsa de datos.

### ✅ Sistema visual y calidad transversal

El sistema visual 2026 usa una dirección editorial de archivo/producción/control-surface y ya fue calificado para:

- 360 / 768 / 1440 px;
- cero overflow global;
- un H1 y landmarks correctos;
- skip-link como primer foco;
- `focus-visible`;
- `prefers-reduced-motion`;
- contraste de los pares principales;
- media local con alt útil y lazy loading debajo del hero;
- Contacto sin forms/controles operativos;
- metadata honesta sin URLs de producción inventadas.

Los issues transversales #10, #11, #12 y #22 están cerrados porque sus criterios quedaron cubiertos por implementación, tests, documentación y browser QA.

### ✅ Content platform readiness — #26 / PR #28

La aplicación ya tiene una autoridad tipada y provenance-aware:

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

La identidad histórica `El Núcleo / CINE` y su logo permanecen `historical`. El shell editorial de la reconstrucción —por ejemplo `Archivo 2022 · reconstrucción 2026`— es `verified-current`. Ambos tiempos no se mezclan bajo una misma etiqueta de verdad.

Los dominios de proyectos actuales y canales actuales de contacto existen en el contrato, pero permanecen vacíos, `unverified` y `withheld` mientras no exista evidencia real.

No se agregó un CMS, `/admin` ni una interfaz remota artificial: el frontend ya está preparado para una futura segunda fuente sin pagar hoy la complejidad de una operación que todavía no existe.

PR #28 fue mergeado en `main` y el quality post-merge quedó verde con **29/29 tests**.

### 🟡 Fase activa — #29 Repository-wide engineering audit

La fase actual ya no es una migración visual. Es una auditoría integral y pre-cutover contra los estándares definidos en #6.

El audit cubre:

- autoridad de repositorio y documentación;
- runtime/package manager;
- dependencias y supply-chain;
- CI/CD;
- TypeScript/lint/static analysis;
- tests y browser QA;
- seguridad/privacy;
- performance/media;
- regresiones de accesibilidad;
- SEO/deployment;
- release/cutover/rollback;
- developer experience.

La matriz versionada está en [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md).

La regla de la auditoría es **evidencia antes que tooling**. No se agregan Docker, Storybook, coverage thresholds, CMS, analytics, plugins de lint o pipelines de imágenes sólo para que el repositorio parezca más complejo.

## Primer hardening de #29

La primera pasada encontró deuda real y acotada:

- `.nvmrc` todavía declaraba Node 22 mientras package/CI/docs requerían Node 24;
- CI no se disparaba para cambios en README/docs/archivos de autoridad del repositorio;
- los READMEs y el contrato de modernización seguían narrando #22/#26 como si fueran carriles activos.

El hardening corrige esa deriva sin tocar el producto histórico:

- `.nvmrc` → Node 24;
- CI lee Node desde `.nvmrc`;
- `pnpm check` incorpora `docs:check`;
- el workflow cubre README/docs/.nvmrc/.editorconfig/.gitignore;
- documentación de estado sincronizada con `main`.

## Principios de la reconstrucción

- preservar la historia del repositorio;
- no inventar clientes, trabajos, roles, métricas ni actividad comercial actual;
- distinguir estado de verdad de estado de publicación;
- mantener provenance de cada asset histórico promovido;
- usar una sola autoridad por contenido compartido;
- evitar dependencias que no resuelvan un problema real;
- no habilitar formularios o integraciones que aparenten funcionar sin contrato real;
- no enviar datos personales por query string ni simular éxito sin entrega;
- trabajar en slices recuperables, con PR, quality gate y QA relevante;
- eliminar tooling temporal antes del merge;
- no elegir backend/CMS/auth por novedad;
- no reemplazar la raíz histórica durante una auditoría genérica;
- separar deuda de ingeniería de decisiones de despliegue/cutover.

## Media y provenance

Los assets promovidos viven dentro de la frontera moderna y mantienen trazabilidad hasta sus blobs históricos. El baseline actual es de **11 archivos / 786.374 bytes (~768 KiB)**.

No se genera WebP/AVIF o una pipeline responsive sólo para sumar tecnología. Los derivados se justifican con medición real de transferencia/LCP o con medios futuros materialmente más pesados.

Ver [`docs/asset-provenance.md`](docs/asset-provenance.md).

## Metadata y SEO

La metadata actual describe únicamente lo demostrable: proyecto audiovisual iniciado en 2022 + reconstrucción 2026.

Ya existen title/description/Open Graph/Twitter honestos. Permanecen deliberadamente diferidos hasta conocer el origen final:

- canonical;
- `og:url`;
- `og:image` absoluto;
- sitemap;
- robots;
- decisiones específicas de host/base path.

No se usarán dominios placeholder ni URLs temporales como autoridad SEO.

## Seguridad y privacidad

La aplicación moderna no introduce:

- scripts externos de runtime;
- analytics;
- CMS/admin/auth;
- transporte de Contacto;
- secretos de frontend;
- fake-success de formularios.

Los patrones inseguros o anticuados que existan en el HTML/CDN/formulario de 2022 son evidencia histórica y no se reescriben sólo para hacer parecer moderno el archivo.

CSP y headers de producción se definen en el carril de deploy cuando exista un host concreto.

## Documentación principal

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad y arquitectura;
- [`docs/content-platform-2026.md`](docs/content-platform-2026.md) — truth/publication/provenance y frontera CMS;
- [`docs/visual-system-2026.md`](docs/visual-system-2026.md) — sistema visual;
- [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md) — auditoría pre-cutover;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — media histórica promovida;
- [`docs/accessibility-media-qualification-2026.md`](docs/accessibility-media-qualification-2026.md) — browser/accessibility/media evidence;
- [`docs/metadata-seo-2026.md`](docs/metadata-seo-2026.md) — metadata y dependencias de deployment;
- documentos de migración por slice para Home, Nosotros, Servicios, Equipo y Contacto.

## Lo que sigue

El orden actual es:

1. completar #29 y mergear sólo hardening de alta confianza;
2. dejar explícito qué se **adopta**, qué se **rechaza por innecesario**, qué se **difiere** y qué es **histórico**;
3. actualizar #1 y #6 con el resultado definitivo de la auditoría;
4. entregar a #5 una lista formada únicamente por bloqueos reales de cutover;
5. elegir host/origen público;
6. resolver base path, canonical/social preview/sitemap/robots y headers según ese host;
7. documentar deploy + post-deploy smoke + rollback;
8. recién entonces decidir la promoción de la aplicación moderna a la raíz.

## Deploy y cutover

La raíz histórica sigue siendo la baseline desplegable. Que `modern/` esté funcional, calificada y mantenible no significa que deba reemplazarse silenciosamente.

El cutover es un cambio explícito y potencialmente destructivo de autoridad. Se ejecutará únicamente cuando host/origin, base path, metadata, build/deploy, post-deploy smoke y rollback estén definidos y verdes en conjunto.

La planificación general vive en [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1), los estándares en [#6](https://github.com/Enzopinotti/El_Nucleo_Web/issues/6), la auditoría en [#29](https://github.com/Enzopinotti/El_Nucleo_Web/issues/29) y el cutover en [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).
