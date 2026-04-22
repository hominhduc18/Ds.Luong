import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus, Search, Download, FolderTree, AlertCircle,
  CheckCircle2, Layers, TrendingUp, Grid3x3, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '../services/categoryService';
import CategoryTree from '../components/Admin/CategoryTree';
import CategoryForm from '../components/Admin/CategoryForm';

const CategoryManager = () => {
  const [categories, setCategories] = useState(categoryService.getTree());
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const treeRef = React.useRef(null);

  useEffect(() => {
    const handleDataChange = () => setCategories(categoryService.getTree());
    window.addEventListener('ds_luong_categories_changed', handleDataChange);
    return () => window.removeEventListener('ds_luong_categories_changed', handleDataChange);
  }, []);

  const allCategories = categoryService.getAll();
  const stats = useMemo(() => ({
    total: allCategories.length,
    root: allCategories.filter(c => !c.parentId).length,
    active: allCategories.filter(c => c.status === 'ACTIVE').length,
    hidden: allCategories.filter(c => c.status !== 'ACTIVE').length,
  }), [allCategories]);

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

  const handleMove = ({ dragIds, parentId }) => {
    const list = categoryService.getAll();
    const id = dragIds[0];
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx].parentId = parentId;
      categoryService.save(list);
      showToast('Đã thay đổi thứ tự');
    }
  };

  const handleExport = () => {
    const data = categoryService.getAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh-muc-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const expandAll = () => treeRef.current?.openAll();
  const collapseAll = () => treeRef.current?.closeAll();

  const statCards = [
    { label: 'Tổng danh mục', value: stats.total, icon: Grid3x3, gradient: 'from-violet-500 to-purple-600', light: 'bg-violet-50', text: 'text-violet-600' },
    { label: 'Danh mục gốc', value: stats.root, icon: FolderTree, gradient: 'from-blue-500 to-indigo-600', light: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Đang hiển thị', value: stats.active, icon: TrendingUp, gradient: 'from-emerald-400 to-teal-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Đang ẩn', value: stats.hidden, icon: Layers, gradient: 'from-amber-400 to-orange-500', light: 'bg-amber-50', text: 'text-amber-600' },
  ];

  return (
    <div className="min-h-full flex flex-col gap-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <span>Admin</span>
            <ChevronRight size={11} />
            <span className="text-gray-700">Danh Mục</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Quản lý Danh mục</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">Phân cấp 3 tầng · Kéo thả để sắp xếp · Click để chỉnh sửa</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-500 text-xs font-semibold border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <Download size={14} /> Xuất JSON
          </button>
          <button
            onClick={() => handleCreate()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#D4AF37] to-[#A8860A] text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.03] transition-all"
          >
            <Plus size={15} /> Thêm danh mục
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 ${card.light} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={19} className={card.text} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-none mb-1">{card.label}</p>
                <p className="text-2xl font-black text-gray-900 leading-none">{card.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Full-Width Tree ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col"
        style={{ minHeight: 480 }}
      >
        {/* Tree toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Cây phân cấp danh mục</h2>
          </div>
          {/* Search inline */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input
                type="text"
                placeholder="Tìm danh mục..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-xs font-medium text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all w-52"
              />
            </div>
            <div className="flex items-center border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
              <button
                onClick={expandAll}
                className="px-3 py-2 text-[10px] font-bold text-gray-500 hover:bg-gray-50 border-r border-gray-100 transition-all uppercase tracking-tighter"
                title="Mở rộng tất cả"
              >
                Mở rộng
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 text-[10px] font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-tighter"
                title="Thu gọn tất cả"
              >
                Thu gọn
              </button>
            </div>
            <button
              onClick={() => handleCreate()}
              className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-400 hover:text-white transition-all shadow-sm"
              title="Thêm danh mục gốc"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-6 py-3 bg-gray-50/60 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-400 inline-block" /> Cấp 1 — Gốc</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> Cấp 2</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-teal-400 inline-block" /> Cấp 3</div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Hiển thị</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300" /> Ẩn</div>
          </div>
        </div>

        {/* Tree content */}
        <div className="flex-1 py-3 px-4">
          <CategoryTree
            ref={treeRef}
            data={categories}
            searchTerm={searchTerm}
            onSelect={handleEdit}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddSub={handleCreate}
            onMove={handleMove}
            fullWidth
          />
        </div>
      </motion.div>

      {/* ── Slide-in Form Panel (Overlay Drawer) ── */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[420px] z-50 shadow-2xl"
            >
              <CategoryForm
                initialData={editingCategory}
                onSave={handleSave}
                onCancel={() => setIsFormOpen(false)}
                parentCategories={categoryService.getDropdownOptions()}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-2xl shadow-2xl z-[500] flex items-center gap-3 ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-gray-900'
            } text-white`}
          >
            {toast.type === 'error'
              ? <AlertCircle size={16} className="text-red-200" />
              : <CheckCircle2 size={16} className="text-emerald-400" />}
            <span className="text-xs font-bold tracking-wide">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
