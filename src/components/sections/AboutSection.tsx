import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const points = [
  'Passion for building modern, scalable web tools',
  'Focus on performance, clean architecture, and UI precision',
  'End-to-end ownership from design to deployment',
  'Creating solutions that balance aesthetics and function',
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Visual side */}
        <div className="reveal relative order-2 lg:order-1" style={{ transitionDelay: '0.15s' }}>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="gradient-border p-1 rounded-3xl">
              <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #111111, #161616)' }}>
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=500&fit=crop" alt="Developer workspace" className="w-full h-56 sm:h-72 object-cover opacity-70" />
                <div className="p-5 sm:p-8">
                  <div className="font-mono text-xs text-[#555555] mb-3">// about.tsx</div>
                  <div className="space-y-2">
                    {['const developer = "Hammad Ahmed"', 'const brand = "Themed Edits"', 'const role = "Full Stack Dev"'].map(line => (
                      <div key={line} className="font-mono text-xs">
                        <span className="text-[#ffffff]">const </span>
                        <span className="text-[#FFD07A]">{line.split('=')[0].replace('const ', '')}</span>
                        <span className="text-white"> = </span>
                        <span className="text-[#F5A623]">"{line.split('"')[1]}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 glass rounded-2xl p-4 glow-accent" style={{ border: '1px solid rgba(245,166,35,0.2)' }}>
              <div className="text-2xl font-display font-bold text-gradient">20+</div>
              <div className="text-xs text-[#555555] font-mono">Projects</div>
            </div>
            <div className="absolute -top-5 -left-5 glass rounded-2xl p-4" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="text-2xl font-display font-bold text-white">5+</div>
              <div className="text-xs text-[#555555] font-mono">Years Exp.</div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2 space-y-0">
          <div className="reveal" style={{ transitionDelay: '0.05s' }}>
            <SectionHeader tag="About Me" title="The person behind" highlight="Themed Edits" center={false} />
          </div>
          <div className="reveal space-y-4" style={{ transitionDelay: '0.15s' }}>
            <p className="text-[#888880] leading-relaxed text-sm sm:text-base">
              Hi, I'm <span className="text-white font-semibold">Hammad Ahmed</span>, a full stack web developer with a sharp eye for design and a deep love for clean, efficient code. Under the brand <span className="text-gradient font-semibold">Themed Edits</span>, I build premium digital products that help businesses stand out.
            </p>
            <p className="text-[#888880] leading-relaxed text-sm sm:text-base">
              My work bridges the gap between beautiful design and robust engineering — from SaaS platforms and web apps to landing pages that convert. Every pixel and every function is intentional.
            </p>
          </div>
          <div className="reveal mt-6 sm:mt-8 space-y-3" style={{ transitionDelay: '0.25s' }}>
            {points.map(point => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#FFD07A] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-[#888880]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}