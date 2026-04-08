import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  Plus, Search, Edit3, Trash2, X, Check, 
  Calendar, User as UserIcon, Image as ImageIcon,
  MoreVertical, ChevronRight, FileText, Eye,
  AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPosts = () => {
  const [posts, setPosts] = useState(storage.posts.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setPosts(storage.posts.getAll());
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      const items = posts.filter(p => p.id !== id);
      storage.posts.save(items);
      showToast('Đã xóa bài viết');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData.entries());
    
    postData.id = editingItem ? editingItem.id : Date.now();
    postData.date = editingItem ? editingItem.date : new Date().toISOString().split('T')[0];
    
    const items = [...posts];
    if (editingItem) {
      const idx = items.findIndex(i => i.id === editingItem.id);
      items[idx] = postData;
    } else {
      items.push(postData);
    }
    
    storage.posts.save(items);
    setIsModalOpen(false);
    setEditingItem(null);
    showToast('Đã xuất bản bài viết');
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Quản Lý Blog</h1>
          <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">Biên tập nội dung kiến thức làm đẹp</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xs font-semibold tracking-wide hover:bg-gray-900 transition-all shadow-xl shadow-emerald-500/20 uppercase"
        >
          <Plus size={18} /> Soạn thảo bài mới
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col md:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết theo tiêu đề hoặc danh mục..."
              className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 pl-14 pr-6 text-xs font-semibold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/20 transition-all shadow-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <AnimatePresence>
            {filteredPosts.map((p, idx) => (
               <motion.div 
                 key={p.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 border-b-4 hover:border-emerald-500"
               >
                  <div className="relative aspect-[16/10] overflow-hidden">
                     <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                     <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black text-emerald-600 uppercase tracking-widest shadow-lg border border-white/20">
                           {p.category}
                        </span>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 gap-4">
                        <button 
                          onClick={() => { setEditingItem(p); setIsModalOpen(true); }}
                          className="flex-1 bg-white text-gray-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                           <Edit3 size={14} /> Chỉnh sửa
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                           <Calendar size={12} /> {p.date}
                        </div>
                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                           <UserIcon size={12} /> {p.author || 'Admin'}
                        </div>
                     </div>
                     <h3 className="text-sm font-bold text-gray-900 tracking-tight leading-relaxed mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {p.title}
                     </h3>
                     <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-2 mb-6">
                        {p.summary}
                     </p>
                     <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-glow"></div>
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Đã xuất bản</span>
                        </div>
                        <button onClick={() => { setEditingItem(p); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-emerald-500 transition-all">
                           <MoreVertical size={16} />
                        </button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>

         {filteredPosts.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center gap-6 text-gray-300">
               <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center">
                  <FileText size={48} strokeWidth={1} />
               </div>
               <div className="text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em]">Trống rỗng</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Bắt đầu viết bài đầu tiên của bạn</p>
               </div>
            </div>
         )}
      </div>

      {/* Modal - CRUD Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-12">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-[#0A1629]/90 backdrop-blur-xl" 
               onClick={() => setIsModalOpen(false)} 
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col"
             >
                <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                   <div>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{editingItem ? 'Hiệu chỉnh' : 'Sáng tạo'} bài viết</h3>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] pl-1">Phòng biên tập SkinClinic Digital</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-900 hover:text-white transition-all">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 lg:p-16 scrollbar-hide space-y-12">
                   <div className="grid lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tiêu đề bài viết *</label>
                            <input 
                              name="title" 
                              defaultValue={editingItem?.title} 
                              required 
                              placeholder="Kỹ thuật phục hồi da sau xâm lấn..."
                              className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-lg font-bold tracking-tight outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                            />
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tóm tắt (Excerpt) *</label>
                            <textarea 
                              name="summary" 
                              defaultValue={editingItem?.summary} 
                              required 
                              rows="3"
                              placeholder="Mô tả ngắn gọn nội dung bài viết này..."
                              className="w-full bg-gray-50 border-none rounded-3xl py-6 px-8 text-xs font-bold leading-relaxed outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                            />
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Nội dung bài viết (HTML) *</label>
                            <textarea 
                              name="content" 
                              defaultValue={editingItem?.content} 
                              required 
                              rows="12"
                              placeholder="<p>Bắt đầu bài viết tại đây...</p>"
                              className="w-full bg-gray-50 border-none rounded-[2.5rem] py-8 px-10 text-xs font-medium leading-loose outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-mono" 
                            />
                         </div>
                      </div>

                      <div className="space-y-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Ảnh bìa (URL)</label>
                            <div className="aspect-[16/10] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden mb-4 relative group">
                               {editingItem?.image && <img src={editingItem.image} className="w-full h-full object-cover" alt="Preview" />}
                               {!editingItem?.image && <ImageIcon size={48} className="text-gray-200" />}
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Xem trước ảnh</span>
                               </div>
                            </div>
                            <input 
                               name="image" 
                               defaultValue={editingItem?.image} 
                               className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-[10px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all flex items-center gap-3 lowercase"
                            />
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Chuyên mục</label>
                            <select 
                               name="category" 
                               defaultValue={editingItem?.category} 
                               className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all uppercase tracking-widest text-emerald-600"
                            >
                               <option>CHĂM SÓC DA</option>
                               <option>CHỐNG LÃO HOÁ</option>
                               <option>CHỐNG NẮNG</option>
                               <option>TRỊ NÁM</option>
                               <option>REVIEW</option>
                               <option>SỰ KIỆN</option>
                            </select>
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tác giả</label>
                            <input 
                               name="author" 
                               defaultValue={editingItem?.author || 'SkinClinic Doctor'} 
                               className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900" 
                            />
                         </div>

                         <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-50 space-y-4">
                            <div className="flex items-center justify-between">
                               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Trạng thái</span>
                               <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Sẵn sàng xuất bản</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Hệ thống</span>
                               <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Autosave: On</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex justify-end gap-6 pt-12 border-t border-gray-100">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-12 py-5 text-[10px] font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.4em]"
                      >
                         Đóng lại
                      </button>
                      <button 
                        type="submit"
                        className="px-16 py-5 bg-emerald-600 text-white rounded-[2rem] text-[11px] font-black tracking-[0.4em] hover:bg-gray-900 transition-all shadow-2xl shadow-emerald-500/20 uppercase flex items-center gap-3"
                      >
                         <Check size={18} /> {editingItem ? 'Lưu thay đổi' : 'Xuất bản ngay'}
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

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

export default AdminPosts;
