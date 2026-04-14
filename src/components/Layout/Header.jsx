import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../../utils/storage';

const NavItem = ({ name, path, dropdownItems, isMega, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={`group h-full flex items-center ${isMega ? '' : 'relative'}`}
      onMouseEnter={() => dropdownItems && setIsOpen(true)}
      onMouseLeave={() => dropdownItems && setIsOpen(false)}
    >
      <Link 
        to={path}
        className={`text-[13px] font-bold tracking-[0.15em] transition-all duration-300 flex items-center gap-3 uppercase hover:text-gold-primary ${
          location.pathname === path ? 'text-gold-primary' : 'text-gray-950'
        }`}
      >
        {name} {dropdownItems && <FaChevronDown size={10} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </Link>

      {dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute top-full ${isMega ? 'left-0 w-full bg-white border-t border-gold-primary py-12 shadow-2xl z-[100]' : 'left-0 w-64 bg-white shadow-2xl border-t border-gold-primary py-6 z-[100]'}`}
            >
              {isMega ? (
                <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {dropdownItems.map((col, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">{col.name}</h4>
                      <div className="flex flex-col space-y-3">
                        {col.children.map((child, cidx) => (
                          <Link 
                            key={cidx}
                            to={`/san-pham/${child.slug}`}
                            className="text-gray-500 hover:text-gold-primary transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-relaxed line-clamp-2"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                dropdownItems.map((item, idx) => (
                  <Link 
                    key={idx}
                    to={item.path}
                    className="block px-8 py-4 text-[12px] font-bold text-gray-500 hover:text-gold-primary hover:bg-gray-50 transition-all uppercase tracking-widest border-b border-gray-50 last:border-none"
                  >
                    {item.label}
                  </Link>
                ))
              )}
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
  const [productMegaMenu, setProductMegaMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      const allProducts = storage.products.getAll();
      const grouped = {};
      allProducts.forEach(p => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push({ label: p.name, slug: p.slug });
      });
      const megaMenuData = Object.keys(grouped).map(cat => ({
        name: cat,
        children: grouped[cat]
      }));
      setProductMegaMenu(megaMenuData);
    };

    checkStatus();
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'TRANG CHỦ', path: '/' },
    { name: 'VỀ CHÚNG TÔI', path: '/about' },
    { 
      name: 'SẢN PHẨM', 
      path: '/shop',
      isMega: true,
      dropdown: productMegaMenu
    },
    { 
      name: 'BLOG', 
      path: '/blog'
    },
    { name: 'LIÊN HỆ', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-4 shadow-lg border-b border-gray-100' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-8">
        <Link to="/" className="flex items-center group">
          <span className="text-3xl font-black font-playfair tracking-tight text-gold-primary uppercase group-hover:text-gray-900 transition-colors">
            DS LUONG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10 h-full">
          {navLinks.map((link) => (
            <NavItem key={link.name} name={link.name} path={link.path} dropdownItems={link.dropdown} isMega={link.isMega} isScrolled={isScrolled} />
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-950">
          {/* <button className="hover:text-gold-primary transition-colors duration-300">
            <FaSearch size={18} />
          </button> */}
          
          {/* <div className="relative group">
            <button 
              onClick={() => navigate(isLoggedIn ? '/admin/dashboard' : '/admin/login')}
              className="hover:text-gold-primary transition-colors duration-300"
            >
              <FaUser size={18} />
            </button>
            {isLoggedIn && (
               <div className="absolute top-full right-0 w-48 bg-white shadow-xl py-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 border-t border-gold-primary">
                  <button onClick={() => { storage.auth.logout(); navigate('/'); }} className="w-full text-left px-6 py-2 text-[10px] font-bold text-red-500 hover:bg-red-50 uppercase tracking-widest">Đăng xuất</button>
               </div>
            )}
          </div> */}

          {/* <Link to="/cart" className="relative group hover:text-gold-primary transition-colors duration-300">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#C61A09] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          </Link> */}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gold-primary"
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
            <button className="absolute top-8 right-8 text-gray-950" onClick={() => setIsMobileMenuOpen(false)}>
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
                  {link.dropdown && !link.isMega && (
                    <div className="pl-4 flex flex-col space-y-3">
                      {link.dropdown.map((item, id) => (
                        <Link key={id} to={item.path} className="text-xs text-gray-400 font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  {link.dropdown && link.isMega && (
                    <div className="pl-4 flex flex-col space-y-4">
                      {link.dropdown.map((col, cidx) => (
                        <div key={cidx}>
                          <span className="text-gray-900 font-bold text-xs uppercase mb-2 block">{col.name}</span>
                          <div className="pl-4 flex flex-col space-y-2">
                             {col.children.map((child, idx) => (
                               <Link key={idx} to={`/san-pham/${child.slug}`} className="text-[10px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1" onClick={() => setIsMobileMenuOpen(false)}>
                                 {child.label}
                               </Link>
                             ))}
                          </div>
                        </div>
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
