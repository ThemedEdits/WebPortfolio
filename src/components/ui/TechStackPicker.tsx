import { useState } from 'react';
import { Check, Search } from 'lucide-react';

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  mono?: boolean; // true = icon is black monochrome, needs invert filter
}

// SVG icons as data URIs / inline SVGs rendered via img tag using CDN
export const TECH_STACK: TechItem[] = [
  { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Nuxt.js', color: '#00DC82', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  { name: 'Svelte', color: '#FF3E00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'Angular', color: '#DD0031', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'TailwindCSS', color: '#38BDF8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'CSS3', color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'HTML5', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'SASS', color: '#CC6699', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django', color: '#092E20', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PHP', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Laravel', color: '#FF2D20', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Firebase', color: '#FFCA28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Redis', color: '#DC382D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Supabase', color: '#3ECF8E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'GraphQL', color: '#E10098', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'REST API', color: '#F5A623', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', color: '#326CE5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Vercel', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Figma', color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'VS Code', color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Vite', color: '#646CFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Webpack', color: '#8DD6F9', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
  { name: 'Redux', color: '#764ABC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Socket.io', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' },
  { name: 'Stripe', color: '#635BFF', mono: true, icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg' },
  { name: 'Prisma', color: '#2D3748', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
];

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function TechStackPicker({ selected, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filtered = TECH_STACK.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter(s => s !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  const selectedItems = TECH_STACK.filter(t => selected.includes(t.name));

  return (
    <div>
      {/* Selected chips */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedItems.map(tech => (
            <button
              key={tech.name}
              type="button"
              onClick={() => toggle(tech.name)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 group"
              style={{
                background: `${tech.color}15`,
                border: `1px solid ${tech.color}40`,
                color: tech.color,
              }}
            >
              <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain"
                style={{ filter: tech.mono || tech.color === '#ffffff' ? 'brightness(0) invert(1)' : 'none' }} />
              {tech.name}
              <span className="opacity-50 group-hover:opacity-100 ml-0.5">×</span>
            </button>
          ))}
        </div>
      )}

      {/* Expand/Collapse panel */}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        className="input-field flex items-center justify-between gap-2 cursor-pointer mb-2"
      >
        <span className="text-[#555555] text-sm">
          {selected.length === 0
            ? 'Click to select technologies...'
            : `${selected.length} selected — click to ${expanded ? 'close' : 'edit'}`}
        </span>
        <span
          className="text-[#555555] text-xs font-mono transition-transform duration-200 inline-block"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
        >▾</span>
      </button>

      {expanded && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #2a2a2a', background: '#0a0a10' }}
        >
          {/* Search */}
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field py-2 text-sm"
                style={{ paddingLeft: '2.25rem', background: '#161616' }}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="p-3 grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto">
            {filtered.map(tech => {
              const isSelected = selected.includes(tech.name);
              return (
                <button
                  key={tech.name}
                  type="button"
                  onClick={() => toggle(tech.name)}
                  className="relative flex flex-col items-center gap-2 p-2.5 rounded-xl transition-all duration-200 group"
                  style={{
                    background: isSelected ? `${tech.color}12` : 'transparent',
                    border: `1px solid ${isSelected ? tech.color + '50' : '#222222'}`,
                  }}
                  title={tech.name}
                >
                  {/* Checkmark */}
                  {isSelected && (
                    <div
                      className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: tech.color }}
                    >
                      <Check size={9} className="text-black" />
                    </div>
                  )}
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-7 h-7 object-contain"
                    style={{ filter: tech.mono || tech.color === '#ffffff' ? 'brightness(0) invert(1)' : 'none' }}
                  />
                  <span
                    className="text-[9px] font-mono text-center leading-tight line-clamp-1 w-full"
                    style={{ color: isSelected ? tech.color : '#555555' }}
                  >
                    {tech.name}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-5 text-center py-6 text-[#555555] text-xs">
                No technologies found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}