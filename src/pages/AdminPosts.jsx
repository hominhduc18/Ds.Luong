import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Plus, Search, Edit3, Trash2, X, Check, Clock, User as UserIcon } from 'lucide-react';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const [formData, setFormData] = useState({ 
    title: '', excerpt: '', content: '', category: 'Làm đẹp', 
    image: 'https://images.unsplash.com/photo-1570172619380-212643a6d71b', 
    status: 'published', author: 'Admin' 
  });

  useEffect(() => {
    setPosts(storage.posts.getAll());
  }, []);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (p = null) => {
    if (p) {
      setEditingPost(p);
      setFormData(p);
    } else {
      setEditingPost(null);
      setFormData({ 
        title: '', excerpt: '', content: '', category: 'Làm đẹp', 
        image: 'https://images.unsplash.com/photo-1570172619380-212643a6d71b', 
        status: 'published', author: 'Admin' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let all = storage.posts.getAll();
    if (editingPost) {
      all = all.map(p => p.id === editingPost.id ? { ...formData, id: p.id, date: p.date } : p);
    } else {
      all.push({ ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0] });
    }
    storage.set('beauty_posts', all);
    setPosts(all);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      const all = posts.filter(p => p.id !== id);
      storage.set('beauty_posts', all);
      setPosts(all);
    }
  };

  return (
    <div className="space-y-8" style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px'}}>
         <div className="relative w-full md:w-96" style={{position: 'relative', width: '384px'}}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
            <input 
              type="text" 
              placeholder="Tìm bài viết..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '16px', outline: 'none'}}
            />
         </div>
         <button onClick={() => handleOpenModal()} className="btn btn-primary px-8 py-4 font-bold rounded-2xl w-full md:w-auto">
           <Plus size={24} className="mr-2" /> Viết Bài Mới
         </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden" style={{backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden'}}>
         <div className="overflow-x-auto" style={{overflowX: 'auto'}}>
            <table className="w-full text-left" style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
               <thead className="bg-bg text-gray-400 text-xs uppercase" style={{backgroundColor: '#f8f9fa', color: '#888', fontSize: '12px', textTransform: 'uppercase'}}>
                  <tr>
                     <th className="px-8 py-5">Ảnh</th>
                     <th className="px-8 py-5">Tiêu Đề</th>
                     <th className="px-8 py-5">Danh Mục</th>
                     <th className="px-8 py-5">Ngày Đăng</th>
                     <th className="px-8 py-5 text-center">Thao Tác</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50" style={{fontSize: '14px'}}>
                  {filteredPosts.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <img src={p.image} className="w-20 h-14 object-cover rounded-xl border" style={{width: '80px', height: '56px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #eee'}} />
                        </td>
                        <td className="px-8 py-4 font-bold max-w-md truncate" style={{padding: '16px 32px', fontWeight: 'bold', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{p.title}</td>
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <span className="px-3 py-1 bg-accent text-primary rounded-full text-xs font-bold" style={{backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px'}}>{p.category}</span>
                        </td>
                        <td className="px-8 py-4 text-gray-400" style={{padding: '16px 32px', color: '#aaa'}}>{p.date}</td>
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <div className="flex items-center justify-center gap-3" style={{display: 'flex', justifyContent: 'center', gap: '12px'}}>
                              <button onClick={() => handleOpenModal(p)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" style={{position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '24px'}}>
           <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="text-2xl font-bold">{editingPost ? 'Sửa Bài Viết' : 'Viết Bài Mới'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Tiêu Đề Bài Viết *</label>
                       <input 
                         required type="text" className="w-full p-4 bg-bg border-none rounded-2xl outline-none" 
                         value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Danh Mục</label>
                       <select 
                         className="w-full p-4 bg-bg border-none rounded-2xl outline-none"
                         value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                       >
                          <option>Làm đẹp</option>
                          <option>Chăm sóc da</option>
                          <option>Trang điểm</option>
                          <option>Xu hướng</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Ảnh Đại Diện (URL)</label>
                    <input 
                      required type="text" className="w-full p-4 bg-bg border-none rounded-2xl outline-none" 
                      value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Tóm Tắt Ngắn</label>
                    <textarea 
                       className="w-full p-4 bg-bg border-none rounded-2xl outline-none" rows="2"
                       value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Nội Dung Bài Viết (Hỗ trợ HTML)</label>
                    <textarea 
                       className="w-full p-4 bg-bg border-none rounded-2xl outline-none" rows="8"
                       value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="p-8 bg-gray-50 rounded-3xl">
                    <button type="submit" className="btn btn-primary w-full py-5 text-xl font-bold">
                       <Check size={28} className="mr-2" /> Lưu Bài Viết
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
