import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ui/ProjectCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import SectionHeader from '../../components/ui/SectionHeader';

const CATEGORIES = ['All', 'Web App', 'Landing Page', 'SaaS', 'E-Commerce', 'Portfolio', 'Other'];

// Skeleton matches exact layout of real search bar
function SearchBarSkeleton() {
  return (
    <div className="relative w-full">
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
  );
}

// Skeleton matches exact layout of filter pills row
function FilterSkeleton() {
  const widths = [40, 60, 80, 96, 80, 96, 64];
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-hidden pb-1 sm:flex-wrap sm:justify-center">
        {widths.map((w, i) => (
          <div
            key={i}
            className="skeleton h-9 rounded-xl flex-shrink-0"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = projects.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="min-h-screen">

      {/* ── Hero with royalty-free image ── */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-16 sm:mt-7">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=600&fit=crop&auto=format&q=80"
          alt="Projects hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%)' }} />
        {/* Top navbar fade */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%)' }} />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <span className="section-tag mb-3 sm:mb-4 text-[10px] sm:text-xs">Portfolio</span>
          <h1 className="font-display font-extrabold text-white leading-tight mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}>
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-[#888880] max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)' }}>
            Every project is crafted with precision, performance, and design in mind.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">

        {/* Search + Filter — both skeletons sit in same flex column as the real UI */}
        <div className="flex flex-col gap-3 mb-5 sm:mb-8">

          {/* Search */}
          {loading ? <SearchBarSkeleton /> : (
            <div className="relative w-full">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.5rem', fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)' }}
              />
            </div>
          )}

          {/* Filter pills */}
          {loading ? <FilterSkeleton /> : (
            <div className="relative">
              {/* Right fade on mobile */}
              <div className="sm:hidden absolute right-0 top-0 bottom-1 w-10 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, #0a0a0a)' }} />

              <div
                className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:justify-center"
                style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .filter-row::-webkit-scrollbar { display: none; }
                `}</style>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="filter-row flex-shrink-0 font-mono font-medium tracking-wide transition-all duration-200 rounded-xl"
                    style={{
                      fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
                      padding: 'clamp(0.375rem, 1.5vw, 0.625rem) clamp(0.5rem, 2vw, 1rem)',
                      background: category === cat ? '#F5A623' : 'rgba(18,18,18,0.6)',
                      color: category === cat ? '#0a0a0a' : '#555555',
                      border: `1px solid ${category === cat ? 'transparent' : '#222222'}`,
                      backdropFilter: category !== cat ? 'blur(12px)' : undefined,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Count */}
        {!loading && (
          <p className="font-mono mb-4 sm:mb-6" style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', color: '#555555' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Grid — 1 col on tiny screens, 2 col sm+, 3 col lg+ */}
        <div
          ref={ref}
          className="grid gap-3 sm:gap-4 lg:gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
            ? filtered.map((project, i) => (
                <div key={project.id} className="reveal" style={{ transitionDelay: `${(i % 6) * 0.07}s` }}>
                  <ProjectCard project={project} />
                </div>
              ))
            : (
              <div className="col-span-full text-center py-12 sm:py-24 px-4">
                <div className="flex flex-col items-center gap-4 sm:gap-5">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2a2a2a] animate-spin"
                      style={{ animationDuration: '8s' }} />
                    <div className="absolute inset-3 rounded-full animate-pulse"
                      style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#F5A623' }}>
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"
                          strokeDasharray="4 2"
                          style={{ animation: 'dashRotate 3s linear infinite', transformOrigin: '11px 11px' }} />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="11" cy="11" r="3" fill="rgba(245,166,35,0.2)" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-white font-display font-semibold mb-1"
                      style={{ fontSize: 'clamp(0.875rem, 3vw, 1.125rem)' }}>
                      No projects found
                    </p>
                    <p className="text-[#555555] font-mono"
                      style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)' }}>
                      Try a different search or category
                    </p>
                  </div>

                  {(search || category !== 'All') && (
                    <button
                      onClick={() => { setSearch(''); setCategory('All'); }}
                      className="btn-outline mt-1"
                      style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', padding: '0.5rem 1.25rem' }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <style>{`
                  @keyframes dashRotate {
                    from { stroke-dashoffset: 0; }
                    to   { stroke-dashoffset: -24; }
                  }
                `}</style>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}