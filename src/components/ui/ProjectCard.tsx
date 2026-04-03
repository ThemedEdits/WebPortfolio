import { Link } from 'react-router-dom';
import { ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import TechStackIcons from './TechStackIcons';
import NoImagePlaceholder from './NoImagePlaceholder';
import type { Project } from '../../hooks/useProjects';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="card-project group flex flex-col h-full">
      {/* Thumbnail — fixed aspect ratio so all cards have same image height */}
      <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="relative w-full h-full">
            <NoImagePlaceholder size="md" />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="section-tag text-[10px] px-3 py-1">{project.category}</span>
        </div>
        {/* Featured */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider"
              style={{ background: 'rgba(255,208,122,0.15)', border: '1px solid rgba(255,208,122,0.3)', color: '#FFD07A' }}>
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content — flex-1 so all cards stretch to same height in a row */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-gradient transition-all duration-300 line-clamp-1">
          {project.title}
        </h3>
        {/* Description fixed to 2 lines so card bodies align */}
        <p className="text-sm text-[#555555] leading-relaxed mb-4 line-clamp-2 flex-none" style={{ minHeight: '2.8rem' }}>
          {project.description}
        </p>

        {/* Tech stack — pushed to bottom with mt-auto */}
        <div className="mt-auto space-y-4">
          {project.techStack && project.techStack.length > 0 && (
            <TechStackIcons stack={project.techStack} mode="icons" />
          )}

          {/* Action buttons with hover animations */}
          <div className="flex items-center gap-2 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all duration-300 flex-1 justify-center relative overflow-hidden group/btn"
                style={{ background: '#F5A623', color: '#000000' }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                <ExternalLink size={12} className="transition-transform duration-300 group-hover/btn:scale-110" />
                <span className="relative">Live Demo</span>
              </a>
            )}
            <Link
              to={`/contact?ref=${encodeURIComponent(project.title)}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all duration-300 flex-1 justify-center relative overflow-hidden group/btn"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#888880' }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></span>
              <MessageSquare size={12} className="transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="relative">Source Code</span>
            </Link>
          </div>

          <Link
            to={`/projects/${project.slug || project.id}`}
            className="flex items-center justify-center gap-1.5 text-xs text-[#555555] hover:text-white transition-all duration-300 w-full py-1 group/link"
          >
            <span>View Details</span>
            <ArrowRight size={12} className="transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}