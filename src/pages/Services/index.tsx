import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Palette, Code2, Server, Layers, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web App Development',
    price: '$800',
    period: 'starting from',
    desc: 'Full-featured web applications with authentication, database, and backend logic. Built for scale.',
    features: ['React / Next.js frontend', 'Firebase or Node.js backend', 'Auth & user management', 'Database design', 'CI/CD pipeline', 'Vercel deployment'],
    color: '#F5A623',
    popular: false,
  },
  {
    icon: Palette,
    title: 'Landing Page Design',
    price: '$200',
    period: 'starting from',
    desc: 'High-converting, visually stunning landing pages with animations and mobile-first design.',
    features: ['Custom UI/UX design', 'Framer Motion animations', 'Fully responsive', 'SEO ready', 'Fast load time', 'Contact form integration'],
    color: '#ffffff',
    popular: true,
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    price: '$400',
    period: 'starting from',
    desc: 'Pixel-perfect frontend implementation from your Figma designs or your concept.',
    features: ['React + TypeScript', 'TailwindCSS styling', 'Component library setup', 'Animation & interactions', 'Performance optimization', 'Cross-browser compatibility'],
    color: '#FFD07A',
    popular: false,
  },
  {
    icon: Server,
    title: 'Full Stack Development',
    price: '$1,500',
    period: 'starting from',
    desc: 'Complete product ownership — from database schema to UI polish. One developer, full delivery.',
    features: ['Full frontend development', 'API & backend architecture', 'Database design', 'Auth & payments', 'Admin dashboards', 'Deployment & maintenance'],
    color: '#f59e0b',
    popular: false,
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    price: '$2,500',
    period: 'starting from',
    desc: 'Build your SaaS product from scratch with subscriptions, dashboards, and multi-tenant architecture.',
    features: ['Multi-user architecture', 'Subscription & billing', 'Admin panel', 'Analytics dashboard', 'API integrations', 'Scalable infrastructure'],
    color: '#FFD07A',
    popular: false,
  },
  {
    icon: Smartphone,
    title: 'UI/UX Consultation',
    price: '$75',
    period: 'per hour',
    desc: 'Design review, UX audit, and modern redesign strategy for your existing product.',
    features: ['UX audit & report', 'Design system creation', 'Figma prototypes', 'Mobile-first approach', 'Accessibility review', 'Implementation guidance'],
    color: '#34d399',
    popular: false,
  },
];

export default function Services() {
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
    <div ref={ref} className="min-h-screen">

      {/* ── Hero image banner ── */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-16 sm:mt-7">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=600&fit=crop&auto=format&q=80"
          alt="Services hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <span className="section-tag mb-3 sm:mb-4 text-[10px] sm:text-xs">Services</span>
          <h1 className="font-display font-extrabold text-white leading-tight mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}>
            What I <span className="text-gradient">Offer</span>
          </h1>
          <p className="text-[#888880] max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)' }}>
            Premium development services for businesses that want to stand out online.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pt-8 sm:pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="reveal relative glass rounded-2xl p-7 flex flex-col glass-hover transition-all duration-300 hover:-translate-y-2"
                  style={{ transitionDelay: `${i * 0.08}s` }}>
                  {s.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-mono font-bold"
                      style={{ background: 'linear-gradient(90deg, #F5A623, #e48e03)', color: '#000' }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                      <Icon size={22} style={{ color: s.color }} />
                    </div>
                    <div className="text-right">
                      <div className="font-display font-extrabold text-2xl" style={{ color: s.color }}>{s.price}</div>
                      <div className="text-[10px] text-[#555555] font-mono">{s.period}</div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-[#555555] leading-relaxed mb-6 flex-1">{s.desc}</p>

                  <ul className="space-y-2.5 mb-8">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} style={{ color: s.color }} className="shrink-0" />
                        <span className="text-xs text-[#888880]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn-primary text-center text-sm py-3 w-full">
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Custom CTA */}
          <div className="reveal glass rounded-3xl p-10 text-center" style={{ border: '1px solid rgba(245,166,35,0.15)' }}>
            <h2 className="font-display font-bold text-3xl text-white mb-4">Need something custom?</h2>
            <p className="text-[#555555] mb-8 max-w-xl mx-auto">
              Every project is unique. Let's talk about your specific needs and I'll put together a tailored proposal.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
              Discuss Your Project <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}