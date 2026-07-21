import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import { createHmac } from 'node:crypto';

async function notify(paths: string[], tags: string[]) {
  const endpoint = process.env.SITE_INTERNAL_URL
    ? `${process.env.SITE_INTERNAL_URL}/api/revalidate`
    : undefined;
  const secret = process.env.REVALIDATION_SECRET;
  if (!endpoint || !secret) return;
  const body = JSON.stringify({ paths, tags, timestamp: Date.now() });
  const signature = createHmac('sha256', secret).update(body).digest('hex');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-atlas-signature': signature },
    body,
  });
  if (!response.ok) throw new Error(`Site revalidation failed with ${response.status}`);
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  collection,
}) => {
  const locale = doc.locale as string | undefined;
  const slug = doc.slug as string | undefined;
  const paths = locale && slug ? [`/${locale}/${slug}`] : [];
  if (previousDoc?.slug && previousDoc.slug !== slug && locale)
    paths.push(`/${locale}/${previousDoc.slug}`);
  if (doc._status === 'published' || previousDoc?._status === 'published')
    await notify(paths, [collection.slug, `${collection.slug}:${doc.id}`]);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
  if (doc.locale && doc.slug)
    await notify([`/${doc.locale}/${doc.slug}`], [collection.slug, `${collection.slug}:${doc.id}`]);
  return doc;
};
