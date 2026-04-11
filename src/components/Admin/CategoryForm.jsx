import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import { X, Check, Info, Palette, Layers, Eye, EyeOff } from 'lucide-react';
import { categoryService } from '../../services/categoryService';

const CategoryForm = ({ initialData, onSave, onCancel, parentCategories }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      parentId: null,
      description: '',
      icon: '📁',
      color: '#D4AF37',
      status: 'ACTIVE'
    }
  });

  const currentColor = watch('color');
  const currentStatus = watch('status');

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">
            {initialData?.id ? 'Chỉnh sửa' : 'Tạo mới'} danh mục
          </h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
             Thiết lập thuộc tính cho phân loại sản phẩm
          </p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-500">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSave)} className="flex-1 space-y-12">
        {/* Tên & Cha */}
        <div className="space-y-8">
           <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tên danh mục *</label>
                 <input 
                   {...register('name', { required: true })}
                   placeholder="Vd: Chăm sóc chuyên sâu..."
                   className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-sm font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-tight" 
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Danh mục cấp trên</label>
                 <select 
                   {...register('parentId')}
                   className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-widest text-[#B8860B]"
                 >
                   <option value="">DANH MỤC GỐC</option>
                   {parentCategories.map(cat => (
                     <option key={cat.id} value={cat.id} disabled={cat.id === initialData?.id}>
                       {cat.label}
                     </option>
                   ))}
                 </select>
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Mô tả tóm tắt</label>
              <textarea 
                {...register('description')}
                rows={3}
                placeholder="Mô tả về nhóm sản phẩm này..."
                className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all italic leading-relaxed" 
              />
           </div>
        </div>

        {/* Giao diện */}
        <div className="grid lg:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div className="flex items-center gap-3 text-gold-primary border-b border-gray-50 pb-4">
                 <Palette size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bảng màu đặc trưng</span>
              </div>
              <HexColorPicker 
                color={currentColor} 
                onChange={(color) => setValue('color', color)} 
                className="w-full !h-40"
              />
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                 <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: currentColor }} />
                 <span className="text-xs font-mono font-bold text-gray-500">{currentColor}</span>
              </div>
           </div>

           <div className="space-y-8">
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-gold-primary border-b border-gray-50 pb-4">
                    <Layers size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Icon biểu tượng</span>
                 </div>
                 <input 
                   {...register('icon')}
                   placeholder="Nhập Emoji hoặc mã Icon..."
                   className="w-full bg-gray-50 border-none rounded-2xl py-5 px-8 text-2xl text-center outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all" 
                 />
              </div>

              <div className="space-y-4 pt-4">
                 <label className="flex items-center gap-4 cursor-pointer group">
                    <div className={`relative w-14 h-8 rounded-full transition-colors ${currentStatus === 'ACTIVE' ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                       <input 
                         type="checkbox" 
                         className="sr-only" 
                         checked={currentStatus === 'ACTIVE'}
                         onChange={(e) => setValue('status', e.target.checked ? 'ACTIVE' : 'HIDDEN')}
                       />
                       <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${currentStatus === 'ACTIVE' ? 'translate-x-6' : ''}`} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">Trạng thái: {currentStatus === 'ACTIVE' ? 'HIỂN THỊ' : 'ẨN'}</span>
                       <span className="text-[9px] font-bold text-gray-300 italic">Quyết định việc xuất hiện trên Menu</span>
                    </div>
                 </label>
              </div>
           </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex justify-end gap-6">
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] hover:text-gray-900 transition-all"
              >
                Hủy bỏ
              </button>
            )}
            <button 
              type="submit"
              className="flex-1 lg:flex-none px-16 py-5 bg-gold-primary text-white rounded-2xl text-[12px] font-black tracking-[0.4em] uppercase shadow-2xl shadow-gold-primary/30 hover:bg-gray-900 hover:scale-[1.05] transition-all duration-500 flex items-center justify-center gap-4"
            >
              <Check size={20} />
              Lưu cấu hình
            </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
