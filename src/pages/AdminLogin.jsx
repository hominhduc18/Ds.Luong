import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === '123456') {
      localStorage.setItem('beauty_is_logged_in', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6" style={{minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100" style={{maxWidth: '400px', backgroundColor: 'white', borderRadius: '40px', padding: '48px', border: '1px solid #f0f0f0', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
        <div className="text-center mb-12" style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 className="text-3xl font-bold text-primary mb-3" style={{fontSize: '28px', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '12px'}}>ADMIN LOGIN</h1>
          <p className="text-gray-400" style={{color: '#aaa'}}>Vui lòng đăng nhập để quản trị hệ thống.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', paddingLeft: '8px'}}>Username</label>
            <div className="relative" style={{position: 'relative'}}>
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
              <input 
                required type="text" placeholder="admin"
                className="w-full pl-12 pr-4 py-4 bg-bg border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                value={user} onChange={(e) => setUser(e.target.value)}
                style={{width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'var(--bg)', borderRadius: '16px', border: 'none', outline: 'none'}}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', paddingLeft: '8px'}}>Password</label>
            <div className="relative" style={{position: 'relative'}}>
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
              <input 
                required type={showPass ? 'text' : 'password'} placeholder="••••••"
                className="w-full pl-12 pr-12 py-4 bg-bg border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                value={pass} onChange={(e) => setPass(e.target.value)}
                style={{width: '100%', padding: '16px 48px 16px 48px', backgroundColor: 'var(--bg)', borderRadius: '16px', border: 'none', outline: 'none'}}
              />
              <button 
                type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', cursor: 'pointer'}}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-error text-center font-bold animate-pulse" style={{color: 'var(--error)', textAlign: 'center', fontWeight: 'bold'}}>{error}</p>}

          <button type="submit" className="btn btn-primary w-full py-5 text-xl font-bold shadow-lg shadow-primary/20" style={{padding: '16px', fontSize: '20px', fontWeight: 'bold', width: '100%'}}>
            ĐĂNG NHẬP <LogIn size={24} className="ml-2" />
          </button>
        </form>

        <div className="mt-12 text-center" style={{marginTop: '48px', textAlign: 'center'}}>
           <Link to="/" className="text-gray-400 hover:text-primary text-sm font-medium transition-colors" style={{fontSize: '14px', color: '#aaa'}}>← Quay lại website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
