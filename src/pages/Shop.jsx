import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronDown, FaFilter, FaTimes, FaUndo } from 'react-icons/fa';

const categoryTree = [
  {
    id: 'sp',
    name: 'SẢN PHẨM',
    isOpen: true,
    children: [
      {
        id: 'ttda',
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
        id: 'dsp',
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
        id: 'csmm',
        name: 'CHĂM SÓC MẮT & MÔI',
        isOpen: true,
        children: [
          { name: 'DƯỠNG MÔI' },
          { name: 'TẨY TẾ BÀO CHẾT MÔI' },
          { name: 'CHĂM SÓC VÙNG DA QUANH MẮT' },
        ],
      },
      {
        id: 'csbd',
        name: 'CHĂM SÓC BODY',
        isOpen: true,
        children: [
          { name: 'DƯỠNG ẨM' },
          { name: 'MASSAGE NÂNG CƠ - SĂN CHẮC DA' },
        ],
      },
      {
        id: 'cst',
        name: 'CHĂM SÓC TÓC',
        isOpen: true,
        children: [
          { name: 'TINH CHẤT KÍCH THÍCH MỌC TÓC' },
        ],
      },
      {
        id: 'tptm',
        name: 'THỰC PHẨM THẨM MỸ',
        isOpen: true,
        children: [
          { name: 'CHỐNG LÃO HOÁ' },
          { name: 'KIỂM SOÁT CÂN NẶNG VÀ VẬN ĐỘNG' },
          { name: 'CHĂM SÓC TÓC' },
        ],
      },
    ],
  },
  {
    id: 'ltcn',
    name: 'LIỆU TRÌNH CHUYÊN NGHIỆP',
    isOpen: true,
    children: [],
  },
];

const CategoryNode = ({ node, level = 0, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen || false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-2">
      <div
        className={`flex items-center group cursor-pointer py-1 ${level === 0 ? 'mt-4 border-b border-gray-100 pb-2' : ''}`}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelect(node.name);
        }}
      >
        <span className={`${level === 0 ? 'text-sm' : 'text-xs'} font-bold transition-all ${selectedCategory === node.name ? 'text-gold-primary' : 'text-gray-800 hover:text-gold-primary'}`}>
          {level === 0 ? node.name : node.name}
        </span>
        {hasChildren && (
          <span className="ml-auto text-gray-400 group-hover:text-gold-primary transition-colors">
            {isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="pl-4 mt-2 overflow-hidden"
        >
          {node.children.map((child, idx) => (
            <CategoryNode
              key={idx}
              node={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [useBrandFilter, setUseBrandFilter] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const handleClearFilters = () => {
    setSelectedCategory('ALL');
    setMaxPrice(8000000);
    setUseBrandFilter(true);
  };

  const filteredProducts = useMemo(() => {
    let result = products.all.filter(p => {
      const categoryMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
      const priceMatch = p.priceValue <= maxPrice;
      return categoryMatch && priceMatch;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.priceValue - b.priceValue);
    if (sortBy === 'price-desc') result.sort((a, b) => b.priceValue - a.priceValue);
    if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return result;
  }, [selectedCategory, maxPrice, sortBy]);

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Premium Luxury Banner v2 */}
      <div className="relative h-[220px] md:h-[320px] overflow-hidden flex items-center justify-center mb-16 bg-[#FDFBF7]">
        <motion.img
          src="/shop-banner-v2.png"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          alt="Luxury Aesthetic Banner"
        />
        {/* Soft Golden Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40"></div>



        {/* Elegant Border Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className={`lg:w-1/4 fixed inset-0 z-[100] bg-white lg:static lg:bg-transparent lg:z-0 transform ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-500`}>
            <div className="h-full overflow-y-auto lg:overflow-visible p-8 lg:p-0">
              <div className="flex justify-between items-center mb-8 lg:hidden">
                <span className="text-xl font-playfair font-bold">BỘ LỌC</span>
                <button onClick={() => setIsMobileFilterOpen(false)}><FaTimes size={24} /></button>
              </div>

              {/* Complex Category Tree */}
              <div className="mb-12">
                <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 border-b border-gray-100 pb-2">DANH MỤC</h3>
                <div className="flex flex-col">
                  <button
                    onClick={() => setSelectedCategory('ALL')}
                    className={`text-sm font-bold tracking-widest text-left mb-2 transition-all ${selectedCategory === 'ALL' ? 'text-gold-primary' : 'text-gray-900 hover:text-gold-primary'}`}
                  >
                    TẤT CẢ SẢN PHẨM
                  </button>
                  {categoryTree.map((node) => (
                    <CategoryNode
                      key={node.id}
                      node={node}
                      selectedCategory={selectedCategory}
                      onSelect={setSelectedCategory}
                    />
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-12">
                <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 border-b border-gray-100 pb-2">KHOẢNG GIÁ</h3>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="8000000"
                    step="100000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gold-primary mb-6"
                  />
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                    <span className="text-[10px] font-bold text-gray-400">TỐI ĐA</span>
                    <span className="text-sm font-bold text-gold-dark font-montserrat">{maxPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-12">
                <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 border-b border-gray-100 pb-2">THƯƠNG HIỆU</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={useBrandFilter}
                    onChange={() => setUseBrandFilter(!useBrandFilter)}
                    className="w-4 h-4 accent-gold-primary rounded-md"
                  />
                  <span className="text-xs font-bold text-gray-800 transition-colors group-hover:text-gold-primary">DS LUONG (SkinClinic Clone)</span>
                </label>
              </div>

              {/* Clear All */}
              <button
                onClick={handleClearFilters}
                className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 hover:border-gold-primary hover:text-gold-primary rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest transition-all"
              >
                <FaUndo /> XÓA HẾT LỰA CHỌN
              </button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-400 tracking-wider">
                Hiển thị <span className="text-gray-900 font-bold">{filteredProducts.length}</span> kết quả cho <span className="text-gold-primary font-bold">"{selectedCategory}"</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">SẮP XẾP THEO:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-gray-900 focus:outline-none cursor-pointer hover:text-gold-primary transition-colors border-none"
                >
                  <option value="newest">SẢN PHẨM NỔI BẬT</option>
                  <option value="best-seller">BÁN CHẠY NHẤT</option>
                  <option value="newest">MỚI NHẤT</option>
                  <option value="price-asc">GIÁ TĂNG DẦN</option>
                  <option value="price-desc">GIÁ GIẢM DẦN</option>
                </select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + maxPrice + sortBy}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))
                ) : (
                  <div className="col-span-full py-40 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="text-gray-300 italic text-xl mb-6">Xin lỗi, chúng tôi không tìm thấy sản phẩm nào phù hợp.</p>
                    <button onClick={handleClearFilters} className="btn-gold-outline inline-flex items-center gap-2">
                      <FaUndo /> THỬ LẠI
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-20 flex justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-gold-primary text-black font-bold text-xs shadow-lg shadow-gold-primary/30">1</button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 text-gray-500 font-bold text-xs hover:border-gold-primary transition-colors hover:text-gold-primary">2</button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 text-gray-500 font-bold text-xs hover:border-gold-primary transition-colors hover:text-gold-primary">→</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Toggle Filter Floating Button (Mobile) */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 w-14 h-14 bg-gray-900 text-gold-primary rounded-full shadow-2xl flex items-center justify-center z-[50]"
      >
        <FaFilter size={20} />
      </button>
    </div>
  );
};

export default Shop;
