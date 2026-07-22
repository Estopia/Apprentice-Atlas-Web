import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';
import { createHmac } from 'node:crypto';

async function notify(paths: string[], tags: string[]) {
  const endpoint = process.env.SITE_INTERNAL_URL
    ? `${process.env.SITE_INTERNAL_URL}/api/revalidate`
    : undefined;
  const secret = process.env.REVALIDATION_SECRET;
  if (!endpoint || !secret) return;
  const body = JSON.stringify({ paths, tags, timestamp: Date.now() });
  const signature = createHmac('sha256', secret).update(body).digest('hex');
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-atlas-signature': signature },
      body,
    });
  } catch {
    // Publishing must remain available while the site container is restarting.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  collection,
}) => {
  const locale = doc.locale as string | undefined;
  const slug = doc.slug as string | undefined;
  const isResource = ['articles', 'guides', 'career-fields'].includes(collection.slug);
  const resourcePrefix = isResource ? (locale === 'de' ? 'ressourcen/' : 'resources/') : '';
  const primaryPath =
    collection.slug === 'glossary-terms' && locale
      ? `/${locale}/${locale === 'de' ? 'glossar' : 'glossary'}`
      : locale && slug
        ? `/${locale}/${resourcePrefix}${slug}`
        : undefined;
  const paths = primaryPath ? [primaryPath] : [];
  if (previousDoc?.slug && previousDoc.slug !== slug && locale)
    paths.push(`/${locale}/${resourcePrefix}${previousDoc.slug}`);
  if (locale) {
    paths.push(`/${locale}`);
    if (isResource) paths.push(`/${locale}/${locale === 'de' ? 'ressourcen' : 'resources'}`);
  }
  paths.push('/sitemap.xml', '/rss.xml');
  if (doc._status === 'published' || previousDoc?._status === 'published')
    await notify(paths, [collection.slug, `${collection.slug}:${doc.id}`]);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
  if (doc.locale && doc.slug) {
    const isResource = ['articles', 'guides', 'career-fields'].includes(collection.slug);
    const prefix = isResource ? (doc.locale === 'de' ? 'ressourcen/' : 'resources/') : '';
    await notify(
      [`/${doc.locale}/${prefix}${doc.slug}`, `/${doc.locale}`, '/sitemap.xml', '/rss.xml'],
      [collection.slug, `${collection.slug}:${doc.id}`],
    );
  }
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global }) => {
  await notify(['/de', '/en'], [`global:${global.slug}`]);
  return doc;
};
