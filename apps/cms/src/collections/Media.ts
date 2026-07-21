import type { CollectionConfig } from 'payload';
import { authenticated } from '../access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre', withoutEnlargement: true },
      { name: 'card', width: 960, height: 640, position: 'centre', withoutEnlargement: true },
      { name: 'hero', width: 1920, height: 1200, position: 'centre', withoutEnlargement: true },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text', required: true },
    { name: 'license', type: 'text', required: true },
    { name: 'licenseUrl', type: 'text' },
    {
      name: 'countryContext',
      type: 'select',
      required: true,
      options: [
        { label: 'Germany', value: 'de' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Both / neutral', value: 'both' },
      ],
    },
  ],
};
