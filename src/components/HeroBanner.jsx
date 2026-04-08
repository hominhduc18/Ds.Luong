import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden gold-gradient-bg">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="z-10"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
            DS Luong - MỸ PHẨM CHÂU ÂU <br />
            <span className="text-gold-primary">CHINH PHỤC LÀN DA CHÂU Á</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl">
            Hơn 30 năm không ngừng nghiên cứu khoa học chuyên sâu, kiểm nghiệm thực tế của đội ngũ chuyên môn. 
            DS Luong luôn tự hào với sứ mệnh "lắng nghe" làn da mang đến những giải pháp phù hợp cho làn da châu Á.
          </p>
          <button className="btn-gold-outline text-lg">
            XEM THÊM
          </button>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold-primary/10 rounded-full -z-0 blur-3xl"></div>
          
          <img 
            src="https://skinclinic.vn/storage/banners/banner-main-home.png" 
            alt="DS Luong Hero" 
            className="relative z-10 max-w-full h-auto drop-shadow-2xl"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x600/F5F5F5/D4AF37?text=DS+Luong+Banner";
            }}
          />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
    </section>
  );
};

export default HeroBanner;
