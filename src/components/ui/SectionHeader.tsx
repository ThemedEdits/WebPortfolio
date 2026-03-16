interface Props {
  tag: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ tag, title, highlight, subtitle, center = true }: Props) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <span className="section-tag mb-5 inline-flex">{tag}</span>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-[#555570] text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
