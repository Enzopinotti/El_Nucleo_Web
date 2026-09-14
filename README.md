# El Núcleo — modernización 2026

Este repositorio tiene un valor especial: conserva uno de mis primeros proyectos web, realizado en 2022 mientras aprendía HTML, CSS y Sass.

La versión histórica nació como una entrega de Coderhouse para una productora audiovisual ficticia/experimental llamada **El Núcleo CINE**. El objetivo de la modernización no es esconder ese origen, sino mostrar la evolución entre aquella primera implementación y la forma en que hoy estructuro, valido y mantengo una aplicación frontend.

## Versión histórica

Baseline preservado en Git:

```text
6b23035cb6fffebbdd8ecd57c6752eae36f09b31
```

La implementación de 2022 incluye:

- HTML multipágina;
- CSS + Sass dividido en parciales;
- Bootstrap 5 por CDN;
- Animate.css / AOS;
- Font Awesome remoto;
- responsive manual;
- Home, Nosotros, Servicios, Equipo y Contacto;
- galerías de servicios y backstage;
- identidad visual propia y assets del proyecto.

Mientras avance la reconstrucción, esa versión sigue siendo parte de la historia del repositorio y no se reescribe ni se elimina del historial.

## Objetivo 2026

La nueva versión se construirá por bloques con:

- Node.js 22 para tooling;
- React 19;
- TypeScript;
- Vite;
- Sass moderno;
- arquitectura de componentes;
- responsive mobile-first;
- accesibilidad y soporte de `prefers-reduced-motion`;
- SEO/social metadata actualizados;
- Vitest + Testing Library para contratos que realmente aporten valor;
- ESLint + Prettier + typecheck + build;
- GitHub Actions reproducible.

No se agregará backend, CMS ni infraestructura sólo para hacer el stack más grande. Si una necesidad real aparece durante la migración, se evaluará como una decisión separada.

## Identidad que se conserva

La reconstrucción parte del producto original, no de una plantilla genérica. Se preservarán y reinterpretarán cuando tenga sentido:

- **El Núcleo / CINE** como identidad;
- el verde histórico `#83d2b5` como referencia visual;
- el enfoque audiovisual/cinematográfico;
- Videoclips, Publicidad, Cortometrajes y Coberturas;
- material de backstage;
- contenido institucional y del equipo que siga siendo válido.

No se inventarán clientes, producciones, métricas ni información comercial nueva.

## Estado

La modernización se sigue en [#1](https://github.com/Enzopinotti/El_Nucleo_Web/issues/1).

Actualmente estamos en **Fase 1 — preservación y foundation**. El sitio histórico todavía no fue reemplazado.

Ver [`docs/modernization-2026.md`](docs/modernization-2026.md) para el plan técnico y el inventario de migración.
