import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'TRANG CHỦ', href: '#' },
    { name: 'SẢN PHẨM', href: '#' },
    { name: 'VỀ CHÚNG TÔI', href: '#' },
    { name: 'BLOG', href: '#' },
    { name: 'LIÊN HỆ', href: '#' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 header-transition ${
        isSticky ? 'bg-white/90 backdrop-blur-md border-b border-gold-primary py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-3xl md:text-4xl font-playfair font-bold text-gold-primary tracking-wider">
            DS Luong
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-semibold text-gray-700 hover:text-gold-primary transition-colors text-sm tracking-widest"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-gray-700">
          <button className="hover:text-gold-primary transition-colors">
            <FaSearch size={20} />
          </button>
          <button className="hover:text-gold-primary transition-colors relative">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-gold-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          <button 
            className="md:hidden hover:text-gold-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gold-primary shadow-lg animate-fadeIn">
          <nav className="flex flex-col p-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-semibold text-gray-700 hover:text-gold-primary transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
