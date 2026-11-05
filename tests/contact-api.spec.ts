import { expect, test } from '@playwright/test';
import { POST } from '../src/app/api/contact/route';
import { CONTACT_EMAIL, CONTACT_LIMITS } from '../src/lib/contact';

const validMessage = {
  name: '  Alex Visitor  ',
  email: 'alex@example.com',
  subject: '  A new project  ',
  message: '  Hello!\nI would like to work together.  ',
  website: '',
};

function request(data: unknown, ip: string) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(data),
  });
}

test.describe('contact API', () => {
  test.describe.configure({ mode: 'serial' });
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;

  test.beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-server-key';
    process.env.RESEND_FROM_EMAIL = 'Portfolio <sender@example.com>';
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });

  test('sends a validated message to the fixed inbox with a visitor Reply-To', async () => {
    let destination = '';
    let options: RequestInit | undefined;
    globalThis.fetch = async (input, init) => {
      destination = String(input);
      options = init;
      return Response.json({ id: 'test-message' });
    };

    const response = await POST(request(validMessage, '192.0.2.1'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, message: 'Your message has been sent.' });
    expect(destination).toBe('https://api.resend.com/emails');
    expect(options?.method).toBe('POST');
    expect(new Headers(options?.headers).get('authorization')).toBe('Bearer test-server-key');
    const body = JSON.parse(String(options?.body));
    expect(body).toEqual({
      from: 'Portfolio <sender@example.com>',
      to: [CONTACT_EMAIL],
      reply_to: 'alex@example.com',
      subject: 'Portfolio contact: A new project',
      text: 'New portfolio message\n\nName: Alex Visitor\nEmail: alex@example.com\n\nHello!\nI would like to work together.',
    });
  });

  test('rejects invalid, oversized and honeypot submissions without sending', async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return Response.json({ id: 'unexpected' });
    };
    for (const data of [
      { ...validMessage, email: 'invalid' },
      { ...validMessage, email: 'alex@example.com\nBcc: other@example.com' },
      { ...validMessage, name: 'Name\nInjected' },
      { ...validMessage, subject: 'Subject\r\nInjected' },
      { ...validMessage, message: ' '.repeat(10) },
      { ...validMessage, message: 'x'.repeat(CONTACT_LIMITS.message + 1) },
      { ...validMessage, website: 'https://spam.example' },
      { ...validMessage, name: 123 },
    ]) {
      expect((await POST(request(data, '192.0.2.2'))).status).toBe(400);
    }
    const invalidJson = new Request('http://localhost/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{',
    });
    expect((await POST(invalidJson)).status).toBe(400);
    const wrongType = new Request('http://localhost/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}',
    });
    expect((await POST(wrongType)).status).toBe(415);
    expect((await POST(request({ ...validMessage, message: 'x'.repeat(33_000) }, '192.0.2.2'))).status).toBe(413);
    expect(calls).toBe(0);
  });

  test('reports missing configuration without claiming to send', async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    globalThis.fetch = async () => { throw new Error('Provider must not be called'); };
    const response = await POST(request(validMessage, '192.0.2.3'));
    expect(response.status).toBe(503);
    expect((await response.json()).error).toContain('temporarily unavailable');
  });

  test('handles provider failures without exposing their details', async () => {
    globalThis.fetch = async () => new Response('private provider details', { status: 403 });
    const response = await POST(request(validMessage, '192.0.2.4'));
    expect(response.status).toBe(502);
    expect(JSON.stringify(await response.json())).not.toContain('private provider details');

    globalThis.fetch = async () => { throw new Error('network error containing a secret'); };
    const networkFailure = await POST(request(validMessage, '192.0.2.5'));
    expect(networkFailure.status).toBe(502);
    expect(JSON.stringify(await networkFailure.json())).not.toContain('secret');
  });

  test('applies a best-effort limit per client address', async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return Response.json({ id: 'test-message' });
    };
    for (let i = 0; i < 5; i++) {
      expect((await POST(request(validMessage, '192.0.2.6'))).status).toBe(200);
    }
    expect((await POST(request(validMessage, '192.0.2.6'))).status).toBe(429);
    expect(calls).toBe(5);
    expect((await POST(request(validMessage, '192.0.2.7'))).status).toBe(200);
  });
});
