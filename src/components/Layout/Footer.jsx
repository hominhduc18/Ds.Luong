import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-secondary text-white pt-16 pb-8" style={{backgroundColor: 'var(--secondary)', color: 'var(--white)', padding: '60px 0 30px'}}>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12" style={{display: 'grid', gap: '40px'}}>
        {/* Col 1 */}
        <div className="space-y-4">
          <Link to="/" className="text-3xl font-bold tracking-tighter" style={{color: 'var(--primary)', fontSize: '28px'}}>
            ANTIGRAVITY
          </Link>
          <p className="text-gray-400 mt-4 leading-relaxed" style={{color: '#999', marginTop: '20px'}}>
            Hệ thống mỹ phẩm cao cấp chuyên cung cấp các giải pháp làm đẹp từ thiên nhiên. Nâng tầm vẻ đẹp Việt.
          </p>
          <div className="flex gap-4 pt-4" style={{display: 'flex', gap: '15px', marginTop: '20px'}}>
            <a href="#" className="p-2 bg-secondary-light rounded-full hover:bg-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-secondary-light rounded-full hover:bg-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-secondary-light rounded-full hover:bg-primary transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-lg font-bold mb-6" style={{fontSize: '18px', marginBottom: '20px'}}>Liên Kết Nhanh</h4>
          <ul className="space-y-3" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><Link to="/" className="text-gray-400 hover:text-white">Trang Chủ</Link></li>
            <li><Link to="/shop" className="text-gray-400 hover:text-white">Sản Phẩm</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white">Kiến Thức Làm Đẹp</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Liên Hệ</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-lg font-bold mb-6" style={{fontSize: '18px', marginBottom: '20px'}}>Chính Sách</h4>
          <ul className="space-y-3" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><Link to="/policies" className="text-gray-400 hover:text-white">Vận Chuyển & Giao Hàng</Link></li>
            <li><Link to="/policies" className="text-gray-400 hover:text-white">Đổi Trả & Hoàn Tiền</Link></li>
            <li><Link to="/policies" className="text-gray-400 hover:text-white">Bảo Mật Thông Tin</Link></li>
            <li><Link to="/policies" className="text-gray-400 hover:text-white">Điều Khoản Sử Dụng</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-lg font-bold mb-6" style={{fontSize: '18px', marginBottom: '20px'}}>Nhận Ưu Đãi</h4>
          <p className="text-gray-400 mb-4" style={{color: '#999', marginBottom: '15px'}}>Đăng ký ngay để nhận thông tin khuyến mãi mới nhất.</p>
          <form className="flex flex-col gap-3" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className="p-3 bg-secondary-light border border-gray-700 rounded-md focus:border-primary outline-none text-white"
              style={{padding: '12px', backgroundColor: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px'}}
            />
            <button className="btn btn-primary w-full" type="button">Đăng Ký Ngay</button>
          </form>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm" style={{marginTop: '60px', borderTop: '1px solid #333', padding: '20px 0'}}>
        © 2026 Antigravity Beauty. All rights reserved. Designed with ❤️
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40" style={{position: 'fixed', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <a 
          href="https://zalo.me/0901234567" 
          target="_blank" 
          rel="noreferrer"
          className="p-4 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          title="Chat qua Zalo"
          style={{backgroundColor: '#0068ff', color: 'white', padding: '15px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'}}
        >
          <MessageCircle size={28} />
        </a>
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="p-4 bg-white text-secondary rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center border"
          title="Lên đầu trang"
          style={{backgroundColor: 'white', color: 'black', padding: '15px', borderRadius: '50%', border: '1px solid #ddd'}}
        >
          <Twitter size={24} style={{transform: 'rotate(-90deg)'}} /> {/* Using Twitter as arrow for now */}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
