import type { HistoricalContactField } from "../content/historical-contact";

type HistoricalContactProps = {
  contract: {
    sourceYear: number;
    sourcePath: string;
    sourceBlob: string;
    sourceMethod: string;
    sourceAction: string;
    sourceEncoding: string;
    sourcePromise: string;
    fields: readonly HistoricalContactField[];
  };
};

const fieldTypeLabel: Record<HistoricalContactField["kind"], string> = {
  text: "Texto",
  email: "Correo electrónico",
  checkbox: "Casilla opcional",
  textarea: "Texto largo",
};

export function HistoricalContact({ contract }: HistoricalContactProps) {
  return (
    <section
      className="historical-contact"
      id="contacto"
      aria-labelledby="contacto-title"
      aria-describedby="contacto-boundary"
    >
      <div className="historical-contact__intro">
        <div>
          <p className="section-kicker">Contacto · archivo 2022</p>
          <h2 id="contacto-title">Lo que el formulario histórico pedía</h2>
        </div>

        <p id="contacto-boundary" className="section-note">
          La reconstrucción 2026 conserva el contrato visible de la página
          original, pero no recopila ni transmite datos personales: el código
          de 2022 no define un destino de entrega verificable.
        </p>
      </div>

      <aside
        className="historical-contact__status"
        aria-label="Estado del contacto en 2026"
      >
        <div>
          <span className="historical-contact__status-label">
            Recolección de datos 2026
          </span>
          <strong>No habilitada</strong>
        </div>
        <p>
          No hay formulario operativo, newsletter activa ni estado de éxito
          simulado. Un canal real deberá definir destino, privacidad, anti-spam
          y estados de error antes de aceptar información de una persona.
        </p>
      </aside>

      <div className="historical-contact__contract">
        <article className="historical-contact__source">
          <p className="historical-contact__eyebrow">Contrato fuente</p>
          <h3>El HTML enviaba por GET a una acción vacía</h3>
          <dl>
            <div>
              <dt>Año</dt>
              <dd>{contract.sourceYear}</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>
                <code>{contract.sourcePath}</code>
              </dd>
            </div>
            <div>
              <dt>Método</dt>
              <dd>
                <code>{contract.sourceMethod}</code>
              </dd>
            </div>
            <div>
              <dt>Action</dt>
              <dd>
                <code>{contract.sourceAction || "vacía"}</code>
              </dd>
            </div>
          </dl>
          <p className="historical-contact__warning">
            Repetir ese transporte podría exponer nombre, correo y consulta en
            una URL o historial del navegador. Por eso no se replica.
          </p>
        </article>

        <div className="historical-contact__fields" aria-label="Campos históricos">
          {contract.fields.map((field) => (
            <article className="historical-contact__field" key={field.id}>
              <div>
                <p className="historical-contact__eyebrow">
                  Campo fuente · {fieldTypeLabel[field.kind]}
                </p>
                <h3>{field.sourceLabel}</h3>
              </div>
              <dl>
                <div>
                  <dt>Requerido en 2022</dt>
                  <dd>{field.required ? "Sí" : "No"}</dd>
                </div>
                <div>
                  <dt>Name original</dt>
                  <dd>
                    <code>{field.sourceName}</code>
                  </dd>
                </div>
                {field.maxLength ? (
                  <div>
                    <dt>Límite histórico</dt>
                    <dd>{field.maxLength} caracteres</dd>
                  </div>
                ) : null}
              </dl>
              {field.sourceNote ? (
                <p className="historical-contact__field-note">
                  {field.sourceNote}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <blockquote className="historical-contact__promise">
        <p>“{contract.sourcePromise}”</p>
        <footer>
          Promesa visible en la página de 2022. La versión 2026 no la repite
          como compromiso actual porque no existe un transporte verificado.
        </footer>
      </blockquote>
    </section>
  );
}
