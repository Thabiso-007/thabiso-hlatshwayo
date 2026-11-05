import { NextResponse } from 'next/server';
import { CONTACT_EMAIL, CONTACT_LIMITS } from '@/lib/contact';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_TRACKED_CLIENTS = 1000;

// This is only a best-effort, per-instance limit; use a shared WAF/rate limiter for stronger protection.
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: Request): boolean {
  const client = (request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')?.trim())?.slice(0, 128);
  // Do not put all visitors into one bucket if the deployment does not provide a client IP.
  if (!client) return false;

  const now = Date.now();
  if (attempts.size >= MAX_TRACKED_CLIENTS) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(key);
    }
    if (attempts.size >= MAX_TRACKED_CLIENTS && !attempts.has(client)) {
      const oldest = attempts.keys().next().value;
      if (oldest) attempts.delete(oldest);
    }
  }

  const entry = attempts.get(client);
  if (!entry || entry.resetAt <= now) {
    attempts.set(client, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

class PayloadTooLargeError extends Error {}

async function readJson(request: Request): Promise<unknown> {
  if (!request.body) throw new Error('Missing body');
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } finally {
    reader.releaseLock();
  }
}

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function validateMessage(input: unknown): ContactMessage | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  if (typeof data.name !== 'string' || typeof data.email !== 'string'
    || typeof data.subject !== 'string' || typeof data.message !== 'string'
    || (data.website !== undefined && typeof data.website !== 'string')) return null;

  // A hidden field helps reject automated submissions without sending an email.
  if (typeof data.website === 'string' && data.website.trim()) return null;

  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();
  const singleLine = /^[^\u0000-\u001f\u007f]+$/;
  const emailPattern = /^[^\s@<>,;"\\]+@[^\s@<>,;"\\]+\.[^\s@<>,;"\\]+$/;

  if (!name || name.length > CONTACT_LIMITS.name || !singleLine.test(name)
    || !email || email.length > CONTACT_LIMITS.email || !emailPattern.test(email)
    || !subject || subject.length > CONTACT_LIMITS.subject || !singleLine.test(subject)
    || !message || message.length > CONTACT_LIMITS.message) return null;

  return { name, email, subject, message };
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return NextResponse.json({ error: 'Please submit the contact form as JSON.' }, { status: 415 });
  }

  let payload: unknown;
  try {
    payload = await readJson(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Please check your message and try again.' }, { status: 400 });
  }

  const contact = validateMessage(payload);
  if (!contact) {
    return NextResponse.json({ error: 'Please check your name, email, subject and message.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'The contact form is temporarily unavailable. Please email me directly.' }, { status: 503 });
  }

  if (isRateLimited(request)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later or email me directly.' }, { status: 429 });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: contact.email,
        subject: `Portfolio contact: ${contact.subject}`,
        text: `New portfolio message\n\nName: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Contact email provider returned status ${response.status}.`);
      return NextResponse.json({ error: 'Unable to send your message. Please try again or email me directly.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Your message has been sent.' });
  } catch {
    console.error('Contact email provider could not be reached.');
    return NextResponse.json({ error: 'Unable to send your message. Please try again or email me directly.' }, { status: 502 });
  }
}
