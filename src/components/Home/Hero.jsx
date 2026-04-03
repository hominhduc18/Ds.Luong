import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1920&h=800&auto=format&fit=crop',
    title: 'Bí Quyết Da Khỏe Đẹp',
    desc: 'Làm mới làn da với bộ sưu tập mỹ phẩm thiên nhiên cao cấp nhất mùa hè này.',
    cta: 'Khám Phá Ngay'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&h=800&auto=format&fit=crop',
    title: 'Vẻ Đẹp Rạng Ngời',
    desc: 'Serum Vitamin C tinh khiết giúp da trắng sáng sau 14 ngày sử dụng.',
    cta: 'Xem Chi Tiết'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512496011212-721d8b4464f1?q=80&w=1920&h=800&auto=format&fit=crop',
    title: 'Ưu Đãi Đặc Biệt',
    desc: 'Đăng ký thành viên ngay hôm nay để nhận voucher giảm giá 20% cho đơn hàng đầu tiên.',
    cta: 'Đăng Ký Ngay'
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <section className="relative h-[600px] md:h-[800px] overflow-hidden bg-gray-100" style={{position: 'relative', height: '600px', backgroundColor: '#f0f0f0', overflow: 'hidden'}}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${SLIDES[current].image})`,
            position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center'
          }}
        >
          <div className="container h-full flex items-center" style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <div className="max-w-xl text-white">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                style={{fontSize: '64px', marginBottom: '24px', lineHeight: 1.1}}
              >
                {SLIDES[current].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl mb-10 text-gray-100"
                style={{fontSize: '20px', marginBottom: '40px', color: '#eee'}}
              >
                {SLIDES[current].desc}
              </motion.p>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <button className="btn btn-primary px-10 py-5 text-lg" style={{padding: '15px 40px', fontSize: '18px'}}>
                  {SLIDES[current].cta}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav Buttons */}
      <button 
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
        style={{position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)'}}
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
        style={{position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)'}}
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3" style={{position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px'}}>
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'}`}
            style={{ 
              width: current === i ? '32px' : '12px', 
              height: '12px', borderRadius: '6px', 
              backgroundColor: current === i ? 'var(--primary)' : 'rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
