import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Search, Download, Upload as UploadIcon, 
  TrendingUp, FolderTree, AlertCircle, Trash2,
  FileJson, FilterX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '../services/categoryService';
import CategoryTree from '../components/Admin/CategoryTree';
import CategoryForm from '../components/Admin/CategoryForm';

const CategoryManager = () => {
  const [categories, setCategories] = useState(categoryService.getTree());
  const [selectedNode, setSelectedNode] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setCategories(categoryService.getTree());
    };
    window.addEventListener('ds_luong_categories_changed', handleDataChange);
    return () => window.removeEventListener('ds_luong_categories_changed', handleDataChange);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = (parentId = null) => {
    setEditingCategory({ parentId });
    setIsFormOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hành động này sẽ xóa cả các danh mục con. Bạn có chắc chắn?')) {
      try {
        categoryService.delete(id);
        showToast('Đã xóa danh mục');
        if (editingCategory?.id === id) setIsFormOpen(false);
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = (data) => {
    if (editingCategory?.id) {
      categoryService.update(editingCategory.id, data);
      showToast('Cập nhật thành công');
    } else {
      categoryService.add(data);
      showToast('Đã thêm danh mục mới');
    }
    setIsFormOpen(false);
  };

  const handleMove = ({ dragIds, parentId, index }) => {
    const list = categoryService.getAll();
    const id = dragIds[0];
    const indexInList = list.findIndex(c => c.id === id);
    if (indexInList !== -1) {
      list[indexInList].parentId = parentId;
      categoryService.save(list);
      showToast('Đã thay đổi thứ tự');
    }
  };

  const handleExport = () => {
    const data = categoryService.getAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `danh-muc-ds-luong-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] font-inter overflow-hidden">
      {/* Search & Actions Header (Floating) */}
      <div className="flex-1 flex flex-col h-full">
         <div className="p-8 lg:p-12 border-b border-gray-100 bg-white z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
               <div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-3 uppercase italic">Cấu trúc Danh mục</h1>
                  <p className="text-[11px] font-black text-gold-primary uppercase tracking-[0.4em] flex items-center gap-3">
                     <FolderTree size={16} /> Quản lý phân cấp 3 tầng hiện đại
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <button 
                    onClick={handleExport}
                    className="flex items-center gap-3 px-6 py-4 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gold-light hover:text-gold-primary rounded-xl transition-all"
                  >
                    <Download size={14} /> Xuất JSON
                  </button>
                  <button 
                    onClick={() => handleCreate()}
                    className="flex items-center gap-4 bg-gold-primary text-white px-10 py-5 rounded-[2rem] text-xs font-black tracking-[0.2em] shadow-2xl shadow-gold-primary/30 hover:bg-gray-900 hover:scale-[1.05] transition-all duration-500 uppercase italic"
                  >
                    <Plus size={20} /> Thêm danh mục gốc
                  </button>
               </div>
            </div>

            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold-primary transition-colors" size={20} />
               <input 
                 type="text" 
                 placeholder="Tìm kiếm danh mục..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-gray-50 border-none rounded-[2rem] py-6 pl-16 pr-8 text-xs font-bold outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all shadow-inner"
               />
            </div>
         </div>

         {/* Tree & Form Content */}
         <div className="flex-1 p-8 lg:p-12 flex gap-10 overflow-hidden">
            <div className="w-1/2 h-full">
               <CategoryTree 
                 data={categories} 
                 onSelect={handleEdit}
                 onEdit={handleEdit}
                 onDelete={handleDelete}
                 onAddSub={handleCreate}
                 onMove={handleMove}
               />
            </div>
            
            <div className="w-1/2 h-full">
               <AnimatePresence mode="wait">
                  {isFormOpen ? (
                    <motion.div 
                       key="form"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="h-full"
                    >
                       <CategoryForm 
                         initialData={editingCategory}
                         onSave={handleSave}
                         onCancel={() => setIsFormOpen(false)}
                         parentCategories={categoryService.getDropdownOptions()}
                       />
                    </motion.div>
                  ) : (
                    <motion.div 
                       key="placeholder"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="h-full bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-20 text-center"
                    >
                       <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-8">
                          <Plus size={40} strokeWidth={1} className="text-gray-200" />
                       </div>
                       <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Chọn hoặc tạo mới</h4>
                       <p className="text-[11px] font-bold text-gray-300 italic max-w-xs">
                          Click vào danh mục bên trái để chỉnh sửa hoặc bấm nút Thêm để tạo phân loại mới
                       </p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed bottom-12 right-12 px-10 py-6 rounded-full shadow-2xl z-[500] border flex items-center gap-4 ${
               toast.type === 'error' ? 'bg-red-900 text-white border-red-800' : 'bg-gray-900 text-white border-white/10'
            }`}
          >
             {toast.type === 'error' ? <AlertCircle size={20} className="text-red-400" /> : <Check size={20} className="text-gold-primary" />}
             <span className="text-[11px] font-black tracking-[0.3em] uppercase">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
