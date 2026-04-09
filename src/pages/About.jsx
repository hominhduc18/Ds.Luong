import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMicroscope, FaLeaf, FaUserMd, FaShieldAlt, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';

const About = () => {
  const [data, setData] = useState(storage.contents.get().about);

  useEffect(() => {
    const handleDataChange = () => {
      setData(storage.contents.get().about);
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

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

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-amber-50">
        <div className="absolute inset-0">
          <img 
            src="/images/rebranding/about_hero_gold_luxury_skincare_1775697270311.png" 
            alt="Luxury Gold Skincare" 
            className="w-full h-full object-cover scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-gold-primary/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 uppercase italic tracking-tighter"
          >
            VỀ <span className="text-gold-primary drop-shadow-2xl">CHÚNG TÔI</span>
          </motion.h1>
          <p className="text-white/80 text-xs md:text-sm font-bold tracking-[0.4em] uppercase">
            Hành trình kiến tạo làn da khỏe đẹp từ khoa học và tâm huyết
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img 
                src="/images/rebranding/brand_story_gold_serum_lifestyle_1775697449178.png" 
                alt="Brand Story Luxury Gold" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="text-xs font-bold text-gold-primary uppercase tracking-[0.5em] block mb-2">CÂU CHUYỆN THƯƠNG HIỆU</span>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight uppercase">
                Tầm nhìn & <span className="italic text-gold-primary">Sứ mệnh</span>
              </h2>
              <div className="w-20 h-1 bg-gold-primary"></div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">SỨ MỆNH</h4>
                  <p className="text-gray-600 leading-relaxed italic">{data.mission}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">TẦM NHÌN</h4>
                  <p className="text-gray-600 leading-relaxed italic">{data.vision}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">CÂU CHUYỆN</h4>
                  <p className="text-gray-600 leading-relaxed">{data.story}</p>
                </div>
              </div>

              <div className="pt-6">
                <Link to="/shop" className="bg-gold-primary text-white px-10 py-4 flex items-center gap-3 w-fit text-[10px] font-bold tracking-widest uppercase rounded shadow-lg hover:bg-gray-900 transition-all">
                  KHÁM PHÁ SẢN PHẨM <FaChevronRight size={10} />
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
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4 uppercase tracking-tighter">GIÁ TRỊ CỐT LÕI</h2>
            <div className="w-24 h-1 bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="w-16 h-16 bg-gold-primary/10 rounded-2xl flex items-center justify-center text-gold-primary text-2xl mb-8">
                  {value.icon}
                </div>
                <h4 className="text-xs font-bold text-gray-900 mb-4 tracking-widest uppercase">{value.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{value.desc}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
            {data.team.map((doc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="group text-center"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 mx-auto max-w-sm">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <h4 className="text-xl font-playfair font-bold text-gray-900 mb-2 uppercase">{doc.name}</h4>
                <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">{doc.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
