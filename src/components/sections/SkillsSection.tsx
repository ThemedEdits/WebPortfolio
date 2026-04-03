import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const skillGroups = [
  { label: 'Frontend', color: '#F5A623', skills: [{ name: 'React', level: 95 }, { name: 'Next.js', level: 88 }, { name: 'TypeScript', level: 90 }, { name: 'JavaScript', level: 96 }, { name: 'TailwindCSS', level: 93 }] },
  { label: 'Backend', color: '#ffffff', skills: [{ name: 'Node.js', level: 85 }, { name: 'Firebase', level: 90 }, { name: 'REST APIs', level: 88 }, { name: 'MongoDB', level: 78 }, { name: 'Express.js', level: 83 }] },
  { label: 'Tools & Design', color: '#FFD07A', skills: [{ name: 'Figma', level: 82 }, { name: 'Git & GitHub', level: 92 }, { name: 'VS Code', level: 97 }, { name: 'Vercel', level: 90 }, { name: 'Framer Motion', level: 85 }] },
];

// Map badge label → devicon class name
const DEVICON_MAP: Record<string, string> = {
  'React':         'devicon-react-original colored',
  'TypeScript':    'devicon-typescript-plain colored',
  'Next.js':       'devicon-nextjs-plain',
  'Node.js':       'devicon-nodejs-plain colored',
  'Firebase':      'devicon-firebase-plain colored',
  'TailwindCSS':   'devicon-tailwindcss-plain colored',
  'Figma':         'devicon-figma-plain colored',
  'Git':           'devicon-git-plain colored',
  'REST APIs':     'devicon-fastapi-plain colored',
  'MongoDB':       'devicon-mongodb-plain colored',
  'Framer Motion': 'devicon-framermotion-original',
  'Vercel':        'devicon-vercel-plain',
  'Vite':          'devicon-vitejs-plain colored',
  'JavaScript':    'devicon-javascript-plain colored',
  'ShadCN':        'devicon-tailwindcss-plain colored',
};

const techBadges = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Firebase', 'TailwindCSS', 'Figma', 'Git', 'REST APIs', 'MongoDB', 'Framer Motion', 'Vercel', 'Vite', 'JavaScript', 'ShadCN'];

function buildInitialCounts() {
  const map: Record<string, number> = {};
  skillGroups.forEach(g => g.skills.forEach(s => { map[`${g.label}-${s.name}`] = 0; }));
  return map;
}

export default function SkillsSection() {
  const ref = useScrollReveal();
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>(buildInitialCounts);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && !animated) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const duration = 1200; const fps = 60; const totalFrames = Math.round((duration / 1000) * fps); let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      const next: Record<string, number> = {};
      skillGroups.forEach(g => g.skills.forEach(s => { next[`${g.label}-${s.name}`] = Math.round(eased * s.level); }));
      setCounts(next);
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, [animated]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 sm:py-28 relative overflow-hidden">
      {/* devicons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Glass badge */
        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px 6px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2);
          backdrop-filter: blur(12px);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .tech-badge:hover {
          background: rgba(245,166,35,0.08);
          border-color: rgba(245,166,35,0.25);
          box-shadow: inset 0 1px 0 rgba(245,166,35,0.1), 0 0 12px rgba(245,166,35,0.08);
        }
        .tech-badge i {
          font-size: 15px;
          line-height: 1;
        }
        .tech-badge span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #888880;
          letter-spacing: 0.02em;
        }
        .tech-badge:hover span {
          color: #b0b0a8;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, rgba(245,166,35,0.02), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="sec-item" style={{ animationDelay: '0s' }}>
          <SectionHeader tag="Skills" title="My Technical" highlight="Arsenal" subtitle="A carefully curated set of technologies I use to build exceptional digital products." />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {skillGroups.map((group, gi) => (
            <div key={group.label} className="sec-item glass rounded-2xl p-5 sm:p-6 glass-hover" style={{ animationDelay: `${0.1 + gi * 0.12}s` }}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                <h3 className="font-display font-semibold text-white text-sm sm:text-base">{group.label}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map(skill => {
                  const key = `${group.label}-${skill.name}`;
                  const current = counts[key] ?? 0;
                  return (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#888880] font-mono">{skill.name}</span>
                        <span className="font-mono tabular-nums" style={{ color: group.color, minWidth: '2.5rem', textAlign: 'right' }}>{current}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: '#222222' }}>
                        <div style={{ height: '100%', width: `${current}%`, background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`, boxShadow: current > 0 ? `0 0 8px ${group.color}66` : 'none', borderRadius: '9999px', transition: 'width 0.016s linear' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee with logo + text badges */}
        <div className="sec-item relative" style={{ animationDelay: '0.4s' }}>
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />

          <div className="overflow-hidden py-1">
            <div className="flex gap-3 animate-[scroll_30s_linear_infinite]" style={{ width: 'max-content' }}>
              {[...techBadges, ...techBadges].map((tech, i) => (
                <div key={i} className="tech-badge">
                  <i className={DEVICON_MAP[tech] ?? 'devicon-devicon-plain'} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}