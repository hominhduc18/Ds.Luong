import React from 'react';
import { motion } from 'framer-motion';
import { FaMicroscope, FaLeaf, FaUserMd, FaShieldAlt, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const coreValues = [
    { 
      icon: <FaMicroscope />, 
      title: 'NGHIÊN CỨU LÂM SÀNG', 
      desc: 'Sản phẩm được kiểm nghiệm nghiêm ngặt bởi đội ngũ bác sĩ và chuyên gia hàng đầu.' 
    },
    { 
      icon: <FaLeaf />, 
      title: 'THÀNH PHẦN AN TOÀN', 
      desc: 'Công thức lành tính, chiết xuất từ thiên nhiên, không gây kích ứng cho làn da nhạy cảm.' 
    },
    { 
      icon: <FaUserMd />, 
      title: 'ĐỒNG HÀNH CÙNG CHUYÊN GIA', 
      desc: 'Hợp tác chiến lược với các bác sĩ da liễu để mang lại giải pháp tối ưu nhất.' 
    },
    { 
      icon: <FaShieldAlt />, 
      title: 'CAM KẾT CHÍNH HÃNG', 
      desc: '100% sản phẩm nhập khẩu chính ngạch, đầy đủ giấy tờ chứng nhận từ Bộ Y Tế.' 
    }
  ];

  const doctors = [
    { 
      name: 'TS. BS NGUYỄN THỊ A', 
      role: 'Chuyên gia Da liễu Thẩm mỹ', 
      image: '/doc-2.png' 
    },
    { 
      name: 'THS. BS TRẦN VĂN B', 
      role: 'Cố vấn chuyên môn cấp cao', 
      image: '/doc-1.png' 
    },
    { 
      name: 'BS. LƯƠNG TRỌNG C', 
      role: 'Giám đốc chuyên môn DS LUONG', 
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=500&auto=format&fit=crop' 
    }
  ];

  const partners = [
    'SKINCLINIC SPAIN', 'DERMAESTETIC', 'BIO-LABS', 'VITA-MED', 'EURO-PHARMA'
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/about-hero.png" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Luxury Lab"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-8xl font-playfair font-bold text-white mb-6 uppercase italic tracking-tighter"
          >
            VỀ <span className="text-gold-primary">CHÚNG TÔI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/80 text-sm md:text-lg font-bold tracking-[0.4em] uppercase"
          >
            Hành trình kiến tạo làn da khỏe đẹp từ khoa học và tâm huyết
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1579154212610-7c672bc13d80?q=80&w=800&h=1000&auto=format&fit=crop" 
                alt="Research" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[20px] border-gold-primary/5 rounded-full"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.5em] block mb-2">CÂU CHUYỆN THƯƠNG HIỆU</span>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight">
                Khoa học - An toàn <br /> <span className="italic text-gold-primary">& Hiệu quả</span>
              </h2>
              <div className="w-20 h-1 bg-gold-primary"></div>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                Sứ mệnh của DS LUONG không chỉ là cung cấp mỹ phẩm, mà là mang đến giải pháp chăm sóc da dựa trên nền tảng khoa học vững chắc. Thành lập từ năm 2020, chúng tôi luôn đặt mục tiêu "Làn da khỏe bắt đầu từ sự hiểu biết" lên hàng đầu.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mỗi sản phẩm mang thương hiệu DS LUONG đều trải qua hàng trăm giờ nghiên cứu và thử nghiệm lâm sàng chuyên sâu. Chúng tôi tin rằng, vẻ đẹp bền vững chỉ có thể đạt được khi làn da được nuôi dưỡng bởi những thành phần tinh khiết nhất và công nghệ tiên tiến nhất.
              </p>
              <div className="pt-6">
                <Link to="/shop" className="btn-gold px-10 py-4 flex items-center gap-3 w-fit">
                  KHÁM PHÁ SẢN PHẨM <FaChevronRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4 uppercase">GIÁ TRỊ CỐT LÕI</h2>
            <div className="w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gold-primary/10 rounded-2xl flex items-center justify-center text-gold-primary text-3xl mb-8 group-hover:bg-gold-primary group-hover:text-white transition-all">
                  {value.icon}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.5em] block mb-4">ĐỘI NGŨ CHUYÊN GIA</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 uppercase italic">Những người kiến tạo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {doctors.map((doc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Chuyên gia cấp cao</p>
                    <div className="w-12 h-0.5 bg-gold-primary"></div>
                  </div>
                </div>
                <h4 className="text-xl font-playfair font-bold text-gray-900 mb-2 uppercase">{doc.name}</h4>
                <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">{doc.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Carousel Placeholder */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-[10px] font-bold text-gray-400 tracking-[0.5em] uppercase mb-16">ĐỐI TÁC CHIẾN LƯỢC TOÀN CẦU</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 hover:opacity-100 transition-opacity">
            {partners.map((p, idx) => (
              <span key={idx} className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 italic hover:text-gold-primary cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gray-900 relative">
        <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary rounded-full"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-8 uppercase italic tracking-tight">
            Đồng hành cùng bạn trên <br /> <span className="text-gold-primary">hành trình chăm sóc da</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
            <Link to="/shop" className="btn-gold px-12 py-5 w-full sm:w-auto">KHÁM PHÁ SẢN PHẨM</Link>
            <Link to="/contact" className="px-12 py-5 border-2 border-white/20 text-white font-bold text-xs tracking-widest hover:border-gold-primary hover:text-gold-primary transition-all rounded-full w-full sm:w-auto">LIÊN HỆ TƯ VẤN</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
