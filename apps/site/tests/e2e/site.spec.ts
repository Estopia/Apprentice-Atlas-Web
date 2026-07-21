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
  await expect(page.locator('.route-path')).toHaveCSS('animation-duration', '1e-05s');
});
