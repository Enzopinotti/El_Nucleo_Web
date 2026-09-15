# El Núcleo — contrato de modernización 2026

## 1. Propósito

Modernizar el primer proyecto web histórico sin convertir el repositorio en una reescritura que borre su contexto de aprendizaje.

Baseline 2022 preservado:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La modernización funciona como una migración por slices recuperables: cada bloque preserva la fuente histórica, define una autoridad moderna, pasa quality gate y QA relevante y recién después se integra a `main`.

Después de PR #30, toda la migración y auditoría pre-cutover está completa. La única fase activa es ahora el deployment y cutover controlado de #5.

## 2. Producto histórico inventariado

### Navegación original

- Inicio
- Nosotros
- Servicios
- Equipo
- Contacto

### Contenido original

**Inicio**

- identidad El Núcleo / CINE;
- cuatro carruseles de categorías audiovisuales;
- logo e identidad visual propia.

**Nosotros**

- definición del proyecto como colectivo emprendedor audiovisual/publicitario;
- visión y aspiraciones artísticas/sociales.

**Servicios**

- Videoclips;
- Publicidad;
- Cortometrajes;
- Coberturas;
- galería Backstage.

**Equipo / referencias**

- dos personas identificadas por nombre y fotografía;
- enlaces personales de 2022;
- dos referencias bajo `Clientes Habituales`.

**Contacto**

- nombre, apellido, correo, newsletter y consulta;
- consulta limitada a 400 caracteres;
- `action=""`, `method="get"`, `enctype="text/plain"`;
- promesa visual de contacto posterior sin backend verificable en el repositorio.

## 3. Deuda histórica reemplazada o contenida

- Bootstrap, Animate.css, AOS, Google Fonts y Font Awesome cargados por CDN;
- markup repetido entre documentos HTML;
- elementos no estándar como `aside1` / `aside2`;
- estilos inline y dimensiones rígidas;
- navegación/footer duplicados;
- CSS compilado versionado junto al Sass fuente;
- formulario sin transporte verificable y con GET para datos personales;
- metadata/SEO antigua;
- ausencia de package contract, tests, lint, typecheck, build y CI reproducible.

La raíz histórica sigue preservada durante la transición. Esta deuda no se “arregla” modificando el archivo 2022 sino reemplazando su autoridad mediante la app moderna y, finalmente, un cutover explícito.

## 4. Stack canónico 2026

- Node.js 24;
- pnpm 11.26.0 + lockfile reproducible;
- React 19;
- TypeScript 6.0.3;
- Vite 8;
- Sass moderno con `@use`;
- ESLint;
- Prettier;
- Vitest + Testing Library;
- GitHub Actions read-only con actions fijadas a SHAs inmutables.

### Autoridad de runtime/package manager

- `.nvmrc` → Node 24;
- `modern/package.json#engines` → `>=24 <25`;
- `modern/package.json#packageManager` → pnpm 11.26.0;
- CI lee `.nvmrc` y `packageManager` directamente en lugar de duplicar esas versiones;
- ESLint falla ante una versión de TypeScript fuera del rango soportado por `typescript-eslint`.

### Política de instalación y supply-chain

`modern/pnpm-workspace.yaml` versiona la política de instalación:

- antigüedad mínima de publicación: 24 horas;
- enforcement estricto también para transitivas;
- bloqueo de subdependencias exóticas;
- scripts de build/install no se habilitan por confianza implícita;
- `@parcel/watcher`, dependencia opcional de Sass, queda explícitamente denegada porque la aplicación compila y prueba correctamente sin su postinstall nativo.

La migración a pnpm 11 detectó una versión transitiva de `brace-expansion` publicada hacía menos de 24 horas. La protección no se relajó: el lockfile se reconstruyó bajo la nueva policy y luego pasó el quality contract.

Contrato de validación:

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` = modern format → repository docs format → lint → typecheck → test → production build.

## 5. Decisiones de arquitectura ya tomadas

### Navegación

La experiencia moderna es editorial y de una sola página con anchors semánticos. No se agregó React Router sólo para imitar los cinco HTML históricos.

### Contenido histórico vs. presente

Cada claim heredado conserva contexto. “Servicios”, “equipo” o “clientes” de 2022 no se transforman automáticamente en inventario comercial, staff o relaciones vigentes en 2026.

### Autoridad de contenido

La aplicación ya no depende de decisiones de contenido dispersas en JSX.

```text
historical sources + reviewed 2026 editorial facts
                    ↓
             LandingContent
                    ↓
          localLandingContent
                    ↓
               React UI
```

La autoridad distingue verdad (`historical`, `verified-current`, `unverified`, `draft`) de publicación (`public`, `withheld`).

La identidad histórica y el shell editorial 2026 viven en dominios diferentes para no mezclar tiempos bajo una misma etiqueta.

### Media

Sólo se promueven assets realmente usados. Cada copia moderna conserva path + blob SHA de origen. Hotlinks remotos no se convierten en dependencias esenciales.

### Contacto / datos personales

El formulario histórico no tiene un destino verificable y usa GET. La aplicación moderna no reproduce ese transporte, no inventa un endpoint y no simula éxito.

Un futuro formulario operativo requiere destino real, privacidad, validación, anti-spam y estados de entrega verificables.

### Evolución visual

La identidad histórica es fuente, no una obligación de pixel-copy.

- `index.html`, `views/`, `scss/`, `css/` y assets originales permanecen como evidencia;
- `modern/src/styles/` es la autoridad 2026;
- `El Núcleo / CINE`, `#83d2b5` y el carácter audiovisual son anclas trazables;
- tipografía, spacing, grids, superficies, navegación, estados y motion evolucionan con accesibilidad;
- originales no se sobrescriben;
- no se reintroducen dependencias heredadas por nostalgia;
- `prefers-reduced-motion`, contraste, foco, legibilidad y responsive son invariantes.

### Deploy

La raíz histórica sigue siendo la baseline desplegable hasta el cutover controlado.

## 6. Fases y estado real

### ✅ Fase 1 — preservation / foundation

- baseline documentado;
- contratos de autoridad/rollback;
- runtime y package manager definidos;
- historial original preservado.

### ✅ Fase 2 — scaffold moderno

- `modern/` aislado;
- React + TypeScript + Vite + Sass;
- lockfile reproducible;
- lint / format / typecheck / test / build;
- CI permanente con permisos mínimos;
- baseline de accesibilidad y metadata.

### ✅ Fase 3 — migración de contenido histórico

Completados y mergeados:

- Home;
- Nosotros;
- Servicios + Backstage;
- Equipo / referencias;
- Contacto.

Cada slice mantiene truth/provenance boundaries y fue validado con tests + build + QA relevante.

### ✅ Fase 4 — sistema visual y cierre transversal

Completados:

- tokens y ritmo compartido;
- shell/header/navegación responsive;
- composición editorial coherente;
- foco/reduced-motion/contraste;
- media local/lazy con provenance;
- metadata honesta;
- browser QA integrada 360/768/1440.

Issues cerrados: #10, #11, #12 y #22.

### ✅ Fase 5 — content platform readiness

Completada en #26 / PR #28:

- contrato `LandingContent`;
- `localLandingContent` como autoridad provenance-aware;
- verdad y publicación explícitas;
- identidad histórica separada del shell editorial 2026;
- slots futuros de proyectos/contacto actuales vacíos y withheld;
- documentación de semántica futura de provider/CMS;
- sin CMS/admin/provider remoto especulativo;
- 29/29 tests + quality + browser QA;
- post-merge quality verde.

### ✅ Fase 6 — repository-wide engineering audit / hardening

Completada en #29 / PR #30.

Hallazgos resueltos o calificados:

- `.nvmrc` 22 → 24;
- CI consume `.nvmrc`;
- pnpm 9 → pnpm 11.26.0;
- CI consume `packageManager`;
- lockfile re-resuelto bajo política de antigüedad mínima y scripts explícitos;
- `pnpm check` incorpora formato de README/docs;
- CI se dispara por README/docs/.nvmrc/.editorconfig/.gitignore/workflows;
- Markdown histórico normalizado con el Prettier real del repo;
- TypeScript 6.0.3 se mantiene por compatibilidad oficial del parser/linter;
- ESLint falla ante una versión de TypeScript fuera del rango soportado;
- los 29 tests fueron auditados contra riesgo real y no justifican coverage nominal;
- audit one-shot del graph congelado sin findings `moderate+` en producción ni `high+` en el árbol completo;
- no se encontraron secretos/env contracts modernos ni scripts externos de runtime;
- E2E/screenshot permanente diferido porque el smoke de mayor valor debe validar la URL real de producción;
- governance, LICENSE, SECURITY, CONTRIBUTING y dependency-update bots fueron evaluados y no fabricados por apariencia.

Merge de hardening:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

Post-merge Modern app quality #132: **success**.

Matriz completa: `docs/repository-audit-2026.md`.

### 🟡 Fase 7 — production deploy + controlled cutover

Propiedad: #5.

Esta es la única fase activa.

Debe resolver:

1. host/origen público real;
2. `/` vs subpath/base path;
3. canonical/`og:url`/`og:image` reales;
4. sitemap/robots según el deployment final;
5. CSP/security headers según el host elegido;
6. artifact/source authority;
7. post-deploy smoke sobre la URL pública;
8. rollback al baseline 2022;
9. decisión explícita sobre mantener `modern/` como source location o promoverlo a raíz;
10. branch protection/ruleset de `main` verificado directamente en GitHub Settings.

No queda una fase genérica de modernización entre #29 y #5.

## 7. Invariantes

- no inventar clientes, trabajos, cargos, métricas ni información comercial;
- no borrar historia de Git;
- no mega-PR;
- no backend/CMS/IA sin necesidad real;
- no recopilar datos personales sin transporte y privacidad definidos;
- no fake-success;
- no sobrescribir assets/SCSS/HTML históricos para hacer parecer moderna la fuente 2022;
- generated output nunca es autoridad manual;
- CI no se relaja para hacer pasar código;
- third-party actions fijadas a commits inmutables;
- provenance obligatorio para media promovida;
- tooling temporal de QA se elimina antes del merge;
- cada slice debe quedar recuperable y documentado;
- documentación de estado no puede quedar una fase detrás de la implementación;
- deployment-specific values no se inventan antes de seleccionar el origen real;
- una dependencia recién publicada o un script de instalación no obtiene confianza automática sólo porque resuelva el semver;
- el README general se actualiza siempre que cambia la fase activa.

## 8. Non-adoptions deliberadas

Mientras no exista necesidad concreta, esta modernización no agrega por apariencia:

- Docker;
- monorepo/task runner;
- Storybook;
- UI framework;
- analytics;
- CMS/admin/auth;
- coverage threshold nominal;
- screenshot regression infrastructure;
- Playwright/E2E permanente antes de existir una URL de producción que valga la pena smoke-testear;
- responsive-image pipeline sin medición;
- canonical/URLs placeholder.

## 9. Definition of Done del cutover

La versión moderna reemplaza o supersede la autoridad histórica sólo cuando cumple en conjunto:

- instalación desde clone limpio bajo la policy de pnpm;
- runtime/package manager coherentes;
- lockfile consistente;
- format/lint/typecheck/tests/build verdes;
- CI verde en `main`;
- navegación usable por teclado;
- focus visible y reduced motion;
- layout sin overflow en anchos representativos;
- identidad histórica trazable;
- media/provenance controlados;
- sin secretos ni endpoints privados;
- claims históricos con contexto verificable;
- metadata/origin reales;
- Contacto sin comportamiento ficticio ni fuga por query string;
- host-specific CSP/security policy definida;
- deploy y post-deploy smoke verdes;
- rollback documentado y ejecutable;
- source/artifact authority explícita;
- branch protection/ruleset verificado;
- README/documentación sincronizados con la implementación final;
- #1 puede cerrarse de forma honesta como modernización completada.
