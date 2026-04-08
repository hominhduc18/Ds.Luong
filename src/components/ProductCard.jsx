import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white flex flex-col h-full overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 rounded-lg"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gold-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              NEW
            </span>
          )}
          {product.badge && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x400/F5F5F5/D4AF37?text=${product.name.replace(/\s/g, '+')}`;
            }}
          />
        </Link>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-gold-primary hover:text-white transition-all"
          >
            <FaEye /> XEM NHANH
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow items-center text-center">
        {/* Brand */}
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-montserrat">
          DS LUONG
        </div>
        
        {/* Name */}
        <Link to={`/product/${product.id}`} className="flex-grow mb-3">
          <h3 className="text-sm md:text-base font-playfair font-bold text-gray-900 leading-tight uppercase tracking-wide group-hover:text-gold-primary transition-colors line-clamp-2">
            {product.name} {product.descLine && <span className="text-gray-400 font-light block mt-1">- {product.descLine}</span>}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="mt-auto">
          <span className="text-lg font-bold text-[#C61A09] font-montserrat tracking-tight">
            {product.price}
          </span>
        </div>

        {/* Add to Cart Simple (Optional UI) */}
        {/* <button className="mt-4 text-xs font-bold text-gold-primary hover:underline flex items-center gap-2">
          THÊM VÀO GIỎ
        </button> */}
      </div>
    </motion.div>
  );
};

export default ProductCard;
