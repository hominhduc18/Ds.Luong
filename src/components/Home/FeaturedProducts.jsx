import React, { useState, useEffect } from 'react';
import { storage } from '../../utils/storage';
import ProductCard from '../Common/ProductCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadData = () => setFeaturedProducts(storage.products.getFeatured());
    loadData(); // Đọc lần đầu

    // Lắng nghe khi Admin sửa data CÙNG TAB
    window.addEventListener('beauty_data_changed', loadData);
    // Lắng nghe khi Admin sửa data KHÁC TAB
    window.addEventListener('storage', loadData);

    return () => {
      window.removeEventListener('beauty_data_changed', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  return (
    <section className="py-20 bg-bg" style={{padding: '80px 0', backgroundColor: 'var(--bg)'}}>
      <div className="container">
        <div className="flex justify-between items-end mb-12" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px'}}>
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{fontSize: '32px', marginBottom: '16px'}}>Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600" style={{color: '#666'}}>Khám phá những dòng mỹ phẩm được yêu thích nhất của chúng tôi.</p>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-primary font-bold hover:underline mb-2" style={{color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
            Tất cả sản phẩm <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px'}}>
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-4 py-20 text-gray-400">Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
