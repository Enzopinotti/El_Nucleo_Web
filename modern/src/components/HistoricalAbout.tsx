import type { HistoricalAboutStatement } from "../content/historical-about";
import { historicalAboutSource } from "../content/historical-about";

type HistoricalAboutProps = {
  statements: readonly HistoricalAboutStatement[];
};

export function HistoricalAbout({ statements }: HistoricalAboutProps) {
  return (
    <section
      className="about-section"
      id="nosotros"
      aria-labelledby="about-title"
    >
      <div className="section-heading about-section__intro">
        <p className="section-kicker">Archivo editorial · 2022</p>
        <h2 id="about-title">Lo que El Núcleo decía de sí mismo</h2>
        <p className="section-note">
          Esta reconstrucción conserva la narrativa original como fuente
          histórica. El tiempo verbal del archivo pertenece a 2022: no se usa
          para afirmar que hoy exista la misma organización, actividad o plan.
        </p>
      </div>

      <div className="about-section__body">
        <div className="about-archive-grid">
          {statements.map((statement) => (
            <article className="about-archive-card" key={statement.id}>
              <div className="about-archive-card__meta">
                <span>{statement.sourceYear}</span>
                <span>Fuente histórica</span>
              </div>
              <h3>{statement.title}</h3>
              <blockquote>
                <p>{statement.sourceText}</p>
                <footer>
                  <cite>{historicalAboutSource.path}</cite>
                </footer>
              </blockquote>
              <p className="about-archive-card__context">
                {statement.editorialContext}
              </p>
            </article>
          ))}
        </div>

        <aside
          className="truth-boundary"
          aria-labelledby="truth-boundary-title"
        >
          <div className="truth-boundary__status">
            <span aria-hidden="true">2026</span>
            <span>Contexto, no revalidación</span>
          </div>
          <h3 id="truth-boundary-title">
            Preservar el texto no significa afirmar su vigencia
          </h3>
          <p>
            El objetivo es mostrar qué quería comunicar el proyecto original y
            cómo se documenta hoy esa historia. Cuando una afirmación necesita
            evidencia actual, permanece fuera de la superficie moderna hasta
            ser verificada.
          </p>
          <dl>
            <div>
              <dt>Fuente</dt>
              <dd>{historicalAboutSource.path} · 2022</dd>
            </div>
            <div>
              <dt>Vigencia 2026</dt>
              <dd>No asumida</dd>
            </div>
            <div>
              <dt>Redes históricas</dt>
              <dd>No publicadas sin verificación</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
