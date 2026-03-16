import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="reveal max-w-4xl mx-auto text-center">
        <div className="relative gradient-border p-1 rounded-2xl sm:rounded-3xl">
          <div className="rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-14 sm:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111111, #161616)' }}>
            <div className="orb w-64 h-64 top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)' }} />
            <div className="orb w-48 h-48 top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 section-tag mb-5 sm:mb-6"><Sparkles size={12} />Ready to start?</div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6 leading-tight">
                Let's build something<br /><span className="text-gradient">extraordinary</span>
              </h2>
              <p className="text-[#555555] text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
                Have a project idea? Let's turn it into a premium digital experience that stands out.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base">
                  Start a Project <ArrowRight size={16} />
                </Link>
                <Link to="/projects" className="btn-outline flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base">
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}