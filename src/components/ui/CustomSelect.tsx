import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="input-field flex items-center justify-between gap-2 cursor-pointer select-none"
      >
        <span className={value ? 'text-white' : 'text-[#555555]'}>
          {value || placeholder || 'Select...'}
        </span>
        <ChevronDown
          size={15}
          className="text-[#555555] shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden py-1.5"
          style={{
            background: '#111111',
            border: '1px solid #2a2a2a',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 text-left"
              style={{
                color: value === opt ? '#F5A623' : '#888880',
                background: value === opt ? 'rgba(245,166,35,0.08)' : 'transparent',
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {opt}
              {value === opt && <Check size={13} className="text-accent shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}