export type HistoricalAboutStatement = {
  id: "collective" | "vision";
  title: string;
  sourceYear: 2022;
  sourceText: string;
  editorialContext: string;
};

export const historicalAboutSource = {
  path: "views/nosotros.html",
  blobSha: "67f5a0857639095d619aeff41c5341b8e6b4df75",
  year: 2022,
  status: "historical-source",
  omittedUnverifiedLinks: [
    "Facebook",
    "YouTube",
    "Instagram",
    "Vimeo",
    "Twitter",
  ],
} as const;

export const historicalAboutStatements: readonly HistoricalAboutStatement[] = [
  {
    id: "collective",
    title: "Quiénes éramos según la versión 2022",
    sourceYear: 2022,
    sourceText:
      "Somos un colectivo emprendedor dedicado a la producción audiovisual y publicitaria, articulado por un grupo de jóvenes con amplia experiencia en el rubro y nuevas formas de pensar el audiovisual",
    editorialContext:
      "Esta frase se conserva como descripción histórica del propósito con el que se presentó el proyecto. La reconstrucción 2026 no confirma que ese colectivo siga operativo ni convierte la redacción original en una afirmación comercial actual.",
  },
  {
    id: "vision",
    title: "La visión declarada en 2022",
    sourceYear: 2022,
    sourceText:
      "Buscamos que nuestro desarrollo artístico nos impulse en nuestros proyectos personales y colectivos como realizadores, desde la participación en campañas de concientización, colaboración con distintas ONGs hasta la finalización de nuestro primer largometraje.",
    editorialContext:
      "La preservamos como una aspiración documentada en 2022. Sin evidencia adicional no afirmamos que esas campañas, colaboraciones o el largometraje se hayan concretado, sigan activos o representen planes actuales.",
  },
] as const;
