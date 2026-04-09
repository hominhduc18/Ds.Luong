import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductSection = ({ title, subtitle, products, onQuickView }) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
