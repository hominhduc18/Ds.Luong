import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, FileJson, 
  ArrowUpFromLine, AlertTriangle, XCircle, 
  Package, LayoutGrid, FileSpreadsheet
} from 'lucide-react';
import { WAREHOUSE_CATEGORIES } from '../../data/warehouseData';

const WarehouseSidebar = ({ onExportJSON, onImportJSON, onExportExcel, lowStockCount, discontinuedCount }) => {
  const [openGroups, setOpenGroups] = useState({ [WAREHOUSE_CATEGORIES[0].name]: true });

  const toggleGroup = (name) => {
    setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-[300px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 overflow-y-auto scrollbar-thin">
      <div className="p-8 space-y-10">
        {/* Section Title */}
        <div>
          <h2 className="text-base font-inter font-bold text-[#D4AF37] uppercase tracking-widest mb-6">DANH MỤC LỌC</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gold-light/50 text-[#B8860B] transition-all hover:bg-gold-light group border border-gold-light/20">
              <div className="flex items-center gap-3">
                <LayoutGrid size={18} />
                <span className="text-[13px] font-inter font-bold uppercase tracking-widest">Tất cả sản phẩm</span>
              </div>
              <span className="text-[10px] font-inter font-black px-2 py-1 bg-white/50 rounded-md">115</span>
            </button>

            {/* Accordions */}
            <div className="space-y-2">
              {WAREHOUSE_CATEGORIES.map((group) => (
                <div key={group.name} className="border border-gray-50 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => toggleGroup(group.name)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[11px] font-inter font-black text-gray-500 uppercase tracking-widest">{group.name}</span>
                    {openGroups[group.name] ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                  </button>
                  {openGroups[group.name] && (
                    <div className="px-5 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {group.children.map((child) => (
                        <button key={child.name} className="w-full flex items-center justify-between py-2 text-[12px] font-inter font-medium text-gray-500 hover:text-[#D4AF37] transition-colors">
                          <span>{child.name}</span>
                          <span className="text-[10px] font-inter font-bold text-gray-300 italic">{child.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-inter font-black text-gray-400 uppercase tracking-widest pl-1 mb-4">Chức năng & Trạng thái</h3>
          
          <button 
            onClick={onExportJSON}
            className="w-full flex items-center gap-3 px-6 py-4 border-2 border-[#D4AF37]/30 text-[#D4AF37] rounded-2xl hover:bg-gold-primary hover:text-white hover:border-gold-primary transition-all duration-300 text-[11px] font-inter font-black uppercase tracking-widest"
          >
            <FileJson size={18} /> Xuất JSON
          </button>
          
          <label className="w-full flex items-center gap-3 px-6 py-4 border-2 border-[#D4AF37]/30 text-[#D4AF37] rounded-2xl hover:bg-gold-primary hover:text-white hover:border-gold-primary transition-all duration-300 text-[11px] font-inter font-black uppercase tracking-widest cursor-pointer">
            <ArrowUpFromLine size={18} /> Nhập JSON
            <input type="file" hidden onChange={onImportJSON} accept=".json" />
          </label>

          <button 
            onClick={onExportExcel}
            className="w-full flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 text-[11px] font-inter font-black uppercase tracking-widest"
          >
            <FileSpreadsheet size={18} /> Xuất Excel
          </button>

          <div className="grid grid-cols-2 gap-3 mt-8">
             <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                   <AlertTriangle size={14} />
                   <span className="text-[9px] font-inter font-black uppercase">Sắp hết</span>
                </div>
                <span className="text-xl font-inter font-black text-orange-700">{lowStockCount}</span>
             </div>
             <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                   <XCircle size={14} />
                   <span className="text-[9px] font-inter font-black uppercase">Ngừng KD</span>
                </div>
                <span className="text-xl font-inter font-black text-red-700">{discontinuedCount}</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer hint */}
      <div className="mt-auto p-8 border-t border-gray-50 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
             <Package size={20} className="text-gray-300" />
          </div>
          <div>
             <p className="text-[10px] font-inter font-black text-gray-900 uppercase">Version 4.2.0</p>
             <p className="text-[9px] font-inter font-bold text-gray-400">DS Luong Warehouse</p>
          </div>
      </div>
    </div>
  );
};

export default WarehouseSidebar;
