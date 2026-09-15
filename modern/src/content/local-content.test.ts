import { describe, expect, it } from "vitest";

import { localLandingContent } from "./local-content";

const publicArchiveDomains = [
  localLandingContent.siteIdentity,
  localLandingContent.archive.about,
  localLandingContent.archive.services,
  localLandingContent.archive.backstage,
  localLandingContent.archive.people,
  localLandingContent.archive.clientReferences,
  localLandingContent.archive.contact,
] as const;

describe("localLandingContent", () => {
  it("keeps every published archive domain explicitly historical", () => {
    for (const domain of publicArchiveDomains) {
      expect(domain.truth.status).toBe("historical");
      expect(domain.truth.publication).toBe("public");
      expect(domain.truth.sources.length).toBeGreaterThan(0);
    }
  });

  it("does not manufacture current projects or contact channels", () => {
    expect(localLandingContent.current.projects.data).toEqual([]);
    expect(localLandingContent.current.projects.truth).toMatchObject({
      status: "unverified",
      publication: "withheld",
    });

    expect(localLandingContent.current.contactChannels.data).toEqual([]);
    expect(localLandingContent.current.contactChannels.truth).toMatchObject({
      status: "unverified",
      publication: "withheld",
    });
  });

  it("preserves the qualified historical collection sizes", () => {
    expect(localLandingContent.archive.about.data).toHaveLength(2);
    expect(localLandingContent.archive.services.data).toHaveLength(4);
    expect(localLandingContent.archive.backstage.data).toHaveLength(4);
    expect(localLandingContent.archive.people.data).toHaveLength(2);
    expect(localLandingContent.archive.clientReferences.data).toHaveLength(2);
    expect(localLandingContent.archive.contact.data.fields).toHaveLength(5);
  });

  it("keeps deployment-specific SEO inputs explicitly unresolved", () => {
    expect(localLandingContent.seo.truth.status).toBe("verified-current");
    expect(localLandingContent.seo.data.canonicalUrl).toBeNull();
    expect(localLandingContent.seo.data.socialImage).toBeNull();
  });

  it("records provenance for the historical identity and contact contract", () => {
    expect(localLandingContent.siteIdentity.truth.sources[0]).toMatchObject({
      path: "assets/recursos/logo.png",
      blobSha: "e7a7f3a485e1a3cc4a7d4538357d9ef713ff4c57",
      year: 2022,
    });

    expect(localLandingContent.archive.contact.truth.sources[0]).toMatchObject({
      path: "views/contacto.html",
      blobSha: "e8a550ad30c708a0893ad31b3b289b15bcf8e118",
      year: 2022,
    });
  });
});
