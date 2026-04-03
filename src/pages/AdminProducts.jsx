import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Plus, Search, Edit3, Trash2, ChevronLeft, ChevronRight, X, Image as ImageIcon, Check } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ 
    name: '', price: '', category: 'Chăm sóc da', 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571', 
    status: 'in_stock', shortDesc: '', desc: '', ingredients: '', usage: '' 
  });

  useEffect(() => {
    setProducts(storage.products.getAll());
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (p = null) => {
    if (p) {
      setEditingProduct(p);
      setFormData(p);
    } else {
      setEditingProduct(null);
      setFormData({ 
        name: '', price: '', category: 'Chăm sóc da', 
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571', 
        status: 'in_stock', shortDesc: '', desc: '', ingredients: '', usage: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let all = storage.products.getAll();
    if (editingProduct) {
      all = all.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p);
    } else {
      all.push({ ...formData, id: Date.now() });
    }
    storage.set('beauty_products', all);
    setProducts(all);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const all = products.filter(p => p.id !== id);
      storage.set('beauty_products', all);
      setProducts(all);
    }
  };

  return (
    <div className="space-y-8" style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px'}}>
         <div className="relative w-full md:w-96" style={{position: 'relative', width: '384px'}}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
            <input 
              type="text" 
              placeholder="Tìm tên hoặc danh mục..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '16px', outline: 'none'}}
            />
         </div>
         <button 
           onClick={() => handleOpenModal()} 
           className="btn btn-primary px-8 py-4 font-bold rounded-2xl shadow-lg shadow-primary/20 w-full md:w-auto"
           style={{padding: '16px 32px', fontWeight: 'bold', borderRadius: '16px', backgroundColor: 'var(--primary)', color: 'white', border: 'none'}}
         >
           <Plus size={24} className="mr-2" /> Thêm Sản Phẩm
         </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden" style={{backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden'}}>
         <div className="overflow-x-auto" style={{overflowX: 'auto'}}>
            <table className="w-full text-left" style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
               <thead className="bg-bg text-gray-400 text-xs uppercase" style={{backgroundColor: '#f8f9fa', color: '#888', fontSize: '12px', textTransform: 'uppercase'}}>
                  <tr>
                     <th className="px-8 py-5">Ảnh</th>
                     <th className="px-8 py-5">Tên Sản Phẩm</th>
                     <th className="px-8 py-5">Danh Mục</th>
                     <th className="px-8 py-5">Giá</th>
                     <th className="px-8 py-5 text-center">Thao Tác</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50" style={{fontSize: '14px'}}>
                  {filteredProducts.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <img src={p.image} className="w-16 h-16 object-cover rounded-xl border" style={{width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #eee'}} />
                        </td>
                        <td className="px-8 py-4 font-bold" style={{padding: '16px 32px', fontWeight: 'bold'}}>{p.name}</td>
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <span className="px-3 py-1 bg-accent text-primary rounded-full text-xs font-bold" style={{backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px'}}>{p.category}</span>
                        </td>
                        <td className="px-8 py-4 font-bold" style={{padding: '16px 32px', fontWeight: 'bold'}}>{(p.price).toLocaleString()}đ</td>
                        <td className="px-8 py-4" style={{padding: '16px 32px'}}>
                           <div className="flex items-center justify-center gap-3" style={{display: 'flex', justifyContent: 'center', gap: '12px'}}>
                              <button onClick={() => handleOpenModal(p)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all" style={{padding: '12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '12px'}}><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all" style={{padding: '12px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '12px'}}><Trash2 size={18} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" style={{position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '24px'}}>
           <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" style={{maxWidth: '896px', backgroundColor: 'white', borderRadius: '40px', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflow: 'hidden'}}>
              <div className="p-8 border-b border-gray-100 flex justify-between items-center" style={{padding: '32px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <h3 className="text-2xl font-bold" style={{fontSize: '24px', fontWeight: 'bold'}}>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-8" style={{flex: 1, overflowY: 'auto', padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px'}}>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>Tên Sản Phẩm *</label>
                       <input 
                         required type="text" className="w-full p-4 bg-bg border-none rounded-2xl outline-none" 
                         value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                         style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>Giá (VNĐ) *</label>
                       <input 
                         required type="number" className="w-full p-4 bg-bg border-none rounded-2xl outline-none" 
                         value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                         style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px'}}>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>Danh Mục</label>
                       <select 
                         className="w-full p-4 bg-bg border-none rounded-2xl outline-none"
                         value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                         style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                       >
                          <option>Chăm sóc da</option>
                          <option>Trang điểm</option>
                          <option>Chống nắng</option>
                          <option>Nước hoa</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>URL Ảnh</label>
                       <input 
                         required type="text" className="w-full p-4 bg-bg border-none rounded-2xl outline-none" 
                         value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                         style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>Mô Tả Ngắn</label>
                    <textarea 
                       className="w-full p-4 bg-bg border-none rounded-2xl outline-none" rows="2"
                       value={formData.shortDesc} onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                       style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                    ></textarea>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2" style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase'}}>Mô Tả Chi Tiết</label>
                    <textarea 
                       className="w-full p-4 bg-bg border-none rounded-2xl outline-none" rows="4"
                       value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})}
                       style={{width: '100%', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: 'none', outline: 'none'}}
                    ></textarea>
                 </div>

                 <div className="p-8 bg-gray-50 rounded-3xl" style={{padding: '32px', backgroundColor: '#f9f9f9', borderRadius: '24px'}}>
                    <button type="submit" className="btn btn-primary w-full py-5 text-xl font-bold">
                       <Check size={28} className="mr-2" /> Lưu Sản Phẩm
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
