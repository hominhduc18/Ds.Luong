import React, { useState, useMemo } from 'react';
import { storage } from '../utils/storage';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ChevronRight, ChevronLeft } from 'lucide-react';

const Blog = () => {
  const [posts] = useState(storage.posts.getPublished());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const categories = ['Làm đẹp', 'Chăm sóc da', 'Trang điểm', 'Xu hướng', 'Lifestyle'];
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'var(--bg)', minHeight: '100vh'}}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-12" style={{fontSize: '14px', color: '#888', marginBottom: '48px'}}>
           <Link to="/" className="hover:text-primary">Trang Chủ</Link> <span className="mx-2">/</span> <span className="text-primary font-bold">Blog Làm Đẹp</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12" style={{display: 'flex', gap: '48px'}}>
          {/* Main Content */}
          <main className="flex-1" style={{flex: 1}}>
             {currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px'}}>
                   {currentPosts.map(post => (
                      <Link to={`/post/${post.id}`} key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all" style={{backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', display: 'block'}}>
                         <div className="relative h-64 overflow-hidden" style={{position: 'relative', height: '256px', overflow: 'hidden'}}>
                            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
                         </div>
                         <div className="p-8" style={{padding: '32px'}}>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4" style={{display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#999', marginBottom: '16px'}}>
                               <span className="flex items-center gap-1"><Clock size={14} /> {post.date}</span>
                               <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight" style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>{post.title}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed" style={{fontSize: '16px', color: '#666', lineHeight: 1.6, marginBottom: '24px'}}>{post.excerpt}</p>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all" style={{color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
                               Đọc thêm <ChevronRight size={18} />
                            </span>
                         </div>
                      </Link>
                   ))}
                </div>
             ) : (
                <div className="text-center py-40 bg-white rounded-3xl" style={{padding: '160px 0', backgroundColor: 'white', borderRadius: '24px', textAlign: 'center'}}>
                   <p className="text-gray-400">Không tìm thấy bài viết nào.</p>
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

          {/* Sidebar */}
          <aside className="w-full lg:w-96 space-y-10" style={{flexShrink: 0, width: '360px', display: 'flex', flexDirection: 'column', gap: '40px'}}>
             {/* Search */}
             <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-50" style={{padding: '32px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f9f9f9'}}>
                <h4 className="text-xl font-bold mb-6" style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '24px'}}>Tìm Kiếm</h4>
                <div className="relative" style={{position: 'relative'}}>
                   <input 
                      type="text" 
                      placeholder="Nhập từ khóa..."
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-bg border-none outline-none focus:ring-2 focus:ring-primary/20"
                      value={searchTerm}
                      onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                      style={{width: '100%', padding: '12px 48px 12px 16px', borderRadius: '12px', backgroundColor: 'var(--bg)', border: 'none', outline: 'none'}}
                   />
                   <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} />
                </div>
             </div>

             {/* Categories */}
             <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-50" style={{padding: '32px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f9f9f9'}}>
                <h4 className="text-xl font-bold mb-6" style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '24px'}}>Danh Mục</h4>
                <div className="flex flex-col gap-3" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                   {categories.map(cat => (
                      <Link 
                         key={cat} to="/blog" 
                         className="flex items-center justify-between text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-50 last:border-0"
                         style={{display: 'flex', justifyContent: 'space-between', color: '#666', padding: '8px 0', borderBottom: '1px solid #f0f0f0'}}
                      >
                         <span>{cat}</span>
                         <ChevronRight size={16} />
                      </Link>
                   ))}
                </div>
             </div>

             {/* Recent Posts */}
             <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-50" style={{padding: '32px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f9f9f9'}}>
                <h4 className="text-xl font-bold mb-6" style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '24px'}}>Bài Viết Mới Nhất</h4>
                <div className="flex flex-col gap-6" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                   {recentPosts.map(post => (
                      <Link key={post.id} to={`/post/${post.id}`} className="group flex gap-4" style={{display: 'flex', gap: '16px'}}>
                         <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden" style={{width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0}}>
                            <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                         </div>
                         <div className="flex flex-col justify-center">
                            <h5 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors" style={{fontSize: '14px', fontWeight: 'bold', lineHeight: 1.4}}>{post.title}</h5>
                            <span className="text-xs text-gray-400 mt-1" style={{fontSize: '12px', color: '#aaa'}}>{post.date}</span>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
