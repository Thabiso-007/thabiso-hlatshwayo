import { expect, test } from '@playwright/test';
import nodemailer, { type SendMailOptions, type SMTPTransportOptions } from 'nodemailer';
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

type MockSend = (message: SendMailOptions) => Promise<{ accepted: string[]; rejected: string[] }>;

function mockTransport(send: MockSend = async () => ({ accepted: [CONTACT_EMAIL], rejected: [] })) {
  let options: SMTPTransportOptions | undefined;
  const messages: SendMailOptions[] = [];
  Object.assign(nodemailer, {
    createTransport: (settings: SMTPTransportOptions) => {
      options = settings;
      return {
        sendMail: async (message: SendMailOptions) => {
          messages.push(message);
          return send(message);
        },
      };
    },
  });
  return { get options() { return options; }, messages };
}

test.describe('contact API', () => {
  test.describe.configure({ mode: 'serial' });
  const originalCreateTransport = nodemailer.createTransport;
  const originalConsoleError = console.error;
  const envNames = ['SMTP_USER', 'SMTP_PASSWORD', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE'] as const;
  const originalEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));

  test.beforeEach(() => {
    process.env.SMTP_USER = 'sender@example.com';
    process.env.SMTP_PASSWORD = 'test app password';
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
  });

  test.afterEach(() => {
    Object.assign(nodemailer, { createTransport: originalCreateTransport });
    console.error = originalConsoleError;
    for (const name of envNames) {
      if (originalEnv[name] === undefined) delete process.env[name];
      else process.env[name] = originalEnv[name];
    }
  });

  test('sends to the fixed inbox over Gmail TLS with the visitor as Reply-To', async () => {
    const transport = mockTransport();
    const response = await POST(request(validMessage, '192.0.2.1'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, message: 'Your message has been sent.' });
    expect(transport.options).toEqual({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: false,
      forceAuth: true,
      auth: { user: 'sender@example.com', pass: 'testapppassword' },
      dnsTimeout: 6_000,
      connectionTimeout: 6_000,
      greetingTimeout: 6_000,
      socketTimeout: 10_000,
    });
    expect(transport.messages).toEqual([{
      from: { name: 'Portfolio Contact', address: 'sender@example.com' },
      to: CONTACT_EMAIL,
      replyTo: 'alex@example.com',
      subject: 'Portfolio contact: A new project',
      text: 'New portfolio message\n\nName: Alex Visitor\nEmail: alex@example.com\n\nHello!\nI would like to work together.',
    }]);
  });

  test('requires STARTTLS for port 587 and supports a custom implicit-TLS port', async () => {
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_PORT = '587';
    const starttls = mockTransport();
    expect((await POST(request(validMessage, '192.0.2.8'))).status).toBe(200);
    expect(starttls.options).toMatchObject({
      host: 'smtp.example.com', port: 587, secure: false, requireTLS: true, forceAuth: true,
      auth: { user: 'sender@example.com', pass: 'test app password' },
    });
    expect(starttls.options?.tls?.rejectUnauthorized).not.toBe(false);

    process.env.SMTP_PORT = '2465';
    process.env.SMTP_SECURE = 'true';
    const implicitTls = mockTransport();
    expect((await POST(request(validMessage, '192.0.2.9'))).status).toBe(200);
    expect(implicitTls.options).toMatchObject({ port: 2465, secure: true, requireTLS: false });
    expect(implicitTls.options?.tls?.rejectUnauthorized).not.toBe(false);
  });

  test('rejects invalid, oversized and honeypot submissions without sending', async () => {
    const transport = mockTransport();
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
    expect(transport.options).toBeUndefined();
    expect(transport.messages).toHaveLength(0);
  });

  test('reports missing or invalid configuration without claiming to send', async () => {
    const transport = mockTransport();
    for (const settings of [
      { SMTP_USER: '', SMTP_PASSWORD: 'password' },
      { SMTP_USER: 'sender@example.com', SMTP_PASSWORD: '' },
      { SMTP_USER: 'not-an-email', SMTP_PASSWORD: 'password' },
      { SMTP_USER: 'sender@example.com', SMTP_PASSWORD: 'password', SMTP_PORT: 'not-a-port' },
      { SMTP_USER: 'sender@example.com', SMTP_PASSWORD: 'password', SMTP_PORT: '65536' },
      { SMTP_USER: 'sender@example.com', SMTP_PASSWORD: 'password', SMTP_SECURE: 'maybe' },
    ]) {
      process.env.SMTP_USER = settings.SMTP_USER;
      process.env.SMTP_PASSWORD = settings.SMTP_PASSWORD;
      if (settings.SMTP_PORT) process.env.SMTP_PORT = settings.SMTP_PORT;
      else delete process.env.SMTP_PORT;
      if (settings.SMTP_SECURE) process.env.SMTP_SECURE = settings.SMTP_SECURE;
      else delete process.env.SMTP_SECURE;
      const response = await POST(request(validMessage, '192.0.2.3'));
      expect(response.status).toBe(503);
      expect((await response.json()).error).toContain('temporarily unavailable');
    }
    expect(transport.options).toBeUndefined();
    expect(transport.messages).toHaveLength(0);
  });

  test('handles SMTP errors and rejected recipients without exposing details', async () => {
    const logs: string[] = [];
    console.error = (...args: unknown[]) => { logs.push(args.join(' ')); };
    mockTransport(async () => ({ accepted: [], rejected: [CONTACT_EMAIL] }));
    const rejected = await POST(request(validMessage, '192.0.2.4'));
    expect(rejected.status).toBe(502);
    expect((await rejected.json()).error).toContain('Unable to send');

    mockTransport(async () => { throw new Error('network error containing a secret'); });
    const failure = await POST(request(validMessage, '192.0.2.5'));
    expect(failure.status).toBe(502);
    expect(JSON.stringify(await failure.json())).not.toContain('secret');
    expect(logs.join(' ')).not.toContain('secret');
  });

  test('applies a best-effort limit per client address', async () => {
    const transport = mockTransport();
    for (let i = 0; i < 5; i++) {
      expect((await POST(request(validMessage, '192.0.2.6'))).status).toBe(200);
    }
    expect((await POST(request(validMessage, '192.0.2.6'))).status).toBe(429);
    expect(transport.messages).toHaveLength(5);
    expect((await POST(request(validMessage, '192.0.2.7'))).status).toBe(200);
  });
});
