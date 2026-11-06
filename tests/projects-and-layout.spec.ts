import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home features real projects with their corresponding repositories', async ({ page }) => {
  await page.goto('/');
  const featured = page.locator('.featured-grid article');
  await expect(featured).toHaveCount(3);
  for (const [title, repository] of [
    ['StreamEyes Frontend', 'https://github.com/Thabiso-007/stream-eyes-frontend'],
    ['Executant', 'https://github.com/Thabiso-007/executant'],
    ['Express Store API', 'https://github.com/Thabiso-007/api.express-store'],
  ]) {
    const card = featured.filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await expect(
      card.getByRole('link', { name: `View repository for ${title} on GitHub` }),
    ).toHaveAttribute('href', repository);
  }
});

test('project filters update the collection, selection state and result count', async ({
  page,
}) => {
  await page.goto('/projects');
  const cards = page.locator('.projects-grid article');
  const all = page.getByRole('button', { name: 'All Projects', exact: true });
  const frontend = page.getByRole('button', { name: 'Frontend', exact: true });
  const backend = page.getByRole('button', { name: 'Backend', exact: true });
  await expect(cards).toHaveCount(9);
  await expect(all).toHaveAttribute('aria-pressed', 'true');

  await backend.click();
  await expect(backend).toHaveAttribute('aria-pressed', 'true');
  await expect(all).toHaveAttribute('aria-pressed', 'false');
  await expect(cards).toHaveCount(2);
  await expect(page.getByRole('status')).toHaveText('Showing 2 backend projects');
  await expect(cards.getByRole('heading', { name: 'StreamEyes Backend' })).toBeVisible();
  await expect(cards.getByRole('heading', { name: 'Express Store API' })).toBeVisible();
  await expect(cards.getByRole('heading', { name: 'Executant' })).toHaveCount(0);

  await frontend.click();
  await expect(frontend).toHaveAttribute('aria-pressed', 'true');
  await expect(cards).toHaveCount(7);
  await expect(cards.getByRole('heading', { name: 'Executant' })).toBeVisible();
  await expect(cards.getByRole('heading', { name: 'Express Store API' })).toHaveCount(0);
  await all.click();
  await expect(cards).toHaveCount(9);
});

for (const [route, title] of [
  ['/', 'Thabiso Hlatshwayo | Software Engineer'],
  ['/about', 'About | Thabiso Hlatshwayo'],
  ['/projects', 'Projects | Thabiso Hlatshwayo'],
  ['/contact', 'Contact | Thabiso Hlatshwayo'],
]) {
  test(`${route} has a clear page title and fits a narrow dark-mode screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  });
}

test('local typefaces load and pages pass automated WCAG checks in light and dark modes', async ({
  page,
}) => {
  test.setTimeout(120_000);
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const route of ['/', '/about', '/projects', '/contact']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const fontsLoaded = await page.evaluate(() => ({
        body: document.fonts.check('400 16px "DM Sans Variable"'),
        heading: document.fonts.check('600 32px "Space Grotesk Variable"'),
      }));
      expect(fontsLoaded).toEqual({ body: true, heading: true });
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(accessibility.violations, `${route} in ${colorScheme} mode`).toEqual([]);
    }
  }
});

test('the full-screen mobile menu passes automated WCAG checks', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});
