import React, { useState, useEffect, useMemo } from 'react';
import { storage } from '../utils/storage';
import ProductCard from '../components/Common/ProductCard';
import { Filter, Search, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const initialCategory = queryParams.get('category');

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = () => setProducts(storage.products.getAll());
    loadData();
    window.addEventListener('beauty_data_changed', loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener('beauty_data_changed', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  const categories = ['Chăm sóc da', 'Trang điểm', 'Chống nắng', 'Nước hoa'];

  const filteredProducts = useMemo(() => {
    let result = products;

    // Search
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, searchTerm, selectedCategories, sortBy, priceRange]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'var(--bg)', minHeight: '100vh'}}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8" style={{fontSize: '14px', color: '#888', marginBottom: '32px'}}>
           <Link to="/" className="hover:text-primary">Trang Chủ</Link> <span className="mx-2">/</span> <span className="text-primary font-bold">Tất Cả Sản Phẩm</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12" style={{display: 'flex', gap: '48px'}}>
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-10" style={{flexShrink: 0, width: '280px', display: 'flex', flexDirection: 'column', gap: '40px'}}>
            {/* Search */}
            <div className="relative" style={{position: 'relative'}}>
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
               <input 
                  type="text" 
                  placeholder="Tìm sản phẩm..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-100 focus:border-primary outline-none"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                  style={{width: '100%', padding: '12px 16px 12px 48px', borderRadius: '16px', backgroundColor: 'white', border: '1px solid #eee', outline: 'none'}}
               />
            </div>

            {/* Categories */}
            <div>
               <h4 className="text-lg font-bold mb-6 flex items-center gap-2" style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Filter size={18} /> Danh Mục
               </h4>
               <div className="flex flex-col gap-3" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {categories.map(cat => (
                     <label key={cat} className="flex items-center gap-3 cursor-pointer group" style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'}}>
                        <input 
                           type="checkbox" 
                           checked={selectedCategories.includes(cat)}
                           onChange={() => toggleCategory(cat)}
                           className="w-5 h-5 accent-primary"
                        />
                        <span className={`transition-colors ${selectedCategories.includes(cat) ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-primary'}`} style={{color: selectedCategories.includes(cat) ? 'var(--primary)' : '#666'}}>
                           {cat}
                        </span>
                     </label>
                  ))}
               </div>
            </div>

            {/* SortBy */}
            <div>
               <h4 className="text-lg font-bold mb-6 flex items-center gap-2" style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <SlidersHorizontal size={18} /> Sắp Xếp
               </h4>
               <select 
                  className="w-full p-3 rounded-xl bg-white border border-gray-100 outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'white', border: '1px solid #eee', outline: 'none', cursor: 'pointer'}}
               >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
               </select>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1" style={{flex: 1}}>
             <div className="flex justify-between items-center mb-8" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
                <p className="text-gray-500" style={{color: '#888'}}>
                  Hiển thị <span className="text-secondary font-bold" style={{color: 'black', fontWeight: 'bold'}}>{currentProducts.length}</span> trên <span className="font-bold">{filteredProducts.length}</span> sản phẩm
                </p>
             </div>

             {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px'}}>
                   {currentProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
             ) : (
                <div className="text-center py-40 bg-white rounded-3xl" style={{padding: '160px 0', backgroundColor: 'white', borderRadius: '24px', textAlign: 'center'}}>
                   <X size={48} className="mx-auto text-gray-200 mb-4" />
                   <p className="text-gray-400">Rất tiếc, không tìm thấy sản phẩm phù hợp.</p>
                </div>
             )}

             {/* Pagination */}
             {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-16" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '64px'}}>
                   <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{padding: '12px', borderRadius: '50%', border: '1px solid #ddd'}}
                   >
                      <ChevronLeft size={20} />
                   </button>
                   {[...Array(totalPages)].map((_, i) => (
                      <button 
                         key={i} 
                         onClick={() => setCurrentPage(i + 1)}
                         className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg' : 'bg-white hover:bg-accent'}`}
                         style={{ 
                            width: '48px', height: '48px', borderRadius: '50%', fontWeight: 'bold', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: currentPage === i + 1 ? 'var(--primary)' : 'white'
                         }}
                      >
                         {i + 1}
                      </button>
                   ))}
                   <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{padding: '12px', borderRadius: '50%', border: '1px solid #ddd'}}
                   >
                      <ChevronRight size={20} />
                   </button>
                </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
