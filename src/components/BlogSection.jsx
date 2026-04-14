import React from 'react';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogSection = ({ title, subtitle, posts }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic mb-8">
            {subtitle}
          </p>
          <div className="w-20 h-1 bg-gold-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/blog" className="btn-gold-outline px-12 inline-block">
            XEM TẤT CẢ TIN TỨC
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
