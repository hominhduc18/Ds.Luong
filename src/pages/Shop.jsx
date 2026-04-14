import React, { useState, useMemo, useEffect } from 'react';
import { storage } from '../utils/storage';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronDown, FaUndo } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';
import StructuredData from '../components/SEO/StructuredData';

const CategoryNode = ({ node, level = 0, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true); 
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-1">
      <div 
        className={`flex items-center group cursor-pointer py-1.5 transition-all ${selectedCategory === node.name ? 'text-gold-primary' : 'text-gray-600 hover:text-gold-primary'}`}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelect(node.name);
        }}
      >
        <span className="mr-2 text-gray-300">
           {hasChildren ? (isOpen ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />) : '•'}
        </span>
        <span className={`text-[13px] font-bold uppercase tracking-widest ${selectedCategory === node.name ? 'font-black underline scale-105' : ''}`}>
          {node.name}
        </span>
      </div>
      
      {hasChildren && isOpen && (
        <div className="pl-4 border-l border-gray-100 ml-1.5 mt-0.5">
          {node.children.map((child, idx) => (
            <CategoryNode 
              key={idx} 
              node={typeof child === 'string' ? { name: child } : child} 
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
  const [products, setProducts] = useState(storage.products.getAll());
  const [categories, setCategories] = useState(storage.categories.get());
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setProducts(storage.products.getAll());
      setCategories(storage.categories.get());
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products].filter(p => {
      const categoryMatch = selectedCategory === 'ALL' || p.category === selectedCategory || (
        // Check if p.category is in the children of the selected parent category
        categories.find(c => c.name === selectedCategory)?.children?.includes(p.category)
      );
      const priceMatch = p.price <= maxPrice;
      return categoryMatch && priceMatch;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (b.badge?.includes('NEW') ? 1 : 0) - (a.badge?.includes('NEW') ? 1 : 0));
    return result;
  }, [products, categories, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="bg-white pt-32 pb-20">
      <SEO 
        title={selectedCategory === 'ALL' ? 'Tất cả dược mỹ phẩm Tây Ban Nha' : `Dược mỹ phẩm ${selectedCategory}`}
        description={`Khám phá bộ sưu tập ${selectedCategory === 'ALL' ? 'dược mỹ phẩm' : selectedCategory} cao cấp từ Tây Ban Nha tại DS LUONG.`}
        url={selectedCategory === 'ALL' ? '/shop' : `/shop?cat=${selectedCategory}`}
      />
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - 25% Width */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-base font-black text-gray-900 border-b-2 border-gray-900 pb-4 mb-8 tracking-[0.2em] uppercase">
                DANH MỤC
              </h3>
              
              <div className="mb-12">
                <button 
                  onClick={() => setSelectedCategory('ALL')}
                  className={`text-[13px] font-bold uppercase tracking-widest mb-4 block ${selectedCategory === 'ALL' ? 'text-gold-primary font-black underline scale-105' : 'text-gray-600'}`}
                >
                  Tất cả sản phẩm
                </button>
                {categories.map((node, idx) => (
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
                <h3 className="text-sm font-black text-gray-900 mb-6 tracking-[0.2em] uppercase">MỨC GIÁ</h3>
                <input 
                  type="range" min="0" max="8000000" step="100000"
                  value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-primary mb-4"
                />
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Khoảng giá:</span>
                  <span className="text-gray-900">{maxPrice.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              <button 
                onClick={() => { setSelectedCategory('ALL'); setMaxPrice(8000000); }}
                className="w-full py-4 bg-gray-50 text-gray-500 font-bold text-[11px] tracking-[0.2em] hover:bg-gray-100 transition-all uppercase rounded-xl border border-gray-100"
              >
                <FaUndo className="inline mr-2" /> Xóa bộ lọc
              </button>
            </div>
          </aside>

          {/* Product Grid - 75% Width */}
          <main className="lg:w-3/4 flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-5xl font-black text-gold-primary uppercase tracking-tighter leading-none mb-3">
                  {storage.contents.get().shop?.heroTitle || 'TẤT CẢ SẢN PHẨM'}
                </h1>
                <p className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase">
                  {storage.contents.get().shop?.heroSubtitle || `KẾT QUẢ: ${filteredProducts.length} SẢN PHẨM`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Sắp xếp:</span>
                <select 
                  value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-gray-900 uppercase tracking-widest focus:outline-none cursor-pointer hover:text-gold-primary transition-colors"
                >
                  <option value="featured">Mặc định</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            {filteredProducts.length > 9 && (
              <div className="mt-24 flex justify-center gap-4">
                 <button className="w-10 h-10 bg-gold-primary text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-gold-primary/20">1</button>
              </div>
            )}
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
