import { publicAsset } from "./public-asset";

export type HistoricalPerson = {
  id: string;
  sourceLabel: string;
  image: string;
  alt: string;
  historicalSource: string;
  historicalBlob: string;
};

export type HistoricalClientReference = {
  id: string;
  sourceLabel: string;
  sourceContext: string;
};

export const historicalPeople: HistoricalPerson[] = [
  {
    id: "andre-coronel-2022",
    sourceLabel: "André Wilber Coronel Vargas",
    image: publicAsset("media/team/andre-2022.jpg"),
    alt: "Fotografía del archivo 2022 asociada por la página histórica a André Wilber Coronel Vargas",
    historicalSource: "assets/recursos/fotos-equipo/fotoAndre.jpg",
    historicalBlob: "ba4b1c118c38c6f4c61e6645cee9f1a65549cbdb",
  },
  {
    id: "lautaro-weimer-2022",
    sourceLabel: "Lautaro Weimer",
    image: publicAsset("media/team/lautaro-2022.jpg"),
    alt: "Fotografía del archivo 2022 asociada por la página histórica a Lautaro Weimer",
    historicalSource: "assets/recursos/fotos-equipo/fotoLauti.jpg",
    historicalBlob: "58bdaafc1dbc98c62db57f3f4642c1d169f2990c",
  },
];

export const historicalClientReferences: HistoricalClientReference[] = [
  {
    id: "argentina-cultura-2022",
    sourceLabel: "Argentina Cultura",
    sourceContext:
      "La página de Equipo de 2022 mostraba esta referencia bajo el encabezado «Clientes Habituales».",
  },
  {
    id: "grupo-del-sud-2022",
    sourceLabel: "Grupo del Sud",
    sourceContext:
      "La página de Equipo de 2022 mostraba esta referencia bajo el encabezado «Clientes Habituales».",
  },
];
