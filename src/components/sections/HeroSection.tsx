import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Zap, Star } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1 });
    }
    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${p.opacity})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(245,166,35,${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] top-[-200px] left-[-200px]" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] bottom-[-100px] right-[-100px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(24px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0)  scale(1);    }
          }
          .hero-item {
            opacity: 0;
            animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}</style>

        {/* Badge */}
        <div className="hero-item inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 sm:mb-8 glass"
          style={{ border: '1px solid rgba(255,208,122,0.2)', animationDelay: '0.05s' }}>
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="text-xs font-mono text-[#4ade80] tracking-wider">Available for projects</span>
        </div>

        {/* Headline */}
        <h1 className="hero-item font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-white mb-5 sm:mb-6"
          style={{ animationDelay: '0.15s' }}>
          Crafting modern
          <br />
          <span className="text-gradient">digital experiences</span>
        </h1>

        <p className="hero-item text-base sm:text-lg md:text-xl text-[#555555] max-w-2xl mx-auto mb-3 sm:mb-4 font-body"
          style={{ animationDelay: '0.25s' }}>
          Full Stack Web Developer
        </p>
        <p className="hero-item text-sm sm:text-base text-[#444444] max-w-xl mx-auto mb-10 sm:mb-12"
          style={{ animationDelay: '0.32s' }}>
          Building fast, scalable and beautiful web applications that drive real business results.
        </p>

        {/* CTAs */}
        <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20"
          style={{ animationDelay: '0.4s' }}>
          <Link to="/projects" className="btn-primary flex items-center gap-2 text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
            View Projects <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-outline flex items-center gap-2 text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
            Contact Me
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-item flex flex-row items-center justify-center gap-8 sm:gap-16"
          style={{ animationDelay: '0.5s' }}>
          {[
            { value: '20+', label: 'Projects Built' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-gradient mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-[#555555] font-mono tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges — desktop only */}
      <div className="hidden lg:block pointer-events-none">
        <div className="absolute bottom-40 left-10 rounded-2xl p-4 animate-float" style={{ animationDelay: '0s', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,166,35,0.2)' }}>
          <div className="flex items-center gap-2"><Code2 size={16} className="text-accent" /><span className="text-xs font-mono text-white">React + TypeScript</span></div>
        </div>
        <div className="absolute bottom-52 right-10 rounded-2xl p-4 animate-float" style={{ animationDelay: '2s', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div className="flex items-center gap-2"><Zap size={16} className="text-[#ffffff]" /><span className="text-xs font-mono text-white">Full Stack Dev</span></div>
        </div>
        <div className="absolute top-28 left-1/4 -translate-x-1/2 rounded-2xl p-4 animate-float" style={{ animationDelay: '1s', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,208,122,0.2)' }}>
          <div className="flex items-center gap-2"><Star size={16} className="text-[#FFD07A]" /><span className="text-xs font-mono text-white">Premium Quality</span></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
    </section>
  );
}