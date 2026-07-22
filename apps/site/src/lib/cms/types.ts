import type { Audience, Locale, NavGroup, Resource, StaticPage } from '@apprentice-atlas/content';

export type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  direction?: 'ltr' | 'rtl' | null;
  listType?: 'bullet' | 'number' | 'check';
  checked?: boolean;
  fields?: { url?: string; newTab?: boolean; linkType?: string };
  url?: string;
  value?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    sizes?: Record<string, { url?: string }>;
  };
  children?: LexicalNode[];
};

export type LexicalDocument = { root?: LexicalNode };

export type CmsSeo = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  socialImageUrl?: string;
};

export interface SiteResource extends Resource {
  cmsBody?: LexicalDocument;
  cmsSeo?: CmsSeo;
  updatedAt?: string;
}

export interface SitePage extends StaticPage {
  cmsBody?: LexicalDocument;
  cmsSeo?: CmsSeo;
  updatedAt?: string;
}

export type PayloadRelation =
  | number
  | string
  | { id?: number | string; key?: string; name?: string; url?: string; alt?: string };

export type EditorialDocument = {
  id: number | string;
  locale: Locale;
  translationGroup: string;
  slug: string;
  title: string;
  excerpt: string;
  body: LexicalDocument;
  chapterNumber?: string;
  reviewer?: PayloadRelation;
  reviewedAt?: string;
  sources?: Array<{ label?: string; url?: string }>;
  audiences?: PayloadRelation[];
  countries?: PayloadRelation[];
  seo?: {
    title?: string;
    description?: string;
    noIndex?: boolean;
    socialImage?: PayloadRelation;
  };
  _status?: 'draft' | 'published';
  updatedAt?: string;
};

export type EditorialCollection = 'pages' | 'articles' | 'guides' | 'career-fields';

export type CmsNavigation = NavGroup[];

export type SiteFooterSettings = {
  copyright: string;
  links: Array<{ label: string; href: string }>;
  generalEmail: string;
};

export type CallsToAction = Record<string, { label: string; href: string }>;

export type ResourceFilters = {
  query?: string;
  country?: string | null;
  kind?: string | null;
  audience?: Audience | null;
};
