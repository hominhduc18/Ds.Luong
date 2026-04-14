import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandIntro2 = ({ title, text, image, cta }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white">
              <img 
                src={image || "/images/rebranding/skincare_production_standards_gold_1775697722506.png"} 
                alt="Production Standards Gold" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6 uppercase tracking-wider">
              {title || "PHÂN PHỐI CHÍNH HÃNG ĐA DẠNG CÁC DÒNG SẢN PHẨM"}
            </h2>
            <div className="text-gray-600 leading-relaxed text-lg mb-8 space-y-4">
              {text ? (
                 <div className="whitespace-pre-line">{text}</div>
              ) : (
                <>
                  <p>
                    DS Luong là thương hiệu dược mỹ phẩm danh tiếng châu Âu, được nghiên cứu và sản xuất tại Tây Ban Nha từ năm 1989. 
                    Tất cả sản phẩm DS Luong được chứng nhận đạt tiêu chuẩn GMP, đạt chất lượng đăng ký và không gây hại cho người dùng.
                  </p>
                  <p>
                    Sản phẩm của DS Luong có mặt tại các nước thuộc liên minh Châu EU. Tại Việt Nam, DS Luong được nhập khẩu và phân phối độc quyền.
                  </p>
                </>
              )}
            </div>
            <Link to="/about" className="btn-gold-solid inline-block shadow-lg shadow-gold-primary/30">
              {cta || "TÌM HIỂU THÊM"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro2;
