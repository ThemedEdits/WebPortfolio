import { Link } from 'react-router-dom';
import { ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import TechStackIcons from './TechStackIcons';
import type { Project } from '../../hooks/useProjects';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="card-project group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-subtle">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a1a1a, #111111)' }}>
            <span className="font-display font-bold text-4xl text-gradient opacity-30">TE</span>
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

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[#555555] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack — icons only */}
        <div className="mb-5">
          <TechStackIcons stack={project.techStack || []} mode="icons" max={8} />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 btn-primary text-xs py-2 px-4 flex-1 justify-center">
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          <Link to={`/contact?ref=${encodeURIComponent(project.title)}`}
            className="flex items-center gap-1.5 btn-outline text-xs py-2 px-4 flex-1 justify-center">
            <MessageSquare size={13} />
            Source Code
          </Link>
        </div>

        <Link to={`/projects/${project.slug || project.id}`}
          className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#555555] hover:text-accent transition-colors group/link">
          View Details
          <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}