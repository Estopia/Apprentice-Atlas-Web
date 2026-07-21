import type { CollectionConfig } from 'payload';
import { hasRole, publishedOrAuthenticated } from '../access';
import {
  editorialGovernanceFields,
  localeField,
  seoFields,
  slugField,
  translationGroupField,
} from '../fields/editorial';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  admin: { useAsTitle: 'title', group: 'Editorial' },
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
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    ...editorialGovernanceFields,
    ...seoFields,
  ],
};
