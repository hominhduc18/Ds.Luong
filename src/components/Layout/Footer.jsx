import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t-2 border-gold-primary pt-20 pb-10 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-playfair font-bold text-gold-primary tracking-tighter">DS LUONG</span>
              <span className="text-[10px] tracking-[0.4em] font-bold text-gray-400 mt-1 uppercase">DERMA COSMETICS</span>
            </div>
            <p className="text-gray-400 text-sm leading-loose italic mb-8">
              "Khát vọng mang lại làn da khỏe mạnh và rạng ngời cho người Việt thông qua những liệu trình chuẩn Y khoa từ Châu Âu."
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-gold-primary hover:text-white transition-colors">
               <span className="w-10 h-px bg-gold-primary"></span> CÂU CHUYỆN THƯƠNG HIỆU
            </div>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-lg font-bold font-playfair text-white mb-8 tracking-widest border-b border-white/10 pb-4">HỖ TRỢ</h4>
            <ul className="space-y-4 text-xs font-bold tracking-widest text-gray-400">
              <li><Link to="/policies/return" className="hover:text-gold-primary transition-colors">CHÍNH SÁCH ĐỔI TRẢ</Link></li>
              <li><Link to="/policies/shipping" className="hover:text-gold-primary transition-colors">CHÍNH SÁCH VẬN CHUYỂN</Link></li>
              <li><Link to="/policies/payment" className="hover:text-gold-primary transition-colors">HÌNH THỨC THANH TOÁN</Link></li>
              <li><Link to="/policies/privacy" className="hover:text-gold-primary transition-colors">CHÍNH SÁCH BẢO MẬT</Link></li>
              <li><Link to="/contact" className="hover:text-gold-primary transition-colors">LIÊN HỆ</Link></li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="text-lg font-bold font-playfair text-white mb-8 tracking-widest border-b border-white/10 pb-4">THEO DÕI CHÚNG TÔI</h4>
            <div className="flex space-x-4 mb-8">
              {[
                { icon: <FaFacebookF />, color: 'bg-[#1877F2]' },
                { icon: <FaInstagram />, color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
                { icon: <FaYoutube />, color: 'bg-[#FF0000]' }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#"
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden relative`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <FaPhoneAlt className="text-gold-primary" /> 1900 6000
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <FaEnvelope className="text-gold-primary" /> info@dsluong.vn
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <FaMapMarkerAlt className="text-gold-primary" /> 123 Sky Garden, Q7, TP.HCM
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-bold font-playfair text-white mb-8 tracking-widest border-b border-white/10 pb-4">ĐĂNG KÝ NHẬN TIN</h4>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
              Cập nhật những kiến thức chăm sóc da mới nhất và nhận ưu đãi độc quyền từ chuyên gia.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-gold-primary transition-all pr-12 group-hover:bg-white/10"
              />
              <button className="absolute right-2 top-1.5 bg-gold-primary hover:bg-gold-dark text-black w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-bold tracking-widest gap-6 uppercase">
          <p>© 2026 DS LUONG SKINCARE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <Link to="/terms" className="hover:text-white transition-colors">ĐIỀU KHOẢN SỬ DỤNG</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">CHÍNH SÁCH BẢO MẬT</Link>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[150px]"></div>
    </footer>
  );
};

export default Footer;
