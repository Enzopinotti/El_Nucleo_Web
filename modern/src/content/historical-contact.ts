export type HistoricalContactField = {
  id: string;
  sourceLabel: string;
  kind: "text" | "email" | "checkbox" | "textarea";
  required: boolean;
  sourceName: string;
  maxLength?: number;
  sourceNote?: string;
};

export const historicalContactContract = {
  sourceYear: 2022,
  sourcePath: "views/contacto.html",
  sourceBlob: "e8a550ad30c708a0893ad31b3b289b15bcf8e118",
  sourceMethod: "GET",
  sourceAction: "",
  sourceEncoding: "text/plain",
  sourcePromise: "Nos estaremos comunicando lo mas pronto posible con usted...",
  fields: [
    {
      id: "name",
      sourceLabel: "Nombre",
      kind: "text",
      required: true,
      sourceName: "userName",
    },
    {
      id: "surname",
      sourceLabel: "Apellido",
      kind: "text",
      required: true,
      sourceName: "userSurname",
    },
    {
      id: "email",
      sourceLabel: "Correo",
      kind: "email",
      required: true,
      sourceName: "userMail",
    },
    {
      id: "newsletter",
      sourceLabel: "¿Desea suscribirse a nuestro Newslatter?",
      kind: "checkbox",
      required: false,
      sourceName: "newslatter",
      sourceNote:
        "La fuente de 2022 usa literalmente «Newslatter». No se infiere una suscripción activa en 2026.",
    },
    {
      id: "message",
      sourceLabel: "Consulta",
      kind: "textarea",
      required: true,
      sourceName: "consultas",
      maxLength: 400,
    },
  ] satisfies HistoricalContactField[],
} as const;
