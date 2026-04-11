import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Search, Download, Upload as UploadIcon, 
  TrendingUp, Package, AlertCircle, FileJson,
  FilterX, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/productService';
import CategorySidebar from '../components/Admin/CategorySidebar';
import ProductTable from '../components/Admin/ProductTable';
import ProductForm from '../components/Admin/ProductForm';

const ITEMS_PER_PAGE = 8;

const AdminProducts = () => {
  const [products, setProducts] = useState(productService.getAll());
  const [activeCategory, setActiveCategory] = useState('TẤT CẢ');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  // Lắng nghe sự thay đổi dữ liệu từ service
  useEffect(() => {
    const handleDataChange = () => {
      setProducts(productService.getAll());
    };
    window.addEventListener('ds_luong_data_changed', handleDataChange);
    return () => window.removeEventListener('ds_luong_data_changed', handleDataChange);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Logic lọc và tìm kiếm chuyên sâu
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'TẤT CẢ' || p.category === activeCategory;
      const matchSearch = searchTerm === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchTerm]);

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Thống kê nhanh
  const stats = useMemo(() => ({
    total: products.length,
    totalValue: products.reduce((acc, p) => acc + (p.sellPrice * p.stock), 0),
    lowStock: products.filter(p => p.stock < 10).length,
    outOfStock: products.filter(p => p.stock <= 0).length
  }), [products]);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleClone = (product) => {
    const { id, ...cloneData } = product;
    cloneData.name = `${product.name} (Bản sao)`;
    productService.add(cloneData);
    showToast('Đã nhân bản sản phẩm');
  };

  const handleDelete = (id) => {
    if (window.confirm('Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      productService.delete(id);
      showToast('Đã xóa sản phẩm');
    }
  };

  const handleSave = (data) => {
    if (editingProduct) {
      productService.update(editingProduct.id, data);
      showToast('Cập nhật thành công');
    } else {
      productService.add(data);
      showToast('Đã thêm sản phẩm mới');
    }
    setIsFormOpen(false);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await productService.importJSON(file);
        showToast('Nhập dữ liệu thành công');
      } catch (err) {
        showToast(err);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#FDFDFD]">
      <CategorySidebar 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => { setActiveCategory(cat); setCurrentPage(1); }}
        totalCount={products.length}
      />

      <div className="flex-1 overflow-y-auto px-12 py-10 scrollbar-hide">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-3 uppercase italic">Quản lý kho hàng</h1>
            <p className="text-[11px] font-black text-gold-primary uppercase tracking-[0.4em] flex items-center gap-3">
               <TrendingUp size={16} /> Kết quả: {filteredProducts.length} sản phẩm
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                <button 
                  onClick={() => productService.exportJSON()}
                  className="flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gold-light/30 hover:text-gold-primary rounded-xl transition-all"
                >
                  <Download size={14} /> Xuất JSON
                </button>
                <label className="flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gold-light/30 hover:text-gold-primary rounded-xl transition-all cursor-pointer">
                  <UploadIcon size={14} /> Nhập JSON
                  <input type="file" hidden accept=".json" onChange={handleImport} />
                </label>
             </div>
             
             <button 
               onClick={handleCreate}
               className="flex items-center gap-4 bg-gold-primary text-white px-10 py-5 rounded-[2rem] text-xs font-black tracking-[0.2em] shadow-2xl shadow-gold-primary/30 hover:bg-gray-900 hover:scale-[1.05] transition-all duration-500 uppercase italic"
             >
               <Plus size={20} /> Thêm sản phẩm mới
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
           {[
             { label: 'Tổng sản phẩm', value: stats.total, icon: Package, color: 'text-blue-500' },
             { label: 'Giá trị tồn kho', value: stats.totalValue.toLocaleString('vi-VN') + '₫', icon: TrendingUp, color: 'text-gold-primary' },
             { label: 'Sắp hết hàng', value: stats.lowStock, icon: AlertCircle, color: 'text-red-500', alert: stats.lowStock > 0 },
             { label: 'Ngừng kinh doanh', value: stats.outOfStock, icon: FilterX, color: 'text-gray-400' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-gold-primary/30 transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className={`text-xl font-black tracking-tight ${stat.alert ? 'text-red-600 animate-pulse' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-6 mb-8">
           <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo Tên, Mã SKU hoặc Thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-bold focus:ring-4 focus:ring-gold-primary/5 focus:border-gold-primary/10 transition-all shadow-sm outline-none placeholder:text-gray-300"
              />
           </div>
           
           {activeCategory !== 'TẤT CẢ' && (
              <button 
                onClick={() => setActiveCategory('TẤT CẢ')}
                className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
              >
                <FilterX size={14} /> Xóa lọc
              </button>
           )}
        </div>

        {/* Product Table Components */}
        <ProductTable 
          products={paginatedProducts} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClone={handleClone}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4 pb-20">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:text-gold-primary hover:border-gold-primary transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-xs font-black transition-all ${
                    currentPage === i + 1 
                      ? 'bg-gold-primary text-white shadow-lg' 
                      : 'bg-white text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:text-gold-primary hover:border-gold-primary transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {isFormOpen && (
            <ProductForm 
              initialData={editingProduct}
              onSave={handleSave}
              onCancel={() => setIsFormOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-12 right-12 bg-gray-900 text-white px-10 py-6 rounded-full shadow-2xl z-[500] border border-white/10 flex items-center gap-4"
            >
               <FileJson size={20} className="text-gold-primary" />
               <span className="text-[11px] font-black tracking-[0.3em] uppercase">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
