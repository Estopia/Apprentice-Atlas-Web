import type { Locale } from './types';

export interface NavItem {
  label: Record<Locale, string>;
  href: Record<Locale, string>;
  description?: Record<Locale, string>;
}

export interface NavGroup {
  key: string;
  label: Record<Locale, string>;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    key: 'product',
    label: { de: 'Produkt', en: 'Product' },
    items: [
      { label: { de: 'Überblick', en: 'Overview' }, href: { de: '/produkt', en: '/product' } },
      {
        label: { de: 'So funktioniert es', en: 'How it works' },
        href: { de: '/produkt/so-funktioniert-es', en: '/product/how-it-works' },
      },
      { label: { de: 'Die App', en: 'The app' }, href: { de: '/produkt/app', en: '/product/app' } },
      {
        label: { de: 'AI-Unterstützung', en: 'AI support' },
        href: { de: '/produkt/ai', en: '/product/ai' },
      },
      {
        label: { de: 'Offizielle Daten', en: 'Official data' },
        href: { de: '/produkt/datenquellen', en: '/product/data-sources' },
      },
    ],
  },
  {
    key: 'audiences',
    label: { de: 'Für wen', en: 'For you' },
    items: [
      {
        label: { de: 'Jugendliche', en: 'Young people' },
        href: { de: '/fuer/jugendliche', en: '/for/young-people' },
      },
      {
        label: { de: 'Schulen & Beratung', en: 'Schools & advisers' },
        href: { de: '/fuer/schulen-beratung', en: '/for/schools-advisers' },
      },
      {
        label: { de: 'Eltern', en: 'Parents & carers' },
        href: { de: '/fuer/eltern', en: '/for/parents-carers' },
      },
      {
        label: { de: 'Pilotpartner', en: 'Pilot partners' },
        href: { de: '/pilotpartner', en: '/pilot-partners' },
      },
    ],
  },
  {
    key: 'resources',
    label: { de: 'Ressourcen', en: 'Resources' },
    items: [
      {
        label: { de: 'Alle Ressourcen', en: 'Resource library' },
        href: { de: '/ressourcen', en: '/resources' },
      },
      {
        label: { de: 'Ausbildung in Deutschland', en: 'German apprenticeships' },
        href: { de: '/deutschland', en: '/germany' },
      },
      {
        label: { de: 'Apprenticeships im UK', en: 'UK apprenticeships' },
        href: { de: '/grossbritannien', en: '/united-kingdom' },
      },
      {
        label: { de: 'Berufsfelder', en: 'Career fields' },
        href: { de: '/ressourcen/berufsfelder', en: '/resources/career-fields' },
      },
      { label: { de: 'Glossar', en: 'Glossary' }, href: { de: '/glossar', en: '/glossary' } },
    ],
  },
  {
    key: 'trust',
    label: { de: 'Vertrauen', en: 'Trust' },
    items: [
      {
        label: { de: 'Datenschutz & Sicherheit', en: 'Privacy & safety' },
        href: { de: '/vertrauen/datenschutz-sicherheit', en: '/trust/privacy-safety' },
      },
      {
        label: { de: 'Verantwortungsvolle AI', en: 'Responsible AI' },
        href: { de: '/vertrauen/verantwortungsvolle-ai', en: '/trust/responsible-ai' },
      },
      {
        label: { de: 'Datenprinzipien', en: 'Data principles' },
        href: { de: '/vertrauen/datenprinzipien', en: '/trust/data-principles' },
      },
      {
        label: { de: 'Barrierefreiheit', en: 'Accessibility' },
        href: { de: '/vertrauen/barrierefreiheit', en: '/trust/accessibility' },
      },
      {
        label: { de: 'Wirkung', en: 'Impact approach' },
        href: { de: '/vertrauen/wirkung', en: '/trust/impact' },
      },
    ],
  },
  {
    key: 'company',
    label: { de: 'Über uns', en: 'About' },
    items: [
      {
        label: { de: 'Mission & Team', en: 'Mission & team' },
        href: { de: '/ueber-uns', en: '/about' },
      },
      {
        label: { de: 'Unsere Geschichte', en: 'Our story' },
        href: { de: '/ueber-uns/geschichte', en: '/about/story' },
      },
      {
        label: { de: 'Presse & Marke', en: 'Press & brand' },
        href: { de: '/presse', en: '/press' },
      },
      { label: { de: 'Kontakt', en: 'Contact' }, href: { de: '/kontakt', en: '/contact' } },
    ],
  },
];

export const localPath = (locale: Locale, path: string) => `/${locale}${path}`;
