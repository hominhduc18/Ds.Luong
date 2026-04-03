import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Mail, Clock, CheckCircle2, Trash2, X, MessageSquare, Phone, User } from 'lucide-react';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    setContacts(storage.get('beauty_contacts') || []);
  }, []);

  const handleRead = (id) => {
    const all = contacts.map(c => c.id === id ? { ...c, status: 'read' } : c);
    setContacts(all);
    storage.set('beauty_contacts', all);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xóa tin nhắn này?')) {
      const all = contacts.filter(c => c.id !== id);
      setContacts(all);
      storage.set('beauty_contacts', all);
      if (activeContact?.id === id) setActiveContact(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      {/* Contact List */}
      <div className="lg:col-span-2 space-y-6">
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <h4 className="p-8 font-bold border-b border-gray-50 flex items-center gap-2">
               <Mail size={24} className="text-primary" /> TIN NHẮN TỪ KHÁCH HÀNG
            </h4>
            <div className="flex flex-col">
               {contacts.length > 0 ? [...contacts].reverse().map(c => (
                  <div 
                     key={c.id} 
                     onClick={() => { setActiveContact(c); handleRead(c.id); }}
                     className={`p-8 border-b border-gray-50 cursor-pointer flex items-center justify-between transition-all hover:bg-gray-50 ${activeContact?.id === c.id ? 'bg-accent' : ''}`}
                  >
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${c.status === 'unread' ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}>
                           {c.name.charAt(0)}
                        </div>
                        <div>
                           <h5 className={`font-bold transition-all ${c.status === 'unread' ? 'text-secondary' : 'text-gray-400'}`}>{c.name}</h5>
                           <p className="text-sm text-gray-500">{c.subject}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-xs text-gray-400 block mb-2">{new Date(c.date).toLocaleString('vi-VN')}</span>
                        {c.status === 'unread' && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Mới</span>}
                     </div>
                  </div>
               )) : <div className="p-20 text-center text-gray-300">Không có tin nhắn nào.</div>}
            </div>
         </div>
      </div>

      {/* Details / Preview */}
      <aside className="sticky top-12 space-y-6">
         {activeContact ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-8 animate-in slide-in-from-right-10 duration-300">
               <div className="flex flex-col items-center text-center pb-8 border-b border-gray-50">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                     {activeContact.name.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-bold">{activeContact.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{activeContact.email}</p>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-4 text-gray-600">
                     <Phone size={20} className="text-primary" /> <span className="font-bold">{activeContact.phone}</span>
                  </div>
                  <div className="flex items-start gap-4 text-gray-600">
                     <MessageSquare size={20} className="text-primary mt-1" /> 
                     <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Mục tiêu tư vấn:</span>
                        <p className="font-bold">{activeContact.subject}</p>
                     </div>
                  </div>
                  <div className="p-6 bg-accent rounded-2xl italic text-gray-700 leading-relaxed border border-gray-50">
                     "{activeContact.message}"
                  </div>
               </div>

               <div className="flex gap-4 pt-6">
                  <button onClick={() => handleDelete(activeContact.id)} className="btn btn-outline flex-1 border-red-200 text-red-500 hover:bg-red-500 hover:text-white">Xóa</button>
                  <a href={`tel:${activeContact.phone}`} className="btn btn-primary flex-1 justify-center">Giao Tiếp Ngay</a>
               </div>
            </div>
         ) : (
            <div className="bg-gray-50 p-20 text-center rounded-3xl border border-dashed border-gray-200 text-gray-300 italic">
               <Mail size={48} className="mx-auto mb-4 opacity-50" />
               Chọn một tin nhắn để xem chi tiết
            </div>
         )}
      </aside>
    </div>
  );
};

export default AdminContacts;
