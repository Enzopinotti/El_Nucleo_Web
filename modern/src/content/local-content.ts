import {
  historicalAboutSource,
  historicalAboutStatements,
} from "./historical-about";
import { historicalBackstage } from "./historical-backstage";
import { historicalContactContract } from "./historical-contact";
import { historicalLogo, historicalServices } from "./historical-home";
import {
  historicalClientReferences,
  historicalPeople,
} from "./historical-team";
import type { LandingContent, TruthBoundary } from "./landing-content";

const historicalTruth = (
  sources: TruthBoundary["sources"],
  note: string,
): TruthBoundary => ({
  status: "historical",
  publication: "public",
  sources,
  note,
});

const reconstructionTruth = (
  sources: TruthBoundary["sources"],
  note: string,
): TruthBoundary => ({
  status: "verified-current",
  publication: "public",
  sources,
  note,
});

export const localLandingContent = {
  siteIdentity: {
    truth: historicalTruth(
      [
        {
          kind: "repository",
          path: "assets/recursos/logo.png",
          blobSha: "e7a7f3a485e1a3cc4a7d4538357d9ef713ff4c57",
          year: 2022,
        },
      ],
      "La identidad El Núcleo / CINE y su marca gráfica se conservan como material histórico de 2022.",
    ),
    data: {
      name: "El Núcleo",
      tag: "CINE",
      logo: historicalLogo,
    },
  },
  shell: {
    truth: reconstructionTruth(
      [
        { kind: "repository", path: "README.md", year: 2026 },
        {
          kind: "repository",
          path: "docs/modernization-2026.md",
          year: 2026,
        },
      ],
      "La edición y el pie describen la reconstrucción actual; no forman parte de la identidad histórica de 2022.",
    ),
    data: {
      edition: "Archivo 2022 · reconstrucción 2026",
      footerLine:
        "Proyecto histórico de Enzo Pinotti · original 2022 · reconstrucción 2026",
    },
  },
  navigation: [
    { id: "about", index: "01", label: "Nosotros", href: "#nosotros" },
    {
      id: "services",
      index: "02",
      label: "Servicios 2022",
      href: "#servicios",
    },
    {
      id: "backstage",
      index: "03",
      label: "Backstage",
      href: "#backstage",
    },
    {
      id: "team",
      index: "04",
      label: "Equipo 2022",
      href: "#equipo",
    },
    {
      id: "contact",
      index: "05",
      label: "Contacto 2022",
      href: "#contacto",
    },
    { id: "history", index: "06", label: "Historia", href: "#historia" },
  ],
  hero: {
    truth: reconstructionTruth(
      [
        {
          kind: "repository",
          path: "docs/modernization-2026.md",
          year: 2026,
        },
        {
          kind: "repository",
          path: "docs/asset-provenance.md",
          year: 2026,
        },
      ],
      "El hero describe la reconstrucción documentada de 2026 y no afirma actividad comercial vigente.",
    ),
    data: {
      eyebrow: "Proyecto de aprendizaje 2022 · reconstrucción 2026",
      title: "El Núcleo",
      tagline: "CINE · PRODUCCIÓN AUDIOVISUAL · ARCHIVO",
      context: [
        { label: "Origen", value: "2022" },
        { label: "Reconstrucción", value: "2026" },
        { label: "Estado", value: "Archivo documentado" },
      ],
      lead: "La primera versión nació para presentar un colectivo vinculado a la producción audiovisual. Esta reconstrucción conserva esa identidad y su material visual, pero distingue con claridad el archivo histórico de cualquier actividad comercial actual.",
      actions: [
        {
          label: "Explorar el archivo",
          href: "#archivo",
          variant: "primary",
        },
        {
          label: "Ver la evolución",
          href: "#historia",
          variant: "secondary",
        },
      ],
      markLabel: "Archivo visual",
      markCode: "ELN / 001",
      markCaption: "Marca gráfica preservada desde la versión original.",
    },
  },
  archive: {
    about: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: historicalAboutSource.path,
            blobSha: historicalAboutSource.blobSha,
            year: historicalAboutSource.year,
          },
        ],
        "Las frases de Nosotros se publican como declaraciones históricas, no como descripción vigente.",
      ),
      data: historicalAboutStatements,
    },
    services: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: "index.html",
            year: 2022,
            note: "Las categorías y assets promovidos conservan su fuente individual en historical-home.ts y docs/asset-provenance.md.",
          },
        ],
        "Las categorías de servicios pertenecen a la presentación de 2022 y no constituyen una oferta comercial actual.",
      ),
      data: historicalServices,
    },
    backstage: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: "assets/recursos/fotos-backstage/",
            year: 2022,
          },
        ],
        "Backstage es un archivo visual; cada cuadro conserva path y blob de origen.",
      ),
      data: historicalBackstage,
    },
    people: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: "views/equipo.html",
            year: 2022,
          },
        ],
        "Las personas se muestran sólo como integrantes referenciados por la página histórica de 2022.",
      ),
      data: historicalPeople,
    },
    clientReferences: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: "views/equipo.html",
            year: 2022,
          },
        ],
        "Las referencias de clientes se preservan como etiquetas encontradas en 2022 y no como endorsements vigentes.",
      ),
      data: historicalClientReferences,
    },
    contact: {
      truth: historicalTruth(
        [
          {
            kind: "repository",
            path: historicalContactContract.sourcePath,
            blobSha: historicalContactContract.sourceBlob,
            year: historicalContactContract.sourceYear,
          },
        ],
        "El formulario se conserva como contrato histórico visible y permanece no operativo en 2026.",
      ),
      data: historicalContactContract,
    },
  },
  current: {
    projects: {
      truth: {
        status: "unverified",
        publication: "withheld",
        sources: [],
        note: "No hay proyectos actuales suficientemente verificados para publicar. Se incorporarán sólo después de revisar fuente, fecha, contexto y permiso de media.",
      },
      data: [],
    },
    contactChannels: {
      truth: {
        status: "unverified",
        publication: "withheld",
        sources: [],
        note: "No existe todavía un canal actual con destino, privacidad y ownership verificados; por eso la landing no inventa email, WhatsApp, formulario ni redes.",
      },
      data: [],
    },
  },
  history: {
    truth: reconstructionTruth(
      [
        { kind: "repository", path: "README.md", year: 2026 },
        {
          kind: "repository",
          path: "docs/modernization-2026.md",
          year: 2026,
        },
      ],
      "La línea temporal documenta el origen 2022 y el trabajo de reconstrucción efectivamente realizado en 2026.",
    ),
    data: {
      kicker: "Una misma historia, dos momentos",
      title: "Modernizar sin fingir que el pasado no existió",
      items: [
        {
          year: "2022",
          title: "Aprender construyendo",
          body: "HTML, SCSS, Bootstrap, cinco páginas y una identidad propia para un proyecto de Coderhouse orientado al mundo audiovisual.",
        },
        {
          year: "2026",
          title: "Reconstruir con criterio de producto",
          body: "React, TypeScript, Vite, pruebas, CI reproducible, accesibilidad y documentación como código, manteniendo el sitio histórico disponible durante la transición.",
        },
      ],
    },
  },
  reconstruction: {
    truth: reconstructionTruth(
      [
        {
          kind: "repository",
          path: "docs/modern-app-architecture.md",
          year: 2026,
        },
        {
          kind: "repository",
          path: "docs/content-platform-2026.md",
          year: 2026,
        },
      ],
      "Estos principios describen contratos de ingeniería de la reconstrucción 2026, no capacidades comerciales de la organización histórica.",
    ),
    data: {
      kicker: "Criterio 2026",
      title: "La tecnología acompaña la historia, no la reemplaza",
      principles: [
        {
          id: "provenance",
          index: "01",
          title: "Fuente histórica explícita",
          body: "Los assets promovidos a la aplicación conservan referencia al archivo y blob de origen. Los originales no se modifican.",
        },
        {
          id: "interaction",
          index: "02",
          title: "Interacción sin dependencias heredadas",
          body: "La galería de categorías mantiene una única interacción controlada, mientras Backstage usa una grilla editorial sin autoplay ni estado adicional.",
        },
        {
          id: "truth",
          index: "03",
          title: "Contenido con límites honestos",
          body: "Servicios, equipo, clientes y contacto históricos no se presentan automáticamente como actividad vigente. Cada afirmación o flujo se verifica antes del cutover.",
        },
      ],
    },
  },
  seo: {
    truth: reconstructionTruth(
      [
        {
          kind: "repository",
          path: "modern/index.html",
          year: 2026,
        },
        {
          kind: "repository",
          path: "docs/metadata-seo-2026.md",
          year: 2026,
        },
      ],
      "La metadata describe un archivo/reconstrucción. Los campos dependientes de una URL productiva permanecen nulos hasta conocer el origen definitivo.",
    ),
    data: {
      title: "El Núcleo | CINE — Archivo y reconstrucción 2026",
      description:
        "El Núcleo: reconstrucción 2026 de un proyecto audiovisual iniciado en 2022, preservando su identidad y archivo visual.",
      openGraphTitle: "El Núcleo — CINE",
      openGraphDescription:
        "Archivo y reconstrucción moderna del proyecto audiovisual El Núcleo, originalmente desarrollado en 2022.",
      locale: "es_AR",
      canonicalUrl: null,
      socialImage: null,
    },
  },
} satisfies LandingContent;
