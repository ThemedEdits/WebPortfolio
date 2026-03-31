interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function NoImagePlaceholder({ size = 'md', className = '' }: Props) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 56 : 40;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: 'linear-gradient(135deg, #141414 0%, #0f0f0f 100%)' }}
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(245,166,35,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.6) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Vector illustration */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.45 }}
        >
          {/* Image frame */}
          <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F5A623" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />

          {/* Mountain / landscape inside */}
          <path d="M4 30 L16 18 L24 25 L32 14 L44 30" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Sun circle */}
          <circle cx="35" cy="19" r="4" stroke="#F5A623" strokeWidth="1.5" fill="none" />

          {/* Slash through */}
          <line x1="8" y1="40" x2="40" y2="8" stroke="#F5A623" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>

        {size !== 'sm' && (
          <span className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.15em' }}>
            No Image
          </span>
        )}
      </div>
    </div>
  );
}