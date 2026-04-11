import React from 'react';
import { 
  Plus, ChevronDown, ChevronRight, LayoutGrid, 
  Droplet, Sparkles, Smile, Wind, Scissors, Beaker,
  Stethoscope, Thermometer
} from 'lucide-react';

const categories = [
  { 
    name: "TÌNH TRẠNG DA", 
    icon: Stethoscope,
    children: ["DA LÃO HOÁ", "DA MỤN", "DA THÂM NÁM", "DA THIẾU ẨM", "DA MẪN ĐỎ", "DA SAU THẨM MỸ"] 
  },
  { 
    name: "DÒNG SẢN PHẨM", 
    icon: Sparkles,
    children: ["ĐIỆN DI", "VIAL", "CÔNG NGHỆ MỚI"] 
  },
  { 
    name: "CHĂM SÓC MẶT & MÔI", 
    icon: Smile,
    children: ["DƯỠNG MÔI", "CHĂM SÓC MẶT"] 
  },
  {
    name: "CHĂM SÓC BODY",
    icon: Droplet,
    children: ["DƯỠNG ẨM", "SĂN CHẮC"]
  },
  {
    name: "CHĂM SÓC TÓC",
    icon: Scissors,
    children: ["DẦU GỘI", "MẶT NẠ TÓC"]
  },
  {
    name: "THỰC PHẨM THẨM MỸ",
    icon: Beaker,
    children: ["CHỐNG LÃO HOÁ", "KIỂM SOÁT CÂN NẶNG"]
  }
];

const CategorySidebar = ({ activeCategory, onSelectCategory, totalCount }) => {
  return (
    <div className="w-[300px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 overflow-y-auto scrollbar-thin">
      <div className="p-8">
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Danh mục quản lý</h2>
        
        <div className="space-y-4">
          {/* All products button */}
          <button
            onClick={() => onSelectCategory('TẤT CẢ')}
            className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all duration-300 group ${
              activeCategory === 'TẤT CẢ' 
                ? 'bg-gold-primary text-white shadow-xl shadow-gold-primary/20 scale-[1.02]' 
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <LayoutGrid size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Tất cả sản phẩm</span>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${activeCategory === 'TẤT CẢ' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {totalCount}
            </span>
          </button>

          <div className="w-full h-px bg-gray-50 my-6"></div>

          {/* Grouped categories */}
          {categories.map((group) => (
            <div key={group.name} className="space-y-4">
              <div className="flex items-center gap-3 px-4 text-[10px] font-black text-gold-primary uppercase tracking-widest bg-gold-light/30 py-2 rounded-lg">
                <group.icon size={14} />
                <span>{group.name}</span>
              </div>
              <div className="grid gap-1">
                {group.children.map((child) => (
                  <button
                    key={child}
                    onClick={() => onSelectCategory(child)}
                    className={`text-left px-10 py-3.5 rounded-2xl text-[11px] font-bold transition-all duration-300 ${
                      activeCategory === child
                        ? 'bg-gray-900 text-white translate-x-1'
                        : 'text-gray-500 hover:text-gold-primary hover:bg-gray-50'
                    }`}
                  >
                    {child}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
