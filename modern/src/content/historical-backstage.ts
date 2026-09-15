import { publicAsset } from "./public-asset";

export type HistoricalBackstageFrame = {
  id: string;
  image: string;
  alt: string;
  historicalSource: string;
  historicalBlob: string;
};

export const historicalBackstage: HistoricalBackstageFrame[] = [
  {
    id: "backstage-01",
    image: publicAsset("media/backstage/backstage-01.jpg"),
    alt: "Fotografía del archivo Backstage de El Núcleo de 2022, cuadro 1 de 4",
    historicalSource: "assets/recursos/fotos-backstage/fotoBackstage1.jpg",
    historicalBlob: "6656c5fc8188553fe4b57b2286f5ba2bfef259b6",
  },
  {
    id: "backstage-02",
    image: publicAsset("media/backstage/backstage-02.jpg"),
    alt: "Fotografía del archivo Backstage de El Núcleo de 2022, cuadro 2 de 4",
    historicalSource: "assets/recursos/fotos-backstage/fotoBackstage2.jpg",
    historicalBlob: "b0cd26124854276d7beb0a19c78f3351654f4b17",
  },
  {
    id: "backstage-03",
    image: publicAsset("media/backstage/backstage-03.jpg"),
    alt: "Fotografía del archivo Backstage de El Núcleo de 2022, cuadro 3 de 4",
    historicalSource: "assets/recursos/fotos-backstage/fotoBackstage3.jpg",
    historicalBlob: "88bd3ea89ffac5a04f5636cf1882217ce3bd9376",
  },
  {
    id: "backstage-04",
    image: publicAsset("media/backstage/backstage-04.jpg"),
    alt: "Fotografía del archivo Backstage de El Núcleo de 2022, cuadro 4 de 4",
    historicalSource: "assets/recursos/fotos-backstage/fotoBackstage4.jpg",
    historicalBlob: "bee3475d55fd1050e8ee16122dc379ac7980189d",
  },
];
