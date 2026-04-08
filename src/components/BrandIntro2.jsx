import React from 'react';
import { motion } from 'framer-motion';

const BrandIntro2 = () => {
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
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-primary rounded-lg z-0"></div>
              <img 
                src="https://skinclinic.vn/storage/banners/intro2-img.jpg" 
                alt="Brand Origin" 
                className="relative z-10 w-full h-auto rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400/F5F5F5/D4AF37?text=Production+Standards";
                }}
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
              PHÂN PHỐI CHÍNH HÃNG ĐA DẠNG CÁC DÒNG SẢN PHẨM
            </h2>
            <div className="text-gray-600 leading-relaxed text-lg mb-8 space-y-4">
              <p>
                DS Luong là thương hiệu dược mỹ phẩm danh tiếng châu Âu, được nghiên cứu và sản xuất tại Tây Ban Nha từ năm 1989. 
                Tất cả sản phẩm DS Luong được chứng nhận đạt tiêu chuẩn GMP, đạt chất lượng đăng ký và không gây hại cho người dùng.
              </p>
              <p>
                Sản phẩm của DS Luong có mặt tại các nước thuộc liên minh Châu EU. Tại Việt Nam, DS Luong được nhập khẩu và phân phối độc quyền.
              </p>
              <p>
                Không chỉ đa dạng trong bảng thành phần và các sản phẩm chăm sóc da, DS Luong còn cung cấp giải pháp hỗ trợ các vấn đề da. 
                Các sản phẩm DS Luong được điều chế theo công thức tá dược vừa đủ mang công dụng hiệu quả và tối ưu nhất.
              </p>
            </div>
            <button className="btn-gold-solid">
              TÌM HIỂU THÊM
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro2;
