import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, BookOpen, MessageSquare, Mail, Settings, LogOut, ChevronRight, Menu, Bell, User } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('beauty_is_logged_in') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('beauty_is_logged_in');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Sản Phẩm', icon: <ShoppingBag size={20} />, path: '/admin/products' },
    { name: 'Bài Viết', icon: <BookOpen size={20} />, path: '/admin/posts' },
    { name: 'Đánh Giá', icon: <MessageSquare size={20} />, path: '/admin/reviews' },
    { name: 'Liên Hệ', icon: <Mail size={20} />, path: '/admin/contacts' },
    { name: 'Cài Đặt', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-bg" style={{display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white sticky top-0 h-screen hidden lg:flex flex-col" style={{width: '256px', backgroundColor: '#1a1a1a', color: 'white', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <div className="p-8 border-b border-gray-800" style={{padding: '32px', borderBottom: '1px solid #333'}}>
          <Link to="/" className="text-xl font-bold tracking-tighter" style={{color: 'var(--primary)', letterSpacing: '-0.5px'}}>
            ANTIGRAVITY ADMIN
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2" style={{flex: 1, paddingTop: '32px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', paddingRight: '16px'}}>
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderRadius: '12px', backgroundColor: location.pathname === item.path ? 'var(--primary)' : 'transparent', color: location.pathname === item.path ? 'white' : '#888'}}
            >
              {item.icon}
              <span className="font-medium" style={{fontWeight: 500}}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-gray-800" style={{padding: '32px', borderTop: '1px solid #333'}}>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-gray-400 hover:text-red-500 transition-colors w-full"
            style={{display: 'flex', alignItems: 'center', gap: '16px', color: '#888', outline: 'none', cursor: 'pointer', textAlign: 'left'}}
          >
            <LogOut size={20} />
            <span className="font-medium" style={{fontWeight: 500}}>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30" style={{height: '80px', backgroundColor: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px'}}>
          <div className="flex items-center gap-4" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
             <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full"><Menu size={24} /></button>
             <h2 className="text-xl font-bold text-secondary" style={{fontSize: '20px', fontWeight: 'bold'}}>
                {menuItems.find(i => i.path === location.pathname)?.name || 'Hệ Thống'}
             </h2>
          </div>

          <div className="flex items-center gap-6" style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
             <div className="relative" style={{position: 'relative'}}>
                <Bell size={20} className="text-gray-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" style={{position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: 'red', borderRadius: '50%'}}></span>
             </div>
             <div className="flex items-center gap-3 border-l pl-6" style={{display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #eee', paddingLeft: '24px'}}>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold" style={{width: '40px', height: '40px', backgroundColor: 'var(--accent)', borderRadius: '50%', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                   AD
                </div>
                <div className="hidden sm:block">
                   <p className="text-sm font-bold leading-tight" style={{fontSize: '14px', fontWeight: 'bold', lineHeight: 1}}>Administrator</p>
                   <span className="text-xs text-gray-400" style={{fontSize: '12px', color: '#888'}}>Quản trị viên</span>
                </div>
             </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-8 lg:p-12 overflow-y-auto" style={{padding: '32px', flex: 1, backgroundColor: '#f8f9fa'}}>
           {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
