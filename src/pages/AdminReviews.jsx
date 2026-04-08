import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
    Trash2, CheckCircle, Clock, Star, 
    User, MessageCircle, Mail, AlertCircle,
    CheckCircle2, Search, Filter, MoreVertical,
    ChevronDown, ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminReviews = () => {
  const [reviews, setReviews] = useState(storage.get('beauty_reviews') || []);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setReviews(storage.get('beauty_reviews') || []);
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    const all = reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    storage.set('beauty_reviews', all);
    showToast('Đã duyệt đánh giá khách hàng');
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      const all = reviews.filter(r => r.id !== id);
      storage.set('beauty_reviews', all);
      showToast('Đã xóa đánh giá');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Quản Lý Review</h1>
          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-[0.3em] pl-1">Phản hồi & Trải nghiệm thực tế từ người dùng</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
           <div className="text-center border-r border-gray-50 pr-6 uppercase tracking-widest font-black">
              <span className="text-[8px] text-gray-400 block italic">Trung bình</span>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-lg">4.8</span>
                <Star size={14} fill="currentColor" />
              </div>
           </div>
           <div className="text-center uppercase tracking-widest font-black pl-2">
              <span className="text-[8px] text-gray-400 block italic">Tổng số</span>
              <span className="text-lg text-[#0A4B7A]">{reviews.length}</span>
           </div>
        </div>
      </div>

      {/* Reviews Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0A1629] text-[9px] font-black text-white uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6">Khách hàng / Metadata</th>
                <th className="px-10 py-6">Xếp hạng</th>
                <th className="px-10 py-6">Nội dung phản hồi</th>
                <th className="px-10 py-6">Trạng thái</th>
                <th className="px-10 py-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {reviews.map((r, idx) => (
                  <motion.tr 
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-amber-50/10 transition-all group"
                  >
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black italic shadow-inner border border-amber-100">
                             {r.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-0.5">
                             <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{r.name}</span>
                             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{r.email}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex text-amber-500 gap-1 bg-amber-50/50 w-fit px-3 py-1.5 rounded-xl border border-amber-100/50 shadow-sm">
                          {[...Array(5)].map((_, i) => (
                             <Star 
                               key={i} 
                               size={12} 
                               fill={i < r.rating ? 'currentColor' : 'none'} 
                               className={i < r.rating ? 'text-amber-500 shadow-glow' : 'text-gray-200'} 
                             />
                          ))}
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <div className="max-w-md">
                          <p className="text-[11px] font-medium text-gray-600 leading-relaxed italic line-clamp-2">
                             "{r.content}"
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[8px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                             <Clock size={10} /> {new Date(r.date || Date.now()).toLocaleDateString('vi-VN')}
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <span className={`text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm ${
                         r.status === 'approved' 
                           ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                           : 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse'
                       }`}>
                          {r.status === 'approved' ? 'Đã công khai' : 'Chờ phê duyệt'}
                       </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                          {r.status === 'pending' && (
                            <button 
                              onClick={() => handleApprove(r.id)}
                              className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                              title="Phê duyệt"
                            >
                               <CheckCircle2 size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(r.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Xóa đánh giá"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {reviews.length === 0 && (
                <tr>
                   <td colSpan="5" className="py-24 text-center">
                      <div className="flex flex-col items-center gap-4 text-gray-300">
                         <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-2">
                            <Star size={40} strokeWidth={1} />
                         </div>
                         <p className="text-[11px] font-black uppercase tracking-[0.4em]">Chưa có đánh giá nào</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 right-12 bg-[#0A1629] text-white px-10 py-6 rounded-full shadow-2xl z-[300] border border-white/10 flex items-center gap-4"
          >
             <ThumbsUp size={22} className="text-amber-400 shadow-glow" />
             <span className="text-[11px] font-black tracking-[0.3em] uppercase">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReviews;
