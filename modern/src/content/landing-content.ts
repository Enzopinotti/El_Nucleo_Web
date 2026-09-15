import type { HistoricalAboutStatement } from "./historical-about";
import type { HistoricalBackstageFrame } from "./historical-backstage";
import type { HistoricalContactField } from "./historical-contact";
import type { HistoricalService } from "./historical-home";
import type {
  HistoricalClientReference,
  HistoricalPerson,
} from "./historical-team";

export type ContentTruthStatus =
  | "historical"
  | "verified-current"
  | "unverified"
  | "draft";

export type ContentPublicationState = "public" | "withheld";

export type RepositoryProvenance = {
  kind: "repository";
  path: string;
  blobSha?: string;
  year?: number;
  note?: string;
};

export type TruthBoundary = {
  status: ContentTruthStatus;
  publication: ContentPublicationState;
  sources: readonly RepositoryProvenance[];
  note: string;
};

export type ContentDomain<T> = {
  truth: TruthBoundary;
  data: T;
};

export type NavigationItem = {
  id: string;
  index: string;
  label: string;
  href: `#${string}`;
};

export type HeroContextItem = {
  label: string;
  value: string;
};

export type HeroAction = {
  label: string;
  href: `#${string}`;
  variant: "primary" | "secondary";
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  context: readonly HeroContextItem[];
  lead: string;
  actions: readonly HeroAction[];
  markLabel: string;
  markCode: string;
  markCaption: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

export type PrincipleItem = {
  id: string;
  index: string;
  title: string;
  body: string;
};

export type ProjectEntry = {
  id: string;
  title: string;
  summary: string;
  status: ContentTruthStatus;
  source: RepositoryProvenance;
};

export type ContactChannel = {
  id: string;
  label: string;
  href: string;
  kind: "email" | "phone" | "social" | "form" | "other";
  status: ContentTruthStatus;
};

export type SeoContent = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  locale: string;
  canonicalUrl: string | null;
  socialImage: string | null;
};

export type HistoricalContactArchive = {
  sourceYear: number;
  sourcePath: string;
  sourceBlob: string;
  sourceMethod: string;
  sourceAction: string;
  sourceEncoding: string;
  sourcePromise: string;
  fields: readonly HistoricalContactField[];
};

export type LandingContent = {
  siteIdentity: ContentDomain<{
    name: string;
    tag: string;
    edition: string;
    footerLine: string;
    logo: {
      src: string;
      alt: string;
    };
  }>;
  navigation: readonly NavigationItem[];
  hero: ContentDomain<HeroContent>;
  archive: {
    about: ContentDomain<readonly HistoricalAboutStatement[]>;
    services: ContentDomain<readonly HistoricalService[]>;
    backstage: ContentDomain<readonly HistoricalBackstageFrame[]>;
    people: ContentDomain<readonly HistoricalPerson[]>;
    clientReferences: ContentDomain<readonly HistoricalClientReference[]>;
    contact: ContentDomain<HistoricalContactArchive>;
  };
  current: {
    projects: ContentDomain<readonly ProjectEntry[]>;
    contactChannels: ContentDomain<readonly ContactChannel[]>;
  };
  history: ContentDomain<{
    kicker: string;
    title: string;
    items: readonly TimelineItem[];
  }>;
  reconstruction: ContentDomain<{
    kicker: string;
    title: string;
    principles: readonly PrincipleItem[];
  }>;
  seo: ContentDomain<SeoContent>;
};
