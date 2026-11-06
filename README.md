This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Use Node.js 20.9 or newer (Node.js 22 or newer is recommended). Install the dependencies and run the development server:

```bash
npm ci
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

## Project details

The project collection and individual project pages use the data in `src/lib/projects.ts`. To add or update a project, edit its title, unique URL slug, overview, highlights, technologies and repository link there. The detail pages are generated from this data at build time; no GitHub API request is needed when a visitor opens a page. An optional `relatedSlug` links companion projects.

## Contact form email

The contact form uses the free [Nodemailer](https://nodemailer.com/) package on the server with Gmail SMTP; no Resend account or API key is needed. Messages go to the public inbox shown on the site, `thabiso.hlatshwayo24@gmail.com` by default. The authenticated Gmail account is the sender, and the visitor's address is set as Reply-To.

To enable direct form delivery:

1. Turn on 2-Step Verification for the Gmail account you want to send from, then [create a Google app password](https://support.google.com/accounts/answer/185833) (the option may be unavailable for some managed or higher-security accounts). Use an app password, **not** your Google account password.
2. Copy `.env.example` to `.env.local`. Set `SMTP_USER` to your Gmail address and `SMTP_PASSWORD` to the app password. Gmail defaults to `smtp.gmail.com` on port 465 with TLS; no other settings are required. Restart the development server after changing the variables.
3. To use a different destination inbox, set `NEXT_PUBLIC_CONTACT_EMAIL` before building. This address is public and is used for both the email links and the form recipient; it can be different from the sending Gmail account.
4. Add the same variables to your hosting provider's environment settings and redeploy. Keep `SMTP_PASSWORD` server-only: never prefix it with `NEXT_PUBLIC_`, commit it, or share it. Remove any old `RESEND_API_KEY` and `RESEND_FROM_EMAIL` settings; they are no longer used.
5. Submit a test message on the deployed site, confirm it arrives in the destination inbox (including spam), and check that Reply goes to the visitor's email address. The automated tests use a mock and do not send real email.

Gmail has sending limits and may block sign-ins it considers suspicious. The hosting environment must support Node.js and outbound SMTP on port 465. For an alternate SMTP setup, `SMTP_HOST`, `SMTP_PORT` and `SMTP_SECURE` are optional: port 465 uses implicit TLS, while port 587 with `SMTP_SECURE=false` requires STARTTLS. TLS certificates are verified in both cases.

Without working SMTP settings, or if sending fails, the form reports the failure and offers a prefilled email-app link instead of claiming the message was sent. Direct email links and the rest of the site work without SMTP. The endpoint has a honeypot, input limits and a basic per-instance IP limit; use a shared rate limiter or hosting-provider WAF for stronger production abuse protection.

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
