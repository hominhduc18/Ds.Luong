import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductSection = ({ title, subtitle, products, onQuickView }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || products.length <= 4) return;

    let interval;
    const startScrolling = () => {
      interval = setInterval(() => {
        if (el) {
          el.scrollLeft += 2;
          if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
            // Loop back seamlessly (or jump to 0)
            el.scrollLeft = 0;
          }
        }
      }, 30);
    };

    startScrolling();

    // Pause on hover
    const pause = () => clearInterval(interval);
    const resume = () => startScrolling();

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause);
    el.addEventListener('touchend', resume);

    return () => {
      clearInterval(interval);
      if (el) {
        el.removeEventListener('mouseenter', pause);
        el.removeEventListener('mouseleave', resume);
        el.removeEventListener('touchstart', pause);
        el.removeEventListener('touchend', resume);
      }
    };
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 uppercase tracking-widest"
          >
            {title}
          </motion.h2>
          <div className="w-24 h-1 bg-gold-primary mx-auto mb-6"></div>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-500 max-w-2xl mx-auto italic"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="relative group">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-400 hover:text-gold-primary transition-all z-10 border border-gray-100 hover:scale-110"
            >
              <FaChevronLeft />
            </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2"
          >
            {products.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
                <ProductCard product={product} onQuickView={onQuickView} />
              </div>
            ))}
          </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-400 hover:text-gold-primary transition-all z-10 border border-gray-100 hover:scale-110"
            >
              <FaChevronRight />
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
