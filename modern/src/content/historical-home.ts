export type HistoricalService = {
  id: string;
  title: string;
  image: string;
  alt: string;
  historicalSource: string;
};

function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const historicalLogo = {
  src: publicAsset("media/el-nucleo-logo.png"),
  alt: "Logotipo histórico de El Núcleo utilizado en el sitio de 2022",
};

export const historicalServices: HistoricalService[] = [
  {
    id: "videoclips",
    title: "Videoclips",
    image: publicAsset("media/services/videoclips.jpg"),
    alt: "Imagen del archivo visual de 2022 asociada a la categoría Videoclips",
    historicalSource: "assets/recursos/fotos-servicios/fotoAnimacion.jpg",
  },
  {
    id: "publicidad",
    title: "Publicidad",
    image: publicAsset("media/services/publicidad.jpg"),
    alt: "Imagen del archivo visual de 2022 asociada a la categoría Publicidad",
    historicalSource: "assets/recursos/fotos-servicios/fotoPublicidad.jpg",
  },
  {
    id: "cortometrajes",
    title: "Cortometrajes",
    image: publicAsset("media/services/cortometrajes.jpg"),
    alt: "Imagen del archivo visual de 2022 asociada a la categoría Cortometrajes",
    historicalSource: "assets/recursos/fotos-servicios/fotoCorto.jpg",
  },
  {
    id: "coberturas",
    title: "Coberturas",
    image: publicAsset("media/services/coberturas.jpg"),
    alt: "Imagen del archivo visual de 2022 asociada a la categoría Coberturas",
    historicalSource: "assets/recursos/fotos-servicios/fotoEventos.jpg",
  },
];
