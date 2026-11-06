export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'frontend' | 'backend';
  github: string;
  year?: string;
  featured?: boolean;
  monogram: string;
  overview: string[];
  highlights: { title: string; description: string }[];
  relatedSlug?: string;
};

// The collection, featured cards and detail pages share the same project data.
export const projects: Project[] = [
  {
    id: 1,
    slug: 'stream-eyes-frontend',
    title: 'StreamEyes Frontend',
    description: 'A TypeScript-first Angular interface for the StreamEyes movie project.',
    technologies: ['Angular', 'TypeScript', 'Angular Router'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/stream-eyes-frontend',
    year: '2024',
    featured: true,
    monogram: 'SE',
    overview: [
      'The frontend is a separate part of the StreamEyes project, developed with Angular and TypeScript. It uses components and routing to organize the different screens of a movie-focused application.',
      'The repository lays out routes for login, registration, password recovery, a profile and a movies page. The companion backend is maintained in its own repository.',
    ],
    highlights: [
      {
        title: 'Account screens',
        description:
          'Separate components and routes for login, registration and password recovery.',
      },
      {
        title: 'Application views',
        description: 'Dedicated routes for the movies and profile screens.',
      },
      {
        title: 'Angular foundation',
        description: 'Generated with Angular CLI 16 and organized around TypeScript components.',
      },
    ],
    relatedSlug: 'stream-eyes-backend',
  },
  {
    id: 2,
    slug: 'stream-eyes-backend',
    title: 'StreamEyes Backend',
    description:
      'The Node.js and Express backend for StreamEyes, with PostgreSQL and JWT authentication.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/stream-eyes-backend',
    year: '2024',
    monogram: 'SB',
    overview: [
      'The StreamEyes backend is a Node.js and Express service with registration and login endpoints backed by PostgreSQL.',
      'Passwords are hashed with bcrypt before storage, and successful logins return a signed JSON Web Token. The Angular frontend lives in a separate repository.',
    ],
    highlights: [
      {
        title: 'Registration and login',
        description: 'Express routes handle account registration and sign-in requests.',
      },
      {
        title: 'PostgreSQL data',
        description: 'User records are stored and queried through a PostgreSQL connection.',
      },
      {
        title: 'Authentication',
        description: 'Password hashing and JWT generation support the login flow.',
      },
    ],
    relatedSlug: 'stream-eyes-frontend',
  },
  {
    id: 3,
    slug: 'executant',
    title: 'Executant',
    description: 'A movie discovery application for film enthusiasts and professionals.',
    technologies: ['Vue.js', 'JavaScript', 'CSS', 'OMDb API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/executant',
    year: '2023',
    featured: true,
    monogram: 'EX',
    overview: [
      'Executant is a Vue application for finding movies using the OMDb API. A search term returns matching titles that visitors can explore from the results page.',
      'A separate detail view brings together information such as the poster, plot, cast, director, genre, release year and runtime.',
    ],
    highlights: [
      {
        title: 'Movie search',
        description: 'Search the OMDb catalogue and browse matching titles.',
      },
      {
        title: 'Title details',
        description: 'Open a movie to read its plot and see its cast and other information.',
      },
      {
        title: 'Vue routing',
        description: 'Vue Router connects the search and movie-detail views.',
      },
    ],
  },
  {
    id: 4,
    slug: 'express-store-api',
    title: 'Express Store API',
    description:
      'An e-commerce REST API with product management, authentication, image uploads and email notifications.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Nodemailer'],
    category: 'backend',
    github: 'https://github.com/Thabiso-007/api.express-store',
    year: '2023',
    featured: true,
    monogram: 'ES',
    overview: [
      'Express Store API is an Express and MongoDB backend for an e-commerce application. Its routes cover products, users, carts, orders and other store resources.',
      'The project includes JWT-based authentication, product-image uploads using Cloudinary and email functionality using Nodemailer. A separate React dashboard provides an administrative interface.',
    ],
    highlights: [
      {
        title: 'Product management',
        description: 'Routes for listing, creating, updating and deleting products.',
      },
      {
        title: 'Store workflows',
        description: 'Endpoints for accounts, carts, orders and other store resources.',
      },
      {
        title: 'Supporting services',
        description: 'Image uploads, authentication and email are part of the backend stack.',
      },
    ],
    relatedSlug: 'express-store-admin',
  },
  {
    id: 5,
    slug: 'express-store-admin',
    title: 'Express Store Admin',
    description: 'A React dashboard for managing products and orders in the Express Store.',
    technologies: ['React', 'JavaScript', 'Redux Toolkit', 'REST API'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/admin.express-store',
    year: '2023',
    monogram: 'EA',
    overview: [
      'Express Store Admin is a React dashboard for managing the store from one interface. Its screens cover products, customers, orders, categories and content.',
      'The application uses React Router for navigation, Redux Toolkit for state management and Axios to make requests to the store backend.',
    ],
    highlights: [
      {
        title: 'Store administration',
        description: 'Screens for products, customers, orders and enquiries.',
      },
      {
        title: 'Catalogue and content',
        description: 'Management views for categories, brands, coupons and blogs.',
      },
      {
        title: 'Connected interface',
        description: 'A React frontend that works with the companion Express Store API.',
      },
    ],
    relatedSlug: 'express-store-api',
  },
  {
    id: 6,
    slug: 'weather-forecast',
    title: 'Weather Forecast',
    description: 'A weather application displaying forecasts and current atmospheric conditions.',
    technologies: ['Next.js', 'TypeScript', 'CSS', 'WeatherAPI'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/weather-forecast',
    year: '2023',
    monogram: 'WF',
    overview: [
      'Weather Forecast is a Next.js and TypeScript application that looks up weather data for a city using WeatherAPI.',
      'It presents current conditions alongside a multi-day forecast and additional information such as wind, humidity, visibility, sunrise and sunset.',
    ],
    highlights: [
      {
        title: 'City search',
        description: 'Look up a location and display a message when the city cannot be found.',
      },
      {
        title: 'Current and forecast',
        description: 'See current conditions alongside daily high and low temperatures.',
      },
      {
        title: 'Weather details',
        description: 'Explore wind, humidity, pressure, visibility and sun times.',
      },
    ],
  },
  {
    id: 7,
    slug: 'calculator',
    title: 'Calculator',
    description: 'A Vue.js calculator for everyday arithmetic operations.',
    technologies: ['Vue.js', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/calculator',
    year: '2023',
    monogram: 'CA',
    overview: [
      'This calculator is a small Vue application for everyday arithmetic, with a keypad and display contained in a Vue component.',
      'It supports addition, subtraction, multiplication and division, alongside controls for decimals, percentages, changing a number’s sign and clearing the display.',
    ],
    highlights: [
      {
        title: 'Core arithmetic',
        description: 'Add, subtract, multiply and divide from the keypad.',
      },
      { title: 'Extra controls', description: 'Use decimal, percentage, sign and clear actions.' },
      {
        title: 'Vue component',
        description: 'The interface and calculation logic are organized in a Vue component.',
      },
    ],
  },
  {
    id: 8,
    slug: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    description:
      'A responsive React take on the classic game, with computer play and score tracking.',
    technologies: ['React', 'TypeScript', 'SCSS', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/rock-paper-scissors',
    year: '2023',
    monogram: 'RP',
    overview: [
      'This React game lets a player choose rock, paper or scissors and play a round against the computer.',
      'The interface reveals the computer’s choice, shows the result and updates the score. It uses TypeScript components and SCSS for the presentation.',
    ],
    highlights: [
      {
        title: 'Play against the computer',
        description: 'Choose a move and compare it with the computer’s pick.',
      },
      {
        title: 'Score tracking',
        description: 'Wins and losses update the player’s score between rounds.',
      },
      {
        title: 'Responsive interface',
        description: 'The layout is designed to work across different screen sizes.',
      },
    ],
  },
  {
    id: 9,
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This site: a home for my work, skills and ways to get in touch.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'frontend',
    github: 'https://github.com/Thabiso-007/thabiso-hlatshwayo',
    monogram: 'TH',
    overview: [
      'This portfolio brings together my projects, technical skills and ways to get in touch. It is built with Next.js, React, TypeScript and Tailwind CSS.',
      'Visitors can explore individual projects, browse the DevOps and AWS toolkit, and send a message through the contact page.',
    ],
    highlights: [
      {
        title: 'Work and skills',
        description: 'A filterable project collection and an overview of the technologies I use.',
      },
      {
        title: 'Contact options',
        description:
          'A server-side contact form with an email-app fallback when delivery is unavailable.',
      },
      {
        title: 'Responsive navigation',
        description: 'A full-screen mobile menu and layouts for light and dark modes.',
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
