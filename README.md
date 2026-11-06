This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Contact form email

The contact form sends messages through [Resend](https://resend.com/) from the server. It defaults to the email address on Thabiso's GitHub profile (`thabiso.hlatshwayo24@gmail.com`); the form and all direct email links use the same address.

To enable direct form delivery:

1. Create a Resend account and verify a sending domain. Create a Resend API key.
2. Copy `.env.example` to `.env.local` for local development. Set `RESEND_API_KEY` and set `RESEND_FROM_EMAIL` to a sender on your verified domain, for example `Portfolio <hello@your-domain.com>`. Resend's `onboarding@resend.dev` sender can be used for testing, but can only send to the email address registered with your Resend account.
3. To use a different inbox, set `NEXT_PUBLIC_CONTACT_EMAIL` before building. This address is public and is used for both the email links and the form recipient.
4. Add the same variables to your hosting provider's environment settings and redeploy. Keep `RESEND_API_KEY` secret and never prefix it with `NEXT_PUBLIC_` or commit it.
5. Submit a test message and check the destination inbox and the Resend dashboard. The visitor's email address is set as Reply-To so you can reply directly.

Without a configured provider, or if sending fails, the form reports the failure and offers a prefilled email-app link instead of claiming the message was sent. Direct email links also work without Resend. The endpoint has a honeypot, input limits and a basic per-instance IP limit; use a shared rate limiter or hosting-provider WAF for stronger production abuse protection.

## Browser tests

Install dependencies and the Playwright Chromium browser, then run the navigation, projects, skills, contact-form and automated accessibility checks. The email provider is mocked in tests, so no real messages are sent:

```bash
npm ci
npx playwright install chromium
npm run test:e2e
```

The test runner starts the development server automatically if one is not already running.

The site uses self-hosted [DM Sans](https://fontsource.org/fonts/dm-sans) and [Space Grotesk](https://fontsource.org/fonts/space-grotesk) variable fonts via Fontsource. The fonts are included in the build, so rendering does not depend on fetching them from Google Fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
