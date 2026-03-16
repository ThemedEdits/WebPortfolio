export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: '#0a0a0a' }}>

      <div className="flex flex-col items-center gap-8">
        {/* Logo with ripple rings */}
        <div className="relative flex items-center justify-center">

          {/* Ripple rings */}
          {[0, 1, 2].map(i => (
            <div key={i}
              className="absolute rounded-full"
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid rgba(245,166,35,0.5)',
                animation: `loaderRipple 2s ease-out ${i * 0.6}s infinite`,
                borderRadius: '50%',
              }}
            />
          ))}

          {/* Logo */}
          <div className="relative z-10"
            style={{ animation: 'loaderBreath 2s ease-in-out infinite' }}>
            <img
              src="/te-logo.svg"
              alt="Themed Edits"
              style={{
                width: '64px',
                height: '64px',
                objectFit: 'contain',
                borderRadius: '14px',
                filter: 'drop-shadow(0 0 16px rgba(245,166,35,0.5))',
              }}
            />
          </div>
        </div>

        {/* Sliding bar */}
        <div className="relative w-36 h-px overflow-hidden rounded-full"
          style={{ background: '#1e1e1e' }}>
          <div
            className="absolute top-0 h-full rounded-full"
            style={{
              width: '40%',
              background: 'linear-gradient(90deg, transparent, #F5A623, transparent)',
              animation: 'loaderSlide 1.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loaderRipple {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes loaderBreath {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 10px rgba(245,166,35,0.4)); }
          50%       { transform: scale(1.07); filter: drop-shadow(0 0 22px rgba(245,166,35,0.75)); }
        }
        @keyframes loaderSlide {
          0%   { left: -40%; }
          100% { left: 140%; }
        }
      `}</style>
    </div>
  );
}