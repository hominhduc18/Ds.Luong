import React from 'react';
import { storage } from '../utils/storage';
import { 
  ShoppingBag, BookOpen, MessageSquare, 
  Mail, Users, ArrowUpRight, TrendingUp, 
  Clock, Package, FileText, CheckCircle, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const products = storage.products.getAll();
  const posts = storage.posts.getAll();
  const contacts = storage.contacts.getAll();
  const reviews = storage.reviews.getAll();

  const stats = [
    { label: 'TỔNG SẢN PHẨM', val: products.length, icon: <ShoppingBag size={22} />, color: 'bg-gold-primary', trend: '+12%', path: '/admin/products' },
    { label: 'BÀI VIẾT BLOG', val: posts.length, icon: <BookOpen size={22} />, color: 'bg-gold-medium', trend: '+3%', path: '/admin/posts' },
    { label: 'YÊU CẦU LIÊN HỆ', val: contacts.length, icon: <Mail size={22} />, color: 'bg-gold-dark', trend: '+5', path: '/admin/contacts' },
    { label: 'ĐÁNH GIÁ KHÁCH', val: reviews.length, icon: <MessageSquare size={22} />, color: 'bg-amber-500', trend: '+8', path: '/admin/dashboard' },
  ];

  const recentContacts = [...contacts].reverse().slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bảng Điều Khiển</h1>
           <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-wide">Chào mừng trở lại, Administrator!</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3">
              <Clock size={16} className="text-gold-primary" />
              <span className="text-[11px] font-semibold text-gray-900">
                {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
               <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-6">
                     <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                     </div>
                     <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</span>
                    <p className="text-4xl font-bold text-gray-900 mt-1 tracking-tight">{stat.val}</p>
                  </div>
                  <Link to={stat.path} className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-gold-primary uppercase hover:gap-3 transition-all">
                    Chi tiết <ArrowUpRight size={14} />
                  </Link>
               </div>
               <div className={`absolute -right-4 -bottom-4 w-32 h-32 ${stat.color} opacity-[0.03] rounded-full`}></div>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Contacts */}
         <motion.div variants={item} className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                     <Mail size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Yêu cầu liên hệ mới</h4>
               </div>
               <Link to="/admin/contacts" className="text-[10px] font-bold text-[#0A4B7A] tracking-widest uppercase hover:underline">Tất cả bài viết</Link>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gold-light/50 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                     <tr>
                        <th className="px-10 py-5">Người gửi</th>
                        <th className="px-10 py-5">Vấn đề</th>
                        <th className="px-10 py-5">Ngày gửi</th>
                        <th className="px-10 py-5 text-right">Hành động</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {recentContacts.length > 0 ? recentContacts.map(c => (
                        <tr key={c.id} className="hover:bg-blue-50/20 transition-colors group">
                           <td className="px-10 py-6">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">{c.name}</span>
                                 <span className="text-[9px] text-gray-400 font-bold lowercase">{c.email}</span>
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest line-clamp-1">{c.subject}</span>
                           </td>
                           <td className="px-10 py-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                              {new Date(c.date || Date.now()).toLocaleDateString('vi-VN')}
                           </td>
                           <td className="px-10 py-6 text-right">
                              <button className="p-2.5 bg-gray-50 text-[#0A4B7A] rounded-xl hover:bg-[#0A4B7A] hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={14} />
                              </button>
                           </td>
                        </tr>
                     )) : (
                        <tr><td colSpan="4" className="text-center py-24 text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Chưa có liên hệ nào mới</td></tr>
                     )}
                  </tbody>
               </table>
            </div>
         </motion.div>

         {/* System Overview */}
         <motion.div variants={item} className="space-y-8">
            <div className="bg-[#0A1629] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/5">
                        <TrendingUp size={22} className="text-green-400 shadow-glow" />
                     </div>
                     <h4 className="text-xl font-bold text-white tracking-tight mb-4">Hoạt Động Hệ Thống</h4>
                     <p className="text-white/60 text-[11px] font-medium leading-relaxed">
                        Dữ liệu đang được đồng bộ trực tiếp qua LocalStorage. Hệ thống ổn định 100%.
                     </p>
                  </div>
                  
                  <div className="space-y-4 pt-8">
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Tài nguyên</span>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">92% FREE</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Trạng thái</span>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-glow"></div>
                           <span className="text-[10px] font-bold text-white uppercase tracking-widest">ACTIVE</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A4B7A]/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Actions</h4>
               <div className="grid grid-cols-2 gap-4">
                  <Link to="/admin/products" className="p-6 bg-blue-50/50 hover:bg-[#0A4B7A] hover:text-white transition-all rounded-[1.5rem] group flex flex-col items-center text-center gap-4">
                     <Package size={20} className="text-[#0A4B7A] group-hover:text-white transition-colors" />
                     <span className="text-[10px] font-bold uppercase tracking-wide">Sản phẩm</span>
                  </Link>
                  <Link to="/admin/posts" className="p-6 bg-emerald-50/50 hover:bg-emerald-500 hover:text-white transition-all rounded-[1.5rem] group flex flex-col items-center text-center gap-4">
                     <FileText size={20} className="text-emerald-500 group-hover:text-white transition-colors" />
                     <span className="text-[10px] font-bold uppercase tracking-wide">Viết bài</span>
                  </Link>
               </div>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
