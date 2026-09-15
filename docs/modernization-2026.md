# El Núcleo — modernización 2026

## 1. Resultado

La modernización 2026 está completa.

El proyecto original de 2022 fue preservado como evidencia histórica y la reconstrucción moderna fue desplegada en producción sin reescribir destructivamente la raíz del repositorio.

Producción actual:

```text
https://el-nucleo-producciones.netlify.app/
```

Merge de cutover:

```text
c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
```

Baseline histórico preservado:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

Quality post-cutover #154: **success**.  
Smoke de producción HTTP + Chrome: **success**.

## 2. Objetivo que se mantuvo durante toda la reconstrucción

El objetivo nunca fue borrar el proyecto de aprendizaje ni fingir una historia comercial distinta.

La modernización debía demostrar evolución de ingeniería mediante:

- preservación del baseline 2022;
- migración por slices recuperables;
- tests y CI reales;
- provenance de contenido y media;
- límites explícitos entre contenido histórico y hechos actuales;
- accesibilidad y responsive verificables;
- supply-chain reproducible;
- deployment público controlado;
- rollback preparado antes del cutover.

## 3. Producto histórico inventariado

La versión 2022 incluía:

- Inicio;
- Nosotros;
- Servicios;
- Equipo;
- Contacto;
- cuatro categorías audiovisuales;
- galería Backstage;
- identidad El Núcleo / CINE;
- fotografías y logos;
- Bootstrap y otras dependencias por CDN;
- Sass/CSS;
- un formulario con `action=""`, `method="get"` y `enctype="text/plain"` sin backend verificable.

Ese estado no fue maquillado. Los patrones antiguos siguen existiendo como parte del archivo histórico, mientras la aplicación moderna reemplaza su autoridad pública.

## 4. Arquitectura final

```text
fuentes históricas 2022
        ↓
contenido histórico tipado + provenance
        ↓
LandingContent / localLandingContent
        ↓
React 19 + TypeScript + Sass
        ↓
Vite build
        ↓
modern/dist
        ↓
Netlify production
```

Autoridades finales:

- root histórico → evidencia 2022;
- `modern/src/` → source authority 2026;
- `modern/src/content/` → content authority;
- `modern/public/media/` → media promovida;
- `modern/dist/` → artifact generado;
- `netlify.toml` → build/headers/cache de producción;
- `.nvmrc` → Node 24;
- `modern/package.json#packageManager` → pnpm 11.26.0;
- `modern/pnpm-workspace.yaml` → policy supply-chain.

## 5. Stack canónico 2026

- Node.js 24
- pnpm 11.26.0
- React 19
- TypeScript 6.0.3
- Vite 8
- Sass con `@use`
- ESLint
- Prettier
- Vitest + Testing Library
- GitHub Actions
- Netlify

TypeScript 6.0.3 se mantiene por compatibilidad explícita con `typescript-eslint`. El proyecto falla si el compilador sale del rango soportado sin una revisión intencional.

## 6. Contrato de calidad

```bash
nvm use
cd modern
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` valida:

1. formato de la app;
2. formato de README/docs;
3. lint sin warnings;
4. TypeScript;
5. Vitest;
6. build productivo.

Baseline final:

```text
3 archivos de test
30 tests
30 passed
```

Distribución:

- 6 contratos de truth/publication/provenance;
- 5 contratos de documento/SEO/deployment;
- 19 tests de comportamiento visible.

## 7. Supply-chain

La modernización cerró también la autoridad del package manager y del graph de dependencias.

`modern/pnpm-workspace.yaml` codifica:

- `minimumReleaseAge: 1440`;
- `minimumReleaseAgeStrict: true`;
- `blockExoticSubdeps: true`;
- decisiones explícitas de install/build scripts.

La migración a pnpm 11 detectó una release transitiva demasiado reciente de `brace-expansion`. La policy no se relajó: se re-resolvió el lockfile bajo la misma protección.

`@parcel/watcher` permanece explícitamente denegado porque el producto califica sin ejecutar su postinstall nativo opcional.

Evidencia complementaria one-shot:

- graph productivo sin findings `moderate+`;
- graph completo sin findings `high+`.

## 8. Content platform y verdad

La UI no contiene claims actuales dispersos sin autoridad.

```text
fuentes históricas + hechos/editorial 2026 revisados
                    ↓
             LandingContent
                    ↓
          localLandingContent
                    ↓
               React UI
```

Estados:

- `historical`;
- `verified-current`;
- `unverified`;
- `draft`.

Publicación:

- `public`;
- `withheld`.

La identidad histórica se mantiene separada del shell editorial de 2026.

No se inventaron:

- clientes vigentes;
- staff actual;
- proyectos actuales;
- email/WhatsApp/redes actuales;
- resultados comerciales;
- operación empresarial presente.

## 9. Migración de producto

### Home

Se preservó la identidad El Núcleo / CINE y las cuatro categorías históricas. Los carruseles repetidos de Bootstrap fueron reemplazados por una única interacción controlada.

### Nosotros

La narrativa se conserva como material 2022 con contexto temporal explícito.

### Servicios + Backstage

Servicios usa una autoridad compartida. Backstage se convirtió en una composición editorial responsive sin autoplay ni dependencias heredadas.

### Equipo

Personas y referencias se muestran como archivo histórico, no como staff/clientes vigentes.

### Contacto

El contrato histórico se preserva como contenido no interactivo. No se reprodujo un `GET` para datos personales, no se inventó backend y no existe fake success.

## 10. Sistema visual y accesibilidad

La dirección final es un archivo editorial / production contact sheet / control surface.

QA realizada sobre anchos representativos:

- 360 px;
- 768 px;
- 1440 px.

Contratos aceptados:

- cero overflow global;
- un H1;
- landmarks correctos;
- skip link;
- foco visible;
- `prefers-reduced-motion`;
- contraste principal;
- alt útil;
- lazy loading bajo hero;
- Contacto sin controles ficticios.

## 11. Deployment y cutover

El cutover no consistió en mover `modern/` a raíz.

Netlify publica:

```text
modern/dist
```

Build:

```text
cd modern && corepack pnpm install --frozen-lockfile && corepack pnpm build
```

Origen productivo:

```text
https://el-nucleo-producciones.netlify.app/
```

Antes del cutover, CI comprobó que tanto ese endpoint como GitHub Pages servían el documento histórico 2022.

PR #32 calificó primero un deploy preview y luego fue mergeado desde el HEAD limpio:

```text
054e760a27d6b9751723115c288b68fb44434088
```

Merge de cutover:

```text
c3342e111ba4d7bbe88f04407c0510bfe0fcd1da
```

Quality #154 pasó sobre ese commit real de `main`.

Después del merge, un smoke one-shot contra **producción** confirmó el cambio de autoridad 2022 → 2026.

## 12. Security headers y cache

`netlify.toml` aplica:

- Content-Security-Policy;
- Permissions-Policy;
- Referrer-Policy;
- `X-Content-Type-Options`;
- `X-Frame-Options`;
- cache immutable para `/assets/*` fingerprinted.

CSP:

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'none';
img-src 'self' data:;
font-src 'self';
style-src 'self';
script-src 'self';
connect-src 'self';
upgrade-insecure-requests
```

La política fue verificada en Chrome contra preview y producción.

## 13. SEO productivo

La metadata dejó de usar valores diferidos cuando el origen quedó demostrado.

```text
canonical: https://el-nucleo-producciones.netlify.app/
og:url:    https://el-nucleo-producciones.netlify.app/
og:image:  https://el-nucleo-producciones.netlify.app/media/el-nucleo-logo.png
```

`robots.txt` apunta al sitemap productivo y el sitemap contiene una única URL canónica porque la landing usa anchors y no rutas separadas.

## 14. Rollback

Dos niveles:

### Provider

Restaurar un deploy previamente conocido desde el historial de Netlify.

### Git

1. revertir el merge de cutover;
2. ejecutar quality;
3. redeploy;
4. correr smoke productivo.

No se requiere rebase destructivo ni force-push.

El baseline 2022 permanece disponible en Git.

## 15. Fases completadas

### ✅ Preservation / foundation

Baseline, rollback y separación histórica definidos.

### ✅ Modern scaffold

React/TypeScript/Vite/Sass, package contract, CI, tests y tooling.

### ✅ Historical content migration

Home, Nosotros, Servicios, Backstage, Equipo y Contacto.

### ✅ Visual system + cross-cutting qualification

Responsive, accesibilidad, metadata, media y QA.

### ✅ Content platform readiness

Contrato tipado de truth/publication/provenance.

### ✅ Repository-wide audit / hardening

Node/pnpm authority, supply-chain, docs-as-code, dependency/security review y governance classification.

### ✅ Production deployment + controlled cutover

Netlify authority, metadata productiva, headers, rollback, preview smoke, merge controlado y smoke productivo.

No queda una fase de modernización abierta.

## 16. Non-adoptions deliberadas

No se agregó por apariencia:

- Docker;
- monorepo/task runner;
- Storybook;
- UI framework;
- analytics;
- CMS/admin/auth;
- coverage threshold nominal;
- screenshot regression infrastructure;
- responsive image pipeline sin medición;
- formulario sin backend real;
- rutas falsas para SEO.

## 17. Gobernanza de GitHub

El API de rulesets devuelve actualmente una lista vacía.

El endpoint tradicional de branch protection responde:

```text
403 Resource not accessible by integration
```

Por lo tanto el repositorio **no afirma** si existe o no protección tradicional de `main` fuera de rulesets.

GitHub Pages fue detectado como endpoint histórico y no es canonical ni producción moderna. La acción recomendada es despublicarlo desde GitHub Settings, sin tocar la raíz histórica sólo para forzar una redirección.

Estas son tareas administrativas de Settings; no invalidan el cutover productivo ya probado.

## 18. Invariantes que quedan como estándar

- no inventar claims;
- no borrar la historia para mostrar modernidad;
- truth y publication son conceptos separados;
- provenance para media histórica;
- una sola autoridad por dato compartido;
- generated output nunca es source authority;
- frozen install + CI son obligatorios;
- supply-chain no se relaja por conveniencia;
- no se recolectan datos sin transporte real;
- deployment se valida contra la URL pública;
- rollback se diseña antes del incidente;
- README y documentación general se mantienen sincronizados con la implementación.

## 19. Cierre

La reconstrucción 2026 cumple el objetivo original: mostrar el recorrido desde un primer sitio de aprendizaje hasta una aplicación moderna con contratos de ingeniería, sin ocultar ni falsificar el punto de partida.

El sitio histórico sigue siendo recuperable y auditable. La versión moderna es ahora la autoridad pública productiva.
