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
      const related = storage.posts.getPublished().filter(item => item.category === p.category && item.id !== p.id).slice(0, 3);
      setRelatedPosts(related);
      
      // Auto-generate TOC from content
      // Note: In real app, we'd use a parser, here we simulate from the content string
      // For this demo, let's assume we extract h2/h3 from the HTML content
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
    <div className="pt-32 pb-20 bg-white min-h-screen" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'white', minHeight: '100vh'}}>
      <SEO 
        title={post.title}
        description={post.summary}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
      />
      <StructuredData type="Article" data={post} />
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-12" style={{fontSize: '14px', color: '#888', marginBottom: '48px'}}>
           <Link to="/" className="hover:text-primary">Trang Chủ</Link> <span className="mx-2">/</span> <Link to="/blog" className="hover:text-primary">Blog</Link> <span className="mx-2">/</span> <span className="text-primary font-bold">{post.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16" style={{display: 'flex', gap: '64px'}}>
          {/* Main Article */}
          <article className="flex-1 max-w-4xl" style={{flex: 1, maxWidth: '800px'}}>
             <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-6 block w-fit" style={{backgroundColor: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', padding: '4px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '24px'}}>
                {post.category}
             </span>
             <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight" style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '32px', lineHeight: 1.2}}>{post.title}</h1>
             
             <div className="flex items-center gap-6 text-gray-400 mb-10 border-b border-gray-100 pb-8" style={{display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#888', marginBottom: '40px', borderBottom: '1px solid #f0f0f0', paddingBottom: '32px'}}>
                <div className="flex items-center gap-2"><User size={18} /> {siteConfig.author.name}</div>
                <div className="flex items-center gap-2"><Clock size={18} /> {post.date}</div>
                <div className="flex gap-4 ml-auto" style={{marginLeft: 'auto', display: 'flex', gap: '16px'}}>
                   <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                   <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                </div>
             </div>

             <div className="relative mb-12 rounded-3xl overflow-hidden shadow-sm" style={{position: 'relative', marginBottom: '48px', borderRadius: '24px', overflow: 'hidden'}}>
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover" style={{width: '100%', height: 'auto'}} />
             </div>

             {/* TOC (Mobile) */}
             <div className="lg:hidden p-6 bg-accent rounded-2xl mb-10" style={{padding: '24px', backgroundColor: 'var(--accent)', borderRadius: '16px', marginBottom: '40px'}}>
                <h4 className="flex items-center gap-2 font-bold mb-4" style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px'}}><List size={20} /> Mục Lục</h4>
                <ul className="space-y-2" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                   {headings.map(h => (
                      <li key={h.id} style={{paddingLeft: h.level === 'h3' ? '16px' : '0'}}>
                         <a href={`#${h.id}`} className="text-gray-600 hover:text-primary">{h.title}</a>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Post Content */}
             <div 
               ref={contentRef}
               className="prose prose-lg max-w-none text-gray-700 leading-bold mb-16 blog-content" 
               style={{fontSize: '18px', color: '#444', lineHeight: 1.8, marginBottom: '64px'}}
               dangerouslySetInnerHTML={{ __html: post.content }}
             ></div>

             {/* Sharing footer */}
             <div className="p-8 bg-accent rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6" style={{padding: '32px', backgroundColor: 'var(--accent)', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginTop: '64px'}}>
                <h4 className="text-xl font-bold" style={{fontSize: '20px', fontWeight: 'bold'}}>Chia sẻ bài viết này:</h4>
                <div className="flex gap-4" style={{display: 'flex', gap: '16px'}}>
                   <a href="#" className="btn btn-primary px-6"><Facebook size={20} /> Facebook</a>
                   <a href="#" className="btn btn-secondary px-6"><Twitter size={20} /> Twitter</a>
                </div>
             </div>
          </article>

          {/* Sidebar TOC (Desktop) */}
          <aside className="hidden lg:block w-80 sticky top-32 h-fit" style={{width: '320px', position: 'sticky', top: '128px', height: 'fit-content'}}>
             <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm" style={{padding: '32px', backgroundColor: 'white', border: '1px solid #f0f0f0', borderRadius: '24px'}}>
                <h4 className="flex items-center gap-2 text-xl font-bold mb-6" style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '24px'}}><List size={24} /> Mục Lục</h4>
                <ul className="space-y-4" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                   {headings.length > 0 ? headings.map(h => (
                      <li key={h.id} style={{paddingLeft: h.level === 'h3' ? '16px' : '0'}}>
                         <a href={`#${h.id}`} className="text-gray-500 hover:text-primary transition-colors block text-sm font-medium leading-relaxed" style={{fontSize: '14px', lineHeight: 1.5}}>
                            {h.title}
                         </a>
                      </li>
                   )) : <p className="text-gray-400 text-sm">Đang cập nhật...</p>}
                </ul>
             </div>
          </aside>
        </div>

        {/* Related Posts */}
        <div style={{marginTop: '120px'}}>
           <h2 className="text-3xl font-bold mb-12" style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '48px'}}>Bài Viết Liên Quan</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px'}}>
              {relatedPosts.map(p => (
                 <Link to={`/blog/${p.slug}`} key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all" style={{backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', display: 'block'}}>
                    <div className="relative h-48 overflow-hidden" style={{position: 'relative', height: '192px', overflow: 'hidden'}}>
                       <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <div className="p-6" style={{padding: '24px'}}>
                       <h4 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors" style={{fontSize: '18px', fontWeight: 'bold'}}>{p.title}</h4>
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
