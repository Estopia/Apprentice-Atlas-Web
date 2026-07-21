import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('German home communicates the product and routes to pilot', async ({ page }) => {
  await page.goto('/de');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('wirklich zu dir passt');
  await expect(page.getByRole('link', { name: 'Pilotpartner werden' }).first()).toBeVisible();
  await page.waitForTimeout(1200);
  const results = await new AxeBuilder({ page }).exclude('.cf-turnstile').analyze();
  expect(results.violations).toEqual([]);
});

test('English library filters without exposing the query in the URL', async ({ page }) => {
  await page.goto('/en/resources');
  const search = page.getByRole('searchbox');
  await search.fill('interview');
  await expect(
    page.getByRole('heading', { name: /Prepare for an apprenticeship interview/i }),
  ).toBeVisible();
  await expect(page).toHaveURL('/en/resources');
});

test('resource pages expose sources and reciprocal language metadata', async ({ page }) => {
  await page.goto('/de/ressourcen/duale-ausbildung-verstehen');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Die duale Ausbildung verstehen',
  );
  await expect(page.getByRole('heading', { name: 'Prüfe die Grundlage selbst.' })).toBeVisible();
  await expect(page.locator('link[hreflang="en-GB"]')).toHaveCount(1);
});

test('reduced motion keeps the route static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  const durationMs = await page.locator('.route-path').evaluate((element) => {
    const duration = getComputedStyle(element).animationDuration;
    const value = Number.parseFloat(duration);

    return duration.endsWith('ms') ? value : value * 1_000;
  });

  expect(durationMs).toBeLessThanOrEqual(0.01);
  await expect(page.locator('.route-path')).toHaveCSS('animation-iteration-count', '1');
});

test('country hubs explain system boundaries and the glossary has working depth', async ({
  page,
}) => {
  await page.goto('/en/united-kingdom');
  await expect(page.getByRole('heading', { name: 'Establish the nation first' })).toBeVisible();
  await expect(page.getByText('England, Scotland, Wales and Northern Ireland')).toBeVisible();
  await page.goto('/en/glossary');
  await expect(page.locator('.glossary-page dl > div')).toHaveCount(20);
});

test('unreviewed legal copy is visibly marked and excluded from indexing', async ({ page }) => {
  await page.goto('/en/privacy');
  await expect(page.getByRole('note')).toContainText('Pre-launch draft');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
