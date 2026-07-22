import type { Locale, Resource, StaticPage } from '@apprentice-atlas/content';
import type { SitePage, SiteResource } from './cms/types';
import type { Metadata } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
const preLaunchLegalPages = new Set(['privacy', 'terms', 'imprint', 'accessibility-statement']);

export function pageMetadata(item: StaticPage | SitePage, locale: Locale): Metadata {
  const dePath = `/de/${item.slug.de}`;
  const enPath = `/en/${item.slug.en}`;
  const current = locale === 'de' ? dePath : enPath;
  return {
    title: 'cmsSeo' in item && item.cmsSeo?.title ? item.cmsSeo.title : item.title[locale],
    description:
      'cmsSeo' in item && item.cmsSeo?.description
        ? item.cmsSeo.description
        : item.description[locale],
    ...(preLaunchLegalPages.has(item.key) || ('cmsSeo' in item && item.cmsSeo?.noIndex)
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: {
      canonical: current,
      languages: { de: dePath, 'en-GB': enPath, 'x-default': enPath },
    },
    openGraph: {
      title: 'cmsSeo' in item && item.cmsSeo?.title ? item.cmsSeo.title : item.title[locale],
      description:
        'cmsSeo' in item && item.cmsSeo?.description
          ? item.cmsSeo.description
          : item.description[locale],
      url: `${base}${current}`,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'website',
      ...('cmsSeo' in item && item.cmsSeo?.socialImageUrl
        ? { images: [{ url: item.cmsSeo.socialImageUrl }] }
        : {}),
    },
  };
}

export function resourceMetadata(item: Resource | SiteResource, locale: Locale): Metadata {
  const dePath = `/de/ressourcen/${item.slug.de}`;
  const enPath = `/en/resources/${item.slug.en}`;
  const current = locale === 'de' ? dePath : enPath;
  return {
    title: 'cmsSeo' in item && item.cmsSeo?.title ? item.cmsSeo.title : item.title[locale],
    description:
      'cmsSeo' in item && item.cmsSeo?.description
        ? item.cmsSeo.description
        : item.description[locale],
    ...('cmsSeo' in item && item.cmsSeo?.noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: {
      canonical: current,
      languages: { de: dePath, 'en-GB': enPath, 'x-default': enPath },
    },
    openGraph: {
      title: 'cmsSeo' in item && item.cmsSeo?.title ? item.cmsSeo.title : item.title[locale],
      description:
        'cmsSeo' in item && item.cmsSeo?.description
          ? item.cmsSeo.description
          : item.description[locale],
      url: `${base}${current}`,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'article',
      ...('cmsSeo' in item && item.cmsSeo?.socialImageUrl
        ? { images: [{ url: item.cmsSeo.socialImageUrl }] }
        : {}),
    },
  };
}
