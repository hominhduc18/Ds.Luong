import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import TrustBadges from '../components/TrustBadges';
import BrandIntro1 from '../components/BrandIntro1';
import BrandIntro2 from '../components/BrandIntro2';
import ProductSection from '../components/ProductSection';
import TestimonialSection from '../components/TestimonialSection';
import BadgeStrip from '../components/BadgeStrip';
import BlogSection from '../components/BlogSection';
import QuickViewModal from '../components/QuickViewModal';
import { storage } from '../utils/storage';
import { testimonials } from '../data/testimonials';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
  const [pageData, setPageData] = useState({
    contents: storage.contents.get(),
    bestSellers: storage.products.getFeatured(),
    newProducts: storage.products.getNew(),
    latestPosts: storage.posts.getLatest(3)
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setPageData({
        contents: storage.contents.get(),
        bestSellers: storage.products.getFeatured(),
        newProducts: storage.products.getNew(),
        latestPosts: storage.posts.getLatest(3)
      });
    };

    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  return (
    <div className="home-page bg-white overflow-hidden pt-16 md:pt-0">
      <HeroBanner 
        title={pageData.contents.home.heroTitle} 
        subtitle={pageData.contents.home.heroSubtitle} 
      />
      <TrustBadges />
      <BrandIntro1 />
      <BrandIntro2 />
      
      <ProductSection 
        title="SẢN PHẨM NỔI BẬT" 
        subtitle="Khám phá ngay những sản phẩm bán chạy nhất của DS LUONG và cảm nhận hiệu quả đáp ứng nhu cầu cho từng vấn đề của làn da!"
        products={pageData.bestSellers}
        onQuickView={setQuickViewProduct}
      />
      
      <TestimonialSection testimonials={testimonials} />
      
      <ProductSection 
        title="SẢN PHẨM MỚI" 
        subtitle="Trải nghiệm ngay các sản phẩm mới nhất của DS LUONG, mỗi sản phẩm đều được bào chế theo công thức tá dược vừa đủ giúp đạt hiệu quả tốt nhất!"
        products={pageData.newProducts}
        onQuickView={setQuickViewProduct}
      />
      
      <BadgeStrip />
      
      <BlogSection 
        title="Kiến thức làm đẹp" 
        subtitle="Cập nhật tất cả các thông tin mới nhất liên quan đến truyền thông sự kiện, chia sẻ tin tức và kiến thức làm đẹp chuẩn Y khoa!"
        posts={pageData.latestPosts}
      />

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
