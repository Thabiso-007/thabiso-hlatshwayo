import { expect, test, type Page } from '@playwright/test';

async function fillContactForm(page: Page) {
  await page.getByLabel('Name *').fill('Alex Visitor');
  await page.getByLabel('Email *').fill('alex@example.com');
  await page.getByLabel('Subject *').fill('Project & collaboration');
  await page.getByLabel('Message *').fill('Hello!\nI would like to work together.');
}

test('sends the form, shows progress and clears it only after success', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let resolveSend = () => {};
  const waitForRelease = new Promise<void>((resolve) => { resolveSend = resolve; });
  let submitted: unknown;
  await page.route('**/api/contact', async (route) => {
    submitted = route.request().postDataJSON();
    await waitForRelease;
    await route.fulfill({ status: 200, json: { success: true, message: 'Your message has been sent.' } });
  });

  try {
    await page.goto('/contact');
    await fillContactForm(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    await expect(page.getByLabel('Message *')).toBeDisabled();
    await expect(page.getByRole('status')).not.toBeVisible();
    resolveSend();
    await expect(page.getByRole('status')).toContainText('Your message has been submitted');
    await expect(page.getByRole('status')).toBeInViewport();
    expect(submitted).toEqual({
      name: 'Alex Visitor',
      email: 'alex@example.com',
      subject: 'Project & collaboration',
      message: 'Hello!\nI would like to work together.',
      website: '',
    });
    await expect(page.getByLabel('Name *')).toHaveValue('');
    await expect(page.getByLabel('Email *')).toHaveValue('');
    await expect(page.getByLabel('Subject *')).toHaveValue('');
    await expect(page.getByLabel('Message *')).toHaveValue('');
  } finally {
    resolveSend();
  }
});

test('keeps the message and offers a prefilled email link if sending fails', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({ status: 503, json: { error: 'The contact form is temporarily unavailable. Please email me directly.' } });
  });
  await page.goto('/contact');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  const alert = page.getByRole('alert').filter({ hasText: 'temporarily unavailable' });
  await expect(alert).toBeVisible();
  await expect(alert).toBeInViewport();
  await expect(page.getByRole('status')).not.toBeVisible();
  await expect(page.getByLabel('Message *')).toHaveValue('Hello!\nI would like to work together.');

  const fallback = await page.getByRole('link', { name: 'Send this message using your email app' }).getAttribute('href');
  const direct = await page.getByRole('link', { name: 'Send me an email', exact: true }).getAttribute('href');
  const [recipient, query] = fallback!.split('?');
  expect(recipient).toBe(direct);
  const params = new URLSearchParams(query);
  expect(params.get('subject')).toBe('Project & collaboration');
  expect(params.get('body')).toBe('Name: Alex Visitor\nEmail: alex@example.com\n\nHello!\nI would like to work together.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test('reports network errors without clearing the message', async ({ page }) => {
  await page.route('**/api/contact', async (route) => route.abort());
  await page.goto('/contact');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Unable to send your message' })).toBeVisible();
  await expect(page.getByLabel('Subject *')).toHaveValue('Project & collaboration');
  await expect(page.getByRole('link', { name: 'Send this message using your email app' })).toBeVisible();
});

test('does not claim success for an unexpected 200 response', async ({ page }) => {
  await page.route('**/api/contact', async (route) => route.fulfill({ status: 200, body: 'Unexpected response' }));
  await page.goto('/contact');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Unable to send your message' })).toBeVisible();
  await expect(page.getByRole('status')).not.toBeVisible();
  await expect(page.getByLabel('Message *')).toHaveValue('Hello!\nI would like to work together.');
});

test('uses the same inbox on the contact, about and footer links', async ({ page }) => {
  await page.goto('/contact');
  const contactHref = await page.getByRole('link', { name: 'Send me an email', exact: true }).getAttribute('href');
  expect(contactHref).toMatch(/^mailto:[^@]+@[^@]+$/);
  await expect(page.locator('footer').getByRole('link', { name: 'Email', exact: true })).toHaveAttribute('href', contactHref!);
  await page.goto('/about');
  await expect(page.getByRole('link', { name: 'Email Me', exact: true })).toHaveAttribute('href', contactHref!);
});
