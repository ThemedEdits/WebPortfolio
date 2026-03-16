import { TECH_STACK } from './TechStackPicker';

interface Props {
  stack: string[];
  mode?: 'icons' | 'badges'; // icons = card view (icon only), badges = detail view (icon + name)
  max?: number;
}

export default function TechStackIcons({ stack, mode = 'icons', max }: Props) {
  const items = max ? stack.slice(0, max) : stack;
  const overflow = max && stack.length > max ? stack.length - max : 0;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {items.map(name => {
        const tech = TECH_STACK.find(t => t.name === name);
        if (!tech) {
          // Fallback for any tech not in the list
          return mode === 'badges' ? (
            <span
              key={name}
              className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#888898]"
              style={{ background: '#1a1a26', border: '1px solid #2a2a3a' }}
            >
              {name}
            </span>
          ) : (
            <span
              key={name}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-[#555570]"
              style={{ background: '#1a1a26', border: '1px solid #2a2a3a' }}
            >
              {name}
            </span>
          );
        }

        if (mode === 'badges') {
          return (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{
                background: `${tech.color}12`,
                border: `1px solid ${tech.color}35`,
                color: tech.color,
              }}
            >
              <img
                src={tech.icon}
                alt={name}
                className="w-4 h-4 object-contain shrink-0"
                style={{ filter: tech.mono || tech.color === '#ffffff' ? 'brightness(0) invert(1)' : 'none' }}
              />
              {name}
            </div>
          );
        }

        // icons mode — icon only with tooltip
        return (
          <div key={name} className="relative group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: `${tech.color}18`, border: `1px solid ${tech.color}30` }}
              title={name}
            >
              <img
                src={tech.icon}
                alt={name}
                className="w-4 h-4 object-contain"
                style={{ filter: tech.mono || tech.color === '#ffffff' ? 'brightness(0) invert(0.7)' : 'none' }}
              />
            </div>
            {/* Tooltip */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10"
              style={{ background: '#0d0d14', border: '1px solid #2a2a3a', color: '#888898' }}
            >
              {name}
            </div>
          </div>
        );
      })}

      {overflow > 0 && (
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#555570]"
          style={{ background: '#1a1a26', border: '1px solid #2a2a3a' }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}