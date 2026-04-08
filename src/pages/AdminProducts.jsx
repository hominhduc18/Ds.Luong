import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  Plus, Search, Edit3, Trash2, X, Check, 
  ArrowLeft, Filter, Image as ImageIcon,
  MoreVertical, ChevronRight, Package, DollarSign,
  AlertCircle, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState(storage.products.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setProducts(storage.products.getAll());
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const items = products.filter(p => p.id !== id);
      storage.products.save(items);
      showToast('Đã xóa sản phẩm');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());
    
    productData.id = editingItem ? editingItem.id : Date.now();
    productData.price = Number(productData.price);
    productData.stock = Number(productData.stock);
    productData.badge = productData.badge ? productData.badge.split(',').map(b => b.trim()) : [];
    
    const items = [...products];
    if (editingItem) {
      const idx = items.findIndex(i => i.id === editingItem.id);
      items[idx] = productData;
    } else {
      items.push(productData);
    }
    
    storage.products.save(items);
    setIsModalOpen(false);
    setEditingItem(null);
    showToast('Đã lưu thay đổi');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Quản Lý Sản Phẩm</h1>
          <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">Danh mục thuốc & mỹ phẩm chuyên dụng</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-3 bg-gold-primary text-white px-8 py-4 rounded-2xl text-xs font-semibold tracking-wide hover:bg-gray-900 transition-all shadow-xl shadow-gold-primary/20 uppercase"
        >
          <Plus size={18} /> Cấp mới sản phẩm
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col md:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0A4B7A] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Tên sản phẩm, Mã vạch hoặc Thương hiệu..."
              className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 pl-14 pr-6 text-xs font-semibold focus:ring-4 focus:ring-gold-primary/5 focus:border-gold-primary/20 transition-all shadow-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="bg-white px-8 py-5 border border-gray-100 rounded-[1.5rem] shadow-sm flex items-center gap-6">
            <div className="text-center border-r border-gray-50 pr-6">
               <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Tổng kho</span>
               <p className="text-xl font-bold text-gray-900 tracking-tight">{products.length}</p>
            </div>
            <div className="text-center">
               <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Hết hàng</span>
               <p className="text-xl font-bold text-red-500 tracking-tight">{products.filter(p => p.stock <= 0).length}</p>
            </div>
         </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left">
            <thead className="bg-gold-primary text-[10px] font-semibold text-white uppercase tracking-wider">
              <tr>
                <th className="px-10 py-6">Hình ảnh & Tên</th>
                <th className="px-10 py-6">Danh mục</th>
                <th className="px-10 py-6">Giá niêm yết</th>
                <th className="px-10 py-6">Tồn kho</th>
                <th className="px-10 py-6">Tình trạng</th>
                <th className="px-10 py-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredProducts.map((p, idx) => (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-blue-50/20 transition-all group"
                  >
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm flex items-center justify-center p-1">
                             <img src={p.image} className="w-full h-full object-cover rounded-lg" alt={p.name} />
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className="text-sm font-bold text-gray-900 tracking-tight line-clamp-1">{p.name}</span>
                             <div className="flex gap-2">
                                {p.badge?.map(b => (
                                  <span key={b} className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">{b}</span>
                                ))}
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{p.category}</td>
                    <td className="px-10 py-6 text-[12px] font-bold text-gold-primary">
                       {p.price?.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="px-10 py-6 text-[11px] font-bold text-gray-600">{p.stock || 0}</td>
                    <td className="px-10 py-6">
                       <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                         (p.stock || 0) > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                       }`}>
                          {(p.stock || 0) > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'}
                       </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <button 
                            onClick={() => { setEditingItem(p); setIsModalOpen(true); }}
                            className="w-10 h-10 flex items-center justify-center bg-gold-light text-gold-primary rounded-xl hover:bg-gold-primary hover:text-white transition-all shadow-sm"
                          >
                             <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <tr>
                   <td colSpan="6" className="py-24 text-center">
                      <div className="flex flex-col items-center gap-4 text-gray-300">
                         <AlertCircle size={48} strokeWidth={1} />
                         <p className="text-[11px] font-bold uppercase tracking-[0.3em]">Không tìm thấy sản phẩm nào</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - CRUD Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-12">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-md" 
               onClick={() => setIsModalOpen(false)} 
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[3rem] p-12 lg:p-16 shadow-2xl space-y-12 scrollbar-hide"
             >
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{editingItem ? 'Sửa' : 'Thêm'} Sản Phẩm</h3>
                      <p className="text-[10px] font-bold text-[#0A4B7A] uppercase tracking-[0.4em] pl-1">Cấu hình dược/mỹ phẩm chuyên biệt</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-900 hover:text-white transition-all">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tên sản phẩm *</label>
                         <input name="name" defaultValue={editingItem?.name} required className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black uppercase tracking-tight outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Danh mục</label>
                         <input name="category" defaultValue={editingItem?.category} className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all uppercase tracking-widest text-[#0A4B7A]" />
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Giá bán niêm yết</label>
                         <input name="price" type="number" defaultValue={editingItem?.price} required className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Số lượng trong kho</label>
                         <input name="stock" type="number" defaultValue={editingItem?.stock} required className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all" />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">URL Hình ảnh</label>
                      <input name="image" defaultValue={editingItem?.image} className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all lowercase" />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Badges (phân cách bằng dấu phẩy)</label>
                      <input name="badge" defaultValue={editingItem?.badge?.join(', ')} placeholder="NEW, SALE, BEST SELLER" className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all text-emerald-600 uppercase tracking-widest" />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mô tả sản phẩm</label>
                      <textarea name="description" defaultValue={editingItem?.description} rows="4" className="w-full bg-gray-50 border-none rounded-3xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-[#0A4B7A]/5 transition-all leading-relaxed" />
                   </div>

                   <div className="flex justify-end gap-6 pt-10 border-t border-gray-50">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-10 py-5 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.3em]"
                      >
                         Hủy bỏ
                      </button>
                      <button 
                        type="submit"
                        className="px-14 py-5 bg-gold-primary text-white rounded-2xl text-[11px] font-black tracking-[0.4em] hover:bg-gray-900 transition-all shadow-2xl shadow-gold-primary/20 uppercase"
                      >
                         {editingItem ? 'Cập nhật' : 'Khởi tạo'}
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 right-12 bg-gray-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl z-[300] border border-white/10 flex items-center gap-4"
          >
             <CheckCircle size={20} className="text-green-400 shadow-glow" />
             <span className="text-[10px] font-black tracking-[0.3em] uppercase">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
