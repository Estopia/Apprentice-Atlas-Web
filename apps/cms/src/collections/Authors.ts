import type { CollectionConfig } from 'payload';
import { authenticated } from '../access';

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name', group: 'People' },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};
