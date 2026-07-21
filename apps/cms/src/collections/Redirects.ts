import type { CollectionConfig } from 'payload';
import { hasRole } from '../access';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: { useAsTitle: 'from', group: 'Operations' },
  access: {
    read: () => true,
    create: hasRole('admin', 'publisher'),
    update: hasRole('admin', 'publisher'),
    delete: hasRole('admin', 'publisher'),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'from', type: 'text', required: true, unique: true, index: true },
    { name: 'to', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 Permanent', value: '301' },
        { label: '302 Temporary', value: '302' },
      ],
    },
  ],
};
