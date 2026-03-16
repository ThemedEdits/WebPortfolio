import { Link } from 'react-router-dom';
import { Github, Linkedin, Globe, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

// WhatsApp SVG icon (not in lucide)
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socials = [
  {
    icon: Github,
    href: 'https://github.com',
    label: 'GitHub',
    color: '#e8e8e0',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    color: '#0a66c2',
  },
  {
    icon: WhatsAppIcon,
    href: 'https://wa.me/923001234567', // replace with your number
    label: 'WhatsApp',
    color: '#25D366',
  },
  {
    icon: Globe,
    href: 'https://themededits.vercel.app', // replace with your live URL
    label: 'Website',
    color: '#F5A623',
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.4), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/te-logo.svg"
                alt="Themed Edits Logo"
                style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '8px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = 'logoShake 0.4s ease'; }}
                onAnimationEnd={e => { (e.currentTarget as HTMLElement).style.animation = ''; }}
              />
              <span className="font-display font-bold text-base sm:text-lg text-white">
                Themed<span className="text-gradient"> Edits</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xs">
              Building fast, scalable, and beautiful web applications. Crafting modern digital experiences that leave an impression.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-xs sm:text-sm text-white mb-4 sm:mb-5 tracking-wide">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-xs sm:text-sm text-[#555555] hover:text-white transition-colors flex items-center gap-1.5 group w-fit">
                    {link.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-xs sm:text-sm text-white mb-4 sm:mb-5 tracking-wide">
              Connect
            </h4>
            <div className="flex gap-2.5 mb-5">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#555555',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = color;
                    (e.currentTarget as HTMLElement).style.background = `${color}12`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}35`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#555555';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-[#555555] mb-1">
              Available for freelance & projects
            </p>
            <a href="mailto:themed.edits.co@gmail.com"
              className="text-xs sm:text-sm transition-colors hover:opacity-80"
              style={{ color: '#F5A623' }}>
              themed.edits.co@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] sm:text-xs text-[#333333] text-center sm:text-left">
            © {new Date().getFullYear()} Themed Edits by Hammad Ahmed. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-[#333333]">
            Built with{' '}
            <span style={{ color: '#F5A623' }}>React</span> +{' '}
            <span style={{ color: '#F5A623' }}>TypeScript</span> +{' '}
            <span style={{ color: '#F5A623' }}>Tailwind</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes logoShake {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-8deg); }
          40%  { transform: rotate(8deg); }
          60%  { transform: rotate(-5deg); }
          80%  { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </footer>
  );
}