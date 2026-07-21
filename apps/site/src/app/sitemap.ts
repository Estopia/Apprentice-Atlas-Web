import { resources, staticPages } from '@apprentice-atlas/content';
import type { MetadataRoute } from 'next';

const preLaunchLegalPages = new Set(['privacy', 'terms', 'imprint', 'accessibility-statement']);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
  const updated = new Date('2026-07-21');
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
  for (const item of staticPages.filter((page) => !preLaunchLegalPages.has(page.key)))
    for (const locale of ['de', 'en'] as const)
      entries.push({
        url: `${base}/${locale}/${item.slug[locale]}`,
        lastModified: updated,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: { de: `${base}/de/${item.slug.de}`, en: `${base}/en/${item.slug.en}` },
        },
      });
  for (const item of resources)
    for (const locale of ['de', 'en'] as const)
      entries.push({
        url: `${base}/${locale}/${locale === 'de' ? 'ressourcen' : 'resources'}/${item.slug[locale]}`,
        lastModified: new Date(item.reviewedAt),
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: {
          languages: {
            de: `${base}/de/ressourcen/${item.slug.de}`,
            en: `${base}/en/resources/${item.slug.en}`,
          },
        },
      });
  return entries;
}
