import React from 'react';
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';

const TestimonialSection = ({ testimonials }) => {
  return (
    <section className="py-24 bg-gold-light/20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
          >
            NHẬN XÉT KHÁCH HÀNG
          </motion.h2>
          <div className="w-16 h-1 bg-gold-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
