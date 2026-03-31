import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MessageSquare, Check } from 'lucide-react';
import { getProjectBySlug, type Project } from '../../hooks/useProjects';
import TechStackIcons from '../../components/ui/TechStackIcons';
import NoImagePlaceholder from '../../components/ui/NoImagePlaceholder';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    getProjectBySlug(id).then(p => {
      if (!p) navigate('/projects');
      else setProject(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );

  if (!project) return null;

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-white transition-colors mb-10">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="section-tag mb-3 inline-flex">{project.category}</span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white">{project.title}</h1>
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
              <Link to={`/contact?ref=${encodeURIComponent(project.title)}`} className="btn-outline flex items-center gap-2">
                <MessageSquare size={15} />
                Get Source
              </Link>
            </div>
          </div>
          <p className="text-[#888880] text-lg max-w-3xl">{project.description}</p>
        </div>

        {/* Image Gallery */}
        <div className="mb-10 sm:mb-12">
          {/* Main image — 4:3 ratio (width wider than tall but more square) */}
          <div className="rounded-2xl overflow-hidden mb-3 sm:mb-4 relative mx-auto"
            style={{ border: '1px solid #222222', maxWidth: '680px', aspectRatio: '4/3' }}>
            {allImages.length > 0 ? (
              <img
                src={allImages[activeImg]}
                alt={project.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                key={activeImg}
              />
            ) : (
              <div className="relative w-full h-full">
                <NoImagePlaceholder size="lg" />
              </div>
            )}
          </div>

          {/* Thumbnail carousel — faded edges, scrollable */}
          {allImages.length > 1 && (
            <div className="relative mx-auto" style={{ maxWidth: '680px' }}>
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none rounded-l-xl"
                style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none rounded-r-xl"
                style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />

              <div
                className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                <style>{`.thumb-scroll::-webkit-scrollbar { display: none; }`}</style>
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="thumb-scroll shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      width: 'clamp(56px, 14vw, 80px)',
                      aspectRatio: '4/3',
                      outline: i === activeImg ? '2px solid #F5A623' : '2px solid transparent',
                      outlineOffset: '2px',
                      opacity: i === activeImg ? 1 : 0.45,
                      transform: i === activeImg ? 'scale(1.04)' : 'scale(1)',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Long description */}
            {project.longDescription && (
              <div className="glass rounded-2xl p-8">
                <h2 className="font-display font-semibold text-xl text-white mb-4">About This Project</h2>
                <p className="text-[#888880] leading-relaxed whitespace-pre-line">{project.longDescription}</p>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="glass rounded-2xl p-8">
                <h2 className="font-display font-semibold text-xl text-white mb-5">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(255,208,122,0.15)', border: '1px solid rgba(255,208,122,0.3)' }}>
                        <Check size={11} className="text-[#FFD07A]" />
                      </div>
                      <span className="text-sm text-[#888880]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">Tech Stack</h3>
              <TechStackIcons stack={project.techStack || []} mode="badges" />
            </div>

            {/* Get source CTA */}
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(245,166,35,0.2)' }}>
              <h3 className="font-display font-semibold text-white mb-2">Want the Source Code?</h3>
              <p className="text-xs text-[#555555] mb-4">Contact me to get access to the complete source code for this project.</p>
              <Link to={`/contact?ref=${encodeURIComponent(project.title)}`}
                className="btn-primary w-full text-center block text-sm py-3">
                Contact to Get Source
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}