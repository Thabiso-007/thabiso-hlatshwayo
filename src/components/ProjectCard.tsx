import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiFolder } from 'react-icons/fi';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const category = project.category === 'backend' ? 'Backend / API' : 'Frontend';
  const artClass = project.id === 1 ? 'stream' : project.id === 3 ? 'executant' : 'store';

  return (
    <article className={`project-card${featured ? ' project-card--featured' : ''}`}>
      {featured ? (
        <div className={`project-art project-art--${artClass}`} aria-hidden="true">
          <div className="project-art__top">
            <span className="project-art__dots">
              <i />
              <i />
              <i />
            </span>
            <span>{category}</span>
            <FiArrowUpRight />
          </div>
          <div className="project-art__body">
            <div className="project-art__frame">
              <span className="project-art__frame-label">{project.title}</span>
              <span className="project-art__monogram">
                {project.monogram}
                <span>.</span>
              </span>
              <span className="project-art__lines">
                <i />
                <i />
                <i />
              </span>
            </div>
            <span className="project-art__index">0{project.id} / PROJECT</span>
          </div>
        </div>
      ) : (
        <div className="project-card__top">
          <span className="project-card__icon">
            <FiFolder aria-hidden="true" />
          </span>
          <span className="project-card__number">
            0{project.id}
            {project.year && ` / ${project.year}`}
          </span>
        </div>
      )}
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{category}</span>
          {featured && project.year && <span>{project.year}</span>}
        </div>
        <h3>
          <Link className="project-card__title-link" href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        <p>{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-card__actions">
          <Link
            className="project-card__link"
            href={`/projects/${project.slug}`}
            aria-label={`View project: ${project.title}`}
          >
            View project <FiArrowRight aria-hidden="true" />
          </Link>
          <a
            className="project-card__repository"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View repository for ${project.title} on GitHub`}
          >
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
