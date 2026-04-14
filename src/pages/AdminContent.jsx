import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  Save, Layout, Home, Info, ShoppingBag, 
  FileText, Mail, Image, Type, AlignLeft,
  ChevronRight, CheckCircle, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminContent = () => {
  const [pageContent, setPageContent] = useState(storage.contents.get());
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);

  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: <Home size={18} /> },
    { id: 'about', label: 'Về chúng tôi', icon: <Globe size={18} /> },
    { id: 'shop', label: 'Sản phẩm', icon: <ShoppingBag size={18} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
    { id: 'contact', label: 'Liên hệ', icon: <Mail size={18} /> }
  ];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    storage.contents.save(pageContent);
    showToast('Nội dung trang đã được cập nhật!');
  };

  const updateField = (page, field, value) => {
    setPageContent({
      ...pageContent,
      [page]: {
        ...pageContent[page],
        [field]: value
      }
    });
  };

  const handleImageUpload = (page, field, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField(page, field, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const ImageUploadField = ({ label, value, onUrlChange, onFileChange }) => (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input 
            className="flex-grow bg-white border border-gray-100 rounded-2xl py-4 px-6 text-[10px] font-bold text-gray-500 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all"
            value={value || ''}
            placeholder="URL hình ảnh hoặc tải lên..."
            onChange={(e) => onUrlChange(e.target.value)}
          />
          <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600 px-6 py-4 rounded-2xl flex items-center justify-center transition-all border border-dashed border-gray-200 group">
             <Image size={18} className="group-hover:scale-110 transition-transform" />
             <input 
               type="file" 
               className="hidden" 
               accept="image/*"
               onChange={(e) => onFileChange(e.target.files[0])}
             />
          </label>
        </div>
        {value && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] font-bold px-2 py-1 rounded backdrop-blur-sm uppercase">Preview</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHomeTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Title (Home) *</label>
          <input 
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-gray-900 uppercase tracking-tight outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all font-playfair bg-white border border-gray-100 italic"
            value={pageContent.home.heroTitle}
            onChange={(e) => updateField('home', 'heroTitle', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Subtitle</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all uppercase tracking-widest italic"
            value={pageContent.home.heroSubtitle}
            onChange={(e) => updateField('home', 'heroSubtitle', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tiêu đề đoạn giới thiệu 1</label>
        <input 
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all uppercase tracking-widest"
          value={pageContent.home.introTitle || ''}
          onChange={(e) => updateField('home', 'introTitle', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Nội dung giới thiệu 1</label>
          <textarea 
            rows="4"
            className="w-full bg-white border border-gray-100 rounded-3xl py-4 px-6 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all leading-relaxed"
            value={pageContent.home.introText}
            onChange={(e) => updateField('home', 'introText', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Chữ trên nút (Intro 1)</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all uppercase tracking-widest"
            value={pageContent.home.introCta || ''}
            onChange={(e) => updateField('home', 'introCta', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tiêu đề đoạn giới thiệu 2</label>
        <input 
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all uppercase tracking-widest font-playfair"
          value={pageContent.home.secondIntroTitle || ''}
          onChange={(e) => updateField('home', 'secondIntroTitle', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Nội dung giới thiệu 2</label>
          <textarea 
            rows="4"
            className="w-full bg-white border border-gray-100 rounded-3xl py-4 px-6 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all leading-relaxed"
            value={pageContent.home.secondIntroText || ''}
            onChange={(e) => updateField('home', 'secondIntroText', e.target.value)}
          />
        </div>
        <div className="space-y-6">
          <ImageUploadField 
            label="Hình ảnh giới thiệu 2"
            value={pageContent.home.secondIntroImage}
            onUrlChange={(val) => updateField('home', 'secondIntroImage', val)}
            onFileChange={(file) => handleImageUpload('home', 'secondIntroImage', file)}
          />
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Chữ trên nút (Intro 2)</label>
            <input 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all uppercase tracking-widest"
              value={pageContent.home.secondIntroCta || ''}
              onChange={(e) => updateField('home', 'secondIntroCta', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Title (Contact)</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest"
            value={pageContent.contact.heroTitle || ''}
            onChange={(e) => updateField('contact', 'heroTitle', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Subtitle</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest"
            value={pageContent.contact.heroSubtitle || ''}
            onChange={(e) => updateField('contact', 'heroSubtitle', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Địa chỉ phòng khám *</label>
        <input 
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest"
          value={pageContent.contact.address}
          onChange={(e) => updateField('contact', 'address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hotline</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-black text-gray-900 outline-none transition-all tracking-widest"
            value={pageContent.contact.phone}
            onChange={(e) => updateField('contact', 'phone', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all lowercase"
            value={pageContent.contact.email}
            onChange={(e) => updateField('contact', 'email', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Giờ làm việc</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest"
            value={pageContent.contact.workingHours}
            onChange={(e) => updateField('contact', 'workingHours', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSimpleTab = (pageId, label) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Title ({label})</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest font-playfair"
            value={pageContent[pageId].heroTitle || ''}
            onChange={(e) => updateField(pageId, 'heroTitle', e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Subtitle</label>
          <input 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 outline-none transition-all uppercase tracking-widest"
            value={pageContent[pageId].heroSubtitle || ''}
            onChange={(e) => updateField(pageId, 'heroSubtitle', e.target.value)}
          />
        </div>
      </div>
      {pageId === 'about' && (
        <>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Sứ mệnh (Mission)</label>
            <textarea 
              rows="3"
              className="w-full bg-white border border-gray-100 rounded-3xl py-4 px-6 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all leading-relaxed"
              value={pageContent.about.mission}
              onChange={(e) => updateField('about', 'mission', e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tầm nhìn (Vision)</label>
            <textarea 
              rows="3"
              className="w-full bg-white border border-gray-100 rounded-3xl py-4 px-6 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-primary/20 transition-all leading-relaxed"
              value={pageContent.about.vision}
              onChange={(e) => updateField('about', 'vision', e.target.value)}
            />
          </div>
          <ImageUploadField 
            label="Hình ảnh Câu chuyện thương hiệu"
            value={pageContent.about.storyImage}
            onUrlChange={(val) => updateField('about', 'storyImage', val)}
            onFileChange={(file) => handleImageUpload('about', 'storyImage', file)}
          />
        </>
      )}
    </div>
  )

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Quản lý nội dung</h1>
          <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">Tùy chỉnh text và hình ảnh cho từng trang</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-3 bg-[#0A1629] text-white px-10 py-4 rounded-2xl text-[10px] font-black tracking-widest shadow-xl hover:bg-gold-primary transition-all uppercase"
        >
          <Save size={18} /> Lưu tất cả thay đổi
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'bg-gold-primary text-white shadow-lg shadow-gold-primary/20 translate-x-2' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 lg:p-14 relative overflow-hidden">
           <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-8">
              <div className="w-12 h-12 bg-gray-50 text-gold-primary rounded-xl flex items-center justify-center">
                 {tabs.find(t => t.id === activeTab)?.icon}
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Cài đặt {tabs.find(t => t.id === activeTab)?.label}</h2>
           </div>

           <AnimatePresence mode="wait">
              {activeTab === 'home' && renderHomeTab()}
              {activeTab === 'contact' && renderContactTab()}
              {['about', 'shop', 'blog'].includes(activeTab) && renderSimpleTab(activeTab, tabs.find(t => t.id === activeTab).label)}
           </AnimatePresence>

           <div className="mt-16 pt-10 border-t border-gray-50 flex justify-end">
              <button onClick={handleSave} className="bg-gray-900 text-white px-10 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-gold-primary transition-all shadow-lg active:scale-95">
                 Cập nhật riêng trang này
              </button>
           </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 right-12 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-[300] flex items-center gap-3"
          >
             <CheckCircle size={18} className="text-emerald-400" />
             <span className="text-[10px] font-bold uppercase tracking-widest">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContent;
