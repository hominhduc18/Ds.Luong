import React from 'react';
import Hero from '../components/Home/Hero';
import FlashSale from '../components/Home/FlashSale';
import Commitments from '../components/Home/Commitments';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import { motion } from 'framer-motion';
import { storage } from '../utils/storage';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, User } from 'lucide-react';

const Home = () => {
  const latestPosts = storage.posts.getPublished().slice(0, 3);

  return (
    <div className="home-page overflow-hidden">
      <Hero />
      <FlashSale />
      <Commitments />
      <FeaturedProducts />

      {/* Review Customers */}
      <section className="py-24 bg-white" style={{padding: '96px 0', backgroundColor: 'white'}}>
         <div className="container">
            <h2 className="text-center text-4xl font-bold mb-16" style={{textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '64px'}}>Khách Hàng Nói Gì</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px'}}>
               {[1, 2, 3].map((i) => (
                  <div key={i} className="p-8 bg-accent rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all" style={{padding: '32px', backgroundColor: 'var(--accent)', borderRadius: '24px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                     <div className="flex gap-1 text-primary mb-2" style={{display: 'flex', gap: '4px', color: 'var(--primary)', marginBottom: '8px'}}>
                        {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-700 italic leading-relaxed" style={{color: '#444', fontStyle: 'italic'}}>
                        "Sản phẩm rất tốt, dịch vụ tư vấn nhiệt tình. Tôi sẽ tiếp tục ủng hộ shop lâu dài."
                     </p>
                     <div className="flex items-center gap-4 mt-4" style={{display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px'}}>
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold" style={{width: '48px', height: '48px', backgroundColor: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                           HK
                        </div>
                        <div>
                           <h5 className="font-bold" style={{fontWeight: 'bold'}}>Hồng Kiều</h5>
                           <span className="text-sm text-gray-500" style={{fontSize: '14px', color: '#888'}}>Phóng Viên</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Blog Snipet */}
      <section className="py-24 bg-bg" style={{padding: '96px 0', backgroundColor: 'var(--bg)'}}>
         <div className="container">
            <div className="flex justify-between items-end mb-12" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px'}}>
               <div>
                  <h2 className="text-3xl font-bold mb-4" style={{fontSize: '32px', marginBottom: '16px'}}>Kiến Thức Làm Đẹp</h2>
                  <p className="text-gray-600" style={{color: '#666'}}>Những bài viết chia sẻ kinh nghiệm chăm sóc da từ chuyên gia.</p>
               </div>
               <Link to="/blog" className="flex items-center gap-2 text-primary font-bold hover:underline mb-2" style={{color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  Xem tất cả bài viết <ChevronRight size={20} />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px'}}>
               {latestPosts.map(post => (
                  <Link to={`/post/${post.id}`} key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all" style={{backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', display: 'block'}}>
                     <div className="relative h-60 overflow-hidden" style={{position: 'relative', height: '240px', overflow: 'hidden'}}>
                        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
                     </div>
                     <div className="p-6" style={{padding: '24px'}}>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4" style={{display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#999', marginBottom: '16px'}}>
                           <span className="flex items-center gap-1"><Clock size={14} /> {post.date}</span>
                           <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors" style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '12px'}}>{post.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2" style={{fontSize: '14px', color: '#666', lineHeight: 1.6}}>{post.excerpt}</p>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
