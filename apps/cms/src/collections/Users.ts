import type { CollectionConfig } from 'payload';
import { hasRole } from '../access';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: { tokenExpiration: 60 * 60 * 8, maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'role'] },
  access: {
    create: hasRole('admin'),
    delete: hasRole('admin'),
    read: hasRole('admin'),
    update: ({ req: { user }, id }) =>
      Boolean(user && ((user as { role?: string }).role === 'admin' || user.id === id)),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Publisher', value: 'publisher' },
        { label: 'Editor', value: 'editor' },
        { label: 'Translator', value: 'translator' },
      ],
      access: {
        update: ({ req: { user } }) => (user as { role?: string } | null)?.role === 'admin',
      },
    },
  ],
};
