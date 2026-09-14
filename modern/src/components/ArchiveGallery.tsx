import { useState } from "react";

import type { HistoricalService } from "../content/historical-home";

type ArchiveGalleryProps = {
  services: HistoricalService[];
};

export function ArchiveGallery({ services }: ArchiveGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (services.length === 0) {
    return null;
  }

  const activeService = services[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + services.length) % services.length,
    );
  };

  return (
    <section
      className="archive-gallery"
      aria-labelledby="archive-title"
      aria-describedby="archive-note"
    >
      <div className="archive-gallery__intro">
        <p className="section-kicker">Archivo visual · 2022</p>
        <h2 id="archive-title">
          Cuatro categorías que definían la primera versión
        </h2>
        <p id="archive-note" className="section-note">
          Este material se conserva como archivo del proyecto original. No
          representa por sí solo un catálogo comercial vigente en 2026.
        </p>
      </div>

      <div className="archive-gallery__viewer">
        <figure className="archive-gallery__figure">
          <div className="archive-gallery__media">
            <img
              key={activeService.id}
              src={activeService.image}
              alt={activeService.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="archive-gallery__index" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(services.length).padStart(2, "0")}
            </span>
          </div>
          <figcaption>
            <p className="archive-gallery__label">Categoría histórica</p>
            <h3>{activeService.title}</h3>
          </figcaption>
        </figure>

        <div
          className="archive-gallery__controls"
          aria-label="Controles de la galería histórica"
        >
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Ver categoría anterior"
          >
            <span aria-hidden="true">←</span>
            Anterior
          </button>
          <p
            className="archive-gallery__status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeIndex + 1} de {services.length} — {activeService.title}
          </p>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Ver categoría siguiente"
          >
            Siguiente
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
