import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaUser, FaChevronDown, FaTools } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

const NavItem = ({ name, path, dropdownItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => dropdownItems && setIsOpen(true)}
      onMouseLeave={() => dropdownItems && setIsOpen(false)}
    >
      <Link 
        to={path}
        className="text-[11px] font-semibold tracking-wider text-gray-900 group-hover:text-[#0A4B7A] transition-all duration-300 flex items-center gap-2 uppercase"
      >
        {name} {dropdownItems && <FaChevronDown size={8} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </Link>

      {dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t border-[#0A4B7A] py-6 z-[100]"
            >
              {dropdownItems.map((item, idx) => (
                <Link 
                  key={idx}
                  to={item.path}
                  className="block px-8 py-3 text-[10px] font-semibold text-gray-500 hover:text-[#0A4B7A] hover:bg-gray-50 transition-all uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      setIsLoggedIn(storage.auth.isLoggedIn());
      // For now, mock cart count or use a key if needed
      const cart = JSON.parse(localStorage.getItem('beauty_cart')) || [];
      setCartCount(cart.length);
    };

    checkStatus();
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 20));
    window.addEventListener('beauty_data_changed', checkStatus);
    return () => {
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('beauty_data_changed', checkStatus);
    };
  }, []);

  const navLinks = [
    { name: 'TRANG CHỦ', path: '/' },
    { 
      name: 'VỀ CHÚNG TÔI', 
      path: '/about',
      dropdown: [
        { label: 'CÂU CHUYỆN THƯƠNG HIỆU', path: '/about' },
        { label: 'ĐÁNH GIÁ BÁC SĨ', path: '/about#doctors' },
        { label: 'CHỨNG NHẬN LÂM SÀNG', path: '/about#certs' }
      ]
    },
    { 
      name: 'SẢN PHẨM', 
      path: '/shop',
      dropdown: [
        { label: 'TẤT CẢ SẢN PHẨM', path: '/shop' },
        { label: 'THEO TÌNH TRẠNG DA', path: '/shop#skintype' },
        { label: 'THEO DÒNG SẢN PHẨM', path: '/shop#productline' }
      ]
    },
    { 
      name: 'BLOG', 
      path: '/blog',
      dropdown: [
        { label: 'TIN TỨC LÀM ĐẸP', path: '/blog' },
        { label: 'THƯ VIỆN THÀNH PHẦN', path: '/blog' },
        { label: 'REVIEW SẢN PHẨM', path: '/blog' }
      ]
    },
    { name: 'LIÊN HỆ', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-4 border-b border-gray-100' 
          : 'bg-white py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-playfair tracking-tighter text-[#0A4B7A] uppercase">
            SKINCLINIC
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10 h-full">
          {navLinks.map((link) => (
            <NavItem key={link.name} name={link.name} path={link.path} dropdownItems={link.dropdown} />
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-900">
          <button className="hover:text-[#0A4B7A] transition-colors duration-300">
            <FaSearch size={18} />
          </button>
          
          <div className="relative group">
            <button 
              onClick={() => navigate(isLoggedIn ? '/admin/dashboard' : '/admin/login')}
              className="hover:text-[#0A4B7A] transition-colors duration-300"
            >
              <FaUser size={18} />
            </button>
            {isLoggedIn && (
               <div className="absolute top-full right-0 w-48 bg-white shadow-xl py-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 border-t border-[#0A4B7A]">
                  <button onClick={() => { storage.auth.logout(); navigate('/'); }} className="w-full text-left px-6 py-2 text-[10px] font-bold text-red-500 hover:bg-red-50 uppercase tracking-widest">Đăng xuất</button>
               </div>
            )}
          </div>

          <Link to="/cart" className="relative group hover:text-[#0A4B7A] transition-colors duration-300">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#C61A09] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-[#0A4B7A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[110] lg:hidden flex flex-col p-8 pt-24"
          >
            <button className="absolute top-8 right-8 text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
              <FaTimes size={32} />
            </button>
            <div className="flex flex-col space-y-6 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-4">
                  <Link 
                    to={link.path}
                    className="text-xl font-bold text-gray-900 uppercase tracking-widest"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col space-y-3">
                      {link.dropdown.map((item, id) => (
                        <Link key={id} to={item.path} className="text-xs text-gray-400 font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
