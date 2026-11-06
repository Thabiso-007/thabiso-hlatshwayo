import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Projects',
    template: '%s | Thabiso Hlatshwayo',
  },
  description:
    'Explore frontend applications, backend APIs and other projects by software engineer Thabiso Hlatshwayo.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
