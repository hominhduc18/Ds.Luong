import React from 'react';
import { Search } from 'lucide-react';

const WarehouseHeader = ({ totalProducts, onSearch }) => {
  return (
    <div className="bg-white px-10 py-8 border-b border-gray-100 sticky top-0 z-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] font-inter font-extrabold text-[#D4AF37] uppercase tracking-tighter italic">
            QUẢN LÝ KHO HÀNG
          </h1>
          <p className="text-[10px] font-inter font-black text-gray-400 uppercase tracking-[0.4em] mt-1 pl-1">
            Hệ thống kiểm kê dược mỹ phẩm DS LUONG
          </p>
        </div>
        
        <div className="bg-gold-light/30 px-8 py-4 rounded-3xl border border-gold-light flex flex-col items-end">
          <span className="text-[10px] font-inter font-black text-[#B8860B] uppercase tracking-widest mb-1">Tổng sản phẩm</span>
          <span className="text-3xl font-inter font-black text-[#D4AF37] leading-none">{totalProducts}</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors pointer-events-none">
          <Search size={22} />
        </div>
        <input 
          type="text" 
          placeholder="Tìm kiếm theo Tên, Mã SKU hoặc Thương hiệu..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#F9FAFB] border border-gray-100 rounded-2xl py-6 pl-16 pr-8 text-sm font-inter font-medium focus:ring-4 focus:ring-gold-primary/5 focus:border-[#D4AF37]/20 transition-all outline-none placeholder:text-gray-400 shadow-inner"
        />
      </div>
    </div>
  );
};

export default WarehouseHeader;
