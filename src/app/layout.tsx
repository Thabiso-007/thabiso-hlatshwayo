import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import './globals.css';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Thabiso Hlatshwayo | Software Engineer',
    template: '%s | Thabiso Hlatshwayo',
  },
  description:
    'Thabiso Hlatshwayo is a Johannesburg-based software engineer building thoughtful full-stack applications and reliable cloud infrastructure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
