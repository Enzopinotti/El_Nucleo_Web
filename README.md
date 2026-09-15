# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. **El Núcleo CINE** nació en ese contexto como proyecto audiovisual experimental/en desarrollo y como entrega de Coderhouse; no se presenta hoy como una empresa audiovisual operativa ni como una historia comercial más madura de lo que realmente fue.

La reconstrucción de 2026 no intenta borrar ese origen. El objetivo es mostrar una evolución real de ingeniería: preservar el baseline histórico, reconstruir la experiencia por slices recuperables, validar cada cambio con pruebas y CI, separar explícitamente **archivo histórico**, **información verificada**, **contenido todavía no verificado** y **capacidades futuras**, y efectuar el reemplazo de autoridad únicamente mediante un cutover explícito y reversible.

## Estado actual

La reconstrucción funcional, visual, de contenido y de ingeniería ya está integrada en `main`.

Completado:

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
- 29/29 tests + production build;
- quality final de PR #30 y quality post-merge #132 verdes.

La **única fase activa** es ahora [#5 — Production deploy and controlled root cutover](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).

No queda una migración genérica pendiente. Lo que resta depende del deployment real: host/origen, base path, metadata absoluta, headers/CSP, smoke público, rollback y autoridad de la raíz después del cutover.

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
- pnpm 11.26.0 + lockfile reproducible
- React 19
- TypeScript 6.0.3
- Vite 8
- Sass con `@use`
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions con permisos mínimos y actions fijadas a SHAs inmutables

La autoridad de runtime/package manager está centralizada:

- `.nvmrc` define Node 24 y CI lo consume directamente;
- `modern/package.json#packageManager` define pnpm 11.26.0 y CI lo consume directamente;
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
5. 29 tests de comportamiento/contrato;
6. build de producción.

Los cambios en `modern/**`, `README.md`, `docs/**`, `.nvmrc`, `.editorconfig`, `.gitignore` y `.github/workflows/**` disparan el workflow permanente.

## Supply-chain y dependencias

La migración a pnpm 11 fue un cambio de seguridad, no sólo de versión.

`modern/pnpm-workspace.yaml` codifica:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- denegación explícita del build/install script de `@parcel/watcher`, porque entra de forma opcional por Sass y el producto califica sin ejecutar ese postinstall nativo.

Durante la migración, esta política detectó una versión transitiva de `brace-expansion` publicada hacía menos de 24 horas. La protección se mantuvo y el lockfile fue reconstruido bajo la política hasta seleccionar una resolución suficientemente madura.

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
- metadata honesta sin URLs de producción inventadas.

Los issues #10, #11, #12 y #22 están cerrados.

## Content platform readiness

Issue #26 / PR #28 están completos.

Arquitectura actual:

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

No se agregó un CMS, `/admin` ni una interfaz remota artificial. El frontend está preparado para una segunda fuente futura sin pagar hoy complejidad que todavía no existe.

## Auditoría pre-cutover completada

Issue #29 / PR #30 están completos.

Merge de hardening:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

La auditoría cerró o clasificó explícitamente:

- autoridad de repositorio y documentación;
- runtime/package manager;
- dependencias y supply-chain;
- CI/CD;
- TypeScript/lint/static analysis;
- tests y browser QA;
- seguridad/privacy;
- performance/media;
- accesibilidad;
- SEO/deployment;
- release/cutover/rollback;
- developer experience;
- governance del repositorio.

La matriz completa está en [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md).

El quality post-merge #132 pasó sobre el commit real de `main`, por lo que #29 está cerrado sin deuda transversal pendiente.

## Testing y browser QA

La suite contiene **29 tests en 3 archivos**:

- 6 tests de authority/truth/publication/provenance;
- 4 contratos del documento público;
- 19 tests de comportamiento visible.

No se agrega coverage nominal para inflar métricas. Los tests protegen contratos y riesgos reales.

Tampoco se mantiene una suite Playwright/screenshot permanente antes del deploy. Las grandes pasadas visuales ya fueron calificadas contra production build. El browser smoke de mayor valor debe ejecutarse sobre la **URL pública real**, dentro de #5.

## Media y provenance

Los assets promovidos viven dentro de la frontera moderna y mantienen trazabilidad hasta sus blobs históricos.

Baseline actual:

```text
11 archivos / 786.374 bytes (~768 KiB)
```

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

CSP y headers de producción pertenecen al carril #5 porque deben configurarse según el host real.

## Fase activa — deployment y cutover

El histórico root sigue siendo la baseline desplegable. Que `modern/` esté funcional, calificada y mantenible no significa que deba reemplazarse silenciosamente.

#5 debe resolver, en este orden:

1. host y origen público;
2. `/` vs subpath/base path;
3. canonical / `og:url` / `og:image` reales;
4. sitemap/robots según el deployment final;
5. CSP/security headers según el host;
6. artifact/source authority del deploy;
7. smoke contra la URL pública;
8. rollback al baseline 2022;
9. decisión explícita sobre mantener `modern/` como source location o promoverlo a raíz;
10. verificación directa de branch protection/ruleset en GitHub Settings.

La modernización general #1 se cierra únicamente cuando ese estado productivo esté probado y documentado.

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
- no reemplazar la raíz histórica fuera del carril de cutover;
- mantener el README general sincronizado con cada cambio de fase.

## Documentación principal

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad y arquitectura;
- [`docs/content-platform-2026.md`](docs/content-platform-2026.md) — truth/publication/provenance y frontera CMS;
- [`docs/visual-system-2026.md`](docs/visual-system-2026.md) — sistema visual;
- [`docs/repository-audit-2026.md`](docs/repository-audit-2026.md) — auditoría cerrada pre-cutover;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — media histórica promovida;
- [`docs/accessibility-media-qualification-2026.md`](docs/accessibility-media-qualification-2026.md) — browser/accessibility/media evidence;
- [`docs/metadata-seo-2026.md`](docs/metadata-seo-2026.md) — metadata y dependencias de deployment.

## Seguimiento

- roadmap general: [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1);
- estándares: [#6](https://github.com/Enzopinotti/El_Nucleo_Web/issues/6);
- auditoría completada: [#29](https://github.com/Enzopinotti/El_Nucleo_Web/issues/29);
- fase activa de deploy/cutover: [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).
