import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  Mail, Clock, CheckCircle2, Trash2, X, 
  MessageSquare, Phone, User, Search,
  Filter, MoreVertical, ChevronRight, AlertCircle,
  CheckCircle, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminContacts = () => {
  const [contacts, setContacts] = useState(storage.contacts.getAll());
  const [activeContact, setActiveContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setContacts(storage.contacts.getAll());
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRead = (id) => {
    const all = contacts.map(c => c.id === id ? { ...c, status: 'read' } : c);
    storage.set('beauty_contacts', all);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      const all = contacts.filter(c => c.id !== id);
      storage.set('beauty_contacts', all);
      if (activeContact?.id === id) setActiveContact(null);
      showToast('Đã xóa tin nhắn');
    }
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trung Tâm Tin Nhắn</h1>
          <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">Quản lý phản hồi & yêu cầu tư vấn khách hàng</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
           <div className="text-center border-r border-gray-50 pr-6 uppercase tracking-widest font-black">
              <span className="text-[8px] text-gray-400 block">Chưa đọc</span>
              <span className="text-lg text-red-500">{contacts.filter(c => c.status === 'unread').length}</span>
           </div>
           <div className="text-center uppercase tracking-widest font-black pl-2">
              <span className="text-[8px] text-gray-400 block">Tổng số</span>
              <span className="text-lg text-[#0A4B7A]">{contacts.length}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Contact List */}
        <div className="lg:col-span-2 space-y-8">
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0A4B7A] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên khách hàng, email hoặc chủ đề..."
                className="w-full bg-white border border-gray-100 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-bold tracking-widest focus:ring-8 focus:ring-[#0A4B7A]/5 transition-all outline-none uppercase shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
              <div className="flex flex-col divide-y divide-gray-50">
                 <AnimatePresence>
                    {filteredContacts.length > 0 ? [...filteredContacts].reverse().map((c, idx) => (
                       <motion.div 
                          key={c.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => { setActiveContact(c); handleRead(c.id); }}
                          className={`p-10 cursor-pointer flex items-center justify-between transition-all group ${
                            activeContact?.id === c.id ? 'bg-[#0A4B7A]/5' : 'hover:bg-gray-50'
                          } ${c.status === 'unread' ? 'border-l-4 border-red-500' : 'border-l-4 border-transparent'}`}
                       >
                          <div className="flex items-center gap-8">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
                               c.status === 'unread' 
                                 ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 rotate-3' 
                                 : 'bg-gray-100 text-gray-400 group-hover:bg-[#0A4B7A] group-hover:text-white'
                             }`}>
                                {c.name.charAt(0).toUpperCase()}
                             </div>
                             <div className="space-y-1">
                                <h5 className={`text-sm font-bold tracking-tight transition-all ${
                                  c.status === 'unread' ? 'text-gray-900' : 'text-gray-400'
                                }`}>{c.name}</h5>
                                <p className="text-[11px] font-medium text-gray-400 line-clamp-1">{c.subject}</p>
                             </div>
                          </div>
                          <div className="flex flex-col items-end gap-3 text-right">
                             <div className="flex items-center gap-2 text-[9px] font-black text-gray-300 uppercase tracking-widest">
                                <Clock size={12} /> {new Date(c.date).toLocaleDateString('vi-VN')}
                             </div>
                             {c.status === 'unread' && (
                               <motion.span 
                                 animate={{ scale: [1, 1.1, 1] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="bg-red-500 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20"
                               >
                                  Ưu Tiên
                               </motion.span>
                             )}
                          </div>
                       </motion.div>
                    )) : (
                       <div className="flex flex-col items-center justify-center py-32 text-gray-300 gap-6">
                          <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center">
                             <MessageSquare size={40} strokeWidth={1} />
                          </div>
                          <p className="text-[11px] font-black uppercase tracking-[0.4em] italic">Hộp thư đang trống</p>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Details Panel */}
        <aside className="sticky top-24">
           <AnimatePresence mode="wait">
              {activeContact ? (
                 <motion.div 
                   key={activeContact.id}
                   initial={{ opacity: 0, scale: 0.9, y: 30 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95, y: -30 }}
                   className="bg-[#0A1629] text-white rounded-[3rem] shadow-2xl p-10 lg:p-12 space-y-12 relative overflow-hidden"
                 >
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A4B7A]/40 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                    <div className="relative z-10 flex flex-col items-center text-center pb-12 border-b border-white/5">
                       <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black italic border border-white/10 mb-8 shadow-2xl rotate-3">
                          {activeContact.name.charAt(0).toUpperCase()}
                       </div>
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter">{activeContact.name}</h3>
                       <div className="flex items-center gap-2 mt-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-glow animate-pulse"></div>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{activeContact.email}</span>
                       </div>
                    </div>

                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-colors">
                          <Phone size={24} className="text-[#0A4B7A]" /> 
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Đường dây nóng</span>
                             <span className="text-xl font-black tracking-widest text-white">{activeContact.phone}</span>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <MessageSquare size={16} className="text-[#0A4B7A]" /> 
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Yêu cầu & Ghi chú</span>
                          </div>
                          <div className="p-8 bg-white text-gray-900 rounded-[2rem] text-xs font-medium leading-loose italic shadow-inner relative group">
                             <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center text-gray-900 rotate-12 shadow-lg">
                                <ArrowUpRight size={16} />
                             </div>
                             "{activeContact.message}"
                          </div>
                       </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-4 pt-10">
                       <button 
                         onClick={() => handleDelete(activeContact.id)} 
                         className="py-5 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                       >
                         Xóa bỏ
                       </button>
                       <a 
                         href={`tel:${activeContact.phone}`} 
                         className="py-5 rounded-2xl bg-[#0A4B7A] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#0A1629] transition-all shadow-xl shadow-[#0A4B7A]/20 flex items-center justify-center gap-2"
                       >
                         Phản hồi ngay <ArrowUpRight size={14} />
                       </a>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="bg-white p-20 text-center rounded-[3rem] border-4 border-dashed border-gray-50 flex flex-col items-center justify-center gap-6"
                 >
                    <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200">
                       <Mail size={48} strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Chương trình đọc tin</p>
                       <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Chọn một liên hệ để xem hồ sơ tư vấn</p>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </aside>
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

export default AdminContacts;
