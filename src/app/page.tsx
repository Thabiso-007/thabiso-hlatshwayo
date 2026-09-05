import Link from 'next/link';
import {
  SiAngular,
  SiArgo,
  SiCss,
  SiDocker,
  SiFlask,
  SiKeras,
  SiExpress,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
  SiVuedotjs,
} from 'react-icons/si';
import { FaJava, FaReact } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import AwsGlyph from '../components/AwsGlyph';

type Skill = {
  name: string;
  detail: string;
  /** Brand colour for the icon tile. Omitted for AWS services, which use AWS orange. */
  color?: string;
  /** Set for near-white logos (e.g. Flask) so they stay visible on a light tile. */
  light?: boolean;
  Icon?: IconType;
  glyph?: Parameters<typeof AwsGlyph>[0]['name'];
};

const frontendSkills: Skill[] = [
  { name: 'React', detail: 'Component-driven SPAs & SSR', color: '#61DAFB', Icon: SiReact },
  { name: 'Angular', detail: 'Enterprise-scale applications', color: '#DD0031', Icon: SiAngular },
  { name: 'Vue.js', detail: 'Progressive, lightweight UIs', color: '#41B883', Icon: SiVuedotjs },
  { name: 'React Native', detail: 'Cross-platform iOS & Android', color: '#7B61FF', Icon: FaReact },
  { name: 'Tailwind CSS', detail: 'Utility-first styling', color: '#06B6D4', Icon: SiTailwindcss },
  { name: 'CSS3', detail: 'Responsive layouts & animation', color: '#1572B6', Icon: SiCss },
];

const backendSkills: Skill[] = [
  { name: 'Node.js', detail: 'Event-driven runtime', color: '#5FA04E', Icon: SiNodedotjs },
  { name: 'Express.js', detail: 'REST & middleware APIs', color: '#8CC84B', Icon: SiExpress },
  { name: 'Spring Boot', detail: 'Enterprise Java services', color: '#6DB33F', Icon: SiSpringboot },
  { name: 'Java', detail: 'Typed, scalable backends', color: '#E76F00', Icon: FaJava },
];

const pythonSkills: Skill[] = [
  { name: 'Python', detail: 'Scripting, automation & data work', color: '#3776AB', Icon: SiPython },
  { name: 'Flask', detail: 'Lightweight APIs & ML model serving', color: '#FFFFFF', light: true, Icon: SiFlask },
  { name: 'pandas', detail: 'Data cleaning & transformation', color: '#150458', Icon: SiPandas },
  { name: 'NumPy', detail: 'Numerical & array computing', color: '#013243', Icon: SiNumpy },
  { name: 'scikit-learn', detail: 'Classical ML model building', color: '#F89939', Icon: SiScikitlearn },
  { name: 'TensorFlow', detail: 'Deep learning & neural networks', color: '#FF6F00', Icon: SiTensorflow },
  { name: 'Keras', detail: 'High-level model prototyping', color: '#D00000', Icon: SiKeras },
  { name: 'PyTorch', detail: 'Research & production deep learning', color: '#EE4C2C', Icon: SiPytorch },
];

const databaseSkills: Skill[] = [
  { name: 'PostgreSQL', detail: 'Relational & ACID workloads', color: '#4169E1', Icon: SiPostgresql },
  { name: 'MySQL', detail: 'High-traffic relational data', color: '#4479A1', Icon: SiMysql },
  { name: 'MongoDB', detail: 'Flexible document stores', color: '#47A248', Icon: SiMongodb },
];

const devopsSkills: Skill[] = [
  { name: 'Docker', detail: 'Containerised, reproducible builds', color: '#2496ED', Icon: SiDocker },
  { name: 'Kubernetes', detail: 'Orchestration, scaling & self-healing', color: '#326CE5', Icon: SiKubernetes },
  { name: 'Argo CD', detail: 'GitOps continuous delivery to Kubernetes', color: '#EF7B4D', Icon: SiArgo },
];

const awsSkills: Skill[] = [
  { name: 'Amazon EKS', detail: 'Managed Kubernetes clusters', glyph: 'eks' },
  { name: 'Amazon EC2', detail: 'Virtual servers & app hosting', glyph: 'ec2' },
  { name: 'Amazon RDS', detail: 'Managed PostgreSQL & MySQL', glyph: 'rds' },
  { name: 'Route 53', detail: 'DNS routing & domain management', glyph: 'route53' },
  { name: 'IAM Roles', detail: 'Least-privilege access control', glyph: 'iam' },
  { name: 'Secrets Manager', detail: 'Encrypted credential rotation', glyph: 'secrets' },
  { name: 'Parameter Store', detail: 'Secure environment configuration', glyph: 'ssm' },
  { name: 'CloudWatch', detail: 'Logs, metrics & alerting', glyph: 'cloudwatch' },
  { name: 'Certificate Manager', detail: 'TLS certificates & HTTPS', glyph: 'acm' },
];

const AWS_ORANGE = '#FF9900';

const devopsPractices = [
  {
    title: 'CI/CD & GitOps',
    description: 'Pipelines build and test; Argo CD syncs the cluster to match git.',
    items: ['GitHub Actions', 'Argo CD', 'Git as source of truth', 'Zero-downtime deploys'],
  },
  {
    title: 'Containers & Orchestration',
    description: 'The same artifact runs on my laptop and in production on EKS.',
    items: ['Docker', 'Amazon EKS', 'Kubernetes'],
  },
  {
    title: 'Secure Cloud Infrastructure',
    description: 'Access and secrets are configured, never hardcoded.',
    items: ['IAM Roles', 'Secrets Manager', 'Parameter Store', 'ACM'],
  },
  {
    title: 'Observability & Reliability',
    description: 'I know about problems before users report them.',
    items: ['CloudWatch', 'Metrics & alarms', 'Route 53 health checks'],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  const color = skill.color ?? AWS_ORANGE;
  return (
    <div className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110${
          skill.light ? ' border border-gray-200 dark:border-gray-700 dark:!text-gray-100' : ''
        }`}
        style={{ backgroundColor: `${color}1f`, color }}
      >
        {skill.Icon ? <skill.Icon className="w-8 h-8" /> : <AwsGlyph name={skill.glyph!} />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{skill.detail}</p>
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-14">
      {badge && (
        <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I&apos;m{' '}
              <span className="text-blue-600 dark:text-blue-400">Thabiso Hlatshwayo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Full Stack Developer building modern web and mobile applications
            </p>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              React, Angular &amp; Vue on the front end · Node.js, Spring Boot &amp; Python
              behind it · containerised with Docker, delivered by Argo CD, running on AWS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frontend Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frontend"
            subtitle="Interfaces that are responsive, accessible and fast on any device"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {frontendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Backend Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Backend"
            subtitle="APIs and services built to stay reliable as traffic grows"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {backendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Python & Machine Learning Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Python & ML"
            title="Python &amp; Machine Learning"
            subtitle="From data wrangling and model training to serving predictions behind a Flask API"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pythonSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Databases Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Databases"
            subtitle="Relational and document stores, modelled for the query patterns they serve"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {databaseSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* DevOps & Cloud Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="DevOps & Cloud"
            title="DevOps Tech Stack"
            subtitle="I don't just build applications — I containerise, deploy and monitor them on AWS"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            {devopsSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-14">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AWS Cloud Services
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The managed services I use to run production workloads
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {awsSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DevOps Practices Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How I Ship to Production"
            subtitle="The practices behind every project I deliver"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devopsPractices.map((practice, index) => (
              <div
                key={practice.title}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{practice.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {practice.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I&apos;m a passionate Full Stack Developer comfortable across the whole delivery
                path — from an Angular or React component, through a Node.js or Spring Boot API,
                down to the AWS infrastructure it runs on.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                I enjoy solving real-world problems with clean, maintainable code, and I treat
                deployment, security and observability as part of the job rather than somebody
                else&apos;s problem.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn more about me
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Clean Code</h3>
                    <p className="text-sm opacity-90">Writing maintainable and scalable code</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Performance</h3>
                    <p className="text-sm opacity-90">Optimizing for speed and efficiency</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">User Experience</h3>
                    <p className="text-sm opacity-90">Creating intuitive and engaging interfaces</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">DevOps &amp; Cloud</h3>
                    <p className="text-sm opacity-90">Docker, Kubernetes and AWS deployments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. Let&apos;s
            discuss how we can bring your ideas to life.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
