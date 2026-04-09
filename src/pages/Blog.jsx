import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storage } from '../utils/storage';
import { Link } from 'react-router-dom';
import { FaSearch, FaRegClock, FaUserCircle, FaChevronRight, FaArrowRight, FaHashtag, FaEnvelope } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState(storage.posts.getAll());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleDataChange = () => {
      setPosts(storage.posts.getAll());
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const categories = ['CHỐNG LÃO HOÁ', 'CHỐNG NẮNG', 'TRỊ NÁM', 'CHĂM SÓC DA', 'REVIEW'];
  const tags = ['Skincare', 'Retinol', 'Sunscreen', 'VitaminC', 'Phục hồi', 'Mụn'];

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts[0] || posts[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Magazine Header */}
      <section className="py-16 md:py-24 border-b border-gray-100 mb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-playfair font-bold text-gray-900 mb-6 uppercase italic tracking-tighter"
          >
            BEAUTY <span className="text-gold-primary">MAG</span>
          </motion.h1>
          <p className="text-gray-400 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
            Kiến thức làm đẹp từ chuyên gia da liễu
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row bg-gray-50 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <div className="lg:w-3/5 relative h-[400px] lg:h-auto overflow-hidden">
                <img src={featuredPost.image} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt={featuredPost.title} />
                <div className="absolute top-8 left-8">
                   <span className="bg-gold-primary text-white text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase">NỔI BẬT</span>
                </div>
              </div>
              <div className="lg:w-2/5 p-12 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gold-primary uppercase tracking-[0.3em] mb-6">
                   <span>{featuredPost.category}</span>
                   <span className="w-8 h-px bg-gold-primary/30"></span>
                   <span>{featuredPost.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-6 leading-tight uppercase italic transition-colors hover:text-gold-primary">
                  <Link to={`/post/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h2>
                <p className="text-gray-500 mb-10 leading-relaxed italic border-l-2 border-gold-primary pl-6 text-sm">
                  "{featuredPost.summary}"
                </p>
                <Link to={`/post/${featuredPost.id}`} className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-900">
                   ĐỌC TIẾP <FaArrowRight className="group-hover:translate-x-2 transition-transform text-gold-primary" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content (Grid) */}
          <div className="lg:w-2/3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                {gridPosts.map((post, idx) => (
                   <motion.div 
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                   >
                      <div className="relative aspect-video overflow-hidden rounded-[2rem] mb-6">
                         <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                         <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-widest">{post.category}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><FaRegClock /> {post.date}</span>
                         <span className="w-4 h-px bg-gray-100"></span>
                         <span className="flex items-center gap-1 hover:text-gold-primary cursor-pointer"><FaUserCircle /> {post.author}</span>
                      </div>
                      <h3 className="text-lg font-playfair font-bold text-gray-900 mb-4 leading-snug group-hover:text-gold-primary transition-colors uppercase italic line-clamp-2">
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed">{post.summary}</p>
                      <Link to={`/post/${post.id}`} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 group-hover:text-gold-primary transition-all flex items-center gap-2 uppercase">
                        XEM CHI TIẾT <FaChevronRight size={8} />
                      </Link>
                   </motion.div>
                ))}
             </div>

             {/* Pagination */}
             <div className="mt-20 flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-gold-primary text-white flex items-center justify-center text-[10px] font-bold shadow-lg shadow-gold-primary/20">1</button>
             </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-16">
             {/* Search */}
             <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <h4 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-6">TÌM KIẾM</h4>
                <div className="relative">
                   <input 
                      type="text" 
                      placeholder="Nhập từ khóa..."
                      className="w-full bg-white border-none py-4 px-6 rounded-xl text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-gold-primary/20 transition-all pl-12 shadow-inner"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                </div>
             </div>

             {/* Categories */}
             <div>
                <h4 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-8 border-b border-gray-100 pb-2">CHUYÊN MỤC</h4>
                <div className="flex flex-col gap-4">
                   {categories.map(cat => (
                      <button key={cat} className="flex items-center justify-between text-[10px] font-bold text-gray-600 hover:text-gold-primary transition-colors tracking-widest uppercase text-left">
                         <span>{cat}</span>
                         <span className="text-[9px] text-gray-300 font-serif italic">#</span>
                      </button>
                   ))}
                </div>
             </div>

             {/* Tags */}
             <div>
                <h4 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-8 border-b border-gray-100 pb-2">TAGS PHỔ BIẾN</h4>
                <div className="flex flex-wrap gap-3">
                   {tags.map(tag => (
                      <button 
                        key={tag}
                        className="px-4 py-2 bg-gray-50 text-[9px] font-bold text-gray-400 rounded-lg hover:bg-gold-primary hover:text-white transition-all flex items-center gap-1 uppercase"
                      >
                         <FaHashtag size={8} /> {tag}
                      </button>
                   ))}
                </div>
             </div>

             {/* Newsletter */}
             <div className="bg-[#D4AF37] p-10 rounded-[3rem] relative overflow-hidden group shadow-xl shadow-gold-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary to-gold-dark opacity-90"></div>
                <div className="relative z-10">
                   <FaEnvelope className="text-white text-3xl mb-6 opacity-30" />
                   <h4 className="text-xl font-playfair font-bold text-white mb-4 uppercase italic">BẢN TIN BEAUTY</h4>
                   <p className="text-white/80 text-[10px] mb-8 leading-relaxed uppercase tracking-widest">Kiến thức làm đẹp mới nhất mỗi tuần.</p>
                   <input 
                      type="email" 
                      placeholder="Email của bạn..."
                      className="w-full bg-white/20 border border-white/30 rounded-xl py-4 px-6 text-white text-[10px] mb-4 focus:outline-none focus:bg-white/30 placeholder:text-white/50 transition-all"
                   />
                   <button className="w-full py-4 bg-gray-900 text-white text-[10px] font-bold tracking-widest uppercase rounded-xl hover:bg-black transition-all">ĐĂNG KÝ NGAY</button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
