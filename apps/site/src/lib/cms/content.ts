import 'server-only';

import {
  navigation as fallbackNavigation,
  resources as fallbackResources,
  staticPages as fallbackPages,
  type Audience,
  type Country,
  type Locale,
  type Resource,
  type ResourceKind,
} from '@apprentice-atlas/content';
import { cmsFetch, cmsGlobal, cmsList } from './client';
import { lexicalText, lexicalWordCount } from './rich-text';
import type {
  CallsToAction,
  CmsNavigation,
  EditorialCollection,
  EditorialDocument,
  PayloadRelation,
  SiteFooterSettings,
  SitePage,
  SiteResource,
} from './types';

const collections: EditorialCollection[] = ['guides', 'articles', 'career-fields'];

const relationKey = (relation?: PayloadRelation) =>
  typeof relation === 'object' && relation ? (relation.key ?? relation.name) : undefined;

const relationName = (relation?: PayloadRelation) =>
  typeof relation === 'object' && relation ? relation.name : undefined;

const relationUrl = (relation?: PayloadRelation) =>
  typeof relation === 'object' && relation ? relation.url : undefined;

const pair = (value: string, locale: Locale, other?: string) =>
  locale === 'de' ? { de: value, en: other ?? value } : { de: other ?? value, en: value };

const publishedDocuments = (docs: EditorialDocument[], draft: boolean) =>
  draft ? docs : docs.filter((doc) => !doc._status || doc._status === 'published');

const collectionKind = (collection: EditorialCollection, fallback?: Resource): ResourceKind => {
  if (fallback) return fallback.kind;
  if (collection === 'career-fields') return 'career';
  if (collection === 'articles') return 'insight';
  return 'guide';
};

const collectionFallback = (collection: EditorialCollection) =>
  fallbackResources.filter((resource) =>
    collection === 'career-fields'
      ? resource.kind === 'career'
      : collection === 'articles'
        ? resource.kind === 'insight'
        : resource.kind !== 'career' && resource.kind !== 'insight',
  );

function countryFrom(doc: EditorialDocument, fallback?: Resource): Country {
  const keys = (doc.countries ?? []).map(relationKey);
  if (keys.includes('de') && keys.includes('uk')) return 'both';
  if (keys.includes('uk')) return 'uk';
  if (keys.includes('de')) return 'de';
  return fallback?.country ?? 'both';
}

function audienceFrom(doc: EditorialDocument, fallback?: Resource): Audience[] {
  const allowed: Audience[] = ['young-people', 'schools', 'parents', 'partners'];
  const values = (doc.audiences ?? [])
    .map(relationKey)
    .filter((value): value is Audience => allowed.includes(value as Audience));
  return values.length ? values : (fallback?.audiences ?? ['young-people']);
}

function seoFrom(doc: EditorialDocument) {
  const socialImage = relationUrl(doc.seo?.socialImage);
  return {
    title: doc.seo?.title,
    description: doc.seo?.description,
    noIndex: doc.seo?.noIndex,
    socialImageUrl: socialImage?.startsWith('http')
      ? socialImage
      : socialImage
        ? `${process.env.NEXT_PUBLIC_CMS_URL ?? 'https://cms.apprenticeatlas.com'}${socialImage}`
        : undefined,
  };
}

function mapResource(
  collection: EditorialCollection,
  doc: EditorialDocument,
  allDocuments: EditorialDocument[],
): SiteResource {
  const fallback = fallbackResources.find(
    (resource) => resource.translationGroup === doc.translationGroup,
  );
  const translated = allDocuments.find(
    (candidate) =>
      candidate.translationGroup === doc.translationGroup && candidate.locale !== doc.locale,
  );
  const sources = (doc.sources ?? [])
    .filter((source): source is { label: string; url: string } =>
      Boolean(source.label && source.url),
    )
    .map(({ label, url }) => ({ label, url }));
  return {
    id: fallback?.id ?? doc.translationGroup,
    translationGroup: doc.translationGroup,
    slug: pair(doc.slug, doc.locale, translated?.slug),
    title: pair(doc.title, doc.locale, translated?.title),
    description: pair(doc.excerpt, doc.locale, translated?.excerpt),
    eyebrow:
      fallback?.eyebrow ??
      pair(
        collection === 'career-fields'
          ? doc.locale === 'de'
            ? 'Berufsfeld'
            : 'Career field'
          : collection === 'articles'
            ? doc.locale === 'de'
              ? 'Einblick'
              : 'Insight'
            : doc.locale === 'de'
              ? 'Praxisguide'
              : 'Practical guide',
        doc.locale,
      ),
    kind: collectionKind(collection, fallback),
    country: countryFrom(doc, fallback),
    audiences: audienceFrom(doc, fallback),
    readMinutes: Math.max(2, Math.ceil(lexicalWordCount(doc.body) / 220)),
    reviewedAt: doc.reviewedAt ?? fallback?.reviewedAt ?? doc.updatedAt ?? new Date().toISOString(),
    reviewer: relationName(doc.reviewer) ?? fallback?.reviewer ?? 'Apprentice Atlas Editorial Team',
    sources: sources.length ? sources : (fallback?.sources ?? []),
    sections: fallback?.sections ?? [],
    cmsBody: doc.body,
    cmsSeo: seoFrom(doc),
    updatedAt: doc.updatedAt,
  };
}

async function resourceCollection(
  collection: EditorialCollection,
  locale: Locale,
  draft: boolean,
): Promise<SiteResource[]> {
  const response = await cmsList<EditorialDocument>(collection, { draft, depth: 2 });
  if (!response || response.docs.length === 0)
    return collectionFallback(collection).map((resource) => ({ ...resource }));
  const visible = publishedDocuments(response.docs, draft);
  return visible
    .filter((doc) => doc.locale === locale)
    .map((doc) => mapResource(collection, doc, visible));
}

export async function getSiteResources(locale: Locale, draft = false): Promise<SiteResource[]> {
  const groups = await Promise.all(
    collections.map((collection) => resourceCollection(collection, locale, draft)),
  );
  return groups.flat().sort((a, b) => {
    const aIndex = fallbackResources.findIndex((resource) => resource.id === a.id);
    const bIndex = fallbackResources.findIndex((resource) => resource.id === b.id);
    if (aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
    if (aIndex >= 0) return -1;
    if (bIndex >= 0) return 1;
    return a.title[locale].localeCompare(b.title[locale], locale);
  });
}

export async function getSiteResource(locale: Locale, slug: string, draft = false) {
  const all = await getSiteResources(locale, draft);
  return all.find((resource) => resource.slug[locale] === slug);
}

function mapPage(doc: EditorialDocument, allDocuments: EditorialDocument[]): SitePage {
  const fallback = fallbackPages.find((page) => page.key === doc.translationGroup);
  const translated = allDocuments.find(
    (candidate) =>
      candidate.translationGroup === doc.translationGroup && candidate.locale !== doc.locale,
  );
  return {
    key: fallback?.key ?? doc.translationGroup,
    slug: pair(doc.slug, doc.locale, translated?.slug),
    eyebrow:
      fallback?.eyebrow ??
      pair(doc.locale === 'de' ? 'Editorial Atlas' : 'Editorial atlas', doc.locale),
    title: pair(doc.title, doc.locale, translated?.title),
    description: pair(doc.excerpt, doc.locale, translated?.excerpt),
    intro: pair(doc.excerpt, doc.locale, translated?.excerpt),
    sections: fallback?.sections ?? [],
    cta: fallback?.cta ?? 'contact',
    cmsBody: doc.body,
    cmsSeo: seoFrom(doc),
    updatedAt: doc.updatedAt,
  };
}

export async function getSitePages(locale: Locale, draft = false): Promise<SitePage[]> {
  const response = await cmsList<EditorialDocument>('pages', { draft, depth: 2 });
  if (!response || response.docs.length === 0) return fallbackPages.map((page) => ({ ...page }));
  const visible = publishedDocuments(response.docs, draft);
  return visible.filter((doc) => doc.locale === locale).map((doc) => mapPage(doc, visible));
}

export async function getSitePage(locale: Locale, path: string, draft = false) {
  const pages = await getSitePages(locale, draft);
  return pages.find((page) => page.slug[locale] === path);
}

type NavigationGlobal = {
  items?: Array<{ locale?: Locale; label?: string; href?: string; parentKey?: string }>;
};

export async function getSiteNavigation(locale: Locale): Promise<CmsNavigation> {
  const global = await cmsGlobal<NavigationGlobal>('navigation');
  if (!global?.items?.length) return fallbackNavigation;
  return fallbackNavigation.map((group) => {
    const items = global.items!.filter(
      (item) => item.locale === locale && item.parentKey === group.key && item.label && item.href,
    );
    return {
      ...group,
      items: items.length
        ? items.map((item) => ({
            label: pair(item.label!, locale),
            href: pair(item.href!, locale),
          }))
        : group.items,
    };
  });
}

type FooterGlobal = {
  copyright?: string;
  links?: Array<{ locale?: Locale; label?: string; href?: string }>;
};
type ContactGlobal = { generalEmail?: string };

export async function getSiteFooter(locale: Locale): Promise<SiteFooterSettings> {
  const [footer, contact] = await Promise.all([
    cmsGlobal<FooterGlobal>('footer'),
    cmsGlobal<ContactGlobal>('contact'),
  ]);
  return {
    copyright: footer?.copyright ?? '© 2026 Estopia Engineering Ltd',
    links: (footer?.links ?? [])
      .filter(
        (link): link is { locale: Locale; label: string; href: string } =>
          link.locale === locale && Boolean(link.label && link.href),
      )
      .map(({ label, href }) => ({ label, href })),
    generalEmail: contact?.generalEmail ?? 'hello@apprenticeatlas.com',
  };
}

type CtaGlobal = {
  items?: Array<{ key?: string; locale?: Locale; label?: string; href?: string }>;
};

export async function getCallsToAction(locale: Locale): Promise<CallsToAction> {
  const global = await cmsGlobal<CtaGlobal>('calls-to-action');
  return Object.fromEntries(
    (global?.items ?? [])
      .filter(
        (item): item is { key: string; locale: Locale; label: string; href: string } =>
          item.locale === locale && Boolean(item.key && item.label && item.href),
      )
      .map((item) => [item.key, { label: item.label, href: item.href }]),
  );
}

type RedirectDocument = { from?: string; to?: string; status?: '301' | '302' };

export async function getCmsRedirect(path: string) {
  const query = new URLSearchParams({
    'where[from][equals]': path,
    limit: '1',
    depth: '0',
  });
  const response = await cmsFetch<{ docs: RedirectDocument[] }>(`/api/redirects?${query}`, {
    tags: ['redirects'],
  });
  const match = response?.docs[0];
  return match?.to ? { to: match.to, permanent: match.status === '301' } : undefined;
}

type GlossaryDocument = {
  locale: Locale;
  term?: string;
  definition?: string;
  _status?: 'draft' | 'published';
};

export async function getGlossaryTerms(locale: Locale, draft = false) {
  const response = await cmsList<GlossaryDocument>('glossary-terms', { draft, depth: 0 });
  if (!response?.docs.length) return undefined;
  return response.docs
    .filter(
      (term) =>
        term.locale === locale &&
        (draft || !term._status || term._status === 'published') &&
        term.term &&
        term.definition,
    )
    .map((term) => ({ term: term.term!, definition: term.definition! }))
    .sort((a, b) => a.term.localeCompare(b.term, locale));
}

export function resourceSearchText(resource: SiteResource, locale: Locale) {
  return `${resource.title[locale]} ${resource.description[locale]} ${lexicalText(resource.cmsBody?.root)}`;
}
