import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { storage } from '../utils/storage';

const AdminLogin = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (storage.auth.login(user, pass)) {
      navigate('/admin/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-black text-gold-primary mb-3 uppercase tracking-tighter">DS LUONG ADMIN</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Đăng nhập để quản trị hệ thống</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input 
                required type="text" placeholder="admin"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-gold-primary/20 text-xs font-bold"
                value={user} onChange={(e) => setUser(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input 
                required type={showPass ? 'text' : 'password'} placeholder="••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-gold-primary/20 text-xs font-bold"
                value={pass} onChange={(e) => setPass(e.target.value)}
              />
              <button 
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gold-primary transition-colors"
                style={{ cursor: 'pointer'}}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-[10px] font-bold uppercase tracking-widest animate-pulse">{error}</p>}

          <button type="submit" className="w-full py-5 bg-gold-primary text-white text-xs font-black tracking-[0.4em] rounded-2xl shadow-xl shadow-gold-primary/20 hover:bg-gray-900 transition-all flex items-center justify-center gap-3">
            ĐĂNG NHẬP <LogIn size={18} />
          </button>
        </form>

        <div className="mt-12 text-center">
           <Link to="/" className="text-gray-400 hover:text-gold-primary text-[10px] font-bold uppercase tracking-widest transition-colors">← Quay lại website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
