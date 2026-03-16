import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 30);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes logoShake {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-8deg); }
          40%  { transform: rotate(8deg); }
          60%  { transform: rotate(-5deg); }
          80%  { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }

        /* Curtain slides down */
        .mobile-curtain {
          transform: translateY(-100%);
          transition: transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .mobile-curtain.open {
          transform: translateY(0);
        }

        /* Nav items slide in from left (even) or right (odd) */
        .nav-item-mobile {
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-item-mobile.from-left  { transform: translateX(-60px); }
        .nav-item-mobile.from-right { transform: translateX(60px);  }

        .mobile-curtain.open .nav-item-mobile {
          opacity: 1;
          transform: translateX(0);
        }

        /* Bottom buttons fade up */
        .nav-cta-mobile {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mobile-curtain.open .nav-cta-mobile {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hamburger → X morphing lines */
        .burger-line {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: #e8e8e0;
          transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1),
                      opacity 0.2s ease,
                      width 0.3s ease;
          transform-origin: center;
        }
        .burger-wrap { display: flex; flex-direction: column; gap: 5px; }
        .burger-wrap.is-open .line-top    { transform: translateY(7px) rotate(45deg); }
        .burger-wrap.is-open .line-mid    { opacity: 0; transform: scaleX(0); }
        .burger-wrap.is-open .line-bot    { transform: translateY(-7px) rotate(-45deg); }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,box-shadow] duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <nav className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <img
              src="/te-logo.svg"
              alt="Themed Edits Logo"
              style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = 'logoShake 0.4s ease'; }}
              onAnimationEnd={e => { (e.currentTarget as HTMLElement).style.animation = ''; }}
            />
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Themed<span className="text-gradient"> Edits</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2 btn-outline text-xs py-2 px-4">
              <Lock size={13} /> Admin
            </Link>
            <Link to="/contact" className="btn-primary text-xs py-2 px-5">Hire Me</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden relative z-[60] p-2.5 rounded-xl"
            style={{ background: 'transparent' }}
            aria-label="Toggle menu"
          >
            <div className={`burger-wrap ${open ? 'is-open' : ''}`}>
              <span className="burger-line line-top" />
              <span className="burger-line line-mid" />
              <span className="burger-line line-bot" />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen curtain menu */}
      <div
        className={`mobile-curtain md:hidden fixed inset-0 z-40 flex flex-col ${open ? 'open' : ''}`}
        style={{
          background: 'rgba(5,5,5,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Amber accent line at very top */}
        <div className="h-px w-full shrink-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)' }} />

        {/* Top spacer for navbar height */}
        <div className="h-16 shrink-0" />

        {/* Nav links — centered, large, alternating sides */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
          {navLinks.map((link, i) => {
            const fromLeft = i % 2 === 0;
            // delay: 0.08s per item, starting after curtain (0.3s)
            const delay = open ? `${0.25 + i * 0.07}s` : '0s';
            return (
              <div
                key={link.to}
                className={`nav-item-mobile w-full ${fromLeft ? 'from-left' : 'from-right'}`}
                style={{ transitionDelay: delay }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center w-full py-4 border-b font-display font-bold transition-colors duration-200 ${
                      fromLeft ? 'justify-start' : 'justify-end'
                    } ${isActive ? 'text-[#F5A623]' : 'text-white hover:text-[#F5A623]'}`
                  }
                  style={{ borderColor: 'rgba(255,255,255,0.05)', fontSize: 'clamp(1.6rem, 7vw, 2.25rem)' }}
                >
                  {link.label}
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA buttons */}
        <div
          className="nav-cta-mobile px-8 pb-10 pt-8 flex flex-col gap-3"
          style={{ transitionDelay: open ? '0.65s' : '0s' }}
        >
          {/* Available badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-outline flex items-center justify-center gap-2 py-3 text-sm"
            >
              <Lock size={13} /> Admin
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary flex items-center justify-center py-3 text-sm"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}