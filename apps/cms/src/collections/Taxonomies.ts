import type { CollectionConfig } from 'payload';
import { authenticated } from '../access';

const taxonomy = (slug: 'topics' | 'audiences' | 'countries'): CollectionConfig => ({
  slug,
  admin: { useAsTitle: 'name', group: 'Taxonomy' },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'key', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea' },
  ],
});

export const Topics = taxonomy('topics');
export const Audiences = taxonomy('audiences');
export const Countries = taxonomy('countries');
