import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl border border-gold-light gold-shadow-hover relative flex flex-col h-full"
    >
      <div className="absolute top-6 right-8 text-gold-primary opacity-20 text-4xl">
        <FaQuoteLeft />
      </div>
      
      <p className="text-gray-600 leading-loose italic mb-8 relative z-10">
        "{testimonial.content}"
      </p>
      
      <div className="mt-auto flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center text-gold-primary font-bold text-lg border-2 border-gold-primary shadow-inner">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 border-b-2 border-gold-primary/30 inline-block mb-1">
            {testimonial.name}
          </h4>
          <p className="text-gold-dark text-xs font-semibold uppercase tracking-widest">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
