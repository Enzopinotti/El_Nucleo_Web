# El Núcleo — contrato de modernización 2026

## 1. Propósito

Modernizar el primer proyecto web histórico sin convertir el repositorio en una reescritura que borre su contexto de aprendizaje.

Baseline 2022 preservado: `6b23035cb6fffebbdd8ecd57c6752eae36f09b31`.

## 2. Inventario del producto histórico

### Navegación

- Inicio
- Nosotros
- Servicios
- Equipo
- Contacto

### Contenido

**Inicio**
- identidad El Núcleo / CINE;
- cuatro carruseles con material de servicios;
- logo e identidad audiovisual.

**Nosotros**
- definición como colectivo emprendedor audiovisual/publicitario;
- visión orientada a proyectos artísticos, campañas y colaboraciones.

**Servicios**
- Videoclips;
- Publicidad;
- Cortometrajes;
- Coberturas;
- galería Backstage.

**Equipo / clientes**
- integrantes históricos del proyecto;
- enlaces sociales;
- clientes/referencias que deben verificarse antes de volver a publicarse en una versión nueva.

**Contacto**
- formulario de nombre, apellido, correo, newsletter y consulta;
- el formulario histórico tiene `action=""`, por lo que no existe un backend de envío real que deba preservarse como funcionalidad.

### Identidad visual

- color histórico principal: `#83d2b5`;
- fondo/subtítulos grises;
- logo existente;
- tipografías de personalidad fuerte;
- separadores gráficos;
- fotografías de servicios, backstage, equipo y clientes.

## 3. Deuda técnica histórica a reemplazar

- Bootstrap, Animate.css, AOS, Google Fonts y Font Awesome cargados directamente por CDN;
- markup repetido entre cinco documentos HTML;
- elementos no estándar como `aside1` / `aside2`;
- estilos inline y dimensiones fijas en imágenes;
- navegación y footer duplicados;
- gran cantidad de media queries manuales concentradas en un parcial SCSS;
- CSS compilado versionado junto al fuente Sass;
- formulario sin servicio de envío;
- SEO antiguo (`meta keywords`) y ausencia de una estrategia social/canonical moderna;
- sin package contract, tests, lint, typecheck, build reproducible ni CI.

## 4. Stack objetivo

### Foundation

- Node.js 22;
- npm + lockfile;
- React 19;
- TypeScript;
- Vite;
- Sass;
- ESLint;
- Prettier;
- Vitest + Testing Library;
- GitHub Actions.

### UX / frontend

- componentes semánticos y reutilizables;
- CSS/Sass mobile-first;
- design tokens para color, spacing, typography y motion;
- `prefers-reduced-motion`;
- imágenes responsive, lazy loading fuera del hero y dimensiones explícitas;
- navegación por teclado y focus visible;
- landmarks y headings válidos;
- evitar librerías de animación hasta que una interacción concreta las justifique.

## 5. Decisiones que NO se toman todavía

### Navegación final

El original usa cinco páginas. Antes de introducir React Router se va a decidir si el producto 2026 funciona mejor como:

1. experiencia editorial de una sola página con secciones y anchors; o
2. rutas reales para Inicio / Nosotros / Servicios / Equipo / Contacto.

La decisión debe considerar SEO, deploy estático y experiencia móvil. No se agrega un router sólo porque el proyecto viejo tenía varios HTML.

### Formulario

No se implementa backend en Fase 1. En una fase posterior se podrá elegir un servicio/serverless endpoint concreto. Hasta entonces no se simulará un envío exitoso.

### Deploy

La versión histórica usa GitHub Pages. La versión nueva no reemplazará el deploy existente hasta tener quality gate y QA visual. Vercel/GitHub Pages u otro destino se decidirá después del scaffold.

## 6. Fases recuperables

### Fase 1 — preservation / foundation

- README histórico;
- este contrato;
- Node/editor/ignore policy;
- branch independiente;
- cero cambio en la web publicada.

### Fase 2 — scaffold

- package manifest y lockfile;
- Vite + React + TypeScript + Sass;
- app shell mínima;
- tokens visuales iniciales;
- lint / format / typecheck / test / build;
- CI;
- primer smoke test.

### Fase 3 — Home

- migrar identidad;
- hero;
- portfolio visual de servicios;
- responsive y accesibilidad;
- mantener assets sólo cuando tengan calidad/permiso suficiente.

### Fase 4 — contenido secundario

- Nosotros;
- Servicios/backstage;
- Equipo/clientes revisados;
- Contacto.

### Fase 5 — cierre

- performance;
- SEO y social metadata;
- QA desktop/tablet/mobile;
- reduced motion;
- deploy controlado;
- README final con comparativa 2022 → 2026.

## 7. Definition of Done para la futura versión 2026

La modernización no reemplaza `main` sólo por “verse moderna”. Debe cumplir como mínimo:

- instalación desde clone limpio;
- lockfile consistente;
- lint sin warnings;
- typecheck verde;
- tests relevantes verdes;
- production build verde;
- CI verde;
- navegación usable con teclado;
- layout usable en móvil/desktop;
- imágenes sin layout shift evitable;
- sin secretos ni endpoints privados en el repo;
- contenido verificable;
- versión histórica rastreable desde documentación e historial.
