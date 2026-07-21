import type { Field } from 'payload';

export const localeField: Field = {
  name: 'locale',
  type: 'select',
  required: true,
  index: true,
  options: [
    { label: 'Deutsch', value: 'de' },
    { label: 'British English', value: 'en' },
  ],
  admin: { position: 'sidebar' },
};
export const translationGroupField: Field = {
  name: 'translationGroup',
  type: 'text',
  required: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Stable shared key linking independent German and English documents.',
  },
};
export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  index: true,
  admin: { position: 'sidebar' },
};

export const editorialGovernanceFields: Field[] = [
  { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
  { name: 'reviewer', type: 'relationship', relationTo: 'authors', required: true },
  {
    name: 'reviewedAt',
    type: 'date',
    required: true,
    admin: { date: { pickerAppearance: 'dayOnly' } },
  },
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
  {
    name: 'audiences',
    type: 'relationship',
    relationTo: 'audiences',
    hasMany: true,
    required: true,
  },
  {
    name: 'countries',
    type: 'relationship',
    relationTo: 'countries',
    hasMany: true,
    required: true,
  },
  { name: 'topics', type: 'relationship', relationTo: 'topics', hasMany: true },
  {
    name: 'relatedContent',
    type: 'relationship',
    relationTo: ['articles', 'guides', 'career-fields'],
    hasMany: true,
  },
];

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    fields: [
      { name: 'title', type: 'text', required: true, maxLength: 65 },
      { name: 'description', type: 'textarea', required: true, maxLength: 170 },
      { name: 'socialImage', type: 'upload', relationTo: 'media', required: true },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
    ],
  },
];
