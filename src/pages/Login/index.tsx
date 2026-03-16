import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-start justify-center px-6 py-12 relative overflow-x-hidden overflow-y-auto">
      {/* Orbs */}
      <div className="orb w-96 h-96 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)' }} />
      <div className="orb w-64 h-64 bottom-1/4 right-1/4"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md relative z-10 my-auto">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to site
        </Link>

        <div className="gradient-border p-1 rounded-3xl">
          <div className="rounded-3xl p-8" style={{ background: '#111111' }}>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <img src="/te-logo.svg" alt="Themed Edits Logo"
                style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '10px' }} />
              <div>
                <div className="font-display font-bold text-white">Admin Portal</div>
                <div className="text-xs text-[#555555] font-mono">Themed Edits</div>
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl text-white mb-2">Welcome back</h1>
            <p className="text-sm text-[#555555] mb-8">Sign in to manage your portfolio content.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-[#555555] mb-2">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="admin@example.com" className="input-field" style={{ paddingLeft: '2.75rem' }} required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#555555] mb-2">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" className="input-field" style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }} required />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555555] hover:text-white transition-colors">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl text-center" style={{ background: '#161616', border: '1px solid #222222' }}>
              <p className="text-xs text-[#333333] font-mono">Admin access only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}