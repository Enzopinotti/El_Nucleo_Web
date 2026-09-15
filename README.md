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

La foundation y cuatro slices de contenido están **mergeados y revalidados en `main`**:

- **Home** — identidad, hero y archivo de las cuatro categorías históricas;
- **Nosotros** — narrativa de 2022 con límites explícitos entre fuente histórica y vigencia actual;
- **Servicios + Backstage** — una sola autoridad para las categorías y una grilla editorial sin Bootstrap/autoplay;
- **Equipo + referencias históricas** — nombres/fotos preservados como archivo, sin convertirlos en staff o clientes vigentes. Cerró con 16/16 tests y browser QA real en 360 / 768 / 1440 px.

El slice activo es **Contacto**. El HTML de 2022 tenía `action=""` y `method="get"`, por lo que no existe un backend de entrega que deba fingirse como funcionalidad moderna. La reconstrucción conserva qué datos pedía la fuente —Nombre, Apellido, Correo, newsletter y Consulta— pero no renderiza un formulario operativo ni recopila/transmite datos personales hasta que exista un canal real con privacidad, anti-spam y estados de entrega verificables.

Después siguen:

1. cierre cross-cutting de accesibilidad, metadata/SEO y performance;
2. verificación de deploy/base path, links y rollback;
3. cutover controlado de la raíz histórica a la app moderna.

La planificación principal se sigue en [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1) y el cierre global en [#5](https://github.com/Enzopinotti/El_Nucleo_Web/issues/5).

## Principios de la reconstrucción

- preservar la historia del repositorio;
- no inventar clientes, trabajos, roles, métricas ni actividad comercial actual;
- mantener provenance de cada asset histórico promovido;
- usar una sola fuente de verdad por contenido compartido;
- evitar dependencias sólo para replicar un efecto visual heredado;
- no habilitar formularios o integraciones que aparenten funcionar sin un contrato real;
- no enviar datos personales por query string ni simular éxito sin entrega;
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
- contenido institucional y de personas sólo con contexto histórico explícito;
- el contrato visible del Contacto 2022, sin reproducir su transporte inseguro/no funcional.

## Documentación

- [`docs/modernization-2026.md`](docs/modernization-2026.md) — contrato y fases reales de la migración;
- [`docs/modern-app-architecture.md`](docs/modern-app-architecture.md) — autoridad, arquitectura y cutover;
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — origen exacto de media promovida;
- [`docs/home-migration-2026.md`](docs/home-migration-2026.md) — Home;
- [`docs/nosotros-migration-2026.md`](docs/nosotros-migration-2026.md) — Nosotros;
- [`docs/servicios-migration-2026.md`](docs/servicios-migration-2026.md) — Servicios + Backstage;
- [`docs/equipo-migration-2026.md`](docs/equipo-migration-2026.md) — Equipo y referencias históricas;
- [`docs/contacto-migration-2026.md`](docs/contacto-migration-2026.md) — Contacto, privacidad y límite de transporte.

## Deploy y cutover

La raíz histórica sigue siendo la baseline desplegable. Que un slice moderno esté completo no implica que la nueva app haya reemplazado todavía el sitio original.

El cutover se hará únicamente cuando contenido, accesibilidad, metadata, responsive, browser QA, build, deployment path y rollback estén documentados y verdes en conjunto.
