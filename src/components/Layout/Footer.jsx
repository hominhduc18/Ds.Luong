import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 text-gray-900 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: VỀ DS LUONG */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-3xl font-black font-playfair text-gold-primary tracking-tighter uppercase">DS LUONG</span>
            </div>
            <p className="text-gray-500 text-xs leading-loose italic">
              "Thương hiệu dược mỹ phẩm uy tín, mang đến giải pháp chăm sóc da chuyên sâu và hiệu quả bền vững với tiêu chuẩn Châu Âu."
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaFacebookF />, path: '#' },
                { icon: <FaInstagram />, path: '#' },
                { icon: <FaYoutube />, path: '#' },
                { icon: <span className="text-[10px] font-bold">Zalo</span>, path: '#' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href={social.path}
                  className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-primary hover:border-gold-primary transition-all shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: HỖ TRỢ */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-gray-900 tracking-widest uppercase border-b border-gray-100 pb-4">HỖ TRỢ</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-gold-primary mt-1" />
                <div>
                   <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hotline</span>
                   <span className="text-sm font-bold">0335046737</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-gold-primary mt-1" />
                <div>
                   <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</span>
                   <span className="text-sm font-bold">luongho980@gmail.com</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaClock className="text-gold-primary mt-1" />
                <div>
                   <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Giờ làm việc</span>
                   <span className="text-sm font-bold uppercase">Thứ 2 - Thứ 7 (8:00 - 20:00)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: CHÍNH SÁCH */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-gray-900 tracking-widest uppercase border-b border-gray-100 pb-4">CHÍNH SÁCH</h4>
            <ul className="space-y-4 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              <li><Link to="/policies" className="hover:text-gold-primary transition-colors">Chính sách đổi trả</Link></li>
              <li><Link to="/policies" className="hover:text-gold-primary transition-colors">Chính sách vận chuyển</Link></li>
              <li><Link to="/policies" className="hover:text-gold-primary transition-colors">Phương thức thanh toán</Link></li>
              <li><Link to="/policies" className="hover:text-gold-primary transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Column 4: ĐĂNG KÝ NHẬN TIN */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-gray-900 tracking-widest uppercase border-b border-gray-100 pb-4">ĐĂNG KÝ NHẬN TIN</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-xs font-bold tracking-widest focus:ring-2 focus:ring-gold-primary/20 transition-all pr-12 text-gray-900"
              />
              <button className="absolute right-2 top-1.5 bg-gold-primary hover:bg-gray-900 text-white w-9 h-9 rounded-lg flex items-center justify-center transition-all shadow-lg active:scale-95">
                <FaPaperPlane size={14} />
              </button>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
               <FaCheckCircle className="text-green-500" size={12} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Nhận ưu đãi và kiến thức làm đẹp mỗi tuần</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 text-center">
          <p className="text-[9px] text-gray-400 font-bold tracking-[0.5em] uppercase">
            © 2025 DS LUONG - ĐỒNG HÀNH CÙNG LÀN DA KHỎE ĐẸP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
