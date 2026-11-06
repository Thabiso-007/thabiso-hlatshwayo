import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Johannesburg-based software engineer Thabiso Hlatshwayo about a project, opportunity or collaboration.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
