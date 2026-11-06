import Link from 'next/link';
import {
  FiActivity,
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiBox,
  FiCloud,
  FiCode,
  FiLayers,
  FiTerminal,
} from 'react-icons/fi';
import {
  SiArgo,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiJenkins,
  SiKubernetes,
  SiLens,
  SiPrometheus,
  SiRancher,
  SiTerraform,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import AwsGlyph from '@/components/AwsGlyph';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

type Skill = {
  name: string;
  detail: string;
  color?: string;
  Icon?: IconType;
  glyph?: Parameters<typeof AwsGlyph>[0]['name'];
};

const capabilities = [
  {
    number: '01',
    title: 'Web experiences',
    description: 'Responsive, intuitive interfaces built with the people using them in mind.',
    Icon: FiCode,
  },
  {
    number: '02',
    title: 'Backend systems',
    description: 'Well-structured APIs and data foundations that make applications work.',
    Icon: FiLayers,
  },
  {
    number: '03',
    title: 'Cloud & DevOps',
    description:
      'The automation, infrastructure and observability that help software run reliably.',
    Icon: FiCloud,
  },
];

const technologyGroups = [
  {
    number: '01',
    title: 'Frontend',
    description: 'Interfaces & experiences',
    items: [
      'TypeScript',
      'JavaScript',
      'React',
      'Angular',
      'Vue.js',
      'React Native',
      'Tailwind CSS',
      'CSS3',
    ],
  },
  {
    number: '02',
    title: 'Backend',
    description: 'Services & APIs',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'Java'],
  },
  {
    number: '03',
    title: 'Python & ML',
    description: 'Data & intelligent systems',
    items: ['Python', 'Flask', 'pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'Keras', 'PyTorch'],
  },
  {
    number: '04',
    title: 'Databases',
    description: 'Storage & persistence',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
];

const devopsSkills: Skill[] = [
  { name: 'Docker', detail: 'Containers & Compose', color: '#2496ED', Icon: SiDocker },
  { name: 'Kubernetes', detail: 'Container orchestration', color: '#326CE5', Icon: SiKubernetes },
  { name: 'Helm', detail: 'Charts & releases', color: '#3977D5', Icon: SiHelm },
  { name: 'Argo CD', detail: 'GitOps delivery', color: '#EF7B4D', Icon: SiArgo },
  {
    name: 'GitHub Actions',
    detail: 'Build & deploy pipelines',
    color: '#2088FF',
    Icon: SiGithubactions,
  },
  { name: 'Jenkins', detail: 'CI/CD automation', color: '#D24939', Icon: SiJenkins },
  { name: 'Terraform', detail: 'Infrastructure as code', color: '#844FBA', Icon: SiTerraform },
  { name: 'Git', detail: 'Version control', color: '#F05032', Icon: SiGit },
  { name: 'Prometheus', detail: 'Metrics & monitoring', color: '#E6522C', Icon: SiPrometheus },
  { name: 'Grafana', detail: 'Dashboards & observability', color: '#F46800', Icon: SiGrafana },
  { name: 'Rancher', detail: 'Cluster management', color: '#0075A8', Icon: SiRancher },
  { name: 'Lens', detail: 'Kubernetes tooling', color: '#3D90CE', Icon: SiLens },
];

const awsSkills: Skill[] = [
  { name: 'Amazon EKS', detail: 'Managed Kubernetes', glyph: 'eks' },
  { name: 'Amazon EC2', detail: 'Compute & hosting', glyph: 'ec2' },
  { name: 'AWS Lambda', detail: 'Serverless functions', glyph: 'lambda' },
  { name: 'Amazon S3', detail: 'Object storage', glyph: 's3' },
  { name: 'Amazon RDS', detail: 'Managed databases', glyph: 'rds' },
  { name: 'Amazon VPC', detail: 'Cloud networking', glyph: 'vpc' },
  { name: 'Route 53', detail: 'DNS & routing', glyph: 'route53' },
  { name: 'IAM Roles', detail: 'Access control', glyph: 'iam' },
  { name: 'Secrets Manager', detail: 'Secrets & credentials', glyph: 'secrets' },
  { name: 'Parameter Store', detail: 'Environment configuration', glyph: 'ssm' },
  { name: 'Certificate Manager', detail: 'TLS certificates', glyph: 'acm' },
  { name: 'CloudWatch', detail: 'Logs, metrics & alerts', glyph: 'cloudwatch' },
  { name: 'CloudFormation', detail: 'Infrastructure as code', glyph: 'cloudformation' },
  { name: 'AWS DMS', detail: 'Database migration', glyph: 'dms' },
];

const practices = [
  {
    title: 'CI/CD & GitOps',
    description: 'Automated builds and deployments, with Git as the source of truth.',
  },
  {
    title: 'Containers & orchestration',
    description: 'Packaging applications and managing Kubernetes workloads.',
  },
  {
    title: 'Secure cloud infrastructure',
    description: 'Provisioning resources and managing access, secrets and certificates.',
  },
  {
    title: 'Observability & reliability',
    description: 'Monitoring metrics and logs to help keep services reliable.',
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  const color = skill.color ?? '#d07700';
  return (
    <div className="tool-item">
      <span
        className="tool-item__icon"
        style={{ backgroundColor: `${color}18`, color }}
        aria-hidden="true"
      >
        {skill.Icon ? <skill.Icon /> : <AwsGlyph name={skill.glyph!} />}
      </span>
      <div className="tool-item__text">
        <h4>{skill.name}</h4>
        <p>{skill.detail}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> SOFTWARE ENGINEER{' '}
              <span className="eyebrow-separator">/</span> JOHANNESBURG, ZA
            </p>
            <h1>
              Thoughtful code.
              <br />
              <span>Reliable systems.</span>
            </h1>
            <p className="hero__intro">
              Hi, I&apos;m <strong>Thabiso Hlatshwayo.</strong> I build useful digital experiences
              and the infrastructure that keeps them running.
            </p>
            <div className="hero__actions">
              <Link href="/projects" className="button button--primary">
                Explore my work <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/about" className="text-link">
                More about me <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className="hero__footnote">
              <span>FULL-STACK DEVELOPMENT</span>
              <i aria-hidden="true" />
              <span>DEVOPS &amp; CLOUD</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual__grid" />
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />
            <div className="terminal-card">
              <div className="terminal-card__bar">
                <span className="terminal-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  thabiso.dev <span className="terminal-card__slash">/</span> about.ts
                </span>
                <FiTerminal />
              </div>
              <div className="terminal-code">
                <div>
                  <span className="code-number">01</span>
                  <span className="code-purple">const</span> engineer = {'{'}
                </div>
                <div>
                  <span className="code-number">02</span>&nbsp;&nbsp;name:{' '}
                  <span className="code-lime">&apos;Thabiso&apos;</span>,
                </div>
                <div>
                  <span className="code-number">03</span>&nbsp;&nbsp;focus: [
                </div>
                <div>
                  <span className="code-number">04</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-lime">&apos;full-stack&apos;</span>,
                </div>
                <div>
                  <span className="code-number">05</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-lime">&apos;cloud &amp; devops&apos;</span>
                </div>
                <div>
                  <span className="code-number">06</span>&nbsp;&nbsp;],
                </div>
                <div>
                  <span className="code-number">07</span>&nbsp;&nbsp;approach:{' '}
                  <span className="code-lime">&apos;keep building&apos;</span>
                </div>
                <div>
                  <span className="code-number">08</span>
                  {'}'};
                </div>
              </div>
              <div className="terminal-card__bottom">
                <span>
                  <i /> SYSTEMS THINKING
                </span>
                <FiActivity />
              </div>
            </div>
            <div className="hero-stamp">
              <FiBox />
              <span>
                BUILT WITH
                <br />
                <strong>INTENTION.</strong>
              </span>
            </div>
            <div className="hero-visual__caption">
              <span>
                DEVELOP <i /> DEPLOY <i /> IMPROVE
              </span>
              <span>01 — 03</span>
            </div>
          </div>
        </div>
        <div className="shell hero__bottom">
          <a href="#expertise">
            SCROLL TO EXPLORE <FiArrowDown aria-hidden="true" />
          </a>
          <span>DESIGNED TO SOLVE. BUILT TO LAST.</span>
        </div>
      </section>

      <section id="expertise" className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">01 /</span> WHAT I DO
              </p>
              <h2>
                From idea to <span>implementation.</span>
              </h2>
            </div>
            <p>
              I bring together product-minded development and practical infrastructure to build
              software that works as well behind the scenes as it does on screen.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ number, title, description, Icon }) => (
              <article className="capability-card" key={title}>
                <div className="capability-card__top">
                  <span className="capability-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>{number} / 03</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="capability-card__line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="work">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">02 /</span> SELECTED WORK
              </p>
              <h2>
                Things I&apos;ve <span>built.</span>
              </h2>
            </div>
            <div className="section-heading__aside">
              <p>A selection of projects spanning interfaces, applications and APIs.</p>
              <Link href="/projects" className="text-link">
                View all projects <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="featured-grid">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
          </div>
        </div>
      </section>

      <section className="section" id="devops">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">03 /</span> THE TOOLKIT
              </p>
              <h2>
                The tools behind <span>the work.</span>
              </h2>
            </div>
            <p>
              From the interface to the infrastructure, these are the technologies I use to turn
              ideas into working software.
            </p>
          </div>
          <div className="technology-grid">
            {technologyGroups.map((group) => (
              <article className="technology-card" key={group.title}>
                <div className="technology-card__top">
                  <span>{group.number} /</span>
                  <FiArrowUpRight aria-hidden="true" />
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="technology-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="cloud-section">
            <div className="cloud-section__heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-dot" /> FROM CODE TO CLOUD
                </p>
                <h2>DevOps Tech Stack</h2>
              </div>
              <p>
                Building and operating dependable systems with automation, cloud infrastructure and
                clear visibility.
              </p>
            </div>
            <div className="practice-grid">
              {practices.map((practice, index) => (
                <div className="practice" key={practice.title}>
                  <span>0{index + 1}</span>
                  <h3>{practice.title}</h3>
                  <p>{practice.description}</p>
                </div>
              ))}
            </div>
            <div className="tool-group">
              <div className="tool-group__heading">
                <h3>DevOps &amp; platform tools</h3>
                <span>01 / PLATFORM</span>
              </div>
              <div className="tool-grid">
                {devopsSkills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
            <div className="tool-group">
              <div className="tool-group__heading">
                <h3>AWS Cloud Services</h3>
                <span>02 / CLOUD</span>
              </div>
              <div className="tool-grid">
                {awsSkills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
