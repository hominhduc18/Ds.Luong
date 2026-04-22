import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, BookOpen, 
  MessageSquare, Mail, Settings, LogOut, 
  Menu, Bell, ChevronRight, Search, Zap, Package, FolderTree, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '../../utils/storage';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [siteName, setSiteName] = useState('DS LUONG');

  useEffect(() => {
    const checkStatus = () => {
      const isLoggedIn = storage.auth.isLoggedIn();
      if (!isLoggedIn) {
        navigate('/admin/login');
      } else {
        setIsAuthed(true);
      }
    };

    checkStatus();
    window.addEventListener('beauty_data_changed', checkStatus);
    return () => window.removeEventListener('beauty_data_changed', checkStatus);
  }, [navigate]);

  if (!isAuthed) return null;

  const handleLogout = () => {
    storage.auth.logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard' },
    { name: 'Kho & Sản Phẩm', icon: <Package size={18} />, path: '/admin/products' },
    { name: 'Danh Mục', icon: <FolderTree size={18} />, path: '/admin/categories' },
    { name: 'Nội Dung', icon: <Layout size={18} />, path: '/admin/content' },
    { name: 'Bài Viết', icon: <BookOpen size={18} />, path: '/admin/posts' },
    { name: 'Tin Nhắn', icon: <Mail size={18} />, path: '/admin/contacts' },
    { name: 'Cài Đặt', icon: <Settings size={18} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-[#0A1629] text-white flex flex-col flex-shrink-0 z-50 shadow-2xl overflow-hidden"
      >
        {/* Logo Section */}
        <div className="p-8 border-b border-white/5 bg-[#0D1D35]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gold-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-black text-xs text-white">DL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{siteName}</span>
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Control Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gold-primary text-white shadow-xl shadow-gold-primary/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase">{item.name}</span>
                </div>
                {isActive && <motion.div layoutId="active" className="w-1.5 h-1.5 bg-white rounded-full shadow-glow" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-6 border-t border-white/5 bg-[#0D1D35]">
           <button
             onClick={handleLogout}
             className="flex items-center gap-4 w-full p-4 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all group"
           >
             <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
             <span className="text-xs font-semibold tracking-wide uppercase">Đăng xuất</span>
           </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between flex-shrink-0 z-40 shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-gray-50 border border-gray-100 rounded-xl transition-all text-gray-400"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 w-80">
               <Search size={16} className="text-gray-300" />
               <input 
                 type="text" 
                 placeholder="Tìm kiếm nhanh..." 
                 className="bg-transparent border-none text-[11px] font-medium text-gray-500 focus:ring-0 w-full" 
               />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 hover:bg-gray-50 text-gray-400 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black tracking-tight uppercase text-gray-900 leading-none">Administrator</span>
                  <span className="text-[8px] font-bold text-green-500 tracking-[0.2em] uppercase mt-1">Trực tuyến</span>
               </div>
               <div className="w-10 h-10 bg-[#0A4B7A] rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden border-2 border-white">
                  <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" />
               </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
           <div className="p-8 lg:p-12 min-h-full">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
