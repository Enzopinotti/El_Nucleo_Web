import { ArchiveGallery } from "./components/ArchiveGallery";
import { BackstageArchive } from "./components/BackstageArchive";
import { HistoricalAbout } from "./components/HistoricalAbout";
import { HistoricalContact } from "./components/HistoricalContact";
import { HistoricalTeam } from "./components/HistoricalTeam";
import { historicalAboutStatements } from "./content/historical-about";
import { historicalBackstage } from "./content/historical-backstage";
import { historicalContactContract } from "./content/historical-contact";
import { historicalLogo, historicalServices } from "./content/historical-home";
import {
  historicalClientReferences,
  historicalPeople,
} from "./content/historical-team";

export function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="El Núcleo, volver al inicio"
        >
          <span className="brand__name">El Núcleo</span>
          <span className="brand__tag">CINE</span>
        </a>

        <nav aria-label="Navegación principal">
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios 2022</a>
          <a href="#backstage">Backstage</a>
          <a href="#equipo">Equipo 2022</a>
          <a href="#contacto">Contacto 2022</a>
          <a href="#historia">Historia</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">
              Proyecto de aprendizaje 2022 · reconstrucción 2026
            </p>
            <h1 id="hero-title">El Núcleo</h1>
            <p className="hero__tagline">
              CINE · PRODUCCIÓN AUDIOVISUAL · ARCHIVO
            </p>
            <p className="hero__lead">
              La primera versión nació para presentar un colectivo vinculado a
              la producción audiovisual. Esta reconstrucción conserva esa
              identidad y su material visual, pero distingue con claridad el
              archivo histórico de cualquier actividad comercial actual.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#archivo">
                Explorar el archivo
              </a>
              <a className="button button--secondary" href="#historia">
                Ver la evolución
              </a>
            </div>
          </div>

          <figure className="hero__mark">
            <div className="hero__mark-frame">
              <img
                src={historicalLogo.src}
                alt={historicalLogo.alt}
                decoding="async"
              />
            </div>
            <figcaption>
              Marca gráfica preservada desde la versión original.
            </figcaption>
          </figure>
        </section>

        <HistoricalAbout statements={historicalAboutStatements} />

        <div id="archivo">
          <ArchiveGallery services={historicalServices} />
        </div>

        <BackstageArchive frames={historicalBackstage} />

        <HistoricalTeam
          people={historicalPeople}
          clientReferences={historicalClientReferences}
        />

        <HistoricalContact contract={historicalContactContract} />

        <section
          className="history-section"
          id="historia"
          aria-labelledby="history-title"
        >
          <div className="section-heading">
            <p className="section-kicker">Una misma historia, dos momentos</p>
            <h2 id="history-title">
              Modernizar sin fingir que el pasado no existió
            </h2>
          </div>

          <ol className="history-timeline">
            <li>
              <span className="history-timeline__year">2022</span>
              <div>
                <h3>Aprender construyendo</h3>
                <p>
                  HTML, SCSS, Bootstrap, cinco páginas y una identidad propia
                  para un proyecto de Coderhouse orientado al mundo audiovisual.
                </p>
              </div>
            </li>
            <li>
              <span className="history-timeline__year">2026</span>
              <div>
                <h3>Reconstruir con criterio de producto</h3>
                <p>
                  React, TypeScript, Vite, pruebas, CI reproducible,
                  accesibilidad y documentación como código, manteniendo el
                  sitio histórico disponible durante la transición.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className="rebuild-section"
          id="reconstruccion"
          aria-labelledby="rebuild-title"
        >
          <div className="section-heading">
            <p className="section-kicker">Criterio 2026</p>
            <h2 id="rebuild-title">
              La tecnología acompaña la historia, no la reemplaza
            </h2>
          </div>

          <div className="rebuild-grid">
            <article>
              <span aria-hidden="true">01</span>
              <h3>Fuente histórica explícita</h3>
              <p>
                Los assets promovidos a la aplicación conservan referencia al
                archivo y blob de origen. Los originales no se modifican.
              </p>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <h3>Interacción sin dependencias heredadas</h3>
              <p>
                La galería de categorías mantiene una única interacción
                controlada, mientras Backstage usa una grilla editorial sin
                autoplay ni estado adicional.
              </p>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <h3>Contenido con límites honestos</h3>
              <p>
                Servicios, equipo, clientes y contacto históricos no se
                presentan automáticamente como actividad vigente. Cada
                afirmación o flujo se verifica antes del cutover.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>El Núcleo</strong>
          <span>CINE</span>
        </div>
        <p>
          Proyecto histórico de Enzo Pinotti · original 2022 · reconstrucción
          2026
        </p>
      </footer>
    </div>
  );
}
