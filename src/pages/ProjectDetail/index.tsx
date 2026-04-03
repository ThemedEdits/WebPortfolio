import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MessageSquare, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectBySlug, type Project } from '../../hooks/useProjects';
import TechStackIcons from '../../components/ui/TechStackIcons';
import NoImagePlaceholder from '../../components/ui/NoImagePlaceholder';

// Skeleton Components
function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6">
        {/* Back button skeleton */}
        <div className="skeleton h-5 w-32 rounded-lg mb-10" />

        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="space-y-3">
              <div className="skeleton h-6 w-24 rounded-full" />
              <div className="skeleton h-10 sm:h-12 w-64 sm:w-96 rounded-lg" />
            </div>
            <div className="flex gap-3">
              <div className="skeleton h-10 w-24 sm:w-28 rounded-xl" />
              <div className="skeleton h-10 w-24 sm:w-28 rounded-xl" />
            </div>
          </div>
          <div className="skeleton h-5 sm:h-6 w-full max-w-3xl rounded-lg" />
          <div className="skeleton h-5 sm:h-6 w-2/3 max-w-2xl rounded-lg mt-2" />
        </div>

        {/* Image gallery skeleton */}
        <div className="mb-10 sm:mb-12">
          <div className="relative mx-auto rounded-2xl overflow-hidden skeleton"
            style={{ maxWidth: '900px', aspectRatio: '16/9' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Thumbnail skeleton - hidden on mobile to prevent overflow */}
          <div className="hidden sm:block relative mx-auto mt-4" style={{ maxWidth: '900px' }}>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton rounded-xl"
                  style={{ width: 'clamp(70px, 10vw, 100px)', aspectRatio: '16/9' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="glass rounded-2xl p-5 sm:p-8">
              <div className="skeleton h-6 sm:h-7 w-40 sm:w-48 rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
              </div>
            </div>
            <div className="glass rounded-2xl p-5 sm:p-8">
              <div className="skeleton h-6 sm:h-7 w-32 sm:w-40 rounded-lg mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="skeleton w-5 h-5 rounded-full shrink-0" />
                    <div className="skeleton h-5 w-28 sm:w-32 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="skeleton h-5 sm:h-6 w-28 sm:w-32 rounded-lg mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton h-7 sm:h-8 w-16 sm:w-20 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="skeleton h-5 sm:h-6 w-40 sm:w-48 rounded-lg mb-2" />
              <div className="skeleton h-3 sm:h-4 w-full rounded mb-4" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setImageLoaded(false);
    setActiveImg(0);

    // Simulate minimum 4-5 seconds loading for skeleton
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 4500));

    Promise.all([
      getProjectBySlug(id),
      minLoadTime
    ]).then(([p]) => {
      if (!p) navigate('/projects');
      else setProject(p);
      setLoading(false);
    });
  }, [id, navigate]);

  const handleImageChange = (index: number) => {
    if (isTransitioning || index === activeImg) return;
    setIsTransitioning(true);
    setImageLoaded(false);
    setActiveImg(index);
    // Reset transitioning after animation
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextImage = () => {
    if (!allImages.length) return;
    const nextIndex = (activeImg + 1) % allImages.length;
    handleImageChange(nextIndex);
  };

  const prevImage = () => {
    if (!allImages.length) return;
    const prevIndex = (activeImg - 1 + allImages.length) % allImages.length;
    handleImageChange(prevIndex);
  };

  if (loading) return <ProjectDetailSkeleton />;
  if (!project) return null;

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6">
        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-white transition-all duration-300 hover:gap-3 mb-10 group"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="section-tag mb-3 inline-flex animate-slideDown">{project.category}</span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white animate-slideDown" style={{ animationDelay: '0.1s' }}>
                {project.title}
              </h1>
            </div>
            <div className="flex gap-3 animate-slideDown" style={{ animationDelay: '0.2s' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 group relative overflow-hidden text-sm sm:text-base"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <ExternalLink size={15} className="transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">Live Demo</span>
                </a>
              )}
              <Link
                to={`/contact?ref=${encodeURIComponent(project.title)}`}
                className="btn-outline flex items-center gap-2 group relative overflow-hidden text-sm sm:text-base"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <MessageSquare size={15} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="relative">Get Source</span>
              </Link>
            </div>
          </div>
          <p className="text-[#888880] text-base sm:text-lg max-w-3xl animate-slideDown" style={{ animationDelay: '0.3s' }}>
            {project.description}
          </p>
        </div>

        {/* Image Gallery - Enhanced */}
        <div className="mb-10 sm:mb-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          {/* Main image container - 16:9 ratio for better website showcase */}
          <div className="relative mx-auto rounded-2xl overflow-hidden group bg-[#0a0a0a]"
            style={{ maxWidth: '900px', aspectRatio: '16/9' }}>
            {/* Main image with smooth transition */}
            <div className="relative w-full h-full overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-accent animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {allImages.length > 0 ? (
                <img
                  src={allImages[activeImg]}
                  alt={`${project.title} - screenshot ${activeImg + 1}`}
                  className={`w-full h-full object-cover object-top transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <div className="relative w-full h-full">
                  <NoImagePlaceholder size="lg" />
                </div>
              )}
            </div>

            {/* Navigation arrows - shown on hover */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <ChevronLeft size={18} className="text-white sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <ChevronRight size={18} className="text-white sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white font-mono">
                {activeImg + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnail carousel - Fixed alignment */}
          {/* Thumbnail carousel - Fixed alignment with proper spacing */}
          {allImages.length > 1 && (
            <div className="relative mx-auto mt-6" style={{ maxWidth: '900px' }}>
              {/* Gradient fades for mobile */}
              <div className="sm:hidden absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none rounded-l-xl"
                style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
              <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none rounded-r-xl"
                style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />

              <div
                className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-4 pt-2 px-2 sm:px-0 justify-start sm:justify-center"
                style={{
                  scrollbarWidth: 'thin',
                  msOverflowStyle: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleImageChange(i)}
                    className={`shrink-0 rounded-md overflow-hidden transition-all duration-300 relative ${i === activeImg
                        ? 'ring-1 ring-accent ring-offset-1 ring-offset-[#0a0a0a] scale-105 z-10'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                    style={{
                      width: 'clamp(60px, 12vw, 100px)',
                      aspectRatio: '16/9',
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {i === activeImg && (
                      <div className="absolute inset-0 bg-accent/10 rounded-md " />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Long description */}
            {project.longDescription && (
              <div className="glass rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="font-display font-semibold text-xl text-white mb-4">About This Project</h2>
                <p className="text-[#888880] leading-relaxed whitespace-pre-line text-sm sm:text-base">{project.longDescription}</p>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="glass rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="font-display font-semibold text-xl text-white mb-5">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 group/feature transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover/feature:scale-110"
                        style={{ background: 'rgba(255,208,122,0.15)', border: '1px solid rgba(255,208,122,0.3)' }}>
                        <Check size={11} className="text-[#FFD07A]" />
                      </div>
                      <span className="text-sm text-[#888880] group-hover/feature:text-white transition-colors duration-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="font-display font-semibold text-white mb-4">Tech Stack</h3>
              <TechStackIcons stack={project.techStack || []} mode="badges" />
            </div>

            {/* Get source CTA */}
            <div className="glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden group/cta"
              style={{ border: '1px solid rgba(245,166,35,0.2)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
              <h3 className="font-display font-semibold text-white mb-2">Want the Source Code?</h3>
              <p className="text-xs text-[#555555] mb-4">Contact me to get access to the complete source code for this project.</p>
              <Link
                to={`/contact?ref=${encodeURIComponent(project.title)}`}
                className="btn-primary w-full text-center block text-sm py-3 relative overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                <span className="relative">Contact to Get Source</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          opacity: 0;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        /* Custom scrollbar for thumbnails */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(245, 166, 35, 0.3);
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 166, 35, 0.5);
        }
      `}</style>
    </div>
  );
}