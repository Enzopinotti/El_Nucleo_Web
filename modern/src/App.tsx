import { ArchiveGallery } from "./components/ArchiveGallery";
import { BackstageArchive } from "./components/BackstageArchive";
import { HistoricalAbout } from "./components/HistoricalAbout";
import { HistoricalContact } from "./components/HistoricalContact";
import { HistoricalTeam } from "./components/HistoricalTeam";
import { localLandingContent } from "./content/local-content";

export function App() {
  const content = localLandingContent;
  const identity = content.siteIdentity.data;
  const shell = content.shell.data;
  const hero = content.hero.data;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="site-header__masthead">
          <a
            className="brand"
            href="#top"
            aria-label={`${identity.name}, volver al inicio`}
          >
            <span className="brand__name">{identity.name}</span>
            <span className="brand__tag">{identity.tag}</span>
          </a>
          <span className="site-header__edition" aria-hidden="true">
            {shell.edition}
          </span>
        </div>

        <nav className="site-nav" aria-label="Navegación principal">
          {content.navigation.map((item) => (
            <a href={item.href} key={item.id}>
              <span aria-hidden="true">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero__tagline">{hero.tagline}</p>

            <div
              className="hero__context"
              aria-label="Contexto temporal del proyecto"
            >
              {hero.context.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <p className="hero__lead">{hero.lead}</p>
            <div className="hero__actions">
              {hero.actions.map((action) => (
                <a
                  className={`button button--${action.variant}`}
                  href={action.href}
                  key={action.href}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          <figure className="hero__mark">
            <div className="hero__mark-meta" aria-hidden="true">
              <span>{hero.markLabel}</span>
              <span>{hero.markCode}</span>
            </div>
            <div className="hero__mark-frame">
              <img
                src={identity.logo.src}
                alt={identity.logo.alt}
                decoding="async"
              />
            </div>
            <figcaption>{hero.markCaption}</figcaption>
          </figure>
        </section>

        <HistoricalAbout statements={content.archive.about.data} />

        <div id="archivo">
          <ArchiveGallery services={content.archive.services.data} />
        </div>

        <BackstageArchive frames={content.archive.backstage.data} />

        <HistoricalTeam
          people={content.archive.people.data}
          clientReferences={content.archive.clientReferences.data}
        />

        <HistoricalContact contract={content.archive.contact.data} />

        <section
          className="history-section"
          id="historia"
          aria-labelledby="history-title"
        >
          <div className="section-heading">
            <p className="section-kicker">{content.history.data.kicker}</p>
            <h2 id="history-title">{content.history.data.title}</h2>
          </div>

          <ol className="history-timeline">
            {content.history.data.items.map((item) => (
              <li key={item.year}>
                <span className="history-timeline__year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="rebuild-section"
          id="reconstruccion"
          aria-labelledby="rebuild-title"
        >
          <div className="section-heading">
            <p className="section-kicker">
              {content.reconstruction.data.kicker}
            </p>
            <h2 id="rebuild-title">{content.reconstruction.data.title}</h2>
          </div>

          <div className="rebuild-grid">
            {content.reconstruction.data.principles.map((principle) => (
              <article key={principle.id}>
                <span aria-hidden="true">{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{identity.name}</strong>
          <span>{identity.tag}</span>
        </div>
        <p>{shell.footerLine}</p>
      </footer>
    </div>
  );
}
