import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onQuickView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-lg mb-6 shadow-sm group-hover:shadow-md transition-shadow">
        <Link to={`/san-pham/${product.slug}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={`${product.name} - Dược mỹ phẩm DS LUONG`} 
            width={400}
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/600x600/F5F5F5/D4AF37?text=${product.name.replace(/\s/g, '+')}`;
            }}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {product.isNew && (
             <span className="bg-gray-900 text-white text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] rounded shadow-sm">NEW</span>
           )}
           {product.badge && (
             <span className="bg-gold-primary text-white text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] rounded shadow-sm">{product.badge}</span>
           )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           <button 
             onClick={() => onQuickView(product)}
             className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gold-primary hover:text-white transition-all shadow-xl hover:-translate-y-1"
             title="Xem nhanh"
           >
             <FaEye size={18} />
           </button>
        </div>

        {/* Add to Cart Button (Slide Up) */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
           <button className="w-full py-5 bg-gold-primary text-white text-xs font-black tracking-[0.4em] uppercase flex items-center justify-center gap-3 hover:bg-gray-950 transition-colors shadow-2xl">
             <FaShoppingCart size={16} /> THÊM VÀO GIỎ
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center px-4">
        <span className="text-xs font-black text-gold-primary uppercase tracking-[0.3em] mb-3 block">{product.brand}</span>
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="text-base font-black text-gray-900 mb-4 leading-snug uppercase tracking-tight group-hover:text-gold-primary transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 font-medium italic mb-5 line-clamp-1 h-5">{product.descLine || product.description}</p>
        <div className="mt-auto pt-2">
          <span className="text-2xl font-black text-[#C61A09] font-montserrat tracking-tighter">
            {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')}₫` : product.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
