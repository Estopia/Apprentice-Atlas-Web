import { getSitePages, getSiteResources } from '@/lib/cms/content';
import type { MetadataRoute } from 'next';

const preLaunchLegalPages = new Set(['privacy', 'terms', 'imprint', 'accessibility-statement']);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
  const updated = new Date();
  const [dePages, enPages, deResources, enResources] = await Promise.all([
    getSitePages('de'),
    getSitePages('en'),
    getSiteResources('de'),
    getSiteResources('en'),
  ]);
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/de`,
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { de: `${base}/de`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { de: `${base}/de`, en: `${base}/en` } },
    },
  ];
  const pageGroups = new Map([...dePages, ...enPages].map((page) => [page.key, page]));
  for (const key of new Set([...dePages, ...enPages].map((page) => page.key))) {
    if (preLaunchLegalPages.has(key)) continue;
    const de = dePages.find((page) => page.key === key);
    const en = enPages.find((page) => page.key === key);
    const item = pageGroups.get(key);
    if (!item) continue;
    for (const locale of ['de', 'en'] as const) {
      const current = locale === 'de' ? de : en;
      if (!current) continue;
      entries.push({
        url: `${base}/${locale}/${current.slug[locale]}`,
        lastModified: current.updatedAt ? new Date(current.updatedAt) : updated,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ...(de ? { de: `${base}/de/${de.slug.de}` } : {}),
            ...(en ? { en: `${base}/en/${en.slug.en}` } : {}),
          },
        },
      });
    }
  }
  const resourceKeys = new Set(
    [...deResources, ...enResources].map((resource) => resource.translationGroup),
  );
  for (const key of resourceKeys) {
    const de = deResources.find((resource) => resource.translationGroup === key);
    const en = enResources.find((resource) => resource.translationGroup === key);
    for (const locale of ['de', 'en'] as const) {
      const item = locale === 'de' ? de : en;
      if (!item) continue;
      entries.push({
        url: `${base}/${locale}/${locale === 'de' ? 'ressourcen' : 'resources'}/${item.slug[locale]}`,
        lastModified: new Date(item.reviewedAt),
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: {
          languages: {
            ...(de ? { de: `${base}/de/ressourcen/${de.slug.de}` } : {}),
            ...(en ? { en: `${base}/en/resources/${en.slug.en}` } : {}),
          },
        },
      });
    }
  }
  return entries;
}
