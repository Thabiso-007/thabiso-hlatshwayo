import Link from 'next/link';
import {
  FiArrowRight,
  FiArrowUp,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/profile';
import BrandMark from '@/components/BrandMark';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-cta">
          <div>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" /> HAVE AN IDEA?
            </p>
            <h2>
              Let&apos;s build something <span>worth sharing.</span>
            </h2>
          </div>
          <Link href="/contact" className="button button--lime">
            Start a conversation <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-main">
          <div className="footer-about">
            <Link href="/" className="footer-brand" aria-label="Thabiso Hlatshwayo home">
              <BrandMark />
              <span>Thabiso Hlatshwayo</span>
            </Link>
            <p>Thoughtful software, from the first line of code to the infrastructure behind it.</p>
            <div className="footer-socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub aria-hidden="true" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin aria-hidden="true" />
              </a>
              <a href={CONTACT_MAILTO} aria-label="Email">
                <FiMail aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h3>What I do</h3>
            <span>Web development</span>
            <span>Backend systems</span>
            <span>DevOps &amp; cloud</span>
          </div>
          <div className="footer-column footer-contact">
            <h3>Say hello</h3>
            <p>Have a project or question? My inbox is open.</p>
            <a href={CONTACT_MAILTO}>
              {CONTACT_EMAIL} <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Thabiso Hlatshwayo. All rights reserved.</p>
          <span>Made in Johannesburg, South Africa</span>
          <a href="#top">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
