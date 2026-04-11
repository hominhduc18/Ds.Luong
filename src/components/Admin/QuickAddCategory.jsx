import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Check, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickAddCategory = ({ isOpen, onClose, onAdd, parentId = null }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onAdd({
      ...data,
      parentId: parentId || null,
      icon: '📁',
      color: '#D4AF37',
      status: 'ACTIVE'
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0A1629]/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
               <h3 className="text-xl font-black uppercase italic tracking-tighter">Thêm nhanh danh mục</h3>
               <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X size={20} />
               </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tên danh mục mới</label>
                  <input 
                    {...register('name', { required: true })}
                    autoFocus
                    placeholder="Vd: Chăm sóc đặc biệt..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-black outline-none focus:ring-4 focus:ring-gold-primary/10 transition-all uppercase tracking-tight" 
                  />
                  {errors.name && <span className="text-[10px] font-bold text-red-500 pl-1 uppercase tracking-widest">Vui lòng nhập tên danh mục</span>}
               </div>

               <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-all"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-gold-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-gold-primary/20 hover:bg-gray-900 transition-all flex items-center justify-center gap-3"
                  >
                    <Save size={16} /> Lưu & Chọn
                  </button>
               </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddCategory;
