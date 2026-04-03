// This is the same TECH_STACK data from TechStackPicker - we'll import or redefine it
// For standalone component, we'll define the mapping here

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  mono?: boolean;
}

// Complete tech stack mapping with icons (same as TechStackPicker)
export const TECH_STACK_MAP: Record<string, TechItem> = {
  'React': { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'Next.js': { name: 'Next.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', mono: true },
  'NextJS': { name: 'Next.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', mono: true },
  'TypeScript': { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  'JavaScript': { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'Vue.js': { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  'Vue': { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  'Nuxt.js': { name: 'Nuxt.js', color: '#00DC82', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  'Svelte': { name: 'Svelte', color: '#FF3E00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  'Angular': { name: 'Angular', color: '#DD0031', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  'TailwindCSS': { name: 'TailwindCSS', color: '#38BDF8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  'Tailwind CSS': { name: 'TailwindCSS', color: '#38BDF8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  'CSS3': { name: 'CSS3', color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  'CSS': { name: 'CSS3', color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  'HTML5': { name: 'HTML5', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  'HTML': { name: 'HTML5', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  'SASS': { name: 'SASS', color: '#CC6699', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  'SCSS': { name: 'SASS', color: '#CC6699', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  'Node.js': { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'NodeJS': { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'Express.js': { name: 'Express.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', mono: true },
  'Express': { name: 'Express.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', mono: true },
  'Python': { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  'Django': { name: 'Django', color: '#092E20', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  'PHP': { name: 'PHP', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  'Laravel': { name: 'Laravel', color: '#FF2D20', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  'Firebase': { name: 'Firebase', color: '#FFCA28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  'MongoDB': { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  'PostgreSQL': { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  'MySQL': { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  'Redis': { name: 'Redis', color: '#DC382D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  'Supabase': { name: 'Supabase', color: '#3ECF8E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  'GraphQL': { name: 'GraphQL', color: '#E10098', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  'REST API': { name: 'REST API', color: '#F5A623', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  'Docker': { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  'Kubernetes': { name: 'Kubernetes', color: '#326CE5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  'AWS': { name: 'AWS', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  'Vercel': { name: 'Vercel', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', mono: true },
  'Git': { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  'GitHub': { name: 'GitHub', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', mono: true },
  'Figma': { name: 'Figma', color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  'VS Code': { name: 'VS Code', color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  'Vite': { name: 'Vite', color: '#646CFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  'Webpack': { name: 'Webpack', color: '#8DD6F9', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
  'Redux': { name: 'Redux', color: '#764ABC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  'Socket.io': { name: 'Socket.io', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg', mono: true },
  'Stripe': { name: 'Stripe', color: '#635BFF', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg', mono: true },
  'Prisma': { name: 'Prisma', color: '#2D3748', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
  'Material UI': { name: 'Material UI', color: '#007FFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
  'MUI': { name: 'Material UI', color: '#007FFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
  'Bootstrap': { name: 'Bootstrap', color: '#7952B3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  'Three.js': { name: 'Three.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', mono: true },
  'Jest': { name: 'Jest', color: '#C21325', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
  'Cypress': { name: 'Cypress', color: '#17202C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-original.svg', mono: true },
};

interface Props {
  stack: string[];
  mode?: 'icons' | 'badges';
}

export default function TechStackIcons({ stack, mode = 'icons' }: Props) {
  if (!stack || stack.length === 0) return null;

  const getTechInfo = (techName: string): TechItem | null => {
    // Try exact match first
    if (TECH_STACK_MAP[techName]) return TECH_STACK_MAP[techName];
    // Try case-insensitive match
    const lowerName = techName.toLowerCase();
    const match = Object.values(TECH_STACK_MAP).find(
      t => t.name.toLowerCase() === lowerName
    );
    return match || null;
  };

  if (mode === 'icons') {
    return (
      <div className="flex flex-wrap gap-2">
        {stack.slice(0, 6).map(tech => {
          const techInfo = getTechInfo(tech);
          
          if (techInfo) {
            return (
              <div
                key={tech}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
                title={techInfo.name}
              >
                <img 
                  src={techInfo.icon} 
                  alt={techInfo.name} 
                  className="w-5 h-5 object-contain"
                  style={{ 
                    filter: techInfo.mono || techInfo.color === '#ffffff' 
                      ? 'brightness(0) invert(1)' 
                      : 'none',
                    maxWidth: '18px',
                    maxHeight: '18px'
                  }}
                />
              </div>
            );
          }
          
          // Fallback for unmapped tech
          return (
            <div
              key={tech}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              title={tech}
            >
              <span className="text-[9px] font-mono text-[#555555] leading-none text-center px-0.5">
                {tech.slice(0, 2).toUpperCase()}
              </span>
            </div>
          );
        })}
        {stack.length > 6 && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="text-[9px] font-mono text-[#555555]">+{stack.length - 6}</span>
          </div>
        )}
      </div>
    );
  }

  // badges mode (used in ProjectDetail sidebar)
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map(tech => {
        const techInfo = getTechInfo(tech);
        
        if (techInfo) {
          return (
            <div
              key={tech}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
              style={{
                background: `${techInfo.color}10`,
                border: `1px solid ${techInfo.color}30`,
              }}
            >
              <img 
                src={techInfo.icon} 
                alt={techInfo.name} 
                className="w-4 h-4 object-contain"
                style={{ 
                  filter: techInfo.mono || techInfo.color === '#ffffff' 
                    ? 'brightness(0) invert(1)' 
                    : 'none' 
                }}
              />
              <span className="text-xs font-mono" style={{ color: techInfo.color }}>
                {techInfo.name}
              </span>
            </div>
          );
        }
        
        // Fallback for unmapped tech
        return (
          <div
            key={tech}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-xs font-mono text-[#888880]">{tech}</span>
          </div>
        );
      })}
    </div>
  );
}