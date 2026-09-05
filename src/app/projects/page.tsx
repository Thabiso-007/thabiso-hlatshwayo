'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'frontend' | 'backend';
  github: string;
  year?: string;
  featured?: boolean;
  emoji: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'StreamEyes Frontend',
    description:
      'Angular 16 frontend for StreamEyes, generated with Angular CLI — a modern, TypeScript-first interface for the streaming platform.',
    technologies: ['Angular', 'TypeScript', 'REST API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/stream-eyes-frontend',
    year: '2024',
    featured: true,
    emoji: '🎬',
  },
  {
    id: 2,
    title: 'StreamEyes Backend',
    description:
      'Node.js/Express backend powering StreamEyes — PostgreSQL database, JWT authentication and secure cookie-based sessions.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/stream-eyes-backend',
    year: '2024',
    emoji: '⚙️',
  },
  {
    id: 3,
    title: 'Executant',
    description:
      'A cutting-edge application tailored for film enthusiasts and professionals, revolutionizing the way movies are discovered and accessed.',
    technologies: ['Vue.js', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/executant',
    year: '2023',
    featured: true,
    emoji: '🎥',
  },
  {
    id: 4,
    title: 'Express Store API',
    description:
      'REST API for an e-commerce store — product management, JWT user authentication, image uploads via Cloudinary and email notifications with Nodemailer.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/api.express-store',
    year: '2023',
    featured: true,
    emoji: '🛒',
  },
  {
    id: 5,
    title: 'Express Store Admin',
    description:
      "Admin dashboard for the Express Store API, built with Create React App, for managing the store's products and orders.",
    technologies: ['React', 'JavaScript', 'REST API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/admin.express-store',
    year: '2023',
    emoji: '📊',
  },
  {
    id: 6,
    title: 'Weather Forecast',
    description:
      'A weather application showing scientific estimates of future weather conditions — the current state of the atmosphere expressed through its most significant variables.',
    technologies: ['TypeScript', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/weather-forecast',
    year: '2023',
    emoji: '⛅',
  },
  {
    id: 7,
    title: 'Calculator',
    description:
      'A calculator app that performs arithmetic operations on numbers — addition, subtraction, multiplication and division.',
    technologies: ['Vue.js', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/calculator',
    year: '2023',
    emoji: '🧮',
  },
  {
    id: 8,
    title: 'Rock Paper Scissors',
    description:
      'The classic game rebuilt with React — play against the computer, keep track of your score, with a responsive design that works across all devices.',
    technologies: ['React', 'SCSS', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/rock-paper-scissors',
    year: '2023',
    emoji: '✂️',
  },
  {
    id: 9,
    title: 'Portfolio Website',
    description:
      'This very site — a platform to discuss my achievements, exhibit my abilities and showcase the projects I have completed.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/thabiso-hlatshwayo',
    emoji: '💼',
  },
];

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col ${
        large ? '' : ''
      }`}
    >
      <div
        className={`${large ? 'h-48' : 'h-40'} bg-gradient-to-br ${
          project.category === 'backend'
            ? 'from-emerald-400 to-teal-600'
            : 'from-blue-400 to-purple-500'
        } flex items-center justify-center`}
      >
        <div className="text-white text-center">
          <div className={`${large ? 'text-5xl' : 'text-4xl'} mb-2`}>{project.emoji}</div>
          <p className="text-sm opacity-90">
            {project.category === 'backend' ? 'Backend API' : 'Frontend Application'}
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${large ? 'text-xl' : 'text-lg'} font-bold text-gray-900 dark:text-white`}>
            {project.title}
          </h3>
          {project.year && (
            <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full shrink-0">
              {project.year}
            </span>
          )}
        </div>
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${large ? '' : 'text-sm line-clamp-3'}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`px-2.5 py-1 ${
                large
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-sm"
          >
            <GitHubIcon className="w-5 h-5 mr-2" />
            View Code
          </a>
          <a
            href="https://github.com/Thabiso-007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            @Thabiso-007 →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((project) => project.category === filter);
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my open-source work on GitHub — every card below links to the real
            repository
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} large />
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to see more?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              My full repository list, history and contributions live on my GitHub profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Thabiso-007"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              >
                <GitHubIcon className="w-5 h-5 mr-2" />
                Visit My GitHub
              </a>
              <Link
                href="/contact"
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
