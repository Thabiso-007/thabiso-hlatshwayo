import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { getProjectBySlug, projects } from '@/lib/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return project
    ? { title: project.title, description: project.description }
    : { title: 'Project not found' };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const relatedProject = project.relatedSlug ? getProjectBySlug(project.relatedSlug) : undefined;
  const category = project.category === 'backend' ? 'Backend / API' : 'Frontend';
  const artTheme =
    project.id === 3 ? 'executant' : project.category === 'backend' ? 'store' : 'stream';

  return (
    <main id="main-content" className="interior-page project-detail-page">
      <div className="shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/projects">
            <FiArrowLeft aria-hidden="true" /> All projects
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="project-detail-hero">
          <div className="project-detail-hero__copy">
            <p className="eyebrow">
              <span className="section-number">0{project.id} /</span> PROJECT DETAILS
            </p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="project-detail-hero__actions">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--primary"
              >
                <FiGithub aria-hidden="true" /> View repository{' '}
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <Link href="/projects" className="text-link">
                Explore all projects <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={`project-detail-art project-detail-art--${artTheme}`} aria-hidden="true">
            <div className="project-detail-art__top">
              <span className="project-art__dots">
                <i />
                <i />
                <i />
              </span>
              <span>PROJECT / 0{project.id}</span>
              <FiArrowUpRight />
            </div>
            <div className="project-detail-art__frame">
              <span className="project-detail-art__category">{category}</span>
              <span className="project-detail-art__monogram">
                {project.monogram}
                <span>.</span>
              </span>
              <span className="project-detail-art__line" />
              <div className="project-detail-art__bottom">
                <span>{project.title}</span>
                <span>SELECTED WORK</span>
              </div>
            </div>
          </div>
        </header>

        <div className="project-detail-layout">
          <div className="project-detail-content">
            <section aria-labelledby="project-overview">
              <p className="eyebrow">
                <span className="section-number">01 /</span> THE PROJECT
              </p>
              <h2 id="project-overview">
                A closer look<span>.</span>
              </h2>
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            <section className="project-highlights" aria-labelledby="project-highlights">
              <p className="eyebrow">
                <span className="section-number">02 /</span> WHAT IT INCLUDES
              </p>
              <h2 id="project-highlights">
                The details<span>.</span>
              </h2>
              <div className="project-highlight-list">
                {project.highlights.map((highlight, index) => (
                  <article className="project-highlight" key={highlight.title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <aside className="project-detail-sidebar" aria-label="Project information">
            <div className="project-snapshot">
              <p className="eyebrow">AT A GLANCE</p>
              <h2>
                Project snapshot<span>.</span>
              </h2>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{category}</dd>
                </div>
                {project.year && (
                  <div>
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                <div>
                  <dt>Source</dt>
                  <dd>GitHub</dd>
                </div>
              </dl>
              <h3>Technologies</h3>
              <ul className="project-snapshot__tags">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
            {relatedProject && (
              <div className="project-related">
                <p className="eyebrow">RELATED PROJECT</p>
                <h2>
                  See the other side<span>.</span>
                </h2>
                <p>This project has a companion repository in the collection.</p>
                <Link href={`/projects/${relatedProject.slug}`} className="text-link">
                  {relatedProject.title} <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </aside>
        </div>

        <nav className="project-pagination" aria-label="Project navigation">
          <Link href="/projects" className="project-pagination__back">
            <FiArrowLeft aria-hidden="true" /> Back to all projects
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className="project-pagination__next">
            <span>
              <span>NEXT PROJECT</span>
              <strong>{nextProject.title}</strong>
            </span>
            <FiArrowRight aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </main>
  );
}
