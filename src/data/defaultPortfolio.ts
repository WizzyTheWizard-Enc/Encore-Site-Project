import { PortfolioData } from '../types/portfolio';

export const EMPEROR_PORTRAIT_URL =
  '/assets/aistudio/Imperial_Throne_Above_the_Stars_bb774ab0.png';

export const GENERATED_IMAGE_PRESETS = [
  {
    label: 'Imperial Throne Above the Stars',
    url: EMPEROR_PORTRAIT_URL,
  },
  {
    label: 'Deep Space Horizon',
    url: '/src/assets/images/space_hero_horizon_1795596178029.jpg',
  },
  {
    label: 'Galactic Empire Armada',
    url: '/src/assets/images/empire_galactic_armada_1795596177820.jpg',
  },
  {
    label: 'Orbital Gaming Station',
    url: '/src/assets/images/hobby_gaming_station_1795596177797.jpg',
  },
  {
    label: 'Cosmic Reading Lounge',
    url: '/src/assets/images/hobby_cosmic_library_1795596178087.jpg',
  },
  {
    label: 'Classified Vault Chamber',
    url: '/src/assets/images/classified_vault_sector_1795596178003.jpg',
  },
];

export const RICK_ASTLEY_YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  brandTitle: 'Wisnu Hariputra',
  home: {
    kicker: 'Imperial Proclamation · Galactic Dominion · NIT 22.41.375',
    headline: 'One Emperor. One Armada. Eternal Order Across the Stars.',
    summary:
      'I am Wisnu Athayha Hariputra—Navigator of Nautical VII Foxtrot and Sovereign Architect of the coming Galactic Empire. Witness the expansion that will unite uncharted star systems under absolute justice, protected freedom, and unyielding cosmic security.',
    ctaLabel: 'Emperor Profile',
    secondaryLabel: 'Galactic Empire Plan',
    backdropUrl: '/src/assets/images/empire_galactic_armada_1795596177820.jpg',
    propaganda: [
      {
        id: 'prop-throne',
        code: 'Edict 01',
        title: 'The Eternal Throne Above the Stars',
        promise:
          'Under one supreme Sovereign, fractured sectors bow to unified imperial justice—ending lawlessness, piracy, and weak governance forever.',
        directive: 'Absolute Imperial Sovereignty',
        imageUrl: EMPEROR_PORTRAIT_URL,
      },
      {
        id: 'prop-armada',
        code: 'Edict 02',
        title: 'Armada Encircling New Worlds',
        promise:
          'Orbital mining rings and dreadnought battlefleets turn unexplored ringed giants and metallic asteroid belts into limitless imperial prosperity.',
        directive: 'Cosmic Resource Harvesting',
        imageUrl: '/src/assets/images/empire_galactic_armada_1795596177820.jpg',
      },
      {
        id: 'prop-horizon',
        code: 'Edict 03',
        title: 'Sovereign Jump Corridors',
        promise:
          'Every conquered star system gains fortified hyperspace lanes, guaranteeing free and uninterrupted passage for loyal citizens of the realm.',
        directive: 'Uncharted Frontier Conquest',
        imageUrl: '/src/assets/images/space_hero_horizon_1795596178029.jpg',
      },
      {
        id: 'prop-vault',
        code: 'Edict 04',
        title: 'Bastion of Galactic Security',
        promise:
          'Deep-core command citadels and planetary defense grids stand watch across the void—ensuring no external threat ever breaches imperial space.',
        directive: 'Unbreakable Sector Defense',
        imageUrl: '/src/assets/images/classified_vault_sector_1795596178003.jpg',
      },
    ],
    promises: [
      {
        id: 'prom-justice',
        title: 'Incorruptible Justice',
        summary:
          'One decisive sovereign law across every star system—eliminating corruption and disorder with iron-willed clarity.',
      },
      {
        id: 'prom-freedom',
        title: 'Protected Freedom',
        summary:
          'Safe interstellar trade, open orbital horizons, and prosperity secured for all worlds loyal to the Imperial Crown.',
      },
      {
        id: 'prom-security',
        title: 'Absolute Security',
        summary:
          'An invincible starfleet and deep-space surveillance network guarding every colony from rim to core.',
      },
    ],
  },
  identity: {
    sectionTitle: '01. Emperor Profile',
    sectionSubtitle:
      'Imperial dossier, maritime bearing, and sovereign chronicle of the sole ruler of the Galactic Universe.',
    imperialTitle: 'The Sovereign Tyrant & Sole Emperor of the Galactic Universe',
    fullName: 'Wisnu Athayha Hariputra',
    nit: '22.41.375',
    classMajor: 'NAUTICAL - VII - FOXTROT',
    profileImageUrl: EMPEROR_PORTRAIT_URL,
    biography:
      'I am Wisnu Athayha Hariputra—forged in precision maritime command within NAUTICAL - VII - FOXTROT (NIT 22.41.375) and destined to ascend as the ruthless yet resolute Tyrant and One True Emperor of the Galactic Universe. Weak empires crumble under divided voices; lasting civilization requires a single unshakable will. Bearing sword and plasma blaster into the cosmic frontier, I conquer lawless stars not for chaos, but to deliver incorruptible justice, protected freedom, and absolute security to my new Galactic Empire.',
    backdropUrl: EMPEROR_PORTRAIT_URL,
    extraFields: [
      {
        id: 'id-rank',
        label: 'Imperial Designation',
        value: 'Supreme Emperor & Fleet Admiral',
      },
      {
        id: 'id-track',
        label: 'Academy Discipline',
        value: 'Nautical Navigation & Maritime Command',
      },
      {
        id: 'id-platoon',
        label: 'Division / Squadron',
        value: 'NAUTICAL · VII · FOXTROT',
        mono: true,
      },
      {
        id: 'id-creed',
        label: 'Imperial Creed',
        value: 'Justice, Freedom & Security Through Sovereign Dominion',
      },
    ],
  },
  contact: {
    sectionTitle: '02. Contact & Imperial Channels',
    sectionSubtitle:
      'Verified diplomatic and personal communication lines for allies, cadets, and inquiries.',
    backdropUrl: '/src/assets/images/space_hero_horizon_1795596178029.jpg',
    entries: [
      {
        id: 'c-phone',
        kind: 'phone',
        label: 'Phone Number',
        displayValue: '+62 812-3456-7890',
        href: 'tel:+6281234567890',
        note: 'Direct voice & encrypted messaging channel',
      },
      {
        id: 'c-instagram',
        kind: 'instagram',
        label: 'Instagram',
        displayValue: '@wisnuathayha',
        href: 'https://www.instagram.com/',
        note: 'Personal dispatches, maritime cadet logs, and visual records',
      },
      {
        id: 'c-linkedin',
        kind: 'linkedin',
        label: 'LinkedIn',
        displayValue: 'in/wisnu-athayha-hariputra',
        href: 'https://www.linkedin.com/',
        note: 'Academic credentials, nautical portfolio, and leadership track',
      },
      {
        id: 'c-email',
        kind: 'email',
        label: 'Official Email',
        displayValue: 'wisnuathayha280803.official@gmail.com',
        href: 'mailto:wisnuathayha280803.official@gmail.com',
        note: 'Formal correspondence and diplomatic proposals',
      },
    ],
  },
  hobbies: {
    sectionTitle: '03. Off-Watch Pursuits & Hobbies',
    sectionSubtitle:
      'Hover or select either pursuit to shift the orbital backdrop—sharpening tactical command through gaming and deep reading.',
    backdropUrl: '/src/assets/images/hobby_gaming_station_1795596177797.jpg',
    items: [
      {
        id: 'h-gaming',
        title: 'Playing Games',
        subtitle: 'Grand Strategy · Space Conquest · Tactical Arenas',
        description:
          'When off watch, I command grand strategy campaigns, deep-space fleet simulations, and competitive tactical games that sharpen decisive leadership, resource logistics, and rapid battlefield judgment.',
        imageUrl: '/src/assets/images/hobby_gaming_station_1795596177797.jpg',
        highlights: ['Grand Strategy Campaigns', 'Space Simulations', 'Competitive Tactics'],
      },
      {
        id: 'h-reading',
        title: 'Reading Books',
        subtitle: 'Galactic Epics · Military Doctrine · Philosophy',
        description:
          'Quiet hours in the orbital archive belong to books—studying naval history, imperial statecraft, classic strategy treatises, and hard science fiction that inspire the architecture of a cosmic civilization.',
        imageUrl: '/src/assets/images/hobby_cosmic_library_1795596178087.jpg',
        highlights: ['Naval & Imperial History', 'Hard Science Fiction', 'Strategic Philosophy'],
      },
    ],
  },
  empire: {
    sectionTitle: '04. Future Project: The Galactic Empire',
    sectionSubtitle:
      'Long-range masterplan for conquering star systems, harvesting cosmic resources, and forging sovereign wealth.',
    manifesto:
      'My ultimate future project reaches far beyond Earth’s oceans: to establish an unstoppable Galactic Empire that rules uncharted star systems, commands interstellar trade arteries, and builds limitless wealth through the conquest of resource-rich worlds and automated cosmic resource harvesting.',
    backdropUrl: '/src/assets/images/empire_galactic_armada_1795596177820.jpg',
    pillars: [
      {
        id: 'e-1',
        code: 'Phase 01',
        title: 'Star System Conquest',
        summary:
          'Launch vanguard dreadnoughts and long-range reconnaissance fleets to claim strategic jump gates, habitable moons, and sovereign orbital territories.',
        targetMetric: '120+ Target Star Systems',
      },
      {
        id: 'e-2',
        code: 'Phase 02',
        title: 'Cosmic Resource Harvesting',
        summary:
          'Deploy orbital extraction rings and automated refineries across metallic asteroid belts, helium-3 gas giants, and rare-element exoplanets.',
        targetMetric: 'Zero-Waste Orbital Refineries',
      },
      {
        id: 'e-3',
        code: 'Phase 03',
        title: 'Sovereign Cosmic Wealth',
        summary:
          'Convert harvested antimatter fuel, exotic star-forged alloys, and stellar energy into an unstoppable imperial treasury funding endless expansion.',
        targetMetric: 'Galactic Reserve Hegemony',
      },
      {
        id: 'e-4',
        code: 'Phase 04',
        title: 'Justice, Freedom & Security',
        summary:
          'Unify every annexed world beneath one disciplined command doctrine—bringing ironclad law, safe prosperity, and eternal cosmic security.',
        targetMetric: 'Unified Imperial Dominion',
      },
    ],
  },
  secret: {
    menuLabel: 'TOP Secret',
    sectionTitle: '05. TOP Secret — Imperial Black Vault',
    classificationBanner: 'OMEGA CLEARANCE · EYES ONLY · ARCHIVE 22-41-375',
    briefingText:
      'You have accessed an encrypted Imperial Black Vault containing Wisnu Athayha Hariputra’s highest-level contingency coordinates, sovereign override keys, and classified command transmission. Unauthorized viewing or duplication is strictly prohibited.',
    redactedNotes: [
      'Codename: Operation Sovereign Horizon (Clearance Level 5)',
      'Telemetry Cipher: Quantum Deep-Space Relay · Checksum Verified',
      'Payload Status: Encrypted Video Transmission Ready for Direct Playback',
    ],
    actionButtonLabel: 'Decrypt & Open Classified Transmission',
    targetUrl: RICK_ASTLEY_YOUTUBE_URL,
    directMenuRedirect: false,
    backdropUrl: '/src/assets/images/classified_vault_sector_1795596178003.jpg',
  },
  visuals: {
    accent: 'sapphire',
    starDensity: 2,
    starSpeed: 1,
  },
};
