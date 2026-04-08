import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronDown, FaFilter, FaTimes, FaUndo, FaSearch } from 'react-icons/fa';

const categoryTree = [
  {
    name: 'SẢN PHẨM',
    isOpen: true,
    children: [
      {
        name: 'TÌNH TRẠNG DA',
        isOpen: true,
        children: [
          { name: 'DA LÃO HOÁ' },
          { name: 'DA MỤN VÀ KHUYẾT ĐIỂM' },
          { name: 'DA THÂM NÁM KHÔNG ĐỀU MÀU' },
          { name: 'DA THIẾU ẨM' },
          { name: 'DA MẪN ĐỎ, KÍCH ỨNG' },
          { name: 'DA SAU LIỆU TRÌNH THẨM MỸ' },
        ],
      },
      {
        name: 'DÒNG SẢN PHẨM',
        isOpen: true,
        children: [
          { name: 'ĐIỆN DI' },
          { name: 'VIAL' },
          { name: 'SẢN PHẨM DÙNG CÔNG NGHỆ MÁY' },
        ],
      },
      { name: 'LÀM SẠCH DA' },
      { name: 'CHĂM SÓC DA NHẠY CẢM' },
      { name: 'CHỐNG NẮNG' },
      { name: 'PEEL DA' },
      { name: 'NÂNG CƠ' },
      { name: 'MẶT NẠ' },
      {
        name: 'CHĂM SÓC MẮT & MÔI',
        isOpen: true,
        children: [
          { name: 'DƯỠNG MÔI' },
          { name: 'TẨY TẾ BÀO CHẾT MÔI' },
          { name: 'CHĂM SÓC VÙNG DA QUANH MẮT' },
        ],
      },
      {
        name: 'CHĂM SÓC BODY',
        isOpen: true,
        children: [
          { name: 'DƯỠNG ẨM' },
          { name: 'MASSAGE NÂNG CƠ - SĂN CHẮC DA' },
        ],
      },
      {
        name: 'CHĂM SÓC TÓC',
        isOpen: true,
        children: [
          { name: 'TINH CHẤT KÍCH THÍCH MỌC TÓC' },
        ],
      },
      {
        name: 'THỰC PHẨM THẨM MỸ',
        isOpen: true,
        children: [
          { name: 'CHỐNG LÃO HOÁ' },
          { name: 'KIỂM SOÁT CÂN NẶNG VÀ VẬN ĐỘNG' },
          { name: 'CHĂM SÓC TÓC' },
        ],
      },
    ],
  }
];

const CategoryNode = ({ node, level = 0, selectedCategory, onSelect }) => {
  // Always open if level < 10 (virtually all) or the user can click to toggle if they want, 
  // but initial state is OPEN as requested.
  const [isOpen, setIsOpen] = useState(true); 
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-1">
      <div 
        className={`flex items-center group cursor-pointer py-1.5 transition-all ${selectedCategory === node.name ? 'text-[#0A4B7A]' : 'text-gray-600 hover:text-[#0A4B7A]'}`}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelect(node.name);
        }}
      >
        <span className="mr-2 text-gray-300">
           {hasChildren ? (isOpen ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />) : '•'}
        </span>
        <span className={`text-[11px] font-bold uppercase tracking-wider ${selectedCategory === node.name ? 'font-black underline' : ''}`}>
          {node.name}
        </span>
      </div>
      
      {hasChildren && isOpen && (
        <div className="pl-4 border-l border-gray-100 ml-1.5 mt-0.5">
          {node.children.map((child, idx) => (
            <CategoryNode 
              key={idx} 
              node={child} 
              level={level + 1} 
              selectedCategory={selectedCategory} 
              onSelect={onSelect} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products.all].filter(p => {
      const categoryMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
      const priceMatch = p.priceValue <= maxPrice;
      return categoryMatch && priceMatch;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.priceValue - b.priceValue);
    if (sortBy === 'price-desc') result.sort((a, b) => b.priceValue - a.priceValue);
    if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    // Simple placeholder for 'featured' and 'best-seller'
    return result;
  }, [selectedCategory, maxPrice, sortBy]);

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - 25% Width */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-sm font-black text-gray-900 border-b-2 border-gray-900 pb-3 mb-6 tracking-widest uppercase">
                DANH MỤC
              </h3>
              
              <div className="mb-12">
                {categoryTree.map((node, idx) => (
                  <CategoryNode 
                    key={idx} 
                    node={node} 
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory} 
                  />
                ))}
              </div>

              {/* Price Filter */}
              <div className="mb-12 pt-8 border-t border-gray-100">
                <h3 className="text-xs font-black text-gray-900 mb-6 tracking-widest uppercase">GIÁ</h3>
                <input 
                  type="range" min="0" max="8000000" step="100000"
                  value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A4B7A] mb-4"
                />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>0₫</span>
                  <span>{maxPrice.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-12 pt-8 border-t border-gray-100">
                <h3 className="text-xs font-black text-gray-900 mb-6 tracking-widest uppercase">THƯƠNG HIỆU</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked readOnly className="w-4 h-4 accent-[#0A4B7A]" />
                  <span className="text-[11px] font-bold text-gray-700 tracking-widest uppercase">SkinClinic</span>
                </label>
              </div>

              <button 
                onClick={() => { setSelectedCategory('ALL'); setMaxPrice(8000000); }}
                className="w-full py-3 bg-gray-100 text-gray-500 font-bold text-[10px] tracking-widest hover:bg-gray-200 transition-all uppercase rounded"
              >
                Xóa hết lựa chọn
              </button>
            </div>
          </aside>

          {/* Product Grid - 75% Width */}
          <main className="lg:w-3/4 flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-3xl font-black text-[#1A2C3E] uppercase tracking-tighter">TẤT CẢ SẢN PHẨM</h1>
                <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-2 uppercase">KẾT QUẢ: {filteredProducts.length} SẢN PHẨM</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Sắp xếp theo:</span>
                <select 
                  value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-bold text-gray-900 uppercase tracking-widest focus:outline-none cursor-pointer hover:text-[#0A4B7A]"
                >
                  <option value="featured">Sản phẩm nổi bật</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="newest">Mới nhất</option>
                  <option value="best-seller">Bán chạy nhất</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-24 flex justify-center gap-4">
               <button className="w-10 h-10 border border-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all">«</button>
               <button className="w-10 h-10 bg-gray-900 text-white font-bold text-xs flex items-center justify-center">1</button>
               {[2, 3, 4].map(n => (
                 <button key={n} className="w-10 h-10 border border-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all">{n}</button>
               ))}
               <span className="w-10 h-10 flex items-center justify-center text-gray-300">...</span>
               <button className="w-10 h-10 border border-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all">7</button>
               <button className="w-10 h-10 border border-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all">»</button>
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
