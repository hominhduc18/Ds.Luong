import React, { useState, useEffect } from 'react';
import { Plus, Tag, ChevronDown, Check } from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import QuickAddCategory from './QuickAddCategory';

const CategorySelect = ({ value, onChange, label = "Danh mục sản phẩm" }) => {
  const [options, setOptions] = useState(categoryService.getDropdownOptions());
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const handleDataChange = () => {
      setOptions(categoryService.getDropdownOptions());
    };
    window.addEventListener('ds_luong_categories_changed', handleDataChange);
    return () => window.removeEventListener('ds_luong_categories_changed', handleDataChange);
  }, []);

  const handleAddQuick = (newCat) => {
    const created = categoryService.add(newCat);
    onChange(created.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
        <button 
          type="button"
          onClick={() => setIsAdding(true)}
          className="text-[10px] font-black text-gold-primary uppercase tracking-[0.2em] hover:text-gray-900 transition-all flex items-center gap-2"
        >
          <Plus size={14} /> Thêm cấp độ mới
        </button>
      </div>
      
      <div className="relative group">
         <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-xs font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-widest text-[#B8860B] appearance-none"
         >
            <option value="">CHỌN DANH MỤC</option>
            {options.map(opt => (
               <option key={opt.id} value={opt.id}>
                  {opt.label}
               </option>
            ))}
         </select>
         <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gold-primary transition-colors pointer-events-none">
            <ChevronDown size={18} />
         </div>
      </div>

      <QuickAddCategory 
        isOpen={isAdding} 
        onClose={() => setIsAdding(false)} 
        onAdd={handleAddQuick} 
      />
    </div>
  );
};

export default CategorySelect;
