import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = ({ title, subtitle }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="z-10"
        >
          <span className="text-xs font-bold text-[#0A4B7A] tracking-[0.4em] uppercase mb-6 block">SkinClinic Premium Skincare</span>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-gray-900 leading-[1.1] mb-8 uppercase italic tracking-tighter">
            {title || "DS Luong - MỸ PHẨM CHÂU ÂU"}
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xl italic border-l-4 border-[#0A4B7A] pl-6">
            {subtitle || "Hơn 30 năm không ngừng nghiên cứu khoa học chuyên sâu, mang đến những giải pháp phù hợp cho làn da châu Á."}
          </p>
          <div className="flex gap-4">
            <button className="bg-[#0A4B7A] text-white px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase rounded shadow-xl hover:bg-gray-900 transition-all">
              KHÁM PHÁ NGAY
            </button>
          </div>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#0A4B7A]/5 rounded-full -z-0 blur-3xl"></div>
          
          <img 
            src="https://skinclinic.vn/storage/banners/banner-main-home.png" 
            alt="SkinClinic Hero" 
            className="relative z-10 max-w-full h-auto drop-shadow-2xl"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x600?text=SkinClinic+Premium";
            }}
          />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0A4B7A]/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
    </section>
  );
};

export default HeroBanner;
