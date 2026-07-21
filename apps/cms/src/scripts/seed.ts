import { resources, type Audience, type Country, type Locale } from '@apprentice-atlas/content';
import { getPayload } from 'payload';
import config from '../payload.config';

const coverSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#F7F5EE"/><path d="M80 530C240 410 260 230 470 270s250-170 430-80c100 50 120-50 230-120" fill="none" stroke="#155EEF" stroke-width="8" stroke-dasharray="18 16"/><circle cx="80" cy="530" r="18" fill="#FF6B57"/><circle cx="470" cy="270" r="18" fill="#9ED45A" stroke="#081F4D" stroke-width="6"/><circle cx="900" cy="190" r="28" fill="#FF6B57" stroke="#081F4D" stroke-width="6"/><text x="80" y="120" fill="#081F4D" font-family="Georgia" font-size="72">Apprentice Atlas</text><text x="80" y="180" fill="#081F4D" font-family="Arial" font-size="24" letter-spacing="4">EDITORIAL ATLAS / LAUNCH LIBRARY</text></svg>`,
);

const numericId = (id: string | number) => {
  const value = Number(id);
  if (!Number.isSafeInteger(value))
    throw new Error(`Expected a numeric Payload ID, received ${id}.`);
  return value;
};

const lexicalBody = (locale: Locale, sections: (typeof resources)[number]['sections']) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: sections.flatMap((section) => [
      {
        type: 'heading',
        tag: 'h2',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        children: [
          {
            type: 'text',
            text: section.heading[locale],
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
      ...section.paragraphs[locale].map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        textStyle: '',
        children: [
          { type: 'text', text, version: 1, detail: 0, format: 0, mode: 'normal', style: '' },
        ],
      })),
      ...(section.bullets?.[locale] ?? []).map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            text: `• ${text}`,
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      })),
    ]),
  },
});

async function upsertTaxonomy(
  slug: 'audiences' | 'countries' | 'topics',
  key: string,
  name: string,
): Promise<number> {
  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: slug,
    where: { key: { equals: key } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) return numericId(existing.docs[0].id);
  const created = await payload.create({
    collection: slug,
    data: { key, name },
    overrideAccess: true,
  });
  return numericId(created.id);
}

async function seed() {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true')
    throw new Error('Production seed requires ALLOW_PRODUCTION_SEED=true.');
  const payload = await getPayload({ config });
  const audienceNames: Record<Audience, string> = {
    'young-people': 'Young people',
    schools: 'Schools and advisers',
    parents: 'Parents and carers',
    partners: 'Pilot partners',
  };
  const audienceIds = Object.fromEntries(
    await Promise.all(
      Object.entries(audienceNames).map(async ([key, name]) => [
        key,
        await upsertTaxonomy('audiences', key, name),
      ]),
    ),
  ) as Record<Audience, number>;
  const countryIds: Record<Exclude<Country, 'both'>, number> = {
    de: await upsertTaxonomy('countries', 'de', 'Germany'),
    uk: await upsertTaxonomy('countries', 'uk', 'United Kingdom'),
  };
  const topicId = await upsertTaxonomy('topics', 'launch-library', 'Launch library');

  const existingAuthors = await payload.find({
    collection: 'authors',
    where: { name: { equals: 'Apprentice Atlas Editorial Team' } },
    limit: 1,
    overrideAccess: true,
  });
  const author =
    existingAuthors.docs[0] ??
    (await payload.create({
      collection: 'authors',
      data: {
        name: 'Apprentice Atlas Editorial Team',
        role: 'Editorial and product review',
        bio: 'The Estopia Engineering Ltd team responsible for source review, market context and product accountability.',
      },
      overrideAccess: true,
    }));
  const authorId = numericId(author.id);

  const existingMedia = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'editorial-atlas-cover.svg' } },
    limit: 1,
    overrideAccess: true,
  });
  const media =
    existingMedia.docs[0] ??
    (await payload.create({
      collection: 'media',
      file: {
        data: coverSvg,
        mimetype: 'image/svg+xml',
        name: 'editorial-atlas-cover.svg',
        size: coverSvg.byteLength,
      },
      data: {
        alt: 'A blue route connecting three markers on a paper-coloured map beside the Apprentice Atlas name.',
        caption: 'Editorial Atlas launch-library cover',
        credit: 'Estopia Engineering Ltd',
        license: 'First-party brand asset; all rights reserved',
        countryContext: 'both',
      },
      overrideAccess: true,
    }));
  const mediaId = numericId(media.id);

  let created = 0;
  let updated = 0;
  for (const resource of resources)
    for (const locale of ['de', 'en'] as const) {
      const collection =
        resource.kind === 'career'
          ? 'career-fields'
          : resource.kind === 'insight'
            ? 'articles'
            : 'guides';
      const existing = await payload.find({
        collection,
        where: {
          and: [
            { translationGroup: { equals: resource.translationGroup } },
            { locale: { equals: locale } },
          ],
        },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      });
      const countries =
        resource.country === 'both'
          ? [countryIds.de, countryIds.uk]
          : [countryIds[resource.country]];
      const data = {
        locale,
        translationGroup: resource.translationGroup,
        slug: resource.slug[locale],
        title: resource.title[locale],
        excerpt: resource.description[locale],
        body: lexicalBody(locale, resource.sections),
        chapterNumber: String(resources.indexOf(resource) + 1).padStart(2, '0'),
        author: authorId,
        reviewer: authorId,
        reviewedAt: resource.reviewedAt,
        sources: resource.sources,
        audiences: resource.audiences.map((audience) => audienceIds[audience]),
        countries,
        topics: [topicId],
        seo: {
          title: resource.title[locale].slice(0, 65),
          description: resource.description[locale].slice(0, 170),
          socialImage: mediaId,
          noIndex: false,
        },
        _status: 'published' as const,
      };
      if (existing.docs[0]) {
        await payload.update({ collection, id: existing.docs[0].id, data, overrideAccess: true });
        updated += 1;
      } else {
        await payload.create({ collection, data, overrideAccess: true });
        created += 1;
      }
    }
  payload.logger.info(`Seed complete: ${created} documents created, ${updated} updated.`);
  await payload.destroy();
}

await seed();
