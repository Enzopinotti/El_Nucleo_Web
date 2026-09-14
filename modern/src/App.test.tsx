import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "./App";

afterEach(() => {
  cleanup();
});

describe("El Núcleo modern foundation", () => {
  it("preserves the project identity and historical context", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "El Núcleo", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/proyecto original 2022/i)).toBeInTheDocument();
    expect(screen.getByText(/react 19 \+ vite 8/i)).toBeInTheDocument();
  });

  it("exposes the original service categories without claiming current commercial status", () => {
    render(<App />);

    for (const service of [
      "Videoclips",
      "Publicidad",
      "Cortometrajes",
      "Coberturas",
    ]) {
      expect(screen.getByText(service)).toBeInTheDocument();
    }

    expect(
      screen.getByText(
        /no presenta estos servicios como una oferta comercial actual/i,
      ),
    ).toBeInTheDocument();
  });

  it("includes a keyboard-oriented skip link", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /saltar al contenido/i }),
    ).toHaveAttribute("href", "#main-content");
  });
});
