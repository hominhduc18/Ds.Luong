import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  Settings, Globe, Shield, Save, Download, 
  Upload, Trash2, CheckCircle, Smartphone, 
  MapPin, Mail, MessageSquare, Zap,
  Monitor, Layout, Database, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const [settings, setSettings] = useState(storage.get('beauty_settings') || {});
  const [pageContent, setPageContent] = useState(storage.contents.get() || {});
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    storage.set('beauty_settings', settings);
    storage.contents.save(pageContent);
    showToast('Cài đặt hệ thống đã được cập nhật');
  };

  const handleExport = () => {
    const data = {
      products: storage.get('beauty_products'),
      posts: storage.get('beauty_posts'),
      reviews: storage.get('beauty_reviews'),
      contacts: storage.get('beauty_contacts'),
      emails: storage.get('beauty_emails'),
      settings: storage.get('beauty_settings'),
      contents: storage.get('beauty_page_contents')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ds_luong_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Đã xuất file sao lưu thành công');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.products) storage.set('beauty_products', data.products);
        if (data.posts) storage.set('beauty_posts', data.posts);
        if (data.settings) storage.set('beauty_settings', data.settings);
        if (data.contents) storage.set('beauty_page_contents', data.contents);
        alert('Khôi phục dữ liệu thành công! Trang web sẽ tự động tải lại.');
        window.location.reload();
      } catch (err) {
        alert('Lỗi định dạng file JSON!');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('CẢNH BÁO: Hành động này sẽ XÓA TOÀN BỘ dữ liệu và khôi phục về trạng thái ban đầu. Bạn có chắc chắn?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Cấu Hình Toàn Cục</h1>
          <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">Điều khiển trung tâm SkinClinic Digital</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-3 bg-[#0A1629] text-white px-10 py-4 rounded-2xl text-xs font-semibold tracking-wide hover:bg-emerald-600 transition-all shadow-xl uppercase"
        >
          <Save size={18} /> Lưu tất cả thay đổi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Settings Form */}
         <div className="lg:col-span-2 space-y-12">
            {/* Section 1: Page Content */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-12 lg:p-16 space-y-12 relative overflow-hidden group">
               <div className="flex items-center gap-6 mb-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-sm">
                     <Layout size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1">Nội dung hiển thị</h3>
                     <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Tiêu đề Hero, Landing Page & Contact</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Title (Trang chủ) *</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black uppercase tracking-tight outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all italic"
                       value={pageContent.home?.heroTitle || ''}
                       onChange={(e) => setPageContent({...pageContent, home: {...pageContent.home, heroTitle: e.target.value}})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Subtitle</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all uppercase tracking-widest text-indigo-500"
                       value={pageContent.home?.heroSubtitle || ''}
                       onChange={(e) => setPageContent({...pageContent, home: {...pageContent.home, heroSubtitle: e.target.value}})}
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Thông điệp giới thiệu (Home Intro)</label>
                  <textarea 
                     rows="3"
                     className="w-full bg-gray-50 border-none rounded-3xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all leading-relaxed"
                     value={pageContent.home?.introText || ''}
                     onChange={(e) => setPageContent({...pageContent, home: {...pageContent.home, introText: e.target.value}})}
                  />
               </div>

               <div className="grid md:grid-cols-2 gap-10 pt-6 border-t border-gray-50">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Địa chỉ phòng khám *</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none transition-all"
                       value={pageContent.contact?.address || ''}
                       onChange={(e) => setPageContent({...pageContent, contact: {...pageContent.contact, address: e.target.value}})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Số điện thoại / Hotline</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none transition-all text-indigo-600 tracking-widest"
                       value={pageContent.contact?.phone || ''}
                       onChange={(e) => setPageContent({...pageContent, contact: {...pageContent.contact, phone: e.target.value}})}
                     />
                  </div>
               </div>
            </div>

            {/* Section 2: Global Config */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-12 lg:p-16 space-y-12">
               <div className="flex items-center gap-6 mb-4">
                  <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-sm">
                     <Monitor size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1">Cấu hình hệ thống</h3>
                     <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Branding, SEO & Metadata</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tên thương hiệu *</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black uppercase tracking-tight outline-none focus:ring-4 focus:ring-amber-500/5 transition-all italic"
                       value={settings.siteName || ''}
                       onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email quản trị</label>
                     <input 
                       className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-amber-500/5 transition-all lowercase italic"
                       value={settings.email || ''}
                       onChange={(e) => setSettings({...settings, email: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">SEO Title (Trang chủ)</label>
                  <input 
                     className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-amber-500/5 transition-all text-[#0A4B7A] tracking-tight uppercase"
                     value={settings.seoTitle || ''}
                     onChange={(e) => setSettings({...settings, seoTitle: e.target.value})}
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">SEO Description</label>
                  <textarea 
                     rows="3"
                     className="w-full bg-gray-50 border-none rounded-3xl py-5 px-6 text-xs font-medium leading-relaxed outline-none focus:ring-4 focus:ring-amber-500/5 transition-all"
                     value={settings.seoDesc || ''}
                     onChange={(e) => setSettings({...settings, seoDesc: e.target.value})}
                  />
               </div>
            </div>
         </div>

         {/* Sidebar Actions */}
         <div className="space-y-8">
            <div className="bg-[#0A1629] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-8">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/5">
                     <Database size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Sao lưu & Phục hồi</h4>
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] leading-loose mt-4">
                      Xuất toàn bộ cơ sở dữ liệu (JSON) để lưu trữ ngoại tuyến hoặc chuyển đổi thiết bị.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                     <button 
                        onClick={handleExport}
                        className="w-full py-5 bg-white text-[#0A1629] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.03] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                     >
                        Tải file sao lưu <Download size={16} />
                     </button>
                     <div className="relative group">
                        <input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer z-10 pointer-events-auto" />
                        <button className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 pointer-events-none">
                           Nhập dữ liệu <Upload size={16} />
                        </button>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            </div>

            <div className="bg-red-50/50 p-10 rounded-[3rem] border border-red-100 space-y-8">
               <div className="flex items-center gap-4 text-red-600">
                  <AlertTriangle size={24} />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Vùng nguy hiểm</h4>
               </div>
               <p className="text-[10px] font-bold text-red-400 leading-relaxed uppercase tracking-widest">
                  Xóa toàn bộ dữ liệu trên trình duyệt này. Hệ thống sẽ quay về trạng thái mặc định của nhà sản xuất.
               </p>
               <button 
                 onClick={handleReset}
                 className="w-full py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-lg"
               >
                  RESET TOÀN BỘ HỆ THỐNG
               </button>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4">
               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0A4B7A]">
                  <Zap size={28} />
               </div>
               <div>
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phiên bản hiện tại</span>
                 <p className="text-sm font-black text-gray-900 tracking-tighter mt-1 italic uppercase underline decoration-[#0A4B7A] decoration-2 underline-offset-4">SkinClinic Digital v3.0.0</p>
               </div>
            </div>
         </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 right-12 bg-gray-900 text-white px-10 py-6 rounded-full shadow-2xl z-[300] border border-white/10 flex items-center gap-4"
          >
             <CheckCircle size={22} className="text-emerald-400 shadow-glow" />
             <span className="text-[11px] font-black tracking-[0.3em] uppercase">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSettings;
