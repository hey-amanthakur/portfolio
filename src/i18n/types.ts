import type { ServiceId } from '@/constants';

/**
 * Content ids — must match the `id` fields in src/data/*.ts.
 * Keep the unions here in sync when you add content; a missing key just
 * falls back to the canonical English data at runtime.
 */
export type ProjectId =
  | 'roomvision'
  | 'charrade'
  | 'saathi-ai'
  | 'ml-algorithms'
  | 'cryptography-algorithm'
  | 'multiplayer-game-engine';

export type MilestoneId =
  | 'hackathon-tech-tatva'
  | 'sih-2022'
  | 'et-campus-star'
  | 'yeh-safar-swaad-ka'
  | 'freelance-2025';

export type TestimonialId = 'test-1' | 'test-2';

export type RepoId =
  | 'gh-roomvision'
  | 'gh-charrade'
  | 'gh-ml-algorithms'
  | 'gh-cryptography-algorithm'
  | 'gh-saathi'
  | 'gh-path-finding';

export type OssId = 'oss-deno-std' | 'oss-enhanced-resolve' | 'oss-sympy';

/**
 * Per-locale content overrides. The canonical English text lives in the
 * src/data/*.ts files; other locales only override the fields translated
 * here. `Partial<Record<...>>` means any key can be omitted and the English
 * data text is used as the fallback.
 */
export interface ILocaleContent {
  readonly projects?: Readonly<Partial<Record<ProjectId, { readonly description: string }>>>;
  readonly services?: Readonly<
    Partial<Record<ServiceId, { readonly title: string; readonly tagline: string; readonly description: string }>>
  >;
  readonly milestones?: Readonly<Partial<Record<MilestoneId, { readonly title: string; readonly description: string }>>>;
  readonly testimonials?: Readonly<Partial<Record<TestimonialId, { readonly quote: string; readonly role: string }>>>;
  readonly pinnedRepos?: Readonly<Partial<Record<RepoId, { readonly description: string }>>>;
  readonly oss?: Readonly<Partial<Record<OssId, { readonly description: string }>>>;
}

/**
 * UI strings shared by every locale. A locale object MUST provide every key
 * (enforced by the `Locale` type) so no button or label can silently stay
 * in another language.
 */
export interface IUIStrings {
  readonly meta: {
    readonly title: string;
    readonly tagline: string;
    readonly sectionLabels: {
      readonly hero: string;
      readonly about: string;
      readonly services: string;
      readonly portfolio: string;
      readonly testimonials: string;
      readonly instagram: string;
      readonly contact: string;
    };
  };
  readonly nav: {
    readonly home: string;
    readonly about: string;
    readonly services: string;
    readonly work: string;
    readonly testimonials: string;
    readonly offHours: string;
    readonly hireMe: string;
    readonly themeToggle: string;
    readonly themeToggleMobile: string;
    readonly menuOpen: string;
    readonly chooseLanguage: string;
  };
  readonly hero: {
    readonly available: string;
    readonly whoami: string;
    readonly hi: string;
    /** Subject pronoun for the rotating persona line (may be empty). */
    readonly i: string;
    readonly buildSoftware: string;
    readonly chaseStreetFood: string;
    readonly codeDescBefore: string;
    readonly codeDescAfter: string;
    readonly foodDescBefore: string;
    readonly foodDescAfter: string;
    readonly personaDeveloper: string;
    readonly personaOffHours: string;
    readonly hireMe: string;
    readonly seeWork: string;
    readonly follow: string;
    readonly viewFoodDiary: string;
    readonly statOpenSource: string;
    readonly statHackathons: string;
    readonly statFoodCommunity: string;
    readonly stackLabel: string;
    readonly codePanelFile: string;
    readonly codePanelRole: string;
    readonly codePanelShipped: string;
    readonly codePanelStatus: string;
    readonly codePanelCommentProduction: string;
    readonly codePanelCommentFuel: string;
    readonly codePanelReadyIn: string;
    readonly foodAlt: string;
    readonly foodSideProject: string;
    readonly foodLocation: string;
    readonly foodFollowers: string;
    readonly foodGrowing: string;
  };
  readonly about: {
    readonly badge: string;
    readonly headingBefore: string;
    readonly headingAfter: string;
    readonly subtext: string;
    readonly statOpenSource: string;
    readonly statHackathons: string;
    readonly statFoodCommunity: string;
    readonly statYearsCoding: string;
    readonly personaCode: string;
    readonly personaFood: string;
  };
  readonly services: {
    readonly badge: string;
    readonly heading: string;
    readonly subtext: string;
    readonly mostBooked: string;
    readonly stackLabel: string;
    readonly startProject: string;
  };
  readonly portfolio: {
    readonly badge: string;
    readonly heading: string;
    readonly subtext: string;
    readonly pinnedRepos: string;
    readonly ossHeading: string;
    readonly contributor: string;
    readonly caseStudies: string;
    readonly allFilter: string;
    readonly categoryLabels: {
      readonly AI: string;
      readonly Web: string;
      readonly 'Data Science': string;
      readonly Security: string;
      readonly 'Game Dev': string;
    };
    readonly searchPlaceholder: string;
    readonly noProjects: string;
    readonly noProjectsHint: string;
  };
  readonly testimonials: {
    readonly badge: string;
    readonly heading: string;
    readonly subtext: string;
    readonly previous: string;
    readonly next: string;
    readonly goto: string;
    readonly profilePhotoAlt: string;
  };
  readonly instagram: {
    readonly badge: string;
    readonly headingBefore: string;
    readonly headingAfter: string;
    readonly descPrefix: string;
    readonly descSuffix: string;
    readonly open: string;
    readonly bannerTitle: string;
    readonly bannerLocation: string;
    readonly follow: string;
  };
  readonly contact: {
    readonly headingBefore: string;
    readonly headingAfter: string;
    readonly subtext: string;
    readonly chatHeaderRole: string;
    readonly chatBubble: string;
    readonly justNow: string;
    readonly tapToWhatsApp: string;
    readonly directContact: string;
    readonly emailLabel: string;
    readonly whatsappLabel: string;
    readonly activeHoursLabel: string;
    readonly activeHoursValue: string;
    readonly buyCoffee: string;
    readonly supportWork: string;
    readonly buy: string;
    readonly waIntro: string;
    readonly waServicePrefix: string;
    readonly waGeneralInquiry: string;
    readonly waDetailsPrefix: string;
    readonly waClosing: string;
  };
  readonly footer: {
    readonly builtWith: string;
  };
  readonly projectCard: {
    readonly featured: string;
    readonly sourceCode: string;
    readonly liveDemo: string;
  };
  readonly repoCard: {
    readonly pr: string;
    readonly prs: string;
  };
}

export interface ILocale {
  readonly ui: IUIStrings;
  readonly content: ILocaleContent;
}

// Nav label keys — the `label` field of navLinks must be one of these.
export type NavKey = keyof IUIStrings['nav'];
