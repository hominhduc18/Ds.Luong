import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { Clock, User, ChevronRight, Facebook, Twitter, MessageCircle, List } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import StructuredData from '../components/SEO/StructuredData';
import { siteConfig } from '../config/siteConfig';

const PostDetail = () => {
  const { slug, id } = useParams();
  const [post, setPost] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const p = slug ? storage.posts.getBySlug(slug) : storage.posts.getById(id);
    if (p) {
      setPost(p);
      const related = storage.posts.getPublished ? storage.posts.getPublished().filter(item => item.category === p.category && item.id !== p.id).slice(0, 3) : storage.posts.getAll().filter(item => item.category === p.category && item.id !== p.id).slice(0, 3);
      setRelatedPosts(related);
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = p.content;
      const hTags = Array.from(tempDiv.querySelectorAll('h2, h3')).map((tag, index) => ({
         id: `heading-${index}`,
         title: tag.innerText,
         level: tag.tagName.toLowerCase()
      }));
      setHeadings(hTags);
    }
    window.scrollTo(0, 0);
  }, [slug, id]);

  if (!post) return <div className="py-40 text-center">Loading...</div>;

  const shareUrl = window.location.href;

  return (
    <div className="pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <SEO 
        title={post.title}
        description={post.summary}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
      />
      <StructuredData type="Article" data={post} />
      
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-8 pt-4">
           <Link to="/" className="hover:text-gold-primary transition-colors">Trang Chủ</Link> 
           <span className="mx-2 text-gray-300">/</span> 
           <Link to="/blog" className="hover:text-gold-primary transition-colors">Blog</Link> 
           <span className="mx-2 text-gray-300">/</span> 
           <span className="text-gold-primary font-medium">{post.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Article */}
          <article className="flex-1 bg-white p-6 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-6">
                <span className="bg-gold-primary/10 text-gold-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {post.category}
                </span>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-8 leading-[1.2]">
                {post.title}
             </h1>
             
             <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-10 border-b border-gray-50 pb-8">
                <div className="flex items-center gap-2 font-medium"><User size={16} className="text-gold-primary" /> {post.author || siteConfig.author.name}</div>
                <div className="flex items-center gap-2 font-medium"><Clock size={16} className="text-gold-primary" /> {post.date}</div>
                <div className="flex gap-4 ml-auto">
                   <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="text-gray-400 hover:text-gold-primary transition-colors"><Facebook size={18} /></a>
                   <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" className="text-gray-400 hover:text-gold-primary transition-colors"><Twitter size={18} /></a>
                </div>
             </div>

             <div className="relative mb-12 rounded-3xl overflow-hidden aspect-[16/9] gold-shadow">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
             </div>

             {/* TOC (Mobile) */}
             {headings.length > 0 && (
               <div className="lg:hidden p-8 bg-gray-50 rounded-3xl mb-12 border border-gray-100">
                  <h4 className="flex items-center gap-2 font-playfair font-bold text-gray-900 mb-6 text-xl">
                    <List size={22} className="text-gold-primary" /> Mục Lục
                  </h4>
                  <ul className="space-y-3">
                     {headings.map(h => (
                        <li key={h.id} style={{paddingLeft: h.level === 'h3' ? '20px' : '0'}}>
                           <a href={`#${h.id}`} className="text-gray-600 hover:text-gold-primary flex items-center gap-2 transition-all">
                             <div className="w-1.5 h-1.5 rounded-full bg-gold-primary/30"></div>
                             {h.title}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
             )}

             {/* Post Content */}
             <div 
               ref={contentRef}
               className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16 blog-content-rich" 
               dangerouslySetInnerHTML={{ __html: post.content }}
             ></div>

             {/* Expert CTA - Chat Zalo */}
             <div className="mt-16 p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-[#122240] to-[#1a2d55] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-gold-primary/20 transition-all duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gold-primary/30 flex-shrink-0">
                      <img src="/doc-1.png" alt="Dược sĩ Lương" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Bạn cần tư vấn phác đồ riêng?</h3>
                      <p className="text-gray-300 mb-6 max-w-lg leading-relaxed italic">
                        "Mỗi làn da là một câu chuyện riêng. Hãy để tôi giúp bạn thiết kế quy trình chăm sóc chuẩn y khoa nhất."
                      </p>
                      <a 
                        href={`https://zalo.me/${siteConfig.social.zalo}`} 
                        target="_blank" 
                        className="inline-flex items-center gap-3 bg-white text-[#122240] px-8 py-3.5 rounded-full font-bold hover:bg-gold-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-gold-primary/20 uppercase text-sm tracking-widest"
                      >
                        CHAT ZALO CÙNG DƯỢC SĨ LƯƠNG <MessageCircle size={20} />
                      </a>
                   </div>
                </div>
             </div>
             
             {/* Related Products Section */}
             {post.relatedProducts && post.relatedProducts.length > 0 && (
               <div className="mt-20 border-t border-gray-100 pt-16">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 italic underline decoration-gold-primary/30 underline-offset-8">
                      Sản phẩm được khuyên dùng
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {post.relatedProducts.map(prod => (
                      <Link to={`/san-pham/${prod.slug}`} key={prod.id} className="group bg-gray-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gold-primary/10">
                        <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-white">
                           <img src={prod.image} alt={prod.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h4 className="font-bold text-gray-900 group-hover:text-gold-primary transition-colors text-lg mb-2 line-clamp-1">{prod.name}</h4>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 italic">{prod.description}</p>
                        <div className="flex items-center justify-between">
                           <span className="text-gold-primary font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}</span>
                           <span className="text-xs font-bold text-gray-400 group-hover:text-gold-primary transition-colors uppercase tracking-widest">Xem Chi Tiết →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
               </div>
             )}
          </article>

          {/* Sidebar TOC (Desktop) */}
          <aside className="hidden lg:block w-80 sticky top-32 h-fit">
             <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm sticky-sidebar">
                <h4 className="flex items-center gap-2 text-xl font-playfair font-bold text-gray-900 mb-8">
                  <List size={24} className="text-gold-primary" /> Mục Lục
                </h4>
                <ul className="space-y-5">
                   {headings.length > 0 ? headings.map(h => (
                      <li key={h.id} style={{paddingLeft: h.level === 'h3' ? '20px' : '0'}}>
                         <a href={`#${h.id}`} className="text-gray-500 hover:text-gold-primary transition-all block text-sm font-medium leading-relaxed group flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-200 group-hover:bg-gold-primary group-hover:w-3 transition-all duration-300"></span>
                            {h.title}
                         </a>
                      </li>
                   )) : <p className="text-gray-400 text-sm italic">Đang cập nhật mục lục...</p>}
                </ul>

                <div className="mt-12 pt-8 border-t border-gray-50">
                   <h5 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Cần hỗ trợ?</h5>
                   <p className="text-gray-500 text-xs leading-relaxed mb-6">Liên hệ trực tiếp với chuyên gia qua Zalo để được tư vấn miễn phí.</p>
                   <a href={`https://zalo.me/${siteConfig.social.zalo}`} className="btn-gold-outline w-full py-3 text-xs tracking-widest">DƯỢC SĨ TƯ VẤN</a>
                </div>
             </div>
          </aside>
        </div>

        {/* Other Related Posts */}
        <div className="mt-24">
           <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900">Bài Viết Khác</h2>
              <div className="h-px flex-1 bg-gray-100"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(p => (
                 <Link to={`/blog/${p.slug}`} key={p.id} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-50">
                    <div className="relative h-56 overflow-hidden">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <span className="text-xs font-bold text-gold-primary mb-3 uppercase tracking-widest">{p.category}</span>
                       <h4 className="text-lg font-bold text-gray-900 group-hover:text-gold-primary transition-colors line-clamp-2 leading-snug mb-4">{p.title}</h4>
                       <div className="mt-auto flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span>{p.date}</span>
                          <span className="group-hover:text-gold-primary transition-colors">Đọc Thêm →</span>
                       </div>
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
