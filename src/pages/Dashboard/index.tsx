import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useProjects, addProject, updateProject, deleteProject, toSlug, type Project } from '../../hooks/useProjects';
import { uploadToCloudinary } from '../../utils/cloudinary';
import CustomSelect from '../../components/ui/CustomSelect';
import TechStackPicker from '../../components/ui/TechStackPicker';
import {
  LayoutDashboard, FolderOpen, Plus, LogOut, Edit2, Trash2,
  X, Upload, Image, Eye, Star, CheckCircle2, AlertCircle, ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['Web App', 'Landing Page', 'SaaS', 'E-Commerce', 'Portfolio', 'Other'];
const EMPTY_FORM = {
  title: '', description: '', longDescription: '',
  category: 'Web App', liveUrl: '', features: '', featured: false,
};

// ── Skeletons ─────────────────────────────────────────────────────────────────
function Bone({ w = 'w-full', h = 'h-4', rounded = 'rounded-lg', className = '' }: {
  w?: string; h?: string; rounded?: string; className?: string;
}) {
  return (
    <div className={`${w} ${h} ${rounded} ${className} shrink-0`}
      style={{ background: 'linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)', backgroundSize: '400% 100%', animation: 'dbShimmer 1.6s ease infinite' }} />
  );
}
function StatCardSkeleton() {
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111', border: '1px solid #222222' }}>
      <Bone w="w-10" h="h-10" rounded="rounded-xl" className="mb-4" />
      <Bone w="w-14" h="h-7 sm:h-8" rounded="rounded-md" className="mb-2" />
      <Bone w="w-24" h="h-3" rounded="rounded-md" />
    </div>
  );
}
function LastProjectSkeleton() {
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111', border: '1px solid #222222' }}>
      <Bone w="w-36" h="h-3.5" rounded="rounded-md" className="mb-4" />
      <div className="flex items-center gap-3 sm:gap-4">
        <Bone w="w-14 sm:w-16" h="h-10 sm:h-12" rounded="rounded-xl" />
        <div className="flex-1 space-y-2 min-w-0">
          <Bone w="w-32 sm:w-40" h="h-4" rounded="rounded-md" />
          <Bone w="w-44 sm:w-64" h="h-3" rounded="rounded-md" />
        </div>
        <Bone w="w-16 sm:w-20" h="h-6" rounded="rounded-full" />
      </div>
    </div>
  );
}
function RecentTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {['Title','Category','Featured','Actions'].map(h => (
            <th key={h} className="text-left px-4 sm:px-6 py-3 text-xs font-mono text-[#555555] uppercase tracking-wider">{h}</th>
          ))}
        </tr></thead>
        <tbody>{Array.from({ length: 4 }).map((_, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <td className="px-4 sm:px-6 py-3.5"><Bone w="w-28 sm:w-36" h="h-3.5" rounded="rounded-md" /></td>
            <td className="px-4 sm:px-6 py-3.5"><Bone w="w-16 sm:w-20" h="h-5" rounded="rounded-full" /></td>
            <td className="px-4 sm:px-6 py-3.5"><Bone w="w-4" h="h-4" rounded="rounded-full" /></td>
            <td className="px-4 sm:px-6 py-3.5"><div className="flex gap-2"><Bone w="w-7" h="h-7" rounded="rounded-lg" /><Bone w="w-7" h="h-7" rounded="rounded-lg" /></div></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
function AllProjectsTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {['#','Thumb','Title','Category','Featured','Tech','Actions'].map(h => (
            <th key={h} className="text-left px-4 sm:px-5 py-4 text-xs font-mono text-[#555555] uppercase tracking-wider">{h}</th>
          ))}
        </tr></thead>
        <tbody>{Array.from({ length: 5 }).map((_, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <td className="px-4 sm:px-5 py-4"><Bone w="w-4" h="h-3" rounded="rounded-sm" /></td>
            <td className="px-4 sm:px-5 py-4"><Bone w="w-12 sm:w-14" h="h-9 sm:h-10" rounded="rounded-lg" /></td>
            <td className="px-4 sm:px-5 py-4"><div className="space-y-1.5"><Bone w="w-28 sm:w-32" h="h-3.5" rounded="rounded-md" /><Bone w="w-36 sm:w-44" h="h-2.5" rounded="rounded-md" /></div></td>
            <td className="px-4 sm:px-5 py-4"><Bone w="w-16 sm:w-20" h="h-5" rounded="rounded-full" /></td>
            <td className="px-4 sm:px-5 py-4"><Bone w="w-4" h="h-4" rounded="rounded-full" /></td>
            <td className="px-4 sm:px-5 py-4"><div className="flex gap-1.5"><Bone w="w-10 sm:w-12" h="h-4" rounded="rounded-md" /><Bone w="w-8 sm:w-10" h="h-4" rounded="rounded-md" /></div></td>
            <td className="px-4 sm:px-5 py-4"><div className="flex gap-1.5"><Bone w="w-7" h="h-7" rounded="rounded-lg" /><Bone w="w-7" h="h-7" rounded="rounded-lg" /><Bone w="w-7" h="h-7" rounded="rounded-lg" /></div></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects, loading, refetch } = useProjects();
  const [view, setView] = useState<'overview' | 'projects' | 'add'>('overview');
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [additionalImgs, setAdditionalImgs] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const thumbRef = useRef<HTMLInputElement>(null);
  const imgsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editProject) {
      setForm({ title: editProject.title, description: editProject.description, longDescription: editProject.longDescription || '', category: editProject.category, liveUrl: editProject.liveUrl || '', features: editProject.features?.join('\n') || '', featured: editProject.featured === true });
      setSelectedTech(editProject.techStack || []);
      setThumbnailPreview(editProject.thumbnail || '');
      setAdditionalPreviews(editProject.images || []);
      setView('add');
    }
  }, [editProject]);

  const handleLogout = async () => { await signOut(auth); navigate('/login'); };
  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setThumbnail(file); setThumbnailPreview(URL.createObjectURL(file));
  };
  const handleImgsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImgs(files); setAdditionalPreviews(files.map(f => URL.createObjectURL(f)));
  };
  const resetForm = () => {
    setForm(EMPTY_FORM); setSelectedTech([]); setThumbnail(null);
    setThumbnailPreview(''); setAdditionalImgs([]); setAdditionalPreviews([]); setEditProject(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error('Title and description are required.'); return; }
    setSubmitting(true);
    try {
      let thumbUrl = thumbnailPreview;
      if (thumbnail) thumbUrl = await uploadToCloudinary(thumbnail);
      let extraUrls: string[] = editProject?.images || [];
      if (additionalImgs.length > 0) extraUrls = await Promise.all(additionalImgs.map(uploadToCloudinary));
      const projectData = { title: form.title, slug: toSlug(form.title), description: form.description, longDescription: form.longDescription, category: form.category, liveUrl: form.liveUrl, techStack: selectedTech, features: form.features.split('\n').map((s: string) => s.trim()).filter(Boolean), featured: form.featured === true, thumbnail: thumbUrl, images: extraUrls };
      if (editProject) { await updateProject(editProject.id, projectData); toast.success('Project updated!'); }
      else { await addProject(projectData); toast.success('Project added!'); }
      resetForm(); refetch(); setView('projects');
    } catch (err: any) { toast.error('Error: ' + err.message); }
    finally { setSubmitting(false); }
  };
  const handleDelete = async (id: string) => {
    try { await deleteProject(id); toast.success('Project deleted'); refetch(); setDeleteConfirm(null); }
    catch { toast.error('Failed to delete project'); }
  };

  const lastProject = projects[0];
  const featuredCount = projects.filter(p => p.featured === true).length;

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'add', icon: Plus, label: 'Add' },
  ];
  const activeIndex = navItems.findIndex(n => n.id === view);

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      <style>{`
        @keyframes dbShimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }

        /* Sliding bubble indicator */
        .nav-bubble {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: calc(100% - 12px);
          border-radius: 14px;
          background: #F5A623;
          transition: left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 0;
        }
      `}</style>

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <aside className="hidden md:flex w-60 lg:w-64 shrink-0 flex-col"
        style={{ background: 'rgba(10,10,10,0.98)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="p-5 lg:p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link to="/" className="flex items-center gap-3">
            <img src="/te-logo.svg" alt="Themed Edits Logo" style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '8px' }} />
            <div>
              <div className="font-display font-semibold text-white text-sm">Themed Edits</div>
              <div className="text-[10px] text-[#555555] font-mono">Admin Panel</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 lg:p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon; const active = view === item.id;
            return (
              <button key={item.id} onClick={() => { setView(item.id as any); if (item.id === 'add') resetForm(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ background: active ? '#F5A623' : 'transparent', color: active ? '#000' : '#555555' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <Icon size={17} />{item.label === 'Add' ? 'Add Project' : item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 lg:p-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="px-4 py-2.5 rounded-xl" style={{ background: '#111111' }}>
            <div className="text-[10px] text-[#333333] font-mono mb-0.5">Logged in as</div>
            <div className="text-xs text-[#888880] truncate">{user?.email}</div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{ color: '#555555', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#555555'; }}>
            <LogOut size={17} />Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pb-28 md:pb-8">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <img src="/te-logo.svg" alt="TE" style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '6px' }} />
            <span className="font-display font-bold text-white text-sm">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl transition-colors"
              style={{ background: '#111111', border: '1px solid #222222', color: '#888880' }}>
              <ArrowLeft size={12} /> Website
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-xl text-[#555555] hover:text-red-400 transition-colors"
              style={{ background: '#111111', border: '1px solid #222222' }}>
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* OVERVIEW */}
        {view === 'overview' && (
          <div className="space-y-5 sm:space-y-8">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">Dashboard</h1>
              <p className="text-xs sm:text-sm text-[#555555]">Welcome back, Hammad.</p>
            </div>
            {loading
              ? <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}</div>
              : <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                  {[
                    { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: '#F5A623' },
                    { label: 'Featured', value: featuredCount, icon: Star, color: '#f59e0b' },
                    { label: 'Categories', value: [...new Set(projects.map(p => p.category))].length, icon: LayoutDashboard, color: '#FFD07A' },
                    { label: 'Live URLs', value: projects.filter(p => p.liveUrl).length, icon: Eye, color: '#ffffff' },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="rounded-2xl p-4 sm:p-6" style={{ background: '#111111', border: '1px solid #222222' }}>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                          <Icon size={16} style={{ color: stat.color }} />
                        </div>
                        <div className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-0.5 sm:mb-1">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs text-[#555555] font-mono leading-tight">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
            }
            {loading ? <LastProjectSkeleton /> : lastProject && (
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#111111', border: '1px solid #222222' }}>
                <h3 className="font-display font-semibold text-white text-xs sm:text-sm mb-4">Last Uploaded Project</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  {lastProject.thumbnail && <img src={lastProject.thumbnail} alt={lastProject.title} className="w-14 h-10 sm:w-16 sm:h-12 object-cover rounded-xl shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-white text-sm truncate">{lastProject.title}</div>
                    <div className="text-xs text-[#555555] truncate">{lastProject.description}</div>
                  </div>
                  <span className="section-tag shrink-0 text-[9px] sm:text-[10px]">{lastProject.category}</span>
                </div>
              </div>
            )}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #222222' }}>
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {loading ? <Bone w="w-32" h="h-4" rounded="rounded-md" /> : <h3 className="font-display font-semibold text-white text-sm sm:text-base">Recent Projects</h3>}
              </div>
              {loading ? <RecentTableSkeleton /> : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[460px]">
                    <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['Title','Category','Featured','Actions'].map(h => <th key={h} className="text-left px-4 sm:px-6 py-3 text-[10px] sm:text-xs font-mono text-[#555555] uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {projects.slice(0, 5).map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm text-white font-medium truncate max-w-[120px] sm:max-w-none">{p.title}</td>
                          <td className="px-4 sm:px-6 py-3.5"><span className="section-tag text-[9px] sm:text-[10px]">{p.category}</span></td>
                          <td className="px-4 sm:px-6 py-3.5">{p.featured === true ? <CheckCircle2 size={14} className="text-[#FFD07A]" /> : <div className="w-3.5 h-3.5 rounded-full" style={{ border: '1px solid #333333' }} />}</td>
                          <td className="px-4 sm:px-6 py-3.5"><div className="flex gap-1.5">
                            <button onClick={() => setEditProject(p)} className="p-1.5 sm:p-2 rounded-lg text-[#555555] hover:text-white transition-colors"><Edit2 size={13} /></button>
                            <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 sm:p-2 rounded-lg text-[#555555] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ALL PROJECTS */}
        {view === 'projects' && (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                {loading ? <div className="space-y-2"><Bone w="w-36 sm:w-44" h="h-6 sm:h-7" rounded="rounded-lg" /><Bone w="w-24 sm:w-28" h="h-3" rounded="rounded-md" /></div>
                  : <><h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">All Projects</h1><p className="text-xs sm:text-sm text-[#555555]">{projects.length} total</p></>}
              </div>
              <button onClick={() => { resetForm(); setView('add'); }} className="btn-primary flex items-center gap-2 text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 shrink-0">
                <Plus size={14} /><span className="hidden sm:inline">Add New</span><span className="sm:hidden">Add</span>
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #222222' }}>
              {loading ? <AllProjectsTableSkeleton /> : projects.length === 0 ? (
                <div className="p-10 sm:p-12 text-center"><FolderOpen size={36} className="text-[#333333] mx-auto mb-3" /><p className="text-[#555555] text-sm">No projects yet.</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['#','Thumb','Title','Category','Featured','Tech','Actions'].map(h => <th key={h} className="text-left px-4 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-xs font-mono text-[#555555] uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {projects.map((p, i) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td className="px-4 sm:px-5 py-3.5 text-xs text-[#555555] font-mono">{i + 1}</td>
                          <td className="px-4 sm:px-5 py-3.5">{p.thumbnail ? <img src={p.thumbnail} alt="" className="w-12 sm:w-14 h-8 sm:h-10 object-cover rounded-lg" /> : <div className="w-12 sm:w-14 h-8 sm:h-10 rounded-lg flex items-center justify-center" style={{ background: '#1a1a1a' }}><Image size={12} className="text-[#555555]" /></div>}</td>
                          <td className="px-4 sm:px-5 py-3.5"><div className="text-xs sm:text-sm text-white font-medium truncate max-w-[110px] sm:max-w-[160px]">{p.title}</div><div className="text-[10px] sm:text-xs text-[#555555] truncate max-w-[110px] sm:max-w-[160px]">{p.description}</div></td>
                          <td className="px-4 sm:px-5 py-3.5"><span className="section-tag text-[9px] sm:text-[10px]">{p.category}</span></td>
                          <td className="px-4 sm:px-5 py-3.5">{p.featured === true ? <Star size={14} fill="#f59e0b" className="text-[#f59e0b]" /> : <div className="w-3.5 h-3.5 rounded-full" style={{ border: '1px solid #333333' }} />}</td>
                          <td className="px-4 sm:px-5 py-3.5 max-w-[100px]"><div className="flex flex-wrap gap-1">{p.techStack?.slice(0, 2).map(t => <span key={t} className="px-1 py-0.5 rounded text-[9px] font-mono text-[#555555]" style={{ background: '#1a1a1a' }}>{t}</span>)}{(p.techStack?.length ?? 0) > 2 && <span className="text-[9px] text-[#333333]">+{p.techStack!.length - 2}</span>}</div></td>
                          <td className="px-4 sm:px-5 py-3.5"><div className="flex items-center gap-1">
                            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-[#555555] hover:text-[#F5A623] transition-colors"><Eye size={13} /></a>}
                            <button onClick={() => setEditProject(p)} className="p-1.5 rounded-lg text-[#555555] hover:text-white transition-colors"><Edit2 size={13} /></button>
                            <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg text-[#555555] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADD / EDIT */}
        {view === 'add' && (
          <div className="max-w-2xl lg:max-w-3xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button onClick={() => { resetForm(); setView('projects'); }} className="p-2 rounded-xl text-[#555555] hover:text-white transition-colors shrink-0" style={{ background: '#111111', border: '1px solid #222222' }}><X size={16} /></button>
              <div>
                <h1 className="font-display font-bold text-xl sm:text-3xl text-white">{editProject ? 'Edit Project' : 'Add Project'}</h1>
                <p className="text-xs sm:text-sm text-[#555555]">{editProject ? `Editing: ${editProject.title}` : 'Fill in the details below.'}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: '#111111', border: '1px solid #222222' }}>
                <h3 className="font-display font-semibold text-white text-xs sm:text-sm">Basic Information</h3>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Project Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="My Awesome Project" className="input-field text-sm" required />
                  {form.title && <p className="mt-1 text-[10px] sm:text-[11px] font-mono text-[#555555]">URL: <span style={{ color: '#F5A623' }}>/projects/{toSlug(form.title)}</span></p>}
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Short Description *</label>
                  <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="One-liner..." className="input-field text-sm" required />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Long Description</label>
                  <textarea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} placeholder="Detailed description..." rows={3} className="input-field resize-none text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Category</label>
                    <CustomSelect value={form.category} onChange={val => setForm(f => ({ ...f, category: val }))} options={CATEGORIES} />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Live URL</label>
                    <input value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://..." className="input-field text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Tech Stack</label>
                  <TechStackPicker selected={selectedTech} onChange={setSelectedTech} />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-1.5 sm:mb-2">Features <span className="text-[#333333]">(one per line)</span></label>
                  <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} placeholder={'Feature 1\nFeature 2'} rows={3} className="input-field resize-none text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" role="switch" aria-checked={form.featured} onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                    style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '999px', flexShrink: 0, background: form.featured ? '#F5A623' : '#2a2a2a', border: `1px solid ${form.featured ? '#F5A623' : '#3a3a3a'}`, transition: 'background 0.25s, border-color 0.25s', cursor: 'pointer' }}>
                    <span style={{ position: 'absolute', top: '3px', left: form.featured ? '22px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)', display: 'block' }} />
                  </button>
                  <span className="text-xs sm:text-sm text-[#888880]">Mark as Featured</span>
                  {form.featured && <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>On homepage</span>}
                </div>
              </div>
              <div className="rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5" style={{ background: '#111111', border: '1px solid #222222' }}>
                <h3 className="font-display font-semibold text-white text-xs sm:text-sm">Images</h3>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 sm:mb-3">Thumbnail</label>
                  <input ref={thumbRef} type="file" accept="image/*" onChange={handleThumbChange} className="hidden" />
                  {thumbnailPreview ? (
                    <div className="relative group">
                      <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-36 sm:h-48 object-cover rounded-xl" />
                      <button type="button" onClick={() => { setThumbnail(null); setThumbnailPreview(''); }} className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.6)' }}><X size={13} /></button>
                      <button type="button" onClick={() => thumbRef.current?.click()} className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 btn-outline text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 opacity-0 group-hover:opacity-100 transition-opacity">Change</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => thumbRef.current?.click()} className="w-full h-32 sm:h-40 rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-200" style={{ border: '2px dashed #2a2a2a', color: '#555555' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,166,35,0.5)'; (e.currentTarget as HTMLElement).style.color = '#F5A623'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.color = '#555555'; }}>
                      <Upload size={20} /><span className="text-xs sm:text-sm">Click to upload</span><span className="text-[10px] sm:text-xs text-[#333333]">PNG, JPG up to 10MB</span>
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-[#555555] mb-2 sm:mb-3">Screenshots</label>
                  <input ref={imgsRef} type="file" accept="image/*" multiple onChange={handleImgsChange} className="hidden" />
                  <button type="button" onClick={() => imgsRef.current?.click()} className="flex items-center gap-2 btn-outline text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-5 mb-2 sm:mb-3"><Image size={13} />Add Screenshots</button>
                  {additionalPreviews.length > 0 && (
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                      {additionalPreviews.map((src, i) => <img key={i} src={src} alt="" className="w-20 sm:w-24 h-13 sm:h-16 object-cover rounded-lg shrink-0" />)}
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-60">
                {submitting ? <><div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />{editProject ? 'Updating...' : 'Uploading...'}</> : <><CheckCircle2 size={16} />{editProject ? 'Update Project' : 'Add Project'}</>}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ── Mobile bottom navbar with sliding bubble ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
        style={{ background: 'linear-gradient(to top, #0a0a0a 60%, transparent)' }}>
        <div className="relative flex items-center rounded-2xl overflow-hidden p-1.5"
          style={{ background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Sliding bubble */}
          <div className="nav-bubble" style={{
            width: `calc(${100 / navItems.length}% - 6px)`,
            left: `calc(${(activeIndex * 100) / navItems.length}% + 3px)`,
          }} />

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id}
                onClick={() => { setView(item.id as any); if (item.id === 'add') resetForm(); }}
                className="relative z-10 flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-colors duration-200"
                style={{ color: active ? '#000000' : '#555555' }}>
                <Icon size={18} />
                <span className="text-[10px] font-mono font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Delete modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-2xl p-6 sm:p-8 max-w-sm w-full" style={{ background: '#111111', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={36} className="text-red-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-white text-center mb-2">Delete Project?</h3>
            <p className="text-xs sm:text-sm text-[#555555] text-center mb-6 sm:mb-8">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1 text-sm py-2.5">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}