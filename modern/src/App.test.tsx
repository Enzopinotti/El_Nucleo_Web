import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "./App";

afterEach(() => {
  cleanup();
});

describe("El Núcleo modern migration", () => {
  it("preserves the project identity and distinguishes historical context", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "El Núcleo", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(/proyecto de aprendizaje 2022/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/distingue con claridad el archivo histórico/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/logotipo histórico de El Núcleo/i),
    ).toBeInTheDocument();
  });

  it("exposes Nosotros as a historical source instead of a current company claim", () => {
    render(<App />);

    const about = screen.getByRole("region", {
      name: /lo que El Núcleo decía de sí mismo/i,
    });

    expect(
      within(about).getByText(/somos un colectivo emprendedor dedicado/i),
    ).toBeInTheDocument();
    expect(
      within(about).getByText(/no confirma que ese colectivo siga operativo/i),
    ).toBeInTheDocument();
    expect(within(about).getByText("No asumida")).toBeInTheDocument();

    const sourceReferences = within(about).getAllByText(
      /views\/nosotros\.html/i,
    );
    expect(sourceReferences).toHaveLength(3);
  });

  it("keeps historical aspirations explicit without claiming they happened", () => {
    render(<App />);

    const about = screen.getByRole("region", {
      name: /lo que El Núcleo decía de sí mismo/i,
    });

    expect(
      within(about).getByText(/colaboración con distintas ONGs/i),
    ).toBeInTheDocument();
    expect(
      within(about).getByText(
        /no afirmamos que esas campañas, colaboraciones o el largometraje se hayan concretado/i,
      ),
    ).toBeInTheDocument();
  });

  it("does not promote the unverified generic social links from the 2022 page", () => {
    render(<App />);

    for (const network of [
      "Facebook",
      "YouTube",
      "Instagram",
      "Vimeo",
      "Twitter",
    ]) {
      expect(screen.queryByRole("link", { name: network })).not.toBeInTheDocument();
    }
  });

  it("links the primary navigation to the migrated Nosotros section", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Nosotros" })).toHaveAttribute(
      "href",
      "#nosotros",
    );
  });

  it("exposes the historical archive without presenting it as a current commercial catalog", () => {
    render(<App />);

    const gallery = screen.getByRole("region", { name: /cuatro categorías/i });

    expect(
      within(gallery).getByRole("heading", { name: "Videoclips", level: 3 }),
    ).toBeInTheDocument();
    expect(
      within(gallery).getByText(
        /no representa por sí solo un catálogo comercial vigente/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(gallery).getByRole("img", { name: /categoría Videoclips/i }),
    ).toHaveAttribute("loading", "lazy");
  });

  it("moves through the archive with explicit accessible controls", () => {
    render(<App />);

    const gallery = screen.getByRole("region", { name: /cuatro categorías/i });
    const next = within(gallery).getByRole("button", {
      name: /categoría siguiente/i,
    });
    const previous = within(gallery).getByRole("button", {
      name: /categoría anterior/i,
    });

    expect(within(gallery).getByRole("status")).toHaveTextContent(
      "1 de 4 — Videoclips",
    );

    fireEvent.click(next);
    expect(within(gallery).getByRole("status")).toHaveTextContent(
      "2 de 4 — Publicidad",
    );
    expect(
      within(gallery).getByRole("img", { name: /categoría Publicidad/i }),
    ).toBeInTheDocument();

    fireEvent.click(previous);
    expect(within(gallery).getByRole("status")).toHaveTextContent(
      "1 de 4 — Videoclips",
    );
  });

  it("wraps backwards from the first archive item", () => {
    render(<App />);

    const gallery = screen.getByRole("region", { name: /cuatro categorías/i });
    fireEvent.click(
      within(gallery).getByRole("button", { name: /categoría anterior/i }),
    );

    expect(within(gallery).getByRole("status")).toHaveTextContent(
      "4 de 4 — Coberturas",
    );
  });

  it("keeps a keyboard-oriented skip link to the main content", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /saltar al contenido/i }),
    ).toHaveAttribute("href", "#main-content");
  });
});
