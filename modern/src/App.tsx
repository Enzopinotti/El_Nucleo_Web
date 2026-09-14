const services = [
  "Videoclips",
  "Publicidad",
  "Cortometrajes",
  "Coberturas",
] as const;

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
          <a href="#historia">Historia</a>
          <a href="#servicios">Servicios</a>
          <a href="#foundation">Foundation</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <p className="eyebrow">
            Proyecto original 2022 · reconstrucción 2026
          </p>
          <h1 id="hero-title">El Núcleo</h1>
          <p className="hero__lead">
            Una identidad audiovisual que vuelve a construirse con una base
            moderna sin borrar el proyecto con el que empezó esta historia.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#historia">
              Ver la evolución
            </a>
            <a className="button button--secondary" href="#servicios">
              Explorar servicios históricos
            </a>
          </div>
        </section>

        <section
          className="history-section"
          id="historia"
          aria-labelledby="history-title"
        >
          <div>
            <p className="section-kicker">Preservar antes de reemplazar</p>
            <h2 id="history-title">2022 sigue siendo parte del producto</h2>
          </div>
          <div className="history-grid">
            <article>
              <span className="history-grid__year">2022</span>
              <h3>Primera versión</h3>
              <p>
                HTML, SCSS, Bootstrap y una estructura multipágina para
                presentar un colectivo de producción audiovisual.
              </p>
            </article>
            <article>
              <span className="history-grid__year">2026</span>
              <h3>Nueva foundation</h3>
              <p>
                React, TypeScript, Vite, pruebas y CI reproducible, con
                accesibilidad y mantenibilidad como parte del contrato técnico.
              </p>
            </article>
          </div>
        </section>

        <section
          className="services-section"
          id="servicios"
          aria-labelledby="services-title"
        >
          <p className="section-kicker">
            Contenido histórico, arquitectura nueva
          </p>
          <h2 id="services-title">Servicios que definían El Núcleo</h2>
          <ul className="service-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <p className="section-note">
            Esta fase todavía no presenta estos servicios como una oferta
            comercial actual. Primero se preserva y verifica el contenido
            original; luego se decide qué información sigue vigente.
          </p>
        </section>

        <section
          className="foundation-section"
          id="foundation"
          aria-labelledby="foundation-title"
        >
          <div>
            <p className="section-kicker">Fase 2</p>
            <h2 id="foundation-title">
              Una base verificable antes de migrar las cinco páginas
            </h2>
          </div>
          <dl className="foundation-grid">
            <div>
              <dt>Runtime</dt>
              <dd>Node 24 + pnpm</dd>
            </div>
            <div>
              <dt>Frontend</dt>
              <dd>React 19 + Vite 8</dd>
            </div>
            <div>
              <dt>Calidad</dt>
              <dd>TypeScript, ESLint, Prettier, Vitest</dd>
            </div>
            <div>
              <dt>Accesibilidad</dt>
              <dd>Semántica, foco visible y movimiento reducido</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          El Núcleo · proyecto histórico de Enzo Pinotti · modernización 2026
        </p>
      </footer>
    </div>
  );
}
