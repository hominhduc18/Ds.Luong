import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <h2 className="text-3xl font-playfair font-bold text-gold-primary mb-6">DS Luong</h2>
            <p className="text-gray-400 text-sm leading-loose mb-6">
              Thương hiệu dược mỹ phẩm danh tiếng Châu Âu, chuyên nghiên cứu và cung cấp các giải pháp chăm sóc da khoa học, 
              đặc trị các vấn đề về nám, mụn và lão hóa da.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center hover:bg-gold-primary hover:text-white transition-all duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center hover:bg-gold-primary hover:text-white transition-all duration-300">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center hover:bg-gold-primary hover:text-white transition-all duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gold-primary mb-6 uppercase tracking-widest border-l-4 border-gold-primary pl-3">Liên kết</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-gold-primary transition-colors">Trang chủ</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Sản phẩm</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h3 className="text-lg font-bold text-gold-primary mb-6 uppercase tracking-widest border-l-4 border-gold-primary pl-3">Chính sách</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-gold-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Điều khoản dịch vụ</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold text-gold-primary mb-6 uppercase tracking-widest border-l-4 border-gold-primary pl-3">Liên hệ</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-gold-primary" />
                <div>
                  <p className="font-bold text-white">Hotline 24/7:</p>
                  <p className="text-gold-primary text-lg">1900 123 456</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-gold-primary" />
                <div>
                  <p className="font-bold text-white">Email:</p>
                  <p>contact@dsluong.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-gold-primary" />
                <div>
                  <p className="font-bold text-white">Địa chỉ:</p>
                  <p>Hồ Chí Minh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2024 DS Luong - Dược mỹ phẩm chính hãng. All rights reserved.</p>
          <p className="mt-4 md:mt-0 italic">Designed with elegance for premium skincare journey.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
