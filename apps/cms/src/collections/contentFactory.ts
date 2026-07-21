import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { hasRole, publishedOrAuthenticated } from '../access';
import {
  editorialGovernanceFields,
  localeField,
  seoFields,
  slugField,
  translationGroupField,
} from '../fields/editorial';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

const validateLocaleSlug: CollectionBeforeValidateHook = async ({
  data,
  originalDoc,
  req,
  collection,
}) => {
  if (!data?.slug || !data.locale) return data;
  const existing = await req.payload.find({
    collection: collection.slug,
    where: {
      and: [
        { slug: { equals: data.slug } },
        { locale: { equals: data.locale } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 1,
    depth: 0,
    req,
  });
  if (existing.totalDocs)
    throw new Error(`Slug “${data.slug}” is already used for locale “${data.locale}”.`);
  return data;
};

export const editorialCollection = (
  slug: 'pages' | 'articles' | 'guides' | 'career-fields',
  label: string,
): CollectionConfig => ({
  slug,
  labels: { singular: label, plural: label },
  admin: {
    useAsTitle: 'title',
    group: 'Editorial',
    defaultColumns: ['title', 'locale', '_status', 'reviewedAt', 'updatedAt'],
  },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'publisher', 'editor', 'translator'),
    update: hasRole('admin', 'publisher', 'editor', 'translator'),
    delete: hasRole('admin', 'publisher'),
    readVersions: hasRole('admin', 'publisher', 'editor', 'translator'),
  },
  versions: {
    drafts: { autosave: { interval: 30000 }, schedulePublish: true, validate: true },
    maxPerDoc: 50,
  },
  hooks: {
    beforeValidate: [validateLocaleSlug],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    localeField,
    translationGroupField,
    slugField,
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 280 },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'chapterNumber',
      type: 'text',
      admin: { position: 'sidebar', description: 'Two-digit Atlas chapter label.' },
    },
    ...editorialGovernanceFields,
    ...seoFields,
  ],
});
