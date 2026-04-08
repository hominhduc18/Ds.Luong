import React from 'react';
import { FaTruck, FaCreditCard, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaTruck className="text-3xl text-gold-primary" />,
      title: "VẬN CHUYỂN TOÀN QUỐC",
      desc: "Theo yêu cầu của khách hàng"
    },
    {
      icon: <FaCreditCard className="text-3xl text-gold-primary" />,
      title: "THANH TOÁN LINH HOẠT",
      desc: "Bảo mật thông tin khách hàng"
    },
    {
      icon: <FaHeadset className="text-3xl text-gold-primary" />,
      title: "HỖ TRỢ ONLINE",
      desc: "Chúng tôi hỗ trợ khách hàng 24/7"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-white border border-gold-primary/20 rounded-lg gold-shadow-hover"
            >
              <div className="mb-4 bg-gold-light p-5 rounded-full">
                {badge.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 tracking-wide uppercase">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
