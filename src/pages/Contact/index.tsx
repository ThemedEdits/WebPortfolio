import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Mail, Github, Linkedin, Twitter, CheckCircle2, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const socials = [
  { icon: Github,   label: 'GitHub',     href: 'https://github.com',                    color: '#e8e8e0' },
  { icon: Linkedin, label: 'LinkedIn',   href: 'https://linkedin.com',                  color: '#0a66c2' },
  { icon: Twitter,  label: 'Twitter / X', href: 'https://twitter.com',                  color: '#1d9bf0' },
  { icon: Mail,     label: 'Email',      href: 'mailto:themed.edits.co@gmail.com',      color: '#F5A623' },
];

const infoCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'themed.edits.co@gmail.com',
    href: 'mailto:themed.edits.co@gmail.com',
    color: '#F5A623',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: '#FFD07A',
  },
  {
    icon: MapPin,
    label: 'Timezone',
    value: 'PKT — UTC+5',
    href: null,
    color: '#ffffff',
  },
];

// Skeleton Component
function ContactSkeleton() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero skeleton */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-20 sm:mt-4">
        <div className="absolute inset-0 w-full h-full skeleton" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <div className="skeleton h-5 sm:h-6 w-20 sm:w-24 rounded-full mb-3 sm:mb-4" />
          <div className="skeleton h-10 sm:h-12 md:h-14 w-48 sm:w-64 md:w-80 rounded-lg mb-2 sm:mb-3" />
          <div className="skeleton h-4 sm:h-5 w-56 sm:w-72 md:w-96 rounded-lg" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Info strip skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl p-4 sm:p-5" style={{ background: '#111111' }}>
                <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="skeleton h-3 w-16 mb-1.5" />
                  <div className="skeleton h-4 w-28 sm:w-36" />
                </div>
              </div>
            ))}
          </div>

          {/* Main grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left sidebar skeleton */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
              {/* Availability skeleton */}
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="skeleton w-2.5 h-2.5 rounded-full" />
                  <div className="skeleton h-3 w-32" />
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                </div>
              </div>

              {/* Social links skeleton */}
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111' }}>
                <div className="skeleton h-5 w-32 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5">
                      <div className="skeleton w-8 h-8 rounded-lg shrink-0" />
                      <div className="skeleton h-4 w-24 flex-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect skeleton */}
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111' }}>
                <div className="skeleton h-5 w-32 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="skeleton h-5 w-8 rounded shrink-0" />
                      <div className="skeleton h-4 w-32 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form skeleton */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5" style={{ background: '#111111' }}>
                <div className="mb-2">
                  <div className="skeleton h-7 sm:h-8 w-40 mb-2" />
                  <div className="skeleton h-3 w-48" />
                </div>
                
                {/* Name and email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="skeleton h-3 w-12 mb-2" />
                    <div className="skeleton h-10 w-full rounded-xl" />
                  </div>
                  <div>
                    <div className="skeleton h-3 w-12 mb-2" />
                    <div className="skeleton h-10 w-full rounded-xl" />
                  </div>
                </div>
                
                {/* Subject */}
                <div>
                  <div className="skeleton h-3 w-16 mb-2" />
                  <div className="skeleton h-10 w-full rounded-xl" />
                </div>
                
                {/* Message */}
                <div>
                  <div className="skeleton h-3 w-16 mb-2" />
                  <div className="skeleton h-32 w-full rounded-xl" />
                </div>
                
                {/* Button */}
                <div className="skeleton h-11 sm:h-12 w-full rounded-xl" />
                
                {/* Footer text */}
                <div className="skeleton h-3 w-48 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: searchParams.get('ref') ? `Source code for: ${searchParams.get('ref')}` : '',
    message: '',
  });

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
      { threshold: 0.08 }
    );
    el.querySelectorAll('.reveal').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setFormLoading(true);

    try {
      // ── EmailJS send ──────────────────────────────────────────────
      // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
      // with values from your EmailJS dashboard (see setup steps below).
      const { default: emailjs } = await import('@emailjs/browser');

      // 1) Email to YOU (the admin)
      await emailjs.send(
        'Web Portfolio',      // e.g. 'service_abc123'
        'Web Portfolio',     // e.g. 'template_abc123'  (admin notification template)
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || '(No subject)',
          message:      form.message,
          to_email:     'themed.edits.co@gmail.com',
          reply_to:     form.email,
        },
        'dlTAzaXJt9czMLHsa'       // e.g. 'user_abc123'
      );

      // 2) Auto-reply to the USER
      await emailjs.send(
        'Web Portfolio',
        'Web Portfolio 1',  // separate auto-reply template
        {
          to_name:   form.name,
          to_email:  form.email,
          subject:   form.subject || 'Your message to Themed Edits',
        },
        'dlTAzaXJt9czMLHsa'
      );
      // ─────────────────────────────────────────────────────────────

      setSent(true);
      toast.success("Message sent! I'll get back to you soon.");
    } catch (err) {
      console.error(err);
      toast.error('Failed to send. Please email directly.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <ContactSkeleton />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Hero image banner ── */}
      <div className="relative h-52 xs:h-60 sm:h-72 md:h-80 overflow-hidden mt-20 sm:mt-4">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=600&fit=crop&auto=format&q=80"
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover object-center animate-fadeIn"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 sm:pt-12">
          <span className="section-tag mb-3 sm:mb-4 text-[10px] sm:text-xs animate-slideDown">Contact</span>
          <h1 className="font-display font-extrabold text-white leading-tight mb-2 sm:mb-3 animate-slideDown"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', animationDelay: '0.1s' }}>
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-[#888880] max-w-md leading-relaxed animate-slideDown"
            style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', animationDelay: '0.2s' }}>
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div ref={ref} className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Info strip */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
            {infoCards.map(({ icon: Icon, label, value, href, color }, idx) => (
              <div key={label}
                className="flex items-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-105"
                style={{ background: '#111111', border: `1px solid ${color}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-[#555555] mb-0.5 uppercase tracking-wider">{label}</div>
                  {href
                    ? <a href={href} className="text-sm font-medium text-white hover:underline truncate block transition-all duration-300 hover:pl-1"
                        style={{ textDecorationColor: color }}>{value}</a>
                    : <div className="text-sm font-medium text-white">{value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">

            {/* ── Left sidebar ── */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

              {/* Availability */}
              <div className="reveal rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.03))', border: '1px solid rgba(245,166,35,0.2)' }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)' }} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="text-xs font-mono font-medium text-[#4ade80] tracking-wider">Available for projects</span>
                </div>
                <p className="text-sm text-[#888880] leading-relaxed">
                  Currently taking on new clients. Whether it's a quick landing page or a full SaaS, let's talk.
                </p>
              </div>

              {/* Social links */}
              <div className="reveal rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl" style={{ background: '#111111', border: '1px solid #222222' }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Find Me Online</h3>
                <div className="space-y-2">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group"
                      style={{ border: '1px solid transparent' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = `${color}08`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${color}20`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                      }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                        <Icon size={14} style={{ color }} />
                      </div>
                      <span className="text-sm text-[#888880] group-hover:text-white transition-colors">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="reveal rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl" style={{ background: '#111111', border: '1px solid #222222' }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">What to Expect</h3>
                <div className="space-y-3">
                  {[
                    { step: '01', text: 'Send your message with project details' },
                    { step: '02', text: 'Receive a reply within 24 hours' },
                    { step: '03', text: 'We discuss scope and timeline' },
                    { step: '04', text: 'Start building something great' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3 group/step transition-all duration-300 hover:translate-x-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 shrink-0 transition-all duration-300 group-hover/step:scale-110"
                        style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                        {step}
                      </span>
                      <span className="text-xs text-[#888880] leading-relaxed group-hover/step:text-white transition-colors duration-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-3 reveal" style={{ transitionDelay: '0.15s' }}>
              {sent ? (
                <div className="rounded-2xl p-8 sm:p-10 md:p-14 text-center flex flex-col items-center justify-center h-full min-h-[400px] transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.06), rgba(74,222,128,0.02))', border: '1px solid rgba(74,222,128,0.2)' }}>
                  {/* Animated success icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)' }}>
                      <CheckCircle2 size={32} className="text-[#4ade80]" />
                    </div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ background: 'rgba(74,222,128,0.3)' }} />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">Message Sent!</h3>
                  <p className="text-[#888880] mb-2 text-sm sm:text-base max-w-sm">
                    Thanks for reaching out, <span className="text-white font-medium">{form.name}</span>.
                  </p>
                  <p className="text-xs text-[#555555] mb-8">
                    A confirmation was sent to <span className="text-[#F5A623]">{form.email}</span>
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-outline text-sm px-6 py-2.5 relative overflow-hidden group/btn">
                    <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                    <span className="relative">Send Another</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                  className="rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5 transition-all duration-300 hover:shadow-xl"
                  style={{ background: '#111111', border: '1px solid #222222' }}>

                  {/* Form header */}
                  <div className="mb-2">
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">Send a Message</h2>
                    <p className="text-xs text-[#555555]">All fields marked * are required</p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 uppercase tracking-wider">Name *</label>
                      <input name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name" className="input-field text-sm transition-all duration-300 " required />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 uppercase tracking-wider">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com" className="input-field text-sm transition-all duration-300 " required />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 uppercase tracking-wider">Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      placeholder="What's this about?" className="input-field text-sm transition-all duration-300 " />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 uppercase tracking-wider">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project, timeline, budget, or any questions..."
                      rows={6} className="input-field resize-none text-sm transition-all duration-300 " required />
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={formLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group/btn">
                    <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                    {formLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span className="relative">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="relative transition-transform duration-300 group-hover/btn:scale-110" />
                        <span className="relative">Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#444444] text-center">
                    By submitting you agree to be contacted via email regarding your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
    </div>
  );
}