export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Country = 'de' | 'uk' | 'both';
export type Audience = 'young-people' | 'schools' | 'parents' | 'partners';
export type ResourceKind = 'guide' | 'career' | 'application' | 'parent' | 'adviser' | 'insight';

export type LocalizedText = Record<Locale, string>;

export interface ResourceSection {
  heading: LocalizedText;
  paragraphs: Record<Locale, string[]>;
  bullets?: Record<Locale, string[]>;
}

export interface Resource {
  id: string;
  translationGroup: string;
  slug: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  kind: ResourceKind;
  country: Country;
  audiences: Audience[];
  readMinutes: number;
  reviewedAt: string;
  reviewer: string;
  sources: { label: string; url: string }[];
  sections: ResourceSection[];
}

export interface StaticPage {
  key: string;
  slug: LocalizedText;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    body: LocalizedText;
    points?: Record<Locale, string[]>;
  }>;
  cta?: 'partner' | 'app' | 'resources' | 'contact';
}
