# El Núcleo — contrato de modernización 2026

## 1. Propósito

Modernizar el primer proyecto web histórico sin convertir el repositorio en una reescritura que borre su contexto de aprendizaje.

Baseline 2022 preservado: `6b23035cb6fffebbdd8ecd57c6752eae36f09b31`.

La modernización funciona como una migración por slices recuperables: cada bloque preserva la fuente histórica, define una autoridad moderna, pasa quality gate y QA relevante y recién después se integra a `main`.

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

La raíz histórica sigue preservada durante la transición; esta deuda no se “arregla” modificando el archivo 2022 sino reemplazando su autoridad en la app moderna.

## 4. Stack canónico 2026

- Node.js 24;
- pnpm 9.15.9 + lockfile;
- React 19;
- TypeScript 6;
- Vite 8;
- Sass moderno con `@use`;
- ESLint;
- Prettier;
- Vitest + Testing Library;
- GitHub Actions read-only con actions fijadas a SHAs inmutables.

Autoridad de runtime:

- `.nvmrc` → Node 24;
- `modern/package.json#engines` → `>=24 <25`;
- CI → `node-version-file: .nvmrc`.

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

### 🟡 Fase 6 — repository-wide engineering audit / hardening

Activa en #29.

Objetivos:

- eliminar deriva de runtime/documentación/CI;
- auditar supply-chain y dependencias;
- revisar TypeScript/lint sólo por defectos concretos;
- mapear tests a riesgo real;
- decidir si conviene un browser smoke permanente mínimo;
- auditar seguridad/privacy/performance;
- dejar explícitos pass/improve/defer/historical/cutover-blocked;
- entregar a #5 únicamente los bloqueos reales de deployment/cutover.

Matriz: `docs/repository-audit-2026.md`.

Primer hardening:

- `.nvmrc` 22 → 24;
- CI lee `.nvmrc`;
- `pnpm check` incorpora formato de README/docs;
- CI se dispara por README/docs/.nvmrc/.editorconfig/.gitignore;
- estado documental actualizado.

### ⏳ Fase 7 — deploy + cutover

Propiedad: #5.

Pendiente únicamente cuando #29 esté cerrado:

- elegir host/origen;
- confirmar `/` vs subpath;
- canonical/`og:url`/`og:image` reales;
- sitemap/robots si corresponde;
- headers/CSP según host real;
- artifact/source authority;
- post-deploy smoke;
- rollback al baseline 2022;
- decisión explícita sobre promover `modern/` a raíz.

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
- deployment-specific values no se inventan antes de seleccionar el origen real.

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
- responsive-image pipeline sin medición;
- canonical/URLs placeholder.

## 9. Definition of Done del cutover

La versión moderna reemplaza la raíz sólo cuando cumple en conjunto:

- instalación desde clone limpio;
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
- deploy y post-deploy smoke definidos;
- rollback documentado;
- README/documentación sincronizados con la implementación final.
