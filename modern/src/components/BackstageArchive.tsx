import type { HistoricalBackstageFrame } from "../content/historical-backstage";

type BackstageArchiveProps = {
  frames: HistoricalBackstageFrame[];
};

export function BackstageArchive({ frames }: BackstageArchiveProps) {
  if (frames.length === 0) {
    return null;
  }

  return (
    <section
      className="backstage-archive"
      id="backstage"
      aria-labelledby="backstage-title"
      aria-describedby="backstage-note"
    >
      <div className="backstage-archive__intro">
        <div>
          <p className="section-kicker">Galería Backstage · archivo 2022</p>
          <h2 id="backstage-title">
            Cuatro fotografías preservadas del proyecto original
          </h2>
        </div>
        <p id="backstage-note" className="section-note">
          Estas imágenes documentan el material que la web de 2022 presentaba
          como Backstage. Su presencia en el archivo no confirma equipo,
          clientes, producciones ni relaciones vigentes en 2026.
        </p>
      </div>

      <div className="backstage-archive__grid">
        {frames.map((frame, index) => (
          <figure className="backstage-card" key={frame.id}>
            <div className="backstage-card__media">
              <img
                src={frame.image}
                alt={frame.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span className="backstage-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="backstage-card__label">Archivo Backstage</p>
                <p className="backstage-card__caption">
                  Fotografía preservada sin reinterpretar su contexto como una
                  afirmación comercial actual.
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
