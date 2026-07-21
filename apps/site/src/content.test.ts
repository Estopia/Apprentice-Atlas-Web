import { describe, expect, it } from 'vitest';
import { getResource, getStaticPage, resources, staticPages } from '@apprentice-atlas/content';

const substantivePageKeys = new Set([
  'product',
  'how-it-works',
  'app',
  'product-ai',
  'data-sources',
  'young-people',
  'schools',
  'parents',
  'pilot',
  'privacy-safety',
  'responsible-ai',
  'data-principles',
  'accessibility',
  'impact',
  'about',
  'story',
  'press',
  'contact',
]);

describe('launch content', () => {
  it('ships the approved 24–30 canonical resources', () => {
    expect(resources.length).toBeGreaterThanOrEqual(24);
    expect(resources.length).toBeLessThanOrEqual(30);
  });
  it.each(['de', 'en'] as const)('has unique complete %s routes', (locale) => {
    const resourceSlugs = resources.map((item) => item.slug[locale]);
    const pageSlugs = staticPages.map((item) => item.slug[locale]);
    expect(new Set(resourceSlugs).size).toBe(resourceSlugs.length);
    expect(new Set(pageSlugs).size).toBe(pageSlugs.length);
    for (const item of resources) {
      expect(getResource(locale, item.slug[locale])?.id).toBe(item.id);
      expect(item.sections.length).toBeGreaterThanOrEqual(5);
      expect(item.sources.length).toBeGreaterThanOrEqual(2);
      expect(item.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Set(item.sections.map((section) => section.heading[locale])).size).toBe(
        item.sections.length,
      );
      const articleWords = [
        item.description[locale],
        ...item.sections.flatMap((section) => [
          section.heading[locale],
          ...section.paragraphs[locale],
          ...(section.bullets?.[locale] ?? []),
        ]),
      ]
        .join(' ')
        .trim()
        .split(/\s+/).length;
      expect(articleWords, `${item.id}/${locale} is too thin`).toBeGreaterThanOrEqual(240);
      for (const source of item.sources) expect(source.url).toMatch(/^https:\/\//);
    }
    for (const item of staticPages) {
      expect(getStaticPage(locale, item.slug[locale])?.key).toBe(item.key);
      if (substantivePageKeys.has(item.key)) {
        expect(item.sections.length).toBeGreaterThanOrEqual(5);
        const pageWords = [
          item.intro[locale],
          ...item.sections.flatMap((section) => [
            section.title[locale],
            section.body[locale],
            ...(section.points?.[locale] ?? []),
          ]),
        ]
          .join(' ')
          .trim()
          .split(/\s+/).length;
        expect(pageWords, `${item.key}/${locale} is too thin`).toBeGreaterThanOrEqual(125);
      }
    }
  });
  it('keeps translation groups stable across markets', () => {
    for (const item of resources) {
      expect(item.translationGroup).toBe(item.id);
      expect(item.slug.de).not.toBe('');
      expect(item.slug.en).not.toBe('');
    }
  });
  it('describes the real product journey instead of leading with internal limitations', () => {
    const productPages = ['product', 'how-it-works', 'app', 'product-ai'].map((key) => {
      const item = staticPages.find((page) => page.key === key);
      expect(item, `missing ${key}`).toBeDefined();
      return item!;
    });
    const copy = (locale: 'de' | 'en') =>
      productPages
        .flatMap((item) => [
          item.title[locale],
          item.description[locale],
          item.intro[locale],
          ...item.sections.flatMap((section) => [
            section.title[locale],
            section.body[locale],
            ...(section.points?.[locale] ?? []),
          ]),
        ])
        .join(' ')
        .toLocaleLowerCase(locale);

    const de = copy('de');
    for (const term of ['ausbildungsstellen', 'favoriten', 'bewerbung', 'interview']) {
      expect(de, `German product copy misses ${term}`).toContain(term);
    }
    const en = copy('en');
    for (const term of ['opportunities', 'favourites', 'application', 'interview']) {
      expect(en, `English product copy misses ${term}`).toContain(term);
    }
    expect(de).not.toContain('was das produkt bewusst nicht verspricht');
    expect(en).not.toContain('what the product deliberately does not promise');
  });
});
