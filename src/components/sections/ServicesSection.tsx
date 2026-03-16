import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Palette, Code2, Server, ArrowRight, Check } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const services = [
  {
    icon: Globe,
    title: 'Web App Development',
    description: 'Full-featured web applications built with React, Next.js, and Node.js. Scalable architecture from day one.',
    price: '$800',
    from: 'starting from',
    gradient: 'linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.03) 60%, transparent 100%)',
    borderGlow: 'rgba(245,166,35,0.35)',
    borderSoft: 'rgba(245,166,35,0.1)',
    iconBg: 'rgba(245,166,35,0.12)',
    iconColor: '#F5A623',
    accentColor: '#F5A623',
    features: ['React / Next.js', 'Firebase Backend', 'Auth & Database', 'Deployment'],
    popular: false,
  },
  {
    icon: Palette,
    title: 'Landing Page Design',
    description: 'High-converting, visually stunning landing pages that make a lasting impression and drive real results.',
    price: '$200',
    from: 'starting from',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
    borderGlow: 'rgba(255,255,255,0.4)',
    borderSoft: 'rgba(255,255,255,0.1)',
    iconBg: 'rgba(255,255,255,0.1)',
    iconColor: '#ffffff',
    accentColor: '#ffffff',
    features: ['Custom Design', 'Animations', 'Mobile Responsive', 'Fast Load'],
    popular: true,
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Pixel-perfect UI from your Figma designs. React, TypeScript, TailwindCSS and smooth animations.',
    price: '$400',
    from: 'starting from',
    gradient: 'linear-gradient(135deg, rgba(255,208,122,0.1) 0%, rgba(255,208,122,0.03) 60%, transparent 100%)',
    borderGlow: 'rgba(255,208,122,0.35)',
    borderSoft: 'rgba(255,208,122,0.1)',
    iconBg: 'rgba(255,208,122,0.12)',
    iconColor: '#FFD07A',
    accentColor: '#FFD07A',
    features: ['React + TypeScript', 'TailwindCSS', 'Framer Motion', 'Responsive'],
    popular: false,
  },
  {
    icon: Server,
    title: 'Full Stack Development',
    description: 'End-to-end product ownership — from database schema to polished UI. One developer, full delivery.',
    price: '$1,500',
    from: 'starting from',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.03) 60%, transparent 100%)',
    borderGlow: 'rgba(245,158,11,0.35)',
    borderSoft: 'rgba(245,158,11,0.1)',
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#f59e0b',
    accentColor: '#f59e0b',
    features: ['Full Frontend', 'API Development', 'Database Design', 'Full Deployment'],
    popular: false,
  },
];

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #222222' }}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl"
        style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
      {/* Title */}
      <div className="h-5 w-3/4 rounded-lg"
        style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
      {/* Desc lines */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded-md" style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
        <div className="h-3 w-5/6 rounded-md" style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
        <div className="h-3 w-4/6 rounded-md" style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
      </div>
      {/* Features */}
      <div className="space-y-2 pt-1">
        {[0,1,2,3].map(i => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full shrink-0"
              style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
            <div className="h-2.5 rounded-md" style={{ width: `${55 + i * 10}px`, background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
          </div>
        ))}
      </div>
      {/* Price row */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="h-8 w-16 rounded-lg" style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
        <div className="h-4 w-20 rounded-md" style={{ background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'svcShimmer 1.6s ease infinite' }} />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate brief load for skeleton demo — in real use just remove this timeout
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <style>{`
        @keyframes svcShimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes svcBorderPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Subtle section bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245,166,35,0.025) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="reveal">
          <SectionHeader tag="Services" title="What I" highlight="Offer"
            subtitle="Premium development services tailored to bring your vision to life." />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {!loaded
            ? Array.from({ length: 4 }).map((_, i) => <ServiceCardSkeleton key={i} />)
            : services.map((service, i) => {
                const Icon = service.icon;
                const isHovered = hoveredIndex === i;

                return (
                  <div
                    key={service.title}
                    className="reveal relative flex flex-col rounded-2xl overflow-hidden cursor-default transition-all duration-400"
                    style={{
                      transitionDelay: `${i * 0.1}s`,
                      transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                      transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Hard outer glow border on hover */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                      style={{
                        boxShadow: isHovered
                          ? `0 0 0 1.5px ${service.borderGlow}, 0 8px 40px ${service.borderGlow}40, 0 0 60px ${service.borderGlow}15`
                          : `0 0 0 1px ${service.borderSoft}`,
                        opacity: 1,
                        zIndex: 2,
                      }} />

                    {/* Card bg: dark base + gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl"
                      style={{ background: '#111111' }} />
                    <div className="absolute inset-0 rounded-2xl transition-opacity duration-300"
                      style={{ background: service.gradient, opacity: isHovered ? 1 : 0.6 }} />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-px transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${service.borderGlow}, transparent)`, opacity: isHovered ? 1 : 0.4, animation: 'svcBorderPulse 2.5s ease-in-out infinite' }} />

                    {/* Content */}
                    <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
                      {/* Popular badge */}
                      {service.popular && (
                        <div className="absolute -top-px left-1/2 -translate-x-1/2">
                          <div className="px-3 py-1 rounded-b-xl text-[10px] font-mono font-bold tracking-wider"
                            style={{ background: service.accentColor, color: '#0a0a0a' }}>
                            POPULAR
                          </div>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300"
                        style={{
                          background: service.iconBg,
                          border: `1px solid ${service.borderGlow}`,
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }}>
                        <Icon size={22} style={{ color: service.iconColor }} />
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-white text-sm sm:text-base mb-2 leading-snug">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed mb-5 flex-1"
                        style={{ color: isHovered ? '#888880' : '#555555', transition: 'color 0.3s' }}>
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map(f => (
                          <li key={f} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: `${service.accentColor}18`, border: `1px solid ${service.accentColor}40` }}>
                              <Check size={9} style={{ color: service.accentColor }} />
                            </div>
                            <span className="text-xs" style={{ color: '#888880' }}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Divider */}
                      <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${service.borderGlow}40, transparent)` }} />

                      {/* Price + CTA */}
                      <div className="flex flex-col gap-3 mt-auto">
                        <div>
                          <div className="text-[10px] font-mono mb-0.5" style={{ color: '#555555' }}>{service.from}</div>
                          <div className="font-display font-extrabold text-2xl sm:text-3xl leading-none"
                            style={{ color: service.accentColor }}>
                            {service.price}
                          </div>
                        </div>
                        <Link to="/contact"
                          className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl transition-all duration-200"
                          style={{
                            background: isHovered ? service.accentColor : `${service.accentColor}15`,
                            color: isHovered ? '#0a0a0a' : service.accentColor,
                            border: `1px solid ${service.borderGlow}`,
                          }}>
                          Get started <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
          }
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-10 sm:mt-14" style={{ transitionDelay: '0.4s' }}>
          <p className="text-sm text-[#555555] mb-4">Have a custom project in mind?</p>
          <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
            Let's Talk <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}