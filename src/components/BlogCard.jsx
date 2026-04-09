import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden border border-gray-100 gold-shadow-hover flex flex-col h-full"
    >
      <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden bg-gray-200 block">
        <div className="absolute top-4 left-4 z-10 bg-gold-primary text-white p-2 rounded flex flex-col items-center justify-center leading-none min-w-[50px] shadow-md">
          <span className="text-xl font-bold">{post.date.split('-')[2] || '15'}</span>
          <span className="text-[10px] font-semibold border-t border-white/30 pt-1 mt-1 uppercase">THG {post.date.split('-')[1] || '01'}</span>
        </div>
        <img 
          src={post.image || `https://via.placeholder.com/400x250/F5F5F5/D4AF37?text=Blog+News+${post.id}`} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gold-primary transition-colors line-clamp-2 leading-snug uppercase tracking-tight">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 italic">
          {post.summary || post.description}
        </p>
        <Link to={`/blog/${post.slug}`} className="mt-auto text-gold-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300">
          XEM CHI TIẾT <span className="text-lg">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
