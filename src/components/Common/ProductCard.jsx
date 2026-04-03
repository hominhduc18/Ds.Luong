import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart, MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" style={{borderRadius: '16px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'relative'}}>
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2" style={{position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px'}}>
        {product.oldPrice && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" style={{backgroundColor: '#e63946', color: 'white', fontSize: '12px', padding: '4px 8px', borderRadius: '4px'}}>
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded" style={{backgroundColor: 'var(--primary)', color: 'white', fontSize: '12px', padding: '4px 8px', borderRadius: '4px'}}>
            HOT
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden" style={{position: 'relative', overflow: 'hidden', paddingBottom: '100%'}}>
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4" style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', opacity: 0}}>
          <Link to={`/product/${product.id}`} className="p-3 bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0" style={{padding: '12px', backgroundColor: 'white', borderRadius: '50%'}}>
            <Eye size={20} />
          </Link>
          <button className="p-3 bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75" style={{padding: '12px', backgroundColor: 'white', borderRadius: '50%'}}>
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center" style={{padding: '24px', textAlign: 'center'}}>
        <Link to={`/shop?category=${product.category}`} className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block" style={{fontSize: '11px', color: 'var(--primary)', marginBottom: '8px', display: 'block'}}>
          {product.category}
        </Link>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-secondary mb-3 hover:text-primary transition-colors line-clamp-1" style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '12px'}}>{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-center gap-3 mb-6" style={{display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px'}}>
          <span className="text-xl font-bold text-primary" style={{fontSize: '20px', color: 'var(--primary)', fontWeight: 'bold'}}>{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through" style={{color: '#999', textDecoration: 'line-through'}}>{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <a 
          href={`https://zalo.me/0901234567`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary w-full flex justify-center items-center gap-2"
          style={{padding: '12px 20px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
        >
          <MessageCircle size={18} />
          Liên Hệ Tư Vấn
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
