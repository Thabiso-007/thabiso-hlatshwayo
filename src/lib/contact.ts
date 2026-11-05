/** Public inbox shown on the site and used as the fixed recipient for contact messages. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'thabiso.hlatshwayo24@gmail.com';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;
