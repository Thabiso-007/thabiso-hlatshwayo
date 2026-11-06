import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCode,
  FiCloud,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';
import { CONTACT_MAILTO } from '@/lib/contact';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Thabiso Hlatshwayo, a Johannesburg-based software engineer working across full-stack development, DevOps and cloud.',
};

const values = [
  {
    number: '01',
    title: 'Keep learning',
    text: 'Exploring tools and ideas that can make systems better.',
  },
  {
    number: '02',
    title: 'Share knowledge',
    text: 'Contributing to open source and helping other developers grow.',
  },
  {
    number: '03',
    title: 'Build to last',
    text: 'Choosing clean, maintainable solutions and working collaboratively.',
  },
];

export default function About() {
  return (
    <main id="main-content" className="interior-page">
      <div className="shell">
        <header className="page-heading">
          <p className="eyebrow">
            <span className="section-number">01 /</span> A LITTLE ABOUT ME
          </p>
          <div className="page-heading__row">
            <h1>
              Curious by nature.
              <br />
              <span>Engineer by practice.</span>
            </h1>
            <p>
              Hi, I&apos;m Thabiso — a software engineer who enjoys turning complex problems into
              useful, dependable solutions.
            </p>
          </div>
        </header>
        <div className="about-layout">
          <div className="about-main">
            <section className="about-story">
              <p className="eyebrow">
                <span className="section-number">THE STORY /</span> BEHIND THE CODE
              </p>
              <h2>Good software starts with curiosity.</h2>
              <p>
                My journey into technology started with curiosity and grew into a passion for
                designing and developing systems that solve real-world challenges. I love the
                opportunity to keep learning, improving and creating along the way.
              </p>
              <p>
                I work across the full stack: building interfaces with React, Angular and Vue;
                developing services with Node.js, Express, Spring Boot and Python; and working with
                databases like PostgreSQL, MySQL and MongoDB.
              </p>
              <p>
                I&apos;m especially interested in the space between development and operations —
                making applications not just work, but easier to deploy, maintain and scale.
              </p>
            </section>
            <section className="about-services">
              <div className="subsection-heading">
                <div>
                  <p className="eyebrow">
                    <span className="section-number">THE FOCUS /</span> WHAT I DO
                  </p>
                  <h2>Building across the stack.</h2>
                </div>
              </div>
              <div className="about-service-grid">
                <article className="about-service">
                  <span className="capability-card__icon">
                    <FiCode aria-hidden="true" />
                  </span>
                  <h3>Full-stack development</h3>
                  <p>
                    From responsive interfaces to REST APIs and data, I bring the pieces together
                    into cohesive applications.
                  </p>
                  <Link href="/projects" className="text-link">
                    See my projects <FiArrowRight aria-hidden="true" />
                  </Link>
                </article>
                <article className="about-service">
                  <span className="capability-card__icon">
                    <FiCloud aria-hidden="true" />
                  </span>
                  <h3>DevOps &amp; cloud</h3>
                  <p>
                    Containers, delivery pipelines and AWS infrastructure — built with reliability
                    and security in mind.
                  </p>
                  <Link href="/#devops" className="text-link">
                    Explore my DevOps &amp; AWS stack <FiArrowRight aria-hidden="true" />
                  </Link>
                </article>
              </div>
            </section>
          </div>
          <aside className="about-sidebar">
            <div className="profile-card">
              <div className="profile-card__visual" aria-hidden="true">
                <span>
                  th<span>.</span>
                </span>
                <div>
                  SOFTWARE ENGINEER
                  <br />
                  &amp; PROBLEM SOLVER
                </div>
              </div>
              <div className="profile-card__content">
                <p className="eyebrow">THE PERSON BEHIND THE WORK</p>
                <h2>Thabiso Hlatshwayo</h2>
                <p>Software Engineer</p>
                <div className="profile-card__location">
                  <FiMapPin aria-hidden="true" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="profile-card__links">
                  <a href={CONTACT_MAILTO}>
                    <FiMail aria-hidden="true" /> Email Me <FiArrowUpRight aria-hidden="true" />
                  </a>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" />
                  </a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div className="values-card">
              <p className="eyebrow">A FEW THINGS I VALUE</p>
              <h2>What drives me.</h2>
              {values.map((value) => (
                <div className="value-row" key={value.number}>
                  <span>{value.number}</span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
