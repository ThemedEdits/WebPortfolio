import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Orbs */}
      <div className="orb w-96 h-96 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)' }} />
      <div className="orb w-64 h-64 bottom-1/4 right-1/4"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

      <div className="text-center relative z-10">
        <div className="font-display font-extrabold text-[10rem] leading-none text-gradient opacity-20 select-none mb-6">
          404
        </div>
        <h1 className="font-display font-bold text-4xl text-white mb-4">Page Not Found</h1>
        <p className="text-[#555555] mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5">
            <Home size={16} />
            Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline flex items-center justify-center gap-2 px-8 py-3.5">
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}