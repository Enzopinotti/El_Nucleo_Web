import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../App";

const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

function parseIndex() {
  return new DOMParser().parseFromString(indexHtml, "text/html");
}

describe("cross-cutting public document contract", () => {
  it("keeps metadata honest while production URL authority is unresolved", () => {
    const document = parseIndex();

    expect(document.documentElement.lang).toBe("es");
    expect(document.title).toContain("El Núcleo");
    expect(document.title).toContain("2026");

    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute("content")).toContain(
      "proyecto audiovisual",
    );
    expect(description?.getAttribute("content")).toContain("2022");

    expect(
      document
        .querySelector('meta[property="og:site_name"]')
        ?.getAttribute("content"),
    ).toBe("El Núcleo — CINE");
    expect(
      document
        .querySelector('meta[property="og:locale"]')
        ?.getAttribute("content"),
    ).toBe("es_AR");
    expect(
      document
        .querySelector('meta[name="twitter:card"]')
        ?.getAttribute("content"),
    ).toBe("summary");

    expect(document.querySelector('meta[name="keywords"]')).toBeNull();

    // These require a real deployment origin/preview asset. Their absence is deliberate
    // until cutover decides the public URL, rather than publishing invented placeholders.
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).toBeNull();
    expect(document.querySelector('meta[property="og:image"]')).toBeNull();
  });

  it("keeps navigation targets, landmarks and the single-H1 hierarchy coherent", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("header")).not.toBeNull();
    expect(container.querySelector("main#main-content")).not.toBeNull();
    expect(container.querySelector("footer")).not.toBeNull();

    const navigation = screen.getByRole("navigation", {
      name: "Navegación principal",
    });

    const links = [
      ...navigation.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    ];
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      const target = link.getAttribute("href");
      expect(target).not.toBeNull();
      expect(container.querySelector(target!)).not.toBeNull();
    }
  });

  it("keeps promoted media local, described and lazy below the hero", () => {
    render(<App />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(1);

    const heroLogo = screen.getByAltText(
      "Logotipo histórico de El Núcleo utilizado en el sitio de 2022",
    );
    expect(heroLogo).not.toHaveAttribute("loading", "lazy");

    for (const image of images) {
      const source = image.getAttribute("src") ?? "";
      expect(source).not.toMatch(/^https?:\/\//i);
      expect(image.getAttribute("alt")?.trim().length).toBeGreaterThan(0);

      if (image !== heroLogo) {
        expect(image).toHaveAttribute("loading", "lazy");
      }
    }
  });

  it("does not silently turn the historical Contacto contract into a live form", () => {
    const { container } = render(<App />);
    const contact = container.querySelector("#contacto");

    expect(contact).not.toBeNull();
    expect(contact?.querySelector("form")).toBeNull();
    expect(
      contact?.querySelector("input, textarea, select, button"),
    ).toBeNull();
  });
});
