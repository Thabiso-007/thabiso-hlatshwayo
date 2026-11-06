export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'frontend' | 'backend';
  github: string;
  year?: string;
  featured?: boolean;
  monogram: string;
};

// Kept in one place so the selected work on the home page stays in sync
// with the complete project collection.
export const projects: Project[] = [
  {
    id: 1,
    title: 'StreamEyes Frontend',
    description: 'A TypeScript-first Angular interface for the StreamEyes streaming platform.',
    technologies: ['Angular', 'TypeScript', 'REST API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/stream-eyes-frontend',
    year: '2024',
    featured: true,
    monogram: 'SE',
  },
  {
    id: 2,
    title: 'StreamEyes Backend',
    description:
      'The Node.js and Express backend for StreamEyes, with PostgreSQL, JWT authentication and secure sessions.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/stream-eyes-backend',
    year: '2024',
    monogram: 'SB',
  },
  {
    id: 3,
    title: 'Executant',
    description: 'A movie discovery application for film enthusiasts and professionals.',
    technologies: ['Vue.js', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/executant',
    year: '2023',
    featured: true,
    monogram: 'EX',
  },
  {
    id: 4,
    title: 'Express Store API',
    description:
      'An e-commerce REST API with product management, authentication, image uploads and email notifications.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/api.express-store',
    year: '2023',
    featured: true,
    monogram: 'ES',
  },
  {
    id: 5,
    title: 'Express Store Admin',
    description: 'A React dashboard for managing products and orders in the Express Store.',
    technologies: ['React', 'JavaScript', 'REST API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/admin.express-store',
    year: '2023',
    monogram: 'EA',
  },
  {
    id: 6,
    title: 'Weather Forecast',
    description: 'A weather application displaying forecasts and current atmospheric conditions.',
    technologies: ['TypeScript', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/weather-forecast',
    year: '2023',
    monogram: 'WF',
  },
  {
    id: 7,
    title: 'Calculator',
    description: 'A Vue.js calculator for everyday arithmetic operations.',
    technologies: ['Vue.js', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/calculator',
    year: '2023',
    monogram: 'CA',
  },
  {
    id: 8,
    title: 'Rock Paper Scissors',
    description:
      'A responsive React take on the classic game, with computer play and score tracking.',
    technologies: ['React', 'SCSS', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/rock-paper-scissors',
    year: '2023',
    monogram: 'RP',
  },
  {
    id: 9,
    title: 'Portfolio Website',
    description: 'This site: a home for my work, skills and ways to get in touch.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/thabiso-hlatshwayo',
    monogram: 'TH',
  },
];
