import { describe, expect, it } from 'vitest';
import { getResource, getStaticPage, resources, staticPages } from '@apprentice-atlas/content';

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
      expect(item.sections.length).toBeGreaterThanOrEqual(3);
      expect(item.sources.length).toBeGreaterThan(0);
      expect(item.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const item of staticPages)
      expect(getStaticPage(locale, item.slug[locale])?.key).toBe(item.key);
  });
  it('keeps translation groups stable across markets', () => {
    for (const item of resources) {
      expect(item.translationGroup).toBe(item.id);
      expect(item.slug.de).not.toBe('');
      expect(item.slug.en).not.toBe('');
    }
  });
});
