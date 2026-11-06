'use client';

import { useState } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';
import { GITHUB_URL } from '@/lib/profile';

type Filter = 'all' | 'frontend' | 'backend';
const categories: { id: Filter; name: string }[] = [
  { id: 'all', name: 'All Projects' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((project) => project.category === filter);

  return (
    <main id="main-content" className="interior-page projects-page">
      <div className="shell">
        <header className="page-heading">
          <p className="eyebrow">
            <span className="section-number">02 /</span> SELECTED WORK
          </p>
          <div className="page-heading__row">
            <h1>
              Ideas made <span>real.</span>
            </h1>
            <p>
              A collection of projects, experiments and applications built to learn, solve problems
              and bring ideas to life.
            </p>
          </div>
        </header>
        <section className="projects-collection" aria-labelledby="projects-heading">
          <div className="projects-collection__heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">THE COLLECTION /</span> EXPLORE THE WORK
              </p>
              <h2 id="projects-heading">
                Projects
                <span className="project-count">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </h2>
            </div>
            <div className="project-filters" role="group" aria-label="Filter projects">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={filter === category.id}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <p className="visually-hidden" role="status">
            Showing {filteredProjects.length} {filter === 'all' ? '' : `${filter} `}projects
          </p>
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="github-banner">
            <div className="github-banner__icon">
              <FiGithub aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">THERE&apos;S MORE ON GITHUB</p>
              <h2>Curious to see more?</h2>
              <p>Explore more code, experiments and ongoing work on my GitHub profile.</p>
            </div>
            <a
              className="button button--outline"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
