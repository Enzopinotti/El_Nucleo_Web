import type {
  HistoricalClientReference,
  HistoricalPerson,
} from "../content/historical-team";

type HistoricalTeamProps = {
  people: HistoricalPerson[];
  clientReferences: HistoricalClientReference[];
};

export function HistoricalTeam({
  people,
  clientReferences,
}: HistoricalTeamProps) {
  return (
    <section
      className="historical-team"
      id="equipo"
      aria-labelledby="team-title"
      aria-describedby="team-boundary"
    >
      <div className="historical-team__intro">
        <div>
          <p className="section-kicker">Equipo · archivo 2022</p>
          <h2 id="team-title">Personas que la página histórica mostraba</h2>
        </div>
        <p id="team-boundary" className="section-note">
          Este registro conserva nombres y fotografías tal como estaban
          asociados en la web de 2022. No confirma pertenencia, colaboración,
          rol ni vínculo vigente con El Núcleo en 2026.
        </p>
      </div>

      <div className="historical-team__people">
        {people.map((person) => (
          <article className="historical-person" key={person.id}>
            <div className="historical-person__media">
              <img
                src={person.image}
                alt={person.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="historical-person__body">
              <p className="historical-person__source">Etiqueta fuente · 2022</p>
              <h3>{person.sourceLabel}</h3>
              <p>
                La página histórica asociaba esta fotografía a ese nombre. No
                se infiere un cargo, responsabilidad ni relación actual.
              </p>
              <span className="historical-person__status">
                Vigencia 2026 · no verificada
              </span>
            </div>
          </article>
        ))}
      </div>

      <aside
        className="historical-clients"
        aria-labelledby="historical-clients-title"
      >
        <div>
          <p className="section-kicker">Referencias del archivo</p>
          <h3 id="historical-clients-title">
            Etiquetadas como «Clientes Habituales» en 2022
          </h3>
          <p className="section-note">
            Se conserva la etiqueta histórica como evidencia de la página
            original. No se afirma una relación comercial, contratación,
            endorsement ni vínculo actual en 2026.
          </p>
        </div>

        <ul className="historical-clients__list">
          {clientReferences.map((reference) => (
            <li key={reference.id}>
              <strong>{reference.sourceLabel}</strong>
              <span>{reference.sourceContext}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
