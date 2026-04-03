import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, Code2, Palette, Zap, Globe } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

const timeline = [
  { year: '2019', title: 'Started Coding', desc: 'Fell in love with web development, building first HTML/CSS projects.' },
  { year: '2020', title: 'First Freelance Project', desc: 'Landed first client and delivered a full business website.' },
  { year: '2021', title: 'Learned React & Node.js', desc: 'Leveled up to full stack development with modern technologies.' },
  { year: '2022', title: 'Founded Themed Edits', desc: 'Created the Themed Edits brand to deliver premium digital products.' },
  { year: '2023', title: 'SaaS & Web Apps', desc: 'Began building complex SaaS products and scalable web applications.' },
  { year: '2024+', title: 'Growing & Scaling', desc: 'Expanding expertise and taking on bigger, more impactful projects.' },
];

const values = [
  { icon: Code2, title: 'Clean Code', desc: 'Every line is intentional. Code that is maintainable, scalable, and elegant.', color: '#F5A623' },
  { icon: Palette, title: 'Design Precision', desc: 'Pixel-perfect implementation with a sharp eye for visual detail.', color: '#ffffff' },
  { icon: Zap, title: 'Performance First', desc: 'Fast load times and smooth experiences are non-negotiable.', color: '#f59e0b' },
  { icon: Globe, title: 'Real Impact', desc: 'Building products that solve real problems and create real value.', color: '#FFD07A' },
];

// Skeleton Component
function AboutSkeleton() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero skeleton */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-20 sm:mt-4">
        <div className="absolute inset-0 w-full h-full skeleton" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <div className="skeleton h-5 sm:h-6 w-20 sm:w-24 rounded-full mb-3 sm:mb-4" />
          <div className="skeleton h-10 sm:h-12 md:h-14 w-56 sm:w-80 md:w-96 rounded-lg mb-2 sm:mb-3" />
          <div className="skeleton h-4 sm:h-5 w-56 sm:w-72 md:w-96 rounded-lg" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="pb-16 sm:pb-24 pt-8 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Avatar skeleton */}
          <div className="text-center mb-16 sm:mb-24">
            <div className="relative max-w-xs mx-auto mt-8">
              <div className="relative rounded-3xl overflow-hidden skeleton" style={{ height: '260px' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 skeleton h-8 w-40 rounded-full" />
            </div>
          </div>

          {/* Story + Values skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 sm:mb-24 mt-8">
            {/* Story text skeleton */}
            <div className="space-y-4 sm:space-y-5">
              <div className="skeleton h-8 sm:h-9 w-32 rounded-lg" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
              </div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
              </div>
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
                <div className="skeleton h-10 w-32 rounded-xl" />
                <div className="skeleton h-10 w-24 rounded-xl" />
              </div>
            </div>

            {/* Value cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="rounded-2xl p-4 sm:p-5" style={{ background: '#111111' }}>
                  <div className="skeleton w-9 h-9 sm:w-10 sm:h-10 rounded-xl mb-3 sm:mb-4" />
                  <div className="skeleton h-4 w-24 mb-1.5 sm:mb-2" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-5/6 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Timeline skeleton */}
          <div className="mb-16 sm:mb-24">
            <div className="skeleton h-8 sm:h-9 w-40 mx-auto mb-8 sm:mb-12 rounded-lg" />
            
            {/* Desktop timeline skeleton - hidden on mobile */}
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#2a2a2a]" />
              <div className="space-y-8">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div key={i} className={`flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="glass rounded-2xl p-5 inline-block max-w-xs w-64">
                        <div className="skeleton h-3 w-12 mb-1" />
                        <div className="skeleton h-5 w-32 mb-1" />
                        <div className="skeleton h-3 w-48" />
                      </div>
                    </div>
                    <div className="skeleton w-3 h-3 rounded-full shrink-0 mt-5" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline skeleton */}
            <div className="md:hidden relative pl-8">
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-[#2a2a2a]" />
              <div className="space-y-5">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-4 skeleton w-3 h-3 rounded-full" />
                    <div className="glass rounded-2xl p-4">
                      <div className="skeleton h-3 w-12 mb-1" />
                      <div className="skeleton h-5 w-32 mb-1" />
                      <div className="skeleton h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA skeleton */}
          <div className="text-center">
            <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12">
              <div className="skeleton h-7 sm:h-8 w-64 sm:w-80 mx-auto mb-3 sm:mb-4 rounded-lg" />
              <div className="skeleton h-4 w-56 sm:w-72 mx-auto mb-6 sm:mb-8 rounded" />
              <div className="skeleton h-11 sm:h-12 w-40 mx-auto rounded-xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate minimum 4-5 seconds loading for skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return <AboutSkeleton />;
  }

  return (
    <div ref={ref} className="min-h-screen overflow-x-hidden">
      <style>{`
        /* Rotating conic gradient border */
        @keyframes rotateBorder {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .rotating-border {
          position: relative;
          border-radius: 1rem;
        }
        .rotating-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          background: conic-gradient(from var(--angle), transparent 60%, #F5A623 80%, #FFD07A 90%, transparent 100%);
          animation: rotateBorder 3s linear infinite;
          z-index: 0;
        }
        .rotating-border::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: calc(1rem - 1px);
          background: #111111;
          z-index: 1;
        }
        .rotating-border > * {
          position: relative;
          z-index: 2;
        }

        /* Avatar shining bg */
        @keyframes avatarShine {
          0%   { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(300%) rotate(25deg); }
        }
        .avatar-shine::after {
          content: '';
          position: absolute;
          inset: -50% 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.06) 50%,
            transparent 80%
          );
          animation: avatarShine 2.5s ease-in-out infinite;
        }

        /* Timeline card hover shine */
        @keyframes cardShine {
          0%   { left: -80%; }
          100% { left: 120%; }
        }
        .timeline-card {
          position: relative;
          overflow: hidden;
        }
        .timeline-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -80%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(245,166,35,0.12) 50%,
            transparent 80%
          );
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .timeline-card:hover::after {
          opacity: 1;
          animation: cardShine 0.6s ease forwards;
        }

        /* Avatar bg pulse */
        @keyframes bgPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.08); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.03) 25%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.03) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 0.5rem;
        }
      `}</style>

      {/* ── Hero image banner ── */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-20 sm:mt-4">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=600&fit=crop&auto=format&q=80"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover object-center animate-fadeIn"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <span className="section-tag mb-3 sm:mb-4 text-[10px] sm:text-xs animate-slideDown">About</span>
          <h1 className="font-display font-extrabold text-white leading-tight mb-2 sm:mb-3 animate-slideDown"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', animationDelay: '0.1s' }}>
            Hammad Ahmed & <span className="text-gradient">Themed Edits</span>
          </h1>
          <p className="text-[#888880] max-w-md leading-relaxed animate-slideDown"
            style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', animationDelay: '0.2s' }}>
            The story behind the brand and the developer who builds it all.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pb-16 sm:pb-24 pt-8 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Hero avatar ── */}
          <div className="reveal text-center mb-16 sm:mb-24">
            {/* Male vector avatar with shining bg */}
            <div className="relative max-w-xs mx-auto mt-8">
              <div className="relative rounded-3xl overflow-hidden avatar-shine transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(245,166,35,0.2)' }}>

                {/* Radial glowing background */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 50% 40%, rgba(245,166,35,0.18) 0%, rgba(17,17,17,0.9) 70%)',
                  animation: 'bgPulse 3s ease-in-out infinite',
                }} />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(245,166,35,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.3) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }} />

                {/* Male vector SVG */}
                <div className="relative flex items-end justify-center pt-8 pb-0 px-8"
                  style={{ background: 'transparent', height: '260px' }}>
                  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-2xl" style={{ maxWidth: '180px' }}>
                    <ellipse cx="100" cy="200" rx="70" ry="20" fill="rgba(245,166,35,0.15)" />
                    <path d="M60 145 C55 160 50 185 52 220 L148 220 C150 185 145 160 140 145 C130 138 70 138 60 145Z" fill="url(#bodyGrad)" />
                    <path d="M88 145 L100 165 L112 145 L105 140 L95 140Z" fill="url(#collarGrad)" />
                    <rect x="88" y="118" width="24" height="26" rx="8" fill="url(#skinGrad)" />
                    <ellipse cx="100" cy="100" rx="34" ry="38" fill="url(#skinGrad)" />
                    <path d="M66 88 C66 60 134 60 134 88 C134 76 128 66 122 62 C116 58 108 56 100 56 C92 56 84 58 78 62 C72 66 66 76 66 88Z" fill="url(#hairGrad)" />
                    <ellipse cx="66" cy="100" rx="5" ry="7" fill="url(#skinGrad)" />
                    <ellipse cx="134" cy="100" rx="5" ry="7" fill="url(#skinGrad)" />
                    <path d="M98 103 Q100 110 102 103" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M90 113 Q100 120 110 113" stroke="rgba(0,0,0,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M60 145 C50 155 42 175 44 195 L58 195 C58 180 62 165 68 155Z" fill="url(#bodyGrad)" />
                    <path d="M140 145 C150 155 158 175 156 195 L142 195 C142 180 138 165 132 155Z" fill="url(#bodyGrad)" />
                    <ellipse cx="51" cy="198" rx="8" ry="9" fill="url(#skinGrad)" />
                    <ellipse cx="149" cy="198" rx="8" ry="9" fill="url(#skinGrad)" />
                    <rect x="72" y="195" width="56" height="6" rx="2" fill="rgba(245,166,35,0.4)" />
                    <rect x="68" y="200" width="64" height="3" rx="1.5" fill="rgba(245,166,35,0.25)" />
                    <defs>
                      <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FDDBB4" />
                        <stop offset="100%" stopColor="#F0B882" />
                      </linearGradient>
                      <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2C1810" />
                        <stop offset="100%" stopColor="#1a0f08" />
                      </linearGradient>
                      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e1e1e" />
                        <stop offset="100%" stopColor="#111111" />
                      </linearGradient>
                      <linearGradient id="collarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#e8941a" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Bottom amber glow bar */}
                <div className="h-1.5 w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #F5A623, transparent)' }} />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 hover:scale-105"
                style={{ background: '#111111', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623' }}>
                Full Stack Developer
              </div>
            </div>
          </div>

          {/* ── Story + Values ── */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 sm:mb-24 mt-8">
            {/* Story text */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">My Story</h2>
              <p className="text-[#888880] leading-relaxed text-sm sm:text-base">
                I'm <strong className="text-white">Hammad Ahmed</strong>, a full stack web developer with a relentless passion for crafting digital experiences that don't just work, they impress. I started coding in 2019 and quickly realized that the intersection of clean code and stunning design was where I belonged.
              </p>
              <p className="text-[#888880] leading-relaxed text-sm sm:text-base">
                <strong className="text-white">Themed Edits</strong> was born from a simple belief: every business deserves a digital presence that truly reflects its quality. I build premium web products from SaaS platforms to landing pages with the same attention to detail a designer gives their best work.
              </p>
              <p className="text-[#888880] leading-relaxed text-sm sm:text-base">
                When I'm not coding, I'm studying design trends, exploring new frameworks, and always pushing what's possible on the web. Every project is an opportunity to create something extraordinary.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
                <Link to="/contact" className="btn-primary flex items-center gap-2 text-sm group relative overflow-hidden">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative">Work With Me</span>
                  <ArrowRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a href="#" className="btn-outline flex items-center gap-2 text-sm group relative overflow-hidden">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <Download size={15} className="relative transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">Resume</span>
                </a>
              </div>
            </div>

            {/* Value cards — 1 col on mobile, 2 col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {values.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="rotating-border transition-all duration-300 hover:scale-105">
                  <div className="glass rounded-2xl p-4 sm:p-5 h-full">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <h3 className="font-display font-semibold text-white text-xs sm:text-sm mb-1.5 sm:mb-2">{title}</h3>
                    <p className="text-[10px] sm:text-xs text-[#555555] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="reveal mb-16 sm:mb-24">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white text-center mb-8 sm:mb-12">My Journey</h2>

            {/* Desktop: alternating left/right */}
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, transparent, #2a2a2a, transparent)' }} />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className={`flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="timeline-card glass rounded-2xl p-5 inline-block max-w-xs cursor-default transition-all duration-300 hover:shadow-xl"
                        style={{ transition: 'border-color 0.3s', border: '1px solid rgba(255,255,255,0.05)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,166,35,0.2)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'}>
                        <div className="font-mono text-xs mb-1" style={{ color: '#F5A623' }}>{item.year}</div>
                        <div className="font-display font-semibold text-white mb-1">{item.title}</div>
                        <div className="text-xs text-[#555555]">{item.desc}</div>
                      </div>
                    </div>
                    <div className="relative ring-[#0a0a0a] z-10 w-3 h-3 rounded-full shrink-0 mt-5 ring-4 transition-all duration-300 hover:scale-150"
                      style={{ background: '#F5A623', boxShadow: '0 0 12px rgba(245,166,35,0.5)' }} />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical stacked list */}
            <div className="md:hidden relative pl-8">
              <div className="absolute left-2.5 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, transparent, #2a2a2a 20%, #2a2a2a 80%, transparent)' }} />
              <div className="space-y-5">
                {timeline.map((item) => (
                  <div key={item.year} className="relative">
                    <div className="absolute -left-6 top-4 w-3 h-3 rounded-full ring-4 ring-[#0a0a0a] transition-all duration-300 hover:scale-150"
                      style={{ background: '#F5A623', boxShadow: '0 0 8px rgba(245,166,35,0.5)' }} />
                    <div className="timeline-card glass rounded-2xl p-4 cursor-default transition-all duration-300 hover:shadow-xl"
                      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,166,35,0.2)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'}>
                      <div className="font-mono text-xs mb-1" style={{ color: '#F5A623' }}>{item.year}</div>
                      <div className="font-display font-semibold text-white text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-[#555555] leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="reveal text-center">
            <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:shadow-xl"
              style={{ border: '1px solid rgba(245,166,35,0.15)' }}>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 sm:mb-4">
                Let's build something great together
              </h2>
              <p className="text-[#555555] mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                Whether it's a new project or improving something existing, I'm ready.
              </p>
              <Link to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base group relative overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative">Get In Touch</span>
                <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}