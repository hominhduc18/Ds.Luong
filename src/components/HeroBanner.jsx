import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = ({ title, subtitle }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 overflow-hidden gold-gradient-bg">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="z-10"
        >
          <span className="text-xs font-bold text-gold-primary tracking-[0.5em] uppercase mb-8 block">DS LUONG PREMIUM SKINCARE</span>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-gray-900 leading-[1.05] mb-10 uppercase italic tracking-tighter">
            {title || "DS LUONG"}
          </h1>
          <p className="text-gray-600 text-xl mb-12 leading-loose max-w-xl italic border-l-4 border-gold-primary pl-8">
            {subtitle || "Khoa học - An toàn - Hiệu quả. Hơn 30 năm nghiên cứu chuyên sâu vì vẻ đẹp làn da Á Đông."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/shop" className="btn-gold-solid px-12 py-5 text-[11px] font-black tracking-[0.4em] uppercase rounded-full shadow-2xl shadow-gold-primary/30 text-center">
              KHÁM PHÁ NGAY
            </Link>
            <Link to="/contact" className="btn-gold-outline px-12 py-5 text-[11px] font-black tracking-[0.4em] uppercase rounded-full text-center">
              DỊCH VỤ
            </Link>
          </div>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gold-primary/10 rounded-full -z-0 blur-[100px]"></div>
          
          <div className="relative z-10 w-full max-w-[550px] aspect-square rounded-[3rem] overflow-hidden gold-shadow border-8 border-white group">
            <img 
              src="/assets/hero_ds_luong.png" 
              alt="DS LUONG Premium" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.target.src = "https://placehold.co/800x800/FFF8E7/D4AF37?text=DS+LUONG+PREMIUM";
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] -mt-48 -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-[100px] -mb-32 -ml-32"></div>
    </section>
  );
};

export default HeroBanner;
