import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../App";

const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const productionOrigin = "https://el-nucleo-producciones.netlify.app/";
const socialImage = `${productionOrigin}media/el-nucleo-logo.png`;

function parseIndex() {
  return new DOMParser().parseFromString(indexHtml, "text/html");
}

describe("cross-cutting public document contract", () => {
  it("binds truthful metadata to the selected production origin", () => {
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

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe(productionOrigin);
    expect(
      document
        .querySelector('meta[property="og:url"]')
        ?.getAttribute("content"),
    ).toBe(productionOrigin);
    expect(
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content"),
    ).toBe(socialImage);
    expect(
      document
        .querySelector('meta[name="twitter:image"]')
        ?.getAttribute("content"),
    ).toBe(socialImage);
  });

  it("keeps navigation targets, landmarks and the single-H1 hierarchy coherent", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("header")).not.toBeNull();
    expect(container.querySelector("main#main-content")).not.toBeNull();
    expect(container.querySelector("footer")).not.toBeNull();

    const navigation = container.querySelector<HTMLElement>(
      'nav[aria-label="Navegación principal"]',
    );
    expect(navigation).not.toBeNull();

    const links = [
      ...navigation!.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    ];
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      const target = link.getAttribute("href");
      expect(target).not.toBeNull();
      expect(container.querySelector(target!)).not.toBeNull();
    }
  });

  it("keeps promoted media local, described and lazy below the hero", () => {
    const { container } = render(<App />);

    const images = [...container.querySelectorAll<HTMLImageElement>("img")];
    expect(images.length).toBeGreaterThan(1);

    const heroLogo =
      container.querySelector<HTMLImageElement>(".hero__mark img");
    expect(heroLogo).not.toBeNull();
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
