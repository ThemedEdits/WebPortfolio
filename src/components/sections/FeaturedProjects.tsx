import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../ui/ProjectCard';
import SkeletonCard from '../ui/SkeletonCard';
import SectionHeader from '../ui/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FeaturedProjects() {
  const { projects, loading } = useProjects();
  const ref = useScrollReveal();

  const featuredProjects = projects
    .filter(p => p.featured === true)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const displayProjects =
    featuredProjects.length > 0
      ? featuredProjects.slice(0, 3)
      : projects.slice(0, 3);

  // Re-run reveal when data loads so project cards animate in
  useEffect(() => {
    if (loading) return;
    const el = (ref as React.RefObject<HTMLElement>).current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    setTimeout(() => {
      el.querySelectorAll('.sec-item:not(.in-view)').forEach(child => observer.observe(child));
    }, 50);
    return () => observer.disconnect();
  }, [loading, projects.length]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="sec-item" style={{ animationDelay: '0s' }}>
        <SectionHeader tag="Portfolio" title="Featured" highlight="Projects" subtitle="Handpicked projects that showcase the quality and range of work under Themed Edits." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : displayProjects.length > 0
            ? displayProjects.map((project, i) => (
              <div key={project.id} className="sec-item" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                <ProjectCard project={project} />
              </div>
            ))
            : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center py-16 sm:py-20 gap-5">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2a2a2a] animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="28" cy="28" r="26" fill="rgba(245,166,35,0.07)" stroke="rgba(245,166,35,0.25)" strokeWidth="1.5" />
                      <ellipse cx="20" cy="23" rx="2.5" ry="2.5" fill="#F5A623" style={{ animation: 'eyeBlink 3.5s ease-in-out infinite' }} />
                      <ellipse cx="36" cy="23" rx="2.5" ry="2.5" fill="#F5A623" style={{ animation: 'eyeBlink 3.5s ease-in-out 0.1s infinite' }} />
                      <path d="M19 36 Q28 30 37 36" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none" style={{ animation: 'mouthSad 3s ease-in-out infinite', transformOrigin: '28px 33px' }} />
                      <ellipse cx="18" cy="29" rx="1.5" ry="2.5" fill="rgba(245,166,35,0.5)" style={{ animation: 'tearDrop 3s ease-in 0.8s infinite' }} />
                      <ellipse cx="38" cy="29" rx="1.5" ry="2.5" fill="rgba(245,166,35,0.5)" style={{ animation: 'tearDrop 3s ease-in 1.4s infinite' }} />
                    </svg>
                  </div>
                  <div className="absolute inset-4 rounded-full animate-pulse" style={{ background: 'rgba(245,166,35,0.05)' }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-display font-semibold text-base mb-1">No featured projects yet</p>
                  <p className="text-xs text-[#555555] font-mono">Mark projects as featured from the dashboard</p>
                </div>
                <style>{`
                @keyframes eyeBlink { 0%,90%,100% { ry: 2.5; } 95% { ry: 0.3; } }
                @keyframes mouthSad { 0%,100% { d: path("M19 36 Q28 30 37 36"); } 50% { d: path("M19 35 Q28 29 37 35"); } }
                @keyframes tearDrop { 0% { transform: translateY(0); opacity: 0.7; } 60% { transform: translateY(8px); opacity: 0.3; } 100% { transform: translateY(12px); opacity: 0; } }
              `}</style>
              </div>
            )
        }
      </div>

      <div className="sec-item text-center" style={{ animationDelay: '0.4s' }}>
        <Link to="/projects" className="btn-primary inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base">
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}