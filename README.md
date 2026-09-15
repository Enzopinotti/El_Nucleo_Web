# El Núcleo — modernización 2026

Este repositorio conserva uno de mis primeros proyectos web públicos, realizado en 2022 mientras aprendía HTML, CSS y Sass. La versión original nació como una entrega de Coderhouse para una productora audiovisual ficticia/experimental llamada **El Núcleo CINE**.

La modernización de 2026 no intenta borrar ese origen. El objetivo es mostrar una evolución real de ingeniería: preservar el baseline histórico, reconstruir el producto por slices, validar cada cambio con pruebas y CI, y distinguir explícitamente el archivo de 2022 de cualquier afirmación actual.

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

## Estado de migración

La reconstrucción ya superó la etapa de foundation. Están mergeados y revalidados en `main`:

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa de 2022 con límites explícitos entre fuente histórica y vigencia actual;
- **Servicios + Backstage** — una sola autoridad para las categorías y una grilla editorial sin Bootstrap/autoplay.

**Equipo / referencias históricas** ya completó implementación y calificación en su carril: 16/16 tests, quality gate completo y browser QA real con Chrome 152 en 360 / 768 / 1440 px. Conserva los dos nombres/fotos de 2022 como archivo, sin transformarlos en un directorio de equipo vigente, y mantiene `Argentina Cultura` / `Grupo del Sud` sólo como etiquetas históricas de la página original, sin endorsements ni links actuales.

Después siguen:

1. Contacto, sin fake-success ni transporte inventado;
2. cierre cross-cutting de accesibilidad, metadata/SEO y performance;
3. cutover controlado con rollback documentado.

La planificación principal se sigue en [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1) y el cierre global en [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).

## Principios de la reconstrucción

- preservar la historia del repositorio;
- no inventar clientes, trabajos, roles, métricas ni actividad comercial actual;
- mantener provenance de cada asset histórico promovido;
- usar una sola fuente de verdad por contenido compartido;
- evitar dependencias sólo para replicar un efecto visual heredado;
- no habilitar formularios o integraciones que aparenten funcionar sin un contrato real;
- trabajar en slices recuperables, con Draft PR, quality gate y browser QA;
- eliminar tooling temporal de QA antes del merge;
- no reemplazar la raíz histórica hasta completar el cutover.

## Identidad preservada

La versión moderna conserva como archivo y referencia de diseño:

- **El Núcleo / CINE**;
- el verde histórico `#83d2b5`;
- la identidad audiovisual;
- Videoclips, Publicidad, Cortometrajes y Coberturas;
- material de Backstage;
- contenido institucional y de personas sólo con contexto histórico explícito.

## Documentación

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales de la migración;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad, arquitectura y cutover;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — origen exacto de media promovida;
- [`docs/home-migration-2026.md`](docs/home-migration-2026.md) — Home;
- [`docs/nosotros-migration-2026.md`](docs/nosotros-migration-2026.md) — Nosotros;
- [`docs/servicios-migration-2026.md`](docs/servicios-migration-2026.md) — Servicios + Backstage;
- [`docs/equipo-migration-2026.md`](docs/equipo-migration-2026.md) — Equipo y referencias históricas.

## Deploy y cutover

La raíz histórica sigue siendo la baseline desplegable. Que un slice moderno esté completo no implica que la nueva app haya reemplazado todavía el sitio original.

El cutover se hará únicamente cuando contenido, accesibilidad, metadata, responsive, browser QA, build y rollback estén documentados y verdes en conjunto.
