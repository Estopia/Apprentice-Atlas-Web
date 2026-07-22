import type { Locale } from '@apprentice-atlas/content';
import { getSiteResources, resourceSearchText } from '@/lib/cms/content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const locale: Locale = request.nextUrl.searchParams.get('locale') === 'de' ? 'de' : 'en';
  const query = (request.nextUrl.searchParams.get('q') ?? '')
    .trim()
    .toLocaleLowerCase(locale)
    .slice(0, 100);
  const country = request.nextUrl.searchParams.get('country');
  const kind = request.nextUrl.searchParams.get('format');
  const resources = await getSiteResources(locale);
  const results = resources
    .filter(
      (item) =>
        (!query || resourceSearchText(item, locale).toLocaleLowerCase(locale).includes(query)) &&
        (!country || item.country === country || item.country === 'both') &&
        (!kind || item.kind === kind),
    )
    .slice(0, 50)
    .map((item) => ({
      id: item.id,
      slug: item.slug[locale],
      title: item.title[locale],
      description: item.description[locale],
      kind: item.kind,
      country: item.country,
      readMinutes: item.readMinutes,
    }));
  return NextResponse.json(
    { locale, count: results.length, results },
    { headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=600' } },
  );
}
