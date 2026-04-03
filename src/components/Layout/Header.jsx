import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Sản Phẩm', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <Link to="/" className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--primary)', fontSize: '24px' }}>
          Ds Lương
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-text-main'
                }`}
              style={{ color: location.pathname === link.path ? 'var(--primary)' : 'inherit' }}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4" style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
            <a href="tel:0901234567" className="flex items-center gap-2 text-primary font-bold">
              <Phone size={18} /> <span>0901 234 567</span>
            </a>
            <Link to="/admin/login" className="p-2 hover:bg-accent rounded-full">
              <User size={20} />
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="py-2 border-b font-medium"
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:0901234567" className="text-primary font-bold py-2">Gọi ngay: 0901 234 567</a>
        </div>
      )}
    </header>
  );
};

export default Header;
