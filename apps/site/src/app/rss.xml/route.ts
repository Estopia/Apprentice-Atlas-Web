import { resources } from '@apprentice-atlas/content';
import { NextResponse } from 'next/server';

const escape = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]!,
  );
export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apprenticeatlas.com';
  const items = resources
    .filter((item) => item.kind === 'insight')
    .map(
      (item) =>
        `<item><title>${escape(item.title.en)}</title><description>${escape(item.description.en)}</description><link>${base}/en/resources/${item.slug.en}</link><guid>${base}/en/resources/${item.slug.en}</guid><pubDate>${new Date(item.reviewedAt).toUTCString()}</pubDate></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Apprentice Atlas Insights</title><link>${base}/en/resources</link><description>Product, data, AI and impact notes from Apprentice Atlas.</description><language>en-GB</language>${items}</channel></rss>`;
  return new NextResponse(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
