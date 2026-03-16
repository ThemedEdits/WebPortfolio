import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  { name: 'Sarah Johnson', role: 'Founder, LaunchPad', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', text: 'Hammad delivered our SaaS dashboard on time and beyond expectations. The UI is stunning and performance is incredible. Themed Edits truly understands premium digital experiences.', rating: 5 },
  { name: 'Alex Chen', role: 'CTO, NexaStack', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', text: 'Working with Themed Edits was a game-changer. The attention to detail in both code quality and design was remarkable. Our conversion rate jumped 40% after the redesign.', rating: 5 },
  { name: 'Maria Garcia', role: 'Product Manager, Flowly', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', text: 'Clean code, beautiful design, and fast delivery. Hammad really listens to what you need and delivers something even better. Will definitely work with Themed Edits again.', rating: 5 },
  { name: 'James Rivera', role: 'CEO, DigitalFlow Agency', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', text: 'The portfolio website built for us is nothing short of spectacular. It generated more leads in the first week than our old site did in months. Exceptional work.', rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  function go(dir: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(c => (c + dir + testimonials.length) % testimonials.length); setAnimating(false); }, 300);
  }

  const t = testimonials[current];

  return (
    <section ref={ref} className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="reveal"><SectionHeader tag="Testimonials" title="Client" highlight="Feedback" subtitle="What people say about working with Themed Edits." /></div>

      <div className="reveal max-w-2xl mx-auto" style={{ transitionDelay: '0.1s' }}>
        <div className="relative glass rounded-2xl sm:rounded-3xl p-7 sm:p-10 text-center" style={{ border: '1px solid rgba(245,166,35,0.12)' }}>
          <div className="absolute top-6 left-8 text-5xl sm:text-6xl font-display text-[#F5A623]/10 leading-none select-none">"</div>
          <div className={`transition-all duration-300 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="flex justify-center gap-1 mb-5 sm:mb-6">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" className="text-[#f59e0b]" />)}
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-[#888880] leading-relaxed italic mb-6 sm:mb-8">"{t.text}"</p>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#F5A623]/20" />
              <div className="text-left">
                <div className="font-display font-semibold text-white text-sm sm:text-base">{t.name}</div>
                <div className="text-xs text-[#555555] font-mono">{t.role}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <button onClick={() => go(-1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-[#555555] hover:text-white transition-colors"><ChevronLeft size={16} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === current ? '24px' : '8px', background: i === current ? '#F5A623' : '#2a2a2a' }} />
              ))}
            </div>
            <button onClick={() => go(1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-[#555555] hover:text-white transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}