'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiArrowUpRight, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { GITHUB_URL } from '@/lib/profile';
import BrandMark from '@/components/BrandMark';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

function Brand({ onClick, showName = false }: { onClick: () => void; showName?: boolean }) {
  return (
    <div className={`brand${showName ? ' brand--full' : ''}`}>
      <Link href="/" onClick={onClick} aria-label="Thabiso Hlatshwayo home" className="brand__link">
        <BrandMark />
        <span className="brand__name">Thabiso Hlatshwayo</span>
      </Link>
      <span className="brand__role">Software Engineer</span>
    </div>
  );
}

export default function NavBar() {
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
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);
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
      <nav aria-label="Main navigation" className="site-nav">
        <div className="shell nav-inner">
          <Brand onClick={closeMenu} />
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="nav-github"
            >
              <FiGithub aria-hidden="true" />
            </a>
            <Link href="/contact" className="button button--nav">
              Let&apos;s Talk <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className="menu-toggle"
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* A native modal keeps focus inside the full-screen menu and supports Escape. */}
      <dialog
        id="mobile-navigation"
        ref={dialogRef}
        aria-labelledby="mobile-menu-heading"
        aria-modal="true"
        onKeyDown={handleDialogKeyDown}
        onClose={() => {
          if (!dialogRef.current?.open) setIsMenuOpen(false);
        }}
        className="mobile-menu"
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header">
            <div className="shell mobile-menu__header-inner">
              <Brand onClick={closeMenu} showName />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="menu-toggle menu-toggle--close"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="shell mobile-menu__content">
            <h2 id="mobile-menu-heading" className="eyebrow">
              Navigation
            </h2>
            <div className="mobile-menu__links">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="mobile-menu__link"
                >
                  <span className="mobile-menu__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>{link.label}</span>
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="mobile-menu__bottom">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="mobile-menu__github"
              >
                <FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
              <Link href="/contact" onClick={closeMenu} className="button button--primary">
                Let&apos;s Talk <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
