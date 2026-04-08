import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaAward, FaFlask, FaUserMd, FaBolt } from 'react-icons/fa';

const BadgeStrip = () => {
  const badges = [
    { icon: <FaRegCheckCircle />, label: 'ƯU ĐÃI CHÍNH HÃNG' },
    { icon: <FaFlask />, label: 'KIỂM NGHIỆM LÂM SÀNG' },
    { icon: <FaAward />, label: 'CHỨNG NHẬN GMP' },
    { icon: <FaUserMd />, label: 'TƯ VẤN CÙNG CHUYÊN GIA' },
    { icon: <FaBolt />, label: 'HIỆU QUẢ CAO' },
  ];

  return (
    <section className="py-12 bg-white border-y border-gold-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-2xl text-gold-primary mb-3 bg-gold-light p-3 rounded-xl group-hover:bg-gold-primary group-hover:text-white transition-all duration-300">
                {badge.icon}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-700 tracking-tighter md:tracking-widest uppercase">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BadgeStrip;
