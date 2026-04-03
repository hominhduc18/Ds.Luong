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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" style={{position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', padding: '40px'}}>
           <div className="bg-white w-full max-w-7xl rounded-[40px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300" style={{backgroundColor: 'white', borderRadius: '40px', display: 'flex', flexDirection: 'column', maxHeight: '92vh', overflow: 'hidden'}}>
              
              {/* STICKY HEADER */}
              <div className="p-8 md:px-12 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10" style={{padding: '32px 48px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center" style={{width: '48px', height: '48px', backgroundColor: 'rgba(212, 163, 115, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                       <Edit3 size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-secondary" style={{fontSize: '24px', fontWeight: 'bold'}}>{editingPost ? 'Cập Nhật Bài Viết' : 'Soạn Thảo Bài Viết Mới'}</h3>
                       <p className="text-sm text-gray-400 capitalize" style={{fontSize: '14px', color: '#aaa'}}>{formData.category} • {formData.author}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all" style={{padding: '12px', borderRadius: '16px'}}><X size={28} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-0" style={{flex: 1, overflowY: 'auto', display: 'flex'}}>
                 
                 {/* LEFT: MAIN CONTENT (Writing Area) */}
                 <div className="flex-1 p-8 md:p-12 space-y-10 border-r border-gray-50" style={{flex: 2, padding: '48px', borderRight: '1px solid #f9f9f9', display: 'flex', flexDirection: 'column', gap: '40px'}}>
                    
                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}><Check size={14} className="text-primary" /> Tiêu Đề Bài Viết</label>
                       <input 
                         required type="text" 
                         placeholder="Nhập tiêu đề thu hút..."
                         className="w-full text-4xl font-bold border-none outline-none focus:ring-0 p-0 text-secondary placeholder:text-gray-100" 
                         value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                         style={{width: '100%', fontSize: '36px', fontWeight: 'bold', border: 'none', outline: 'none', color: '#1a1a1a'}}
                       />
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}>Tóm Tắt Ngắn</label>
                       <textarea 
                          placeholder="Mô tả ngắn gọn nội dung bài viết này (hiển thị ở danh sách)..."
                          className="w-full p-6 bg-bg border-none rounded-3xl outline-none text-lg text-gray-600 italic leading-relaxed" rows="2"
                          value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                          style={{width: '100%', padding: '24px', backgroundColor: '#fcf8f5', borderRadius: '24px', border: 'none', outline: 'none', fontSize: '18px', fontStyle: 'italic', lineHeight: '1.6'}}
                       ></textarea>
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}>Nội Dung Bài Viết (HTML)</label>
                       <textarea 
                          placeholder="Bắt đầu viết nội dung tại đây... Bạn có thể dùng các thẻ HTML như <b> <i> <img> <ul> <p> để trình bày đẹp hơn."
                          className="w-full p-8 bg-white border-2 border-dashed border-gray-100 rounded-3xl outline-none min-h-[400px] text-lg leading-loose focus:border-primary/30 transition-all shadow-inner" rows="12"
                          value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}
                          style={{width: '100%', padding: '32px', backgroundColor: 'white', border: '2px dashed #eee', borderRadius: '24px', outline: 'none', fontSize: '18px', minHeight: '400px', lineHeight: '2'}}
                       ></textarea>
                    </div>
                 </div>

                 {/* RIGHT: METADATA & SETTINGS */}
                 <div className="w-full lg:w-[400px] bg-bg/50 p-8 md:p-12 space-y-10" style={{width: '400px', backgroundColor: '#fafafa', padding: '48px', display: 'flex', flexDirection: 'column', gap: '40px'}}>
                    
                    {/* IMAGE PREVIEW */}
                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}>Ảnh Đại Diện</label>
                       <div className="relative group rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200 shadow-lg" style={{position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#eee', border: '1px solid #ddd'}}>
                          {formData.image ? (
                             <img src={formData.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                                <Plus size={48} strokeWidth={1} />
                                <span className="text-sm font-medium">Chưa có ảnh</span>
                             </div>
                          )}
                       </div>
                       <input 
                         required type="text" 
                         placeholder="Dán link ảnh Unsplash hoặc Imgur..."
                         className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all font-mono" 
                         value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                         style={{width: '100%', padding: '16px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'monospace'}}
                       />
                       <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest" style={{fontSize: '10px', textAlign: 'center', color: '#bbb'}}>Kích thước khuyên dùng: 1200x800px</p>
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}>Danh Mục Bài Viết</label>
                       <select 
                         className="w-full p-5 bg-white border border-gray-100 rounded-2xl outline-none font-bold text-secondary shadow-sm"
                         value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                         style={{width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eee', fontWeight: 'bold', outline: 'none'}}
                       >
                          <option>Làm đẹp</option>
                          <option>Chăm sóc da</option>
                          <option>Trang điểm</option>
                          <option>Xu hướng</option>
                          <option>Kinh nghiệm</option>
                       </select>
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '2px'}}>Thông Tin Khác</label>
                       <div className="p-6 bg-white rounded-3xl border border-gray-100 space-y-4 shadow-sm" style={{padding: '24px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                          <div className="flex justify-between items-center">
                             <span className="text-sm text-gray-400 font-medium">Người viết:</span>
                             <span className="text-sm font-bold text-secondary">Admin</span>
                          </div>
                          <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-4">
                             <span className="text-gray-400 font-medium">Trạng thái:</span>
                             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Hoạt động</span>
                          </div>
                       </div>
                    </div>
                    
                    {/* STICKY FOOTER (Inside Sidebar for Desktop, but we'll put a global one) */}
                    <div className="mt-auto pt-10" style={{marginTop: 'auto', paddingTop: '40px'}}>
                       <button type="submit" className="btn btn-primary w-full py-6 text-xl font-bold rounded-3xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center">
                          <Check size={32} className="mr-2" /> {editingPost ? 'CẬP NHẬT' : 'XUẤT BẢN'}
                       </button>
                    </div>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
