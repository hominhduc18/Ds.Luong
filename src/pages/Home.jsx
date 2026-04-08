import React from 'react';
import HeroBanner from '../components/HeroBanner';
import TrustBadges from '../components/TrustBadges';
import BrandIntro1 from '../components/BrandIntro1';
import BrandIntro2 from '../components/BrandIntro2';
import ProductSection from '../components/ProductSection';
import TestimonialSection from '../components/TestimonialSection';
import BadgeStrip from '../components/BadgeStrip';
import BlogSection from '../components/BlogSection';

// Data
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blogPosts';

const Home = () => {
  return (
    <div className="home-page bg-white overflow-hidden pt-16 md:pt-0">
      <HeroBanner />
      <TrustBadges />
      <BrandIntro1 />
      <BrandIntro2 />
      
      <ProductSection 
        title="SẢN PHẨM BÁN CHẠY" 
        subtitle="Khám phá ngay những sản phẩm bán chạy nhất của DS Luong và cảm nhận hiệu quả đáp ứng nhu cầu cho từng vấn đề của làn da!"
        products={products.bestSellers}
      />
      
      <TestimonialSection testimonials={testimonials} />
      
      <ProductSection 
        title="SẢN PHẨM MỚI" 
        subtitle="Trải nghiệm ngay các sản phẩm mới nhất của DS Luong, mỗi sản phẩm đều được bào chế theo công thức tá dược vừa đủ giúp đạt hiệu quả tốt nhất!"
        products={products.newProducts}
      />
      
      <BadgeStrip />
      
      <BlogSection 
        title="Tin tức mới nhất" 
        subtitle="Cập nhật tất cả các thông tin mới nhất liên quan đến truyền thông sự kiện, chia sẻ tin tức và kiến thức làm đẹp chuẩn Y khoa!"
        posts={blogPosts}
      />
    </div>
  );
};

export default Home;
