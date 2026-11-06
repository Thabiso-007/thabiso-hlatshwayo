import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { projects } from '../src/lib/projects';

test('project cards open an in-site detail page while keeping the repository link', async ({
  page,
}) => {
  await page.goto('/projects');
  await page.getByRole('button', { name: 'Backend', exact: true }).click();
  const card = page.locator('.projects-grid article').filter({
    has: page.getByRole('heading', { name: 'StreamEyes Backend', exact: true }),
  });
  await expect(
    card.getByRole('link', { name: 'View repository for StreamEyes Backend on GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/Thabiso-007/stream-eyes-backend');
  await card.getByRole('link', { name: 'View project: StreamEyes Backend' }).click();

  await expect(page).toHaveURL('/projects/stream-eyes-backend');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('StreamEyes Backend');
  await expect(page.getByRole('heading', { name: 'A closer look.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Registration and login' })).toBeVisible();
  await expect(
    page.getByRole('main').getByRole('link', { name: 'View repository' }),
  ).toHaveAttribute('href', 'https://github.com/Thabiso-007/stream-eyes-backend');
  await expect(
    page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await page.getByRole('link', { name: 'StreamEyes Frontend', exact: true }).click();
  await expect(page).toHaveURL('/projects/stream-eyes-frontend');
  await page.getByRole('link', { name: 'Back to all projects' }).click();
  await expect(page).toHaveURL('/projects');
});

test('clicking the card body or a featured project also opens its details', async ({ page }) => {
  await page.goto('/projects');
  const card = page.locator('.projects-grid article').filter({
    has: page.getByRole('heading', { name: 'Executant', exact: true }),
  });
  const bounds = await card.locator('.project-card__top').boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  await expect(page).toHaveURL('/projects/executant');
  await page.goto('/');
  await page
    .locator('.featured-grid')
    .getByRole('link', { name: 'View project: Executant' })
    .click();
  await expect(page).toHaveURL('/projects/executant');
  await expect(page.getByRole('main').getByText('OMDb API', { exact: true })).toBeVisible();
});

test('a project title can be opened with the keyboard', async ({ page }) => {
  await page.goto('/projects');
  const title = page.getByRole('link', { name: 'Calculator', exact: true });
  await title.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects/calculator');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Calculator');
});

test('the separate GitHub link remains clickable without opening the detail page', async ({
  page,
  context,
}) => {
  await context.route('https://github.com/**', (route) =>
    route.fulfill({ status: 200, body: 'Repository' }),
  );
  await page.goto('/projects');
  const card = page.locator('.projects-grid article').filter({
    has: page.getByRole('heading', { name: 'Executant', exact: true }),
  });
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    card.getByRole('link', { name: 'View repository for Executant on GitHub' }).click(),
  ]);
  await expect(popup).toHaveURL('https://github.com/Thabiso-007/executant');
  await expect(page).toHaveURL('/projects');
  await popup.close();
});

test('every project has a direct, refreshable detail page and matching source link', async ({
  page,
}) => {
  expect(projects).toHaveLength(9);
  expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status(), project.slug).toBe(200);
    await expect(page).toHaveTitle(`${project.title} | Thabiso Hlatshwayo`);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText(
      project.title,
    );
    await expect(
      page.getByRole('main').getByRole('link', { name: 'View repository' }),
    ).toHaveAttribute('href', project.github);
    await expect(
      page.getByRole('heading', { name: project.highlights[0].title, exact: true }),
    ).toBeVisible();
  }
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Portfolio Website');
});

test('unknown project slugs return a 404', async ({ page }) => {
  const response = await page.goto('/projects/this-project-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
});

test.describe('mobile project navigation', () => {
  test.use({ viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true });

  test('opens a filtered project and its companion page by touch', async ({ page }) => {
    await page.goto('/projects');
    await page.getByRole('button', { name: 'Backend', exact: true }).tap();
    await page.getByRole('link', { name: 'View project: Express Store API' }).tap();
    await expect(page).toHaveURL('/projects/express-store-api');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Express Store API');
    await page.getByRole('link', { name: 'Express Store Admin', exact: true }).tap();
    await expect(page).toHaveURL('/projects/express-store-admin');
  });
});

test('detail pages fit a narrow screen and pass accessibility checks in both color schemes', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 568 });
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const slug of ['stream-eyes-frontend', 'express-store-api', 'rock-paper-scissors']) {
      await page.goto(`/projects/${slug}`);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${slug} in ${colorScheme}`,
      ).toBe(320);
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(accessibility.violations, `${slug} in ${colorScheme}`).toEqual([]);
    }
  }
});
