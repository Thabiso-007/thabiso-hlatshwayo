'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function Brand({ onClick, showName = false }: { onClick: () => void; showName?: boolean }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Thabiso Hlatshwayo home" className="group flex min-w-0 items-center gap-3">
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-base font-bold text-white shadow-lg shadow-blue-900/20 transition-transform group-hover:scale-105">
        TH
      </span>
      <span className={`${showName ? 'truncate text-base sm:text-lg' : 'hidden text-lg sm:block md:hidden lg:block'} font-bold tracking-tight text-gray-900 dark:text-white`}>
        Thabiso&nbsp;Hlatshwayo
      </span>
    </Link>
  );
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
    setIsMenuOpen(false);
  }, []);

  const openMenu = () => {
    if (!dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    setIsMenuOpen(true);
    closeButtonRef.current?.focus();
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  // Close on history navigation or when switching to the desktop layout.
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      closeMenu();
    }
  }, [pathname, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 48rem)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    desktop.addEventListener('change', handleChange);
    return () => desktop.removeEventListener('change', handleChange);
  }, [closeMenu]);

  // Keep the page underneath still while the full-screen menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Brand onClick={closeMenu} />

            {/* Desktop menu */}
            <div className="hidden items-center space-x-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://github.com/Thabiso-007"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400/60 dark:hover:text-blue-400"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/30"
              >
                Let&apos;s Talk
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-haspopup="dialog"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* A native modal keeps focus inside the menu and supports Escape to close. */}
      <dialog
        id="mobile-navigation"
        ref={dialogRef}
        aria-labelledby="mobile-menu-heading"
        aria-modal="true"
        onKeyDown={handleDialogKeyDown}
        onClose={() => {
          if (!dialogRef.current?.open) setIsMenuOpen(false);
        }}
        className="fixed inset-0 z-[60] m-0 h-screen h-dvh max-h-none w-full max-w-none overscroll-contain overflow-y-auto border-0 bg-white p-0 text-gray-900 dark:bg-gray-900 dark:text-white"
      >
        <div className="flex min-h-full flex-col">
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white pt-[env(safe-area-inset-top)] dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
              <Brand onClick={closeMenu} showName />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-6 sm:px-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
            <h2 id="mobile-menu-heading" className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Navigation
            </h2>
            <ul className="mt-3 space-y-1">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isActive(link.href)
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span aria-hidden="true" className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </span>
                    <ArrowIcon className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <a
                  href="https://github.com/Thabiso-007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 rounded-lg px-4 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                >
                  <GitHubIcon className="h-5 w-5" />
                  GitHub
                </a>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:shadow-xl"
                >
                  Let&apos;s Talk
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NavBar;
