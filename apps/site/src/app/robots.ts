import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
  const staging = base.includes('staging');
  return {
    rules: staging
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/', disallow: ['/preview', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
