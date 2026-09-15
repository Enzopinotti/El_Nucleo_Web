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

La experiencia moderna es editorial y de una sola página con anchors semánticos. No se agregó React Router sólo para imitar los cinco HTML históricos.

### Contenido histórico vs. presente

Cada claim heredado indica su contexto. “Servicios”, “equipo” o “clientes” de 2022 no se transforman automáticamente en inventario comercial, staff o relaciones vigentes en 2026.

### Media

Sólo se promueven assets realmente usados por un slice. Cada copia moderna conserva path + blob SHA de origen. Hotlinks remotos no se convierten en dependencias esenciales.

### Contacto / datos personales

El formulario histórico no tiene un destino real verificable y usa GET. La aplicación moderna no reproduce ese transporte, no inventa un endpoint y no simula éxito.

La autoridad moderna conserva el **contrato histórico** de campos como metadata no interactiva. Un futuro formulario operativo requiere un destino real, privacidad, validación, anti-spam y estados de entrega verificables.

### Evolución visual

El sitio moderno no tiene que copiar píxel por píxel la versión 2022. Sí tiene que conservar una relación verificable con ella.

La regla es separar **fuente histórica** de **presentación moderna**:

- `index.html`, `views/`, `scss/`, `css/` y los assets originales permanecen como evidencia histórica;
- `modern/src/styles/` es la autoridad de presentación 2026;
- `El Núcleo / CINE`, el verde `#83d2b5` y la identidad audiovisual son anclas históricas, no restricciones de layout;
- la paleta moderna puede expandirse mediante tokens, sin renombrar el pasado ni borrar su color principal;
- tipografía, escala, spacing, grids, superficies, navegación, estados y motion pueden evolucionar libremente si mantienen accesibilidad y trazabilidad;
- no se sobrescriben originales para “optimizarlos”;
- derivados visuales/media requieren proceso reproducible cuando sean necesarios;
- no se reintroducen Bootstrap/AOS/Animate.css/CDN sólo por nostalgia visual;
- `prefers-reduced-motion`, contraste, foco y legibilidad son invariantes;
- cambios visuales importantes deben pasar QA de producción en anchos representativos.

La meta es una UI claramente más madura en 2026 que siga siendo reconocible como evolución de El Núcleo, no como un producto sin relación con el repositorio histórico.

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

### ✅ Fase 4A — Equipo / referencias

- dos personas preservadas como etiquetas/fotos del archivo 2022;
- sin roles inventados ni vigencia 2026 asumida;
- referencias `Argentina Cultura` y `Grupo del Sud` tratadas como etiquetas históricas, no endorsements actuales;
- Instagram personales y hotlink remoto excluidos;
- 16/16 tests, browser QA 360/768/1440 y post-merge validation.

### 🟡 Fase 4B — Contacto / qualified closure lane

- autoridad tipada para el contrato exacto de la fuente 2022;
- no se reproduce `GET` + action vacía;
- no se recopilan ni transmiten datos personales;
- campos históricos presentados como archivo no interactivo;
- newsletter histórica contextualizada sin afirmar servicio actual;
- no email/endpoint/success state inventado;
- **19/19 tests**;
- Prettier / ESLint / TypeScript / Vite build verdes;
- Chrome 152.0.7977.82 browser QA en 360 / 768 / 1440;
- cero formularios/controles de Contacto, cero transporte inventado, cero overflow y cero fallos de QA;
- cleanup del workflow temporal + merge controlado + post-merge validation pendientes como último gate.

### ⏳ Fase 5A — visual system + cross-cutting quality

- consolidar tokens y reglas visuales 2026 sin tocar las fuentes 2022;
- revisar jerarquía tipográfica, spacing, grids, navegación y consistencia entre slices;
- contraste, focus-visible, reduced motion y responsive integral;
- auditoría de media/dimensiones/layout shift;
- metadata/SEO exacta y no comercialmente inventada;
- QA visual integral desktop/tablet/mobile.

### ⏳ Fase 5B — deploy + cutover

- links y base path;
- production URL/canonical reales;
- estrategia GitHub Pages/deploy verificada;
- rollback;
- README final 2022 → 2026;
- reemplazo controlado de la raíz.

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
- sistema visual 2026 consistente y documentado;
- identidad histórica trazable sin depender del CSS/JS heredado;
- media con dimensiones/aspect ratio controlado;
- sin secretos ni endpoints privados;
- claims históricos con contexto verificable;
- metadata/deploy URL reales;
- Contacto sin comportamiento ficticio ni fuga por query string;
- rollback documentado;
- README/documentación sincronizados con la implementación final.
