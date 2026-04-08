import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Demo value

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'VỀ CHÚNG TÔI', path: '/about' },
    { name: 'SẢN PHẨM', path: '/shop' },
    { name: 'BLOG', path: '/blog' },
    { name: 'LIÊN HỆ', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gold-primary/20' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className={`text-2xl md:text-3xl font-playfair font-bold tracking-tighter leading-none transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
            DS LUONG
          </span>
          <span className={`text-[10px] tracking-[0.4em] font-bold mt-1 transition-colors duration-300 ${isScrolled ? 'text-gold-primary' : 'text-gold-primary'}`}>
            SKINCARE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={`text-xs font-bold tracking-widest hover:text-gold-primary transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className={`flex items-center space-x-6 ${isScrolled ? 'text-gray-800' : 'text-gray-900'}`}>
          <button className="hover:text-gold-primary transition-colors duration-300">
            <FaSearch size={18} />
          </button>
          
          <Link to="/profile" className="hidden md:block hover:text-gold-primary transition-colors duration-300">
            <FaUser size={18} />
          </Link>

          <Link to="/cart" className="relative group hover:text-gold-primary transition-colors duration-300">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#C61A09] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gold-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-8 pt-24"
          >
            <button 
              className="absolute top-8 right-8 text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={32} />
            </button>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-2xl font-playfair font-bold text-gray-900 hover:text-gold-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gray-100 flex gap-6">
                 <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold text-gray-600"><FaUser /> TÀI KHOẢN</Link>
                 <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold text-gray-600"><FaShoppingCart /> GIỎ HÀNG</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
