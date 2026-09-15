# El Núcleo — contrato de modernización 2026

## 1. Propósito

Modernizar el primer proyecto web histórico sin convertir el repositorio en una reescritura que borre su contexto de aprendizaje.

Baseline 2022 preservado:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La modernización funciona como una migración por slices recuperables: cada bloque preserva la fuente histórica, define una autoridad moderna, pasa quality gate y QA relevante y recién después se integra a `main`.

Toda la migración y auditoría pre-cutover está completa. La única fase activa es el deployment/cutover controlado de #5, actualmente en PR #32.

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

La raíz histórica sigue preservada. Esta deuda no se “arregla” modificando el archivo 2022 sino reemplazando su autoridad pública mediante el artifact moderno y un cutover explícito.

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
- GitHub Actions read-only con actions fijadas a SHAs inmutables;
- Netlify como provider seleccionado para la publicación moderna.

### Autoridad de runtime/package manager

- `.nvmrc` → Node 24;
- `modern/package.json#engines` → `>=24 <25`;
- `modern/package.json#packageManager` → pnpm 11.26.0;
- CI lee `.nvmrc` y `packageManager` directamente;
- ESLint falla ante una versión de TypeScript fuera del rango soportado por `typescript-eslint`.

### Política de instalación y supply-chain

`modern/pnpm-workspace.yaml` versiona la política de instalación:

- antigüedad mínima de publicación: 24 horas;
- enforcement estricto también para transitivas;
- bloqueo de subdependencias exóticas;
- scripts de build/install no se habilitan por confianza implícita;
- `@parcel/watcher` queda explícitamente denegada porque la aplicación compila y prueba correctamente sin su postinstall nativo.

La migración a pnpm 11 detectó una versión transitiva de `brace-expansion` publicada hacía menos de 24 horas. La protección no se relajó: el lockfile se reconstruyó bajo la policy y luego pasó el quality contract.

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

La identidad histórica y el shell editorial 2026 viven en dominios diferentes.

### Media

Sólo se promueven assets realmente usados. Cada copia moderna conserva path + blob SHA de origen. Hotlinks remotos no se convierten en dependencias esenciales.

### Contacto / datos personales

El formulario histórico no tiene un destino verificable y usa GET. La aplicación moderna no reproduce ese transporte, no inventa un endpoint y no simula éxito.

Un futuro formulario operativo requiere destino real, privacidad, validación, anti-spam y estados de entrega verificables.

### Evolución visual

- `index.html`, `views/`, `scss/`, `css/` y assets originales permanecen como evidencia;
- `modern/src/styles/` es la autoridad 2026;
- `El Núcleo / CINE`, `#83d2b5` y el carácter audiovisual son anclas trazables;
- `prefers-reduced-motion`, contraste, foco, legibilidad y responsive son invariantes;
- originales no se sobrescriben;
- no se reintroducen dependencias heredadas por nostalgia.

### Deploy

El cutover no requiere mover físicamente la app moderna a la raíz del repositorio.

La arquitectura seleccionada es:

```text
2022 root files → evidencia histórica preservada
modern/src      → source authority 2026
modern/dist     → artifact generado
netlify.toml    → build/headers/cache authority
```

Netlify publica `modern/dist` desde el mismo repositorio y puede convertir la versión moderna en autoridad pública sin borrar el baseline 2022.

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

- Home;
- Nosotros;
- Servicios + Backstage;
- Equipo / referencias;
- Contacto.

Cada slice mantiene truth/provenance boundaries y fue validado con tests + build + QA relevante.

### ✅ Fase 4 — sistema visual y cierre transversal

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
- sin CMS/admin/provider remoto especulativo;
- 29/29 tests + quality + browser QA;
- post-merge quality verde.

### ✅ Fase 6 — repository-wide engineering audit / hardening

Completada en #29 / PR #30.

Incluyó:

- `.nvmrc` 22 → 24;
- pnpm 9 → 11.26.0;
- CI consumiendo autoridades de runtime/package manager;
- lockfile bajo política de antigüedad mínima y scripts explícitos;
- README/docs dentro de `pnpm check`;
- TypeScript 6.0.3 mantenido por compatibilidad oficial;
- ESLint bloqueando versiones TS no soportadas;
- tests auditados contra riesgo real;
- dependency audit one-shot verde;
- security/privacy/performance/governance clasificados;
- tooling especulativo deliberadamente no adoptado.

Merge de hardening:

```text
7b0521b0331c42881d43ef7e894672125e9c1b66
```

Post-merge Modern app quality #132: **success**.

Matriz completa: `docs/repository-audit-2026.md`.

### 🟡 Fase 7 — production deploy + controlled cutover

Propiedad: #5. Implementación activa: PR #32.

#### Decisiones ya resueltas

Provider moderno seleccionado:

```text
Netlify
```

Origen productivo moderno seleccionado:

```text
https://el-nucleo-producciones.netlify.app/
```

Base path:

```text
/
```

Build:

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Publish:

```text
modern/dist
```

Metadata resuelta:

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
sitemap:   https://el-nucleo-producciones.netlify.app/sitemap.xml
robots:    https://el-nucleo-producciones.netlify.app/robots.txt
```

Security policy:

- CSP restrictiva basada en el runtime real;
- Permissions-Policy;
- strict-origin referrer policy;
- `nosniff`;
- frame denial;
- immutable caching únicamente para assets fingerprinted.

#### Evidencia de transición

Antes del cutover, CI probó directamente:

```text
https://el-nucleo-producciones.netlify.app/
→ histórico 2022

https://enzopinotti.github.io/El_Nucleo_Web/
→ histórico 2022
```

GitHub Pages queda fuera de la autoridad moderna y debe despublicarse/deshabilitarse desde Settings después de comprobar el deploy moderno de Netlify.

#### Preview de PR #32

```text
https://deploy-preview-32--el-nucleo-producciones.netlify.app/
```

El smoke final del preview quedó verde para:

- documento moderno;
- metadata productiva exacta;
- assets;
- CSP y headers;
- cache immutable;
- `robots.txt`;
- sitemap de una sola URL;
- render real en Chrome;
- todas las secciones principales;
- Contacto sin formulario vivo.

La suite incorpora un contrato adicional para mantener robots/sitemap alineados con la autoridad SEO, elevando el baseline a **30 tests en 3 archivos**.

#### Pendiente para cerrar la fase

1. normalizar formato y obtener quality verde sobre el HEAD final de PR #32;
2. retirar el workflow temporal de smoke;
3. verificar nuevamente quality + deploy preview sobre el árbol limpio;
4. mergear únicamente el SHA calificado;
5. verificar quality post-merge en `main`;
6. confirmar que Netlify producción cambió de 2022 → 2026;
7. ejecutar smoke contra la URL productiva real;
8. registrar merge SHA + evidencia de producción;
9. verificar/despublicar GitHub Pages directamente en Settings;
10. verificar branch protection/ruleset de `main` directamente en Settings;
11. sincronizar nuevamente README/docs y cerrar #5/#1 si no queda deuda real.

## 7. Invariantes

- no inventar clientes, trabajos, cargos, métricas ni información comercial;
- no borrar historia de Git;
- no backend/CMS/IA sin necesidad real;
- no recopilar datos personales sin transporte y privacidad definidos;
- no fake-success;
- no sobrescribir assets/SCSS/HTML históricos para hacer parecer moderna la fuente 2022;
- generated output nunca es autoridad manual;
- CI no se relaja para hacer pasar código;
- third-party actions fijadas a commits inmutables;
- provenance obligatorio para media promovida;
- tooling temporal de QA se elimina antes del merge;
- documentation/status authority se actualiza con cada fase;
- production-origin values cambian juntos en HTML, content authority, tests, robots, sitemap y docs;
- un deploy-preview nunca es canonical authority;
- una dependencia recién publicada o un script de instalación no obtiene confianza automática;
- el root histórico no se destruye si el provider puede publicar el artifact moderno sin mover source authority.

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
- Playwright/E2E permanente sin una necesidad operativa sostenida;
- responsive-image pipeline sin medición;
- custom domain inventado;
- social artwork fabricado sólo para cumplir un formato.

## 9. Definition of Done del cutover

La versión moderna reemplaza la autoridad pública histórica sólo cuando cumple en conjunto:

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
- deploy preview y production smoke verdes;
- rollback documentado y ejecutable;
- source/artifact authority explícita;
- GitHub Pages resuelto como endpoint no canónico;
- branch protection/ruleset verificado directamente;
- README/documentación sincronizados con el estado productivo final;
- #1 puede cerrarse de forma honesta como modernización completada.
