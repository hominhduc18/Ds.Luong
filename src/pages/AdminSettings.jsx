import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Settings, Globe, Shield, Save, Download, Upload, Trash2, CheckCircle, Smartphone, MapPin, Mail, MessageSquare } from 'lucide-react';

const AdminSettings = () => {
   const [settings, setSettings] = useState(storage.get('beauty_settings') || {});
   const [success, setSuccess] = useState(false);

   const handleSave = (e) => {
      e.preventDefault();
      storage.set('beauty_settings', settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
   };

   const handleExport = () => {
      const data = {
         products: storage.get('beauty_products'),
         posts: storage.get('beauty_posts'),
         reviews: storage.get('beauty_reviews'),
         contacts: storage.get('beauty_contacts'),
         emails: storage.get('beauty_emails'),
         settings: storage.get('beauty_settings')
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dsluong_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
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
            alert('Khôi phục dữ liệu thành công! Vui lòng tải lại trang.');
            window.location.reload();
         } catch (err) {
            alert('Lỗi định dạng file JSON!');
         }
      };
      reader.readAsText(file);
   };

   return (
      <div className="space-y-12">
         <div className="flex flex-col lg:flex-row gap-12">
            {/* General Settings */}
            <div className="flex-1 space-y-8" style={{ flex: 2 }}>
               <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 space-y-8" style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <h4 className="text-xl font-bold flex items-center gap-2 border-b border-gray-50 pb-6" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', borderBottom: '1px solid #f9f9f9', paddingBottom: '24px' }}>
                     <Globe size={24} className="text-primary" /> Thông Tin Website
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase">Tên Website</label>
                        <input
                           type="text" className="w-full p-4 bg-bg border-none rounded-xl"
                           value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase">Slogan</label>
                        <input
                           type="text" className="w-full p-4 bg-bg border-none rounded-xl"
                           value={settings.slogan || ''} onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-1"><Mail size={14} /> Email Liên Hệ</label>
                        <input
                           type="email" className="w-full p-4 bg-bg border-none rounded-xl"
                           value={settings.email || ''} onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-1"><Smartphone size={14} /> Hotline</label>
                        <input
                           type="text" className="w-full p-4 bg-bg border-none rounded-xl"
                           value={settings.phone || ''} onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-1"><MapPin size={14} /> Địa Chỉ</label>
                     <textarea
                        className="w-full p-4 bg-bg border-none rounded-xl" rows="2"
                        value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                     ></textarea>
                  </div>

                  <h4 className="text-xl font-bold flex items-center gap-2 border-b border-gray-50 pt-8 pb-6" style={{ fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #f9f9f9', paddingBottom: '24px', paddingTop: '32px' }}>
                     <Shield size={24} className="text-primary" /> Cấu Hình SEO
                  </h4>

                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase">Tiêu đề SEO mặc định</label>
                        <input
                           type="text" className="w-full p-4 bg-bg border-none rounded-xl"
                           value={settings.seoTitle || ''} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase">Mô tả SEO mặc định</label>
                        <textarea
                           className="w-full p-4 bg-bg border-none rounded-xl" rows="3"
                           value={settings.seoDesc || ''} onChange={(e) => setSettings({ ...settings, seoDesc: e.target.value })}
                        ></textarea>
                     </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 pt-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px' }}>
                     {success && <div className="flex items-center gap-2 text-success font-bold animate-bounce" style={{ color: 'var(--success)', fontWeight: 'bold' }}><CheckCircle size={20} /> Đã lưu cài đặt!</div>}
                     <button type="submit" className="btn btn-primary px-12 py-5 font-bold shadow-lg shadow-primary/20 ml-auto" style={{ marginLeft: 'auto' }}>
                        <Save size={24} className="mr-2" /> LƯU THAY ĐỔI
                     </button>
                  </div>
               </form>
            </div>

            {/* System & Backup */}
            <aside className="w-full lg:w-96 space-y-8" style={{ width: '384px' }}>
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8" style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <h4 className="text-xl font-bold flex items-center gap-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>Sao Lưu Dữ Liệu</h4>
                  <p className="text-sm text-gray-500" style={{ fontSize: '14px', color: '#888' }}>Xuất toàn bộ cơ sở dữ liệu localStorage ra file JSON để lưu trữ hoặc chuyển đổi máy chủ.</p>

                  <div className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     <button
                        onClick={handleExport}
                        className="btn btn-outline w-full justify-between hover:bg-primary hover:text-white"
                        style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                     >
                        Tải File Sao Lưu <Download size={20} />
                     </button>

                     <div className="relative group" style={{ position: 'relative' }}>
                        <input
                           type="file" accept=".json" onChange={handleImport}
                           className="absolute inset-0 opacity-0 cursor-pointer z-10"
                           style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                        />
                        <div className="btn btn-secondary w-full justify-between" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           Nhập Dữ Liệu <Upload size={20} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-red-50 rounded-3xl border border-red-100 p-8 space-y-6" style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <h4 className="text-xl font-bold text-red-600 flex items-center gap-2" style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626' }}><Trash2 size={24} /> Vùng Nguy Hiểm</h4>
                  <p className="text-sm text-red-400" style={{ fontSize: '14px', color: '#ef4444' }}>Xóa toàn bộ dữ liệu trên trình duyệt. Hành động này không thể khôi phục!</p>
                  <button
                     onClick={() => window.confirm('Bạn có chắc chắn muốn XÓA TẤT CẢ dữ liệu không?') && localStorage.clear() && window.location.reload()}
                     className="btn bg-red-600 text-white w-full hover:bg-red-700"
                     style={{ padding: '16px', backgroundColor: '#dc2626', color: 'white' }}
                  >
                     RESET TOÀN BỘ DỮ LIỆU
                  </button>
               </div>
            </aside>
         </div>
      </div>
   );
};

export default AdminSettings;
