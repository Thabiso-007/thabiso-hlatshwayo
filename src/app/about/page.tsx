import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn more about my journey, experience, and passion for web development
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Story
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm Thabiso Hlatshwayo, a passionate Full Stack Developer with a love for creating 
                innovative web solutions. My journey in web development started with curiosity about 
                how websites work, and it has evolved into a career focused on building scalable, 
                user-friendly applications.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                With expertise in modern technologies like React, Next.js, TypeScript, and Node.js, 
                I enjoy working on both frontend and backend development. I believe in writing clean, 
                maintainable code and creating exceptional user experiences.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                What I Do
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I specialize in full-stack web development, with a focus on modern JavaScript 
                frameworks and libraries. My approach combines technical expertise with creative 
                problem-solving to deliver solutions that not only work well but also provide 
                great user experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Frontend Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Creating responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Backend Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Building robust APIs and server-side applications with Node.js, Express, and database technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Core Skills
              </h3>
              <div className="space-y-3">
                {[
                  { skill: 'React & Next.js', level: 90 },
                  { skill: 'TypeScript', level: 85 },
                  { skill: 'Node.js', level: 80 },
                  { skill: 'MongoDB', level: 75 },
                  { skill: 'Tailwind CSS', level: 90 },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.skill}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Experience
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Full Stack Developer
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Freelance • 2022 - Present
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Building custom web applications for various clients using modern technologies.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Web Developer
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tech Company • 2021 - 2022
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Developed and maintained web applications using React and Node.js.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-lg text-white">
              <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:thabiso.hlatshwayo@example.com"
                  className="flex items-center text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                <a
                  href="https://github.com/Thabiso-007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/thabiso-hlatshwayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
