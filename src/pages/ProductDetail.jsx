import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { Star, MessageCircle, Phone, Heart, Check, ChevronRight, User } from 'lucide-react';
import ProductCard from '../components/Common/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Form review state
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, content: '' });

  useEffect(() => {
    const p = storage.products.getById(id);
    if (p) {
      setProduct(p);
      setActiveImg(p.image);
      const related = storage.products.getAll().filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);
      setRelatedProducts(related);
      setReviews(storage.reviews.getAll(id));
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="py-40 text-center">Loading...</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    storage.reviews.add({ ...reviewForm, productId: Number(id) });
    alert('Đánh giá của bạn đã được gửi và đang chờ duyệt!');
    setReviewForm({ name: '', email: '', rating: 5, content: '' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="pt-32 pb-20 bg-white" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'white'}}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-12" style={{fontSize: '14px', color: '#888', marginBottom: '48px'}}>
           <Link to="/" className="hover:text-primary">Trang Chủ</Link> <span className="mx-2">/</span> <Link to="/shop" className="hover:text-primary">Sản Phẩm</Link> <span className="mx-2">/</span> <span className="text-primary font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', marginBottom: '96px'}}>
          {/* Gallery */}
          <div className="space-y-6" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{position: 'relative', overflow: 'hidden', paddingBottom: '100%', borderRadius: '24px', border: '1px solid #f0f0f0'}}>
               <img src={activeImg} alt={product.name} className="absolute inset-0 w-full h-full object-cover" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="flex gap-4" style={{display: 'flex', gap: '16px'}}>
              {[product.image, ...(product.gallery || [])].map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(img)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                  style={{width: '96px', height: '96px', borderRadius: '12px', overflow: 'hidden', border: activeImg === img ? '2px solid var(--primary)' : '2px solid transparent'}}
                >
                  <img src={img} className="w-full h-full object-cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8" style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
             <div>
                <span className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold block w-fit mb-4" style={{backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '4px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '16px'}}>
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-secondary mb-4 leading-tight" style={{fontSize: '36px', fontWeight: 'bold', marginBottom: '16px'}}>{product.name}</h1>
                <div className="flex items-center gap-6" style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                   <div className="flex text-primary gap-1" style={{display: 'flex', gap: '4px', color: 'var(--primary)'}}>
                      <Star size={18} fill="currentColor" />
                      <Star size={18} fill="currentColor" />
                      <Star size={18} fill="currentColor" />
                      <Star size={18} fill="currentColor" />
                      <Star size={18} fill="currentColor" className="text-gray-300" />
                   </div>
                   <span className="text-gray-400 text-sm" style={{fontSize: '14px', color: '#888'}}>(4.5/5 từ {reviews.length} đánh giá)</span>
                </div>
             </div>

             <div className="flex items-center gap-6" style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                <span className="text-4xl font-bold text-primary" style={{fontSize: '36px', color: 'var(--primary)', fontWeight: 'bold'}}>{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through" style={{fontSize: '20px', color: '#999', textDecoration: 'line-through'}}>{formatPrice(product.oldPrice)}</span>
                )}
             </div>

             <p className="text-gray-600 leading-relaxed text-lg" style={{fontSize: '18px', color: '#555', lineHeight: '1.6'}}>
                {product.shortDesc}
             </p>

             <div className="flex items-center gap-2 text-success font-medium" style={{color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500}}>
                <Check size={20} /> Còn hàng trong kho
             </div>

             <div className="flex flex-col sm:flex-row gap-4 pt-6" style={{display: 'flex', gap: '16px', paddingTop: '24px'}}>
                <a 
                  href={`https://zalo.me/0901234567`}
                  target="_blank"
                  className="btn btn-primary flex-1 justify-center py-5 text-lg"
                  style={{flex: 1, padding: '15px', justifyContent: 'center', fontSize: '18px'}}
                >
                  <MessageCircle size={24} /> Tư Vấn Qua Zalo
                </a>
                <a 
                  href="tel:0901234567"
                  className="btn btn-secondary px-8 py-5 text-lg"
                  style={{padding: '15px 32px', fontSize: '18px'}}
                >
                  <Phone size={24} /> Gọi Ngay
                </a>
                <button className="p-5 border border-gray-200 rounded-xl hover:bg-accent transition-colors" style={{padding: '15px', border: '1px solid #eee', borderRadius: '12px'}}>
                  <Heart size={24} />
                </button>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-24" style={{marginBottom: '96px'}}>
           <div className="flex border-b border-gray-100 mb-10 overflow-x-auto gap-12" style={{display: 'flex', borderBottom: '1px solid #f0f0f0', marginBottom: '40px', gap: '48px'}}>
              {[
                { id: 'description', label: 'Mô Tả Sản Phẩm' },
                { id: 'ingredients', label: 'Thành Phần' },
                { id: 'usage', label: 'Hướng Dẫn Sử Dụng' },
                { id: 'reviews', label: `Đánh Giá (${reviews.length})` }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-lg font-bold transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-secondary'}`}
                  style={{paddingBottom: '16px', fontSize: '18px', fontWeight: 'bold', borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent'}}
                >
                  {tab.label}
                </button>
              ))}
           </div>

           <div className="min-h-[300px] leading-relaxed text-gray-700 text-lg" style={{minHeight: '300px', lineHeight: '1.8', color: '#444', fontSize: '18px'}}>
              {activeTab === 'description' && <div>{product.desc}</div>}
              {activeTab === 'ingredients' && <div>{product.ingredients}</div>}
              {activeTab === 'usage' && <div>{product.usage}</div>}
              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px'}}>
                   {/* Review List */}
                   <div className="space-y-8" style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
                      {reviews.length > 0 ? reviews.map(r => (
                        <div key={r.id} className="p-6 bg-accent rounded-2xl border border-gray-100" style={{padding: '24px', backgroundColor: 'var(--accent)', borderRadius: '16px', border: '1px solid #f0f0f0'}}>
                           <div className="flex items-center justify-between mb-4" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                              <div className="flex items-center gap-3" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white" style={{width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <User size={18} />
                                 </div>
                                 <span className="font-bold" style={{fontWeight: 'bold'}}>{r.name}</span>
                              </div>
                              <span className="text-xs text-gray-400" style={{fontSize: '12px', color: '#999'}}>{new Date(r.date).toLocaleDateString('vi-VN')}</span>
                           </div>
                           <div className="flex text-primary gap-1 mb-3" style={{display: 'flex', gap: '4px', color: 'var(--primary)', marginBottom: '12px'}}>
                              {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                           </div>
                           <p className="text-sm text-gray-600" style={{fontSize: '14px', color: '#555'}}>{r.content}</p>
                        </div>
                      )) : <p className="text-gray-400">Chưa có đánh giá nào cho sản phẩm này.</p>}
                   </div>

                   {/* Add Review Form */}
                   <form onSubmit={handleReviewSubmit} className="space-y-6 p-8 bg-white border border-gray-100 rounded-3xl" style={{display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', border: '1px solid #eee', borderRadius: '24px'}}>
                      <h4 className="text-xl font-bold" style={{fontSize: '20px', fontWeight: 'bold'}}>Gửi đánh giá của bạn</h4>
                      <div className="grid grid-cols-2 gap-4" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
                         <input 
                            required type="text" placeholder="Họ tên" className="w-full p-3 border border-gray-100 rounded-xl"
                            value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                         />
                         <input 
                            required type="email" placeholder="Email" className="w-full p-3 border border-gray-100 rounded-xl"
                            value={reviewForm.email} onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                         />
                      </div>
                      <div className="flex items-center gap-4" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                         <span className="text-sm font-bold" style={{fontSize: '14px', fontWeight: 'bold'}}>Đánh giá:</span>
                         <div className="flex gap-2" style={{display: 'flex', gap: '8px'}}>
                            {[1, 2, 3, 4, 5].map(s => (
                              <button 
                                key={s} type="button" onClick={() => setReviewForm({...reviewForm, rating: s})}
                                className={`text-gray-300 transition-colors ${reviewForm.rating >= s ? 'text-primary' : ''}`}
                                style={{color: reviewForm.rating >= s ? 'var(--primary)' : '#ddd'}}
                              >
                                <Star size={24} fill={reviewForm.rating >= s ? 'currentColor' : 'none'} />
                              </button>
                            ))}
                         </div>
                      </div>
                      <textarea 
                        required placeholder="Nội dung đánh giá..." rows="4" className="w-full p-3 border border-gray-100 rounded-xl"
                        value={reviewForm.content} onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                      ></textarea>
                      <button className="btn btn-primary w-full py-4 text-lg">Gửi Đánh Giá</button>
                   </form>
                </div>
              )}
           </div>
        </div>

        {/* Related Products */}
        <div style={{marginTop: '80px'}}>
           <div className="flex justify-between items-end mb-12" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px'}}>
              <div>
                <h2 className="text-3xl font-bold mb-4" style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '16px'}}>Sản Phẩm Tương Tự</h2>
                <p className="text-gray-600" style={{color: '#666'}}>Có thể bạn cũng quan tâm đến những mặt hàng này.</p>
              </div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px'}}>
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
