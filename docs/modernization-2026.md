# El Núcleo — contrato de modernización 2026

## 1. Propósito

Modernizar el primer proyecto web histórico sin convertir el repositorio en una reescritura que borre su contexto de aprendizaje.

Baseline 2022 preservado: `6b23035cb6fffebbdd8ecd57c6752eae36f09b31`.

La modernización funciona como una migración por slices: cada bloque preserva la fuente histórica, define una autoridad moderna, pasa quality gate y browser QA y recién después se integra a `main`.

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
- dos referencias bajo el encabezado `Clientes Habituales`.

**Contacto**
- nombre, apellido, correo, newsletter y consulta;
- `action=""`: no existía backend real de envío que deba preservarse como funcionalidad.

## 3. Deuda histórica reemplazada o contenida

- Bootstrap, Animate.css, AOS, Google Fonts y Font Awesome cargados por CDN;
- markup repetido entre documentos HTML;
- elementos no estándar como `aside1` / `aside2`;
- estilos inline y dimensiones rígidas;
- navegación/footer duplicados;
- media queries históricas concentradas en un parcial grande;
- CSS compilado versionado junto al Sass fuente;
- formulario sin transporte;
- metadata/SEO antigua;
- ausencia de package contract, tests, lint, typecheck, build y CI reproducible.

La raíz histórica sigue preservada durante la transición; la deuda no se “arregla” modificando el archivo de 2022 sino reemplazando su autoridad en la app moderna.

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

Contrato de validación:

```bash
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` = format → lint → typecheck → test → production build.

## 5. Decisiones de arquitectura ya tomadas

### Navegación

La experiencia moderna actual es editorial y de una sola página con anchors semánticos. No se agregó React Router sólo para imitar los cinco HTML históricos.

La decisión puede revisarse únicamente si una necesidad real de rutas/SEO/deep-linking lo justifica.

### Contenido histórico vs. presente

Cada claim heredado debe indicar su contexto. “Servicios”, “equipo” o “clientes” de 2022 no se transforman automáticamente en inventario comercial, staff o relaciones vigentes en 2026.

### Media

Sólo se promueven assets realmente usados por un slice. Cada copia moderna conserva path + blob SHA de origen. Hotlinks remotos no se convierten en dependencias esenciales.

### Formulario

Contacto no se presenta como operativo hasta elegir un destino real. No habrá fake-success ni backend agregado sólo para exhibir tecnología.

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

### ✅ Fase 3A — Home

- identidad preservada;
- hero;
- una sola galería accesible para las cuatro categorías;
- provenance;
- browser QA y post-merge validation.

### ✅ Fase 3B — Nosotros

- narrativa histórica tipada;
- truth boundary explícito;
- no conversión de aspiraciones de 2022 en hechos actuales;
- browser QA y post-merge validation.

### ✅ Fase 3C — Servicios + Backstage

- una sola autoridad `historicalServices` compartida;
- Backstage como grilla editorial sin autoplay;
- cuatro assets promovidos byte-for-byte;
- 12/12 tests y browser QA 360/768/1440;
- post-merge validation.

### 🟡 Fase 4A — Equipo / referencias

- dos personas preservadas como etiquetas/fotos del archivo 2022;
- sin roles inventados ni vigencia 2026 asumida;
- referencias `Argentina Cultura` y `Grupo del Sud` tratadas como etiquetas históricas, no endorsements actuales;
- Instagram personales y hotlink remoto excluidos;
- quality/browser QA requeridos antes del merge.

### ⏳ Fase 4B — Contacto

- decidir si la versión pública necesita un canal real de contacto;
- si hay formulario, transporte, validación, privacidad, spam, loading/error/success deben ser reales;
- si no hay transporte, usar CTA/contacto explícito sin simular submit.

### ⏳ Fase 5 — cierre cross-cutting + cutover

- accesibilidad final;
- metadata/SEO social/canonical real;
- performance y media sólo con medición;
- QA desktop/tablet/mobile;
- enlaces;
- deploy target y base path;
- rollback;
- README final 2022 → 2026;
- reemplazo controlado de la raíz.

## 7. Invariantes

- no inventar clientes, trabajos, cargos, métricas ni información comercial;
- no borrar historia de Git;
- no mega-PR;
- no backend/CMS/IA sin necesidad real;
- generated output nunca es autoridad manual;
- CI no se relaja para hacer pasar código;
- third-party actions fijadas a commits inmutables;
- provenance obligatorio para media promovida;
- tooling temporal de QA se elimina antes del merge;
- cada slice debe quedar recuperable y documentado.

## 8. Definition of Done del cutover

La nueva versión reemplaza la raíz sólo cuando cumple en conjunto:

- instalación desde clone limpio;
- lockfile consistente;
- format/lint/typecheck/tests/build verdes;
- CI verde en `main`;
- navegación usable por teclado;
- focus visible y reduced motion;
- layout sin overflow en anchos representativos;
- media con dimensiones/aspect ratio controlado;
- sin secretos ni endpoints privados;
- claims históricos con contexto verificable;
- metadata/deploy URL reales;
- Contacto sin comportamiento ficticio;
- rollback documentado;
- README/documentación sincronizados con la implementación final.
