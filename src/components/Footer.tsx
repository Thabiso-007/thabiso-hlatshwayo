import React from 'react';
import Link from 'next/link';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/Thabiso-007',
    svg: (
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/thabiso-hlatshwayo',
    svg: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: 'Email',
    href: 'mailto:thabiso.hlatshwayo@example.com',
    svg: (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        fill="none"
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const techStack = [
  'React & Next.js',
  'TypeScript',
  'Node.js & Express',
  'Python & Flask',
  'Docker & Kubernetes',
  'AWS & Argo CD',
];

const contactDetails = [
  {
    label: 'Email',
    value: 'thabiso.hlatshwayo@example.com',
    href: 'mailto:thabiso.hlatshwayo@example.com',
  },
  {
    label: 'GitHub',
    value: '@Thabiso-007',
    href: 'https://github.com/Thabiso-007',
  },
  {
    label: 'Location',
    value: 'Available worldwide · Remote',
    href: undefined,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      {/* Decorative top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold shadow-lg shadow-blue-900/30 transition-transform group-hover:scale-105">
                TH
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Thabiso&nbsp;Hlatshwayo
              </span>
            </Link>

            <p className="mt-5 max-w-md text-gray-400">
              Full Stack Developer building modern web and mobile experiences — from
              React &amp; Next.js front ends to Node.js and Spring Boot APIs running on AWS.
            </p>

            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Available for new projects
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigate
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-4 bg-gray-600 transition-all group-hover:w-6 group-hover:bg-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Stack
            </h4>
            <ul className="mt-6 space-y-3">
              {techStack.map((tech) => (
                <li key={tech} className="text-gray-400">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Reach me
            </h4>
            <ul className="mt-6 space-y-4">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.href.startsWith('http') ? '_blank' : undefined}
                        rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-300 transition-colors hover:text-white"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-white"
            >
              Start a conversation
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} Thabiso Hlatshwayo. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Built with
            <span className="font-medium text-gray-300">Next.js</span>
            &amp;
            <span className="font-medium text-gray-300">Tailwind CSS</span>
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
