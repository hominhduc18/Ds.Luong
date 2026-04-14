import React from 'react';
import { motion } from 'framer-motion';

const BrandIntro1 = ({ title, text, cta }) => {
  return (
    <section className="py-20 bg-gold-light/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 uppercase tracking-wider"
          >
            {title || "MỸ PHẨM CHÂU ÂU CHINH PHỤC LÀN DA CHÂU Á"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-loose text-lg text-justify md:text-center mb-10"
          >
            <div className="whitespace-pre-line">
              {text || `Hơn 30 năm không ngừng nghiên cứu khoa học chuyên sâu, kiểm nghiệm thực tế của đội ngũ chuyên môn. 
              DS Luong luôn tự hào với sứ mệnh "lắng nghe" làn da mang đến những giải pháp, những dòng sản phẩm 
              chăm sóc, phục hồi phù hợp cho từng vấn đề của làn da châu Âu cũng như làn da châu Á.
              
              Và nổi bật tại thị trường Việt Nam, DS Luong đã đẩy mạnh việc nghiên cứu và phát triển các dòng sản phẩm 
              riêng dành cho các vấn đề về mụn, nám, lão hóa da…, phù hợp với cơ địa và tính chất làn da của phụ nữ Việt, 
              nhằm đem lại những kết quả tích cực và khoa học.`}
            </div>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="btn-gold-outline"
          >
            {cta || "XEM THÊM"}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro1;
