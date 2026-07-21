import type { Locale, Resource, StaticPage } from '@apprentice-atlas/content';
import type { Metadata } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
const preLaunchLegalPages = new Set(['privacy', 'terms', 'imprint', 'accessibility-statement']);

export function pageMetadata(item: StaticPage, locale: Locale): Metadata {
  const dePath = `/de/${item.slug.de}`;
  const enPath = `/en/${item.slug.en}`;
  const current = locale === 'de' ? dePath : enPath;
  return {
    title: item.title[locale],
    description: item.description[locale],
    ...(preLaunchLegalPages.has(item.key) ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: current,
      languages: { de: dePath, 'en-GB': enPath, 'x-default': enPath },
    },
    openGraph: {
      title: item.title[locale],
      description: item.description[locale],
      url: `${base}${current}`,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'website',
    },
  };
}

export function resourceMetadata(item: Resource, locale: Locale): Metadata {
  const dePath = `/de/ressourcen/${item.slug.de}`;
  const enPath = `/en/resources/${item.slug.en}`;
  const current = locale === 'de' ? dePath : enPath;
  return {
    title: item.title[locale],
    description: item.description[locale],
    alternates: {
      canonical: current,
      languages: { de: dePath, 'en-GB': enPath, 'x-default': enPath },
    },
    openGraph: {
      title: item.title[locale],
      description: item.description[locale],
      url: `${base}${current}`,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      type: 'article',
    },
  };
}
