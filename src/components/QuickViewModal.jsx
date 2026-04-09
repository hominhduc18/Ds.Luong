import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingCart, FaCheck, FaTruck, FaShieldAlt } from 'react-icons/fa';

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-gold-primary transition-all"
        >
          <FaTimes size={18} />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-[#FBFBFB] p-12 flex items-center justify-center overflow-hidden">
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={product.image} 
            alt={product.name}
            className="max-w-full max-h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="text-[10px] font-bold text-gold-primary uppercase tracking-[0.4em] mb-4 block">DS LUONG BEAUTY</span>
            <h2 className="text-3xl font-playfair font-bold text-gray-900 leading-tight uppercase italic mb-4">
              {product.name}
            </h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">
              - {product.descLine}
            </p>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-3xl font-bold text-[#C61A09] font-montserrat tracking-tighter">
                {product.price?.toLocaleString('vi-VN')}đ
              </span>
              <span className="text-xs font-bold text-green-600 uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Còn hàng
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed italic mb-8 border-l-2 border-gold-primary pl-4">
              Khám phá giải pháp chăm sóc da chuyên nghiệp từ DS LUONG. Sản phẩm được thiết kế với công thức độc quyền 
              giúp tối ưu hóa hiệu quả {product.descLine?.toLowerCase() || 'làn da'}.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4 text-xs font-bold text-gray-700">
               <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                 <FaCheck size={12} />
               </div>
               CHỨNG NHẬN DERMATOLOGY CHÂU ÂU
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-700">
               <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                 <FaTruck size={12} />
               </div>
               GIAO HÀNG HỎA TỐC TOÀN QUỐC
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-700">
               <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                 <FaShieldAlt size={12} />
               </div>
               CAM KẾT CHÍNH HÃNG 100%
            </div>
          </div>

          <button className="w-full py-5 bg-gold-primary text-white rounded-xl font-bold text-xs tracking-[0.3em] shadow-xl shadow-gold-primary/20 hover:bg-gold-dark transition-all transition-colors flex items-center justify-center gap-4 uppercase">
            <FaShoppingCart /> THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickViewModal;
