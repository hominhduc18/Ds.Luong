import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

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
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-lg mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {product.isNew && (
             <span className="bg-gray-900 text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-widest rounded shadow-sm">NEW</span>
           )}
           {product.badge && (
             <span className="bg-[#0A4B7A] text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-widest rounded shadow-sm">{product.badge}</span>
           )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           <button 
             onClick={() => onQuickView(product)}
             className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-[#0A4B7A] hover:text-white transition-all shadow-xl hover:-translate-y-1"
             title="Xem nhanh"
           >
             <FaEye size={18} />
           </button>
        </div>

        {/* Add to Cart Button (Slide Up) */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
           <button className="w-full py-4 bg-[#0A4B7A] text-white text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
             <FaShoppingCart size={14} /> THÊM VÀO GIỎ
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center px-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{product.brand}</span>
        <h3 className="text-sm font-black text-gray-900 mb-3 leading-tight uppercase tracking-tight group-hover:text-[#0A4B7A] transition-colors line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 italic mb-4 line-clamp-1 h-4">{product.descLine}</p>
        <div className="mt-auto pt-2">
          <span className="text-xl font-black text-[#C61A09] font-montserrat tracking-tight">
            {product.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
