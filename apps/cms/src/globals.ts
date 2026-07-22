import type { GlobalConfig } from 'payload';
import { hasRole } from './access';
import { revalidateGlobal } from './hooks/revalidate';

const globalAccess = { read: () => true, update: hasRole('admin', 'publisher') };
const globalHooks = { afterChange: [revalidateGlobal] };

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'locale', type: 'select', required: true, options: ['de', 'en'] },
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'parentKey', type: 'text' },
      ],
    },
  ],
};
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: '© 2026 Estopia Engineering Ltd',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'locale', type: 'select', required: true, options: ['de', 'en'] },
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
};
export const Contact: GlobalConfig = {
  slug: 'contact',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'generalEmail',
      type: 'email',
      required: true,
      defaultValue: 'hello@apprenticeatlas.com',
    },
    {
      name: 'privacyEmail',
      type: 'email',
      required: true,
      defaultValue: 'privacy@apprenticeatlas.com',
    },
    {
      name: 'accessibilityEmail',
      type: 'email',
      required: true,
      defaultValue: 'accessibility@apprenticeatlas.com',
    },
    {
      name: 'pressEmail',
      type: 'email',
      required: true,
      defaultValue: 'press@apprenticeatlas.com',
    },
  ],
};
export const StoreTargets: GlobalConfig = {
  slug: 'store-targets',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'waitlist',
      options: [
        { label: 'Waitlist', value: 'waitlist' },
        { label: 'Stores live', value: 'stores' },
      ],
    },
    { name: 'appleUrl', type: 'text' },
    { name: 'googleUrl', type: 'text' },
  ],
};
export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};
export const ConsentTexts: GlobalConfig = {
  slug: 'consent-texts',
  access: globalAccess,
  versions: { drafts: true },
  hooks: globalHooks,
  fields: [
    { name: 'version', type: 'text', required: true },
    { name: 'locale', type: 'select', required: true, options: ['de', 'en'] },
    { name: 'analyticsTitle', type: 'text', required: true },
    { name: 'analyticsBody', type: 'textarea', required: true },
    { name: 'waitlistText', type: 'textarea', required: true },
    { name: 'partnerText', type: 'textarea', required: true },
  ],
};
export const CallsToAction: GlobalConfig = {
  slug: 'calls-to-action',
  access: globalAccess,
  hooks: globalHooks,
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'locale', type: 'select', required: true, options: ['de', 'en'] },
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
};
