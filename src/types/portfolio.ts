export type SectionId = 'home' | 'identity' | 'contact' | 'hobbies' | 'empire' | 'secret';

export type AccentPalette = 'sapphire' | 'cobalt' | 'glacial';

export interface IdentityField {
  id: string;
  label: string;
  value: string;
  mono?: boolean;
}

export interface PropagandaSlide {
  id: string;
  code: string;
  title: string;
  promise: string;
  directive: string;
  imageUrl: string;
}

export interface EmpirePromise {
  id: string;
  title: string;
  summary: string;
}

export interface ContactEntry {
  id: string;
  kind: 'phone' | 'instagram' | 'linkedin' | 'email' | 'custom';
  label: string;
  displayValue: string;
  href: string;
  note: string;
}

export interface HobbyEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface EmpirePillar {
  id: string;
  code: string;
  title: string;
  summary: string;
  targetMetric: string;
}

export interface PortfolioData {
  brandTitle: string;
  home: {
    kicker: string;
    headline: string;
    summary: string;
    ctaLabel: string;
    secondaryLabel: string;
    backdropUrl: string;
    propaganda: PropagandaSlide[];
    promises: EmpirePromise[];
  };
  identity: {
    sectionTitle: string;
    sectionSubtitle: string;
    imperialTitle: string;
    fullName: string;
    nit: string;
    classMajor: string;
    profileImageUrl: string;
    biography: string;
    backdropUrl: string;
    extraFields: IdentityField[];
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    backdropUrl: string;
    entries: ContactEntry[];
  };
  hobbies: {
    sectionTitle: string;
    sectionSubtitle: string;
    backdropUrl: string;
    items: HobbyEntry[];
  };
  empire: {
    sectionTitle: string;
    sectionSubtitle: string;
    manifesto: string;
    backdropUrl: string;
    pillars: EmpirePillar[];
  };
  secret: {
    menuLabel: string;
    sectionTitle: string;
    classificationBanner: string;
    briefingText: string;
    redactedNotes: string[];
    actionButtonLabel: string;
    targetUrl: string;
    directMenuRedirect: boolean;
    backdropUrl: string;
  };
  visuals: {
    accent: AccentPalette;
    starDensity: number; // 1 to 3
    starSpeed: number; // 0.5 to 2.5
  };
}
