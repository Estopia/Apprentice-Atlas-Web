import type { CollectionConfig } from 'payload';
import { hasRole, publishedOrAuthenticated } from '../access';
import { localeField, slugField, translationGroupField, seoFields } from '../fields/editorial';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

export const GlossaryTerms: CollectionConfig = {
  slug: 'glossary-terms',
  admin: { useAsTitle: 'term', group: 'Editorial' },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'publisher', 'editor', 'translator'),
    update: hasRole('admin', 'publisher', 'editor', 'translator'),
    delete: hasRole('admin', 'publisher'),
  },
  versions: { drafts: { autosave: true, schedulePublish: true }, maxPerDoc: 30 },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    localeField,
    translationGroupField,
    slugField,
    { name: 'term', type: 'text', required: true },
    { name: 'definition', type: 'textarea', required: true },
    {
      name: 'sources',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    ...seoFields,
  ],
};
