import { expect, test } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 };

test.describe('mobile navigation', () => {
  test.use({ viewport: mobileViewport, isMobile: true, hasTouch: true });

  test('covers the viewport, locks the page and restores focus on Escape', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    const openButton = page.locator('button[aria-controls="mobile-navigation"]');
    const dialog = page.getByRole('dialog', { name: 'Navigation' });

    await openButton.click();
    await expect(dialog).toBeVisible();
    await expect(openButton).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('button', { name: 'Close navigation menu' })).toBeFocused();
    const bounds = await dialog.boundingBox();
    expect(bounds).toEqual({ x: 0, y: 0, ...mobileViewport });
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    await page.mouse.wheel(0, 600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY);

    // Tabbing through the modal must not focus the page underneath it.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    }
    await dialog.getByRole('link', { name: 'Thabiso Hlatshwayo home' }).focus();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('link', { name: "Let's Talk" })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await expect(openButton).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
  });

  test('closes after navigation and marks the current page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await expect(dialog.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
    await dialog.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(dialog.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('aria-current', 'page');
    await page.goBack();
    await expect(page).toHaveURL('/');
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('keeps the close button and actions reachable on a short landscape screen', async ({ page }) => {
    await page.setViewportSize({ width: 568, height: 320 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    expect(await dialog.boundingBox()).toEqual({ x: 0, y: 0, width: 568, height: 320 });
    const talk = dialog.getByRole('link', { name: "Let's Talk" });
    await talk.scrollIntoViewIfNeeded();
    expect(await dialog.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
    const closeBounds = await dialog.getByRole('button', { name: 'Close navigation menu' }).boundingBox();
    expect(closeBounds?.y).toBeGreaterThanOrEqual(0);
    await talk.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(dialog).not.toBeVisible();
  });

  test('closes and unlocks the page when the layout changes to desktop', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await expect(dialog).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' })).toBeVisible();
    await page.setViewportSize(mobileViewport);
    await expect(dialog).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
  });

  test('fits a narrow screen in dark mode without crowding the close button', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    const brand = await dialog.getByRole('link', { name: 'Thabiso Hlatshwayo home' }).boundingBox();
    const close = await dialog.getByRole('button', { name: 'Close navigation menu' }).boundingBox();
    expect(brand!.x + brand!.width).toBeLessThanOrEqual(close!.x);
    expect(close!.width).toBeGreaterThanOrEqual(44);
    await dialog.getByRole('button', { name: 'Close navigation menu' }).click();
    await expect(dialog).not.toBeVisible();
  });
});

test('desktop navigation remains available', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/about');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link', { name: 'GitHub profile' })).toBeVisible();
  await expect(nav.getByRole('link', { name: "Let's Talk" })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).not.toBeVisible();
});

test('desktop navigation fits at the tablet breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 800 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const brand = await nav.getByRole('link', { name: 'Thabiso Hlatshwayo home' }).boundingBox();
  const home = await nav.getByRole('link', { name: 'Home', exact: true }).boundingBox();
  const contact = await nav.getByRole('link', { name: 'Contact', exact: true }).boundingBox();
  const github = await nav.getByRole('link', { name: 'GitHub profile' }).boundingBox();
  const talk = await nav.getByRole('link', { name: "Let's Talk" }).boundingBox();
  expect(brand!.x + brand!.width).toBeLessThanOrEqual(home!.x);
  expect(contact!.x + contact!.width).toBeLessThanOrEqual(github!.x);
  expect(github!.x + github!.width).toBeLessThanOrEqual(talk!.x);
  expect(talk!.height).toBeLessThanOrEqual(40);
});

test('shows the requested DevOps tools and AWS services', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#devops');
  for (const name of [
    'Kubernetes', 'GitHub Actions', 'Argo CD', 'Terraform', 'Docker', 'Helm',
    'Jenkins', 'Prometheus', 'Grafana', 'IAM Roles', 'Certificate Manager',
    'Amazon EC2', 'Amazon S3', 'Secrets Manager', 'Amazon RDS', 'Route 53',
    'Amazon VPC', 'AWS Lambda', 'CloudFormation',
  ]) {
    await expect(section.getByRole('heading', { name, exact: true })).toBeVisible();
  }
});

test('the About page links to the detailed cloud and DevOps stack', async ({ page }) => {
  await page.goto('/about');
  await page.getByRole('link', { name: /Explore my DevOps & AWS stack/ }).click();
  await expect(page).toHaveURL(/\/#devops$/);
  await expect(page.locator('#devops')).toBeInViewport();
});

for (const route of ['/', '/about', '/projects', '/contact']) {
  test(`${route} does not overflow a 320px viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  });
}
