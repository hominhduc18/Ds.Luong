import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaChevronDown, FaPaperPlane, FaRegCheckCircle } from 'react-icons/fa';
import { storage } from '../utils/storage';

const Contact = () => {
  const [data, setData] = useState(storage.contents.get().contact);
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'TƯ VẤN SẢN PHẨM', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleDataChange = () => {
      setData(storage.contents.get().contact);
    };
    window.addEventListener('beauty_data_changed', handleDataChange);
    return () => window.removeEventListener('beauty_data_changed', handleDataChange);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    storage.contacts.add(form);
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', subject: 'TƯ VẤN SẢN PHẨM', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    { icon: <FaMapMarkerAlt />, label: 'ĐỊA CHỈ', val: data.address },
    { icon: <FaPhoneAlt />, label: 'HOTLINE', val: data.phone },
    { icon: <FaEnvelope />, label: 'EMAIL', val: data.email },
    { icon: <FaClock />, label: 'GIỜ LÀM VIỆC', val: data.workingHours }
  ];

  const faqs = [
    { q: 'Chính sách đổi trả hàng như thế nào?', a: 'Khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày nếu do lỗi của nhà sản xuất hoặc phát hiện hàng không chính hãng.' },
    { q: 'Thời gian giao hàng mất bao lâu?', a: 'Tại TP.HCM, chúng tôi giao hàng hỏa tốc trong 2h. Các tỉnh thành khác từ 2-4 ngày làm việc.' },
    { q: 'Tôi có được tư vấn da trước khi mua không?', a: 'Chắc chắn rồi! Đội ngũ chuyên gia của SkinClinic luôn sẵn sàng soi da và tư vấn miễn phí cho bạn.' }
  ];

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6 uppercase italic tracking-tighter">
            LIÊN HỆ VỚI <span className="text-gold-primary">CHÚNG TÔI</span>
          </h1>
          <div className="w-20 h-1 bg-gold-primary mx-auto mb-8"></div>
          <p className="text-gray-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs max-w-lg mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên hành trình chăm sóc làn da hoàn mỹ.
          </p>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactCards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white text-gold-primary rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-[#0A4B7A] group-hover:text-white transition-all">
                {card.icon}
              </div>
              <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-3">{card.label}</h4>
              <p className="text-xs font-bold text-gray-900 leading-relaxed uppercase">{card.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section className="container mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 p-8 md:p-12 bg-white rounded-[3rem] border border-gray-100 shadow-2xl relative"
          >
            <div className="mb-10">
               <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2 uppercase italic">GỬI LỜI NHẮN</h3>
               <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Phản hồi trong 24 giờ làm việc</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaRegCheckCircle size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">GỬI THÀNH CÔNG!</h4>
                  <p className="text-gray-500 text-sm italic">Cảm ơn bạn. Chuyên viên SkinClinic sẽ liên hệ lại sớm nhất.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-xs font-bold text-[#0A4B7A] underline tracking-widest uppercase">Gửi tin mới</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <input 
                          required type="text" placeholder="HỌ TÊN *" 
                          className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-[#0A4B7A]/20 transition-all uppercase placeholder:text-gray-300"
                          value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <input 
                          required type="tel" placeholder="SỐ ĐIỆN THOẠI *" 
                          className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-[#0A4B7A]/20 transition-all uppercase placeholder:text-gray-300"
                          value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <input 
                        type="email" placeholder="ĐỊA CHỈ EMAIL" 
                        className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-[#0A4B7A]/20 transition-all uppercase placeholder:text-gray-300"
                        value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <select 
                        className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-[#0A4B7A]/20 transition-all uppercase appearance-none cursor-pointer"
                        value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                     >
                        <option>TƯ VẤN SẢN PHẨM</option>
                        <option>TÌNH TRẠNG DA</option>
                        <option>CHĂM SÓC SAU LIỆU TRÌNH</option>
                        <option>HỢP TÁC KINH DOANH</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <textarea 
                        rows="5" placeholder="NỘI DUNG TIN NHẮN..." 
                        className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-[10px] font-bold tracking-widest focus:ring-2 focus:ring-[#0A4B7A]/20 transition-all uppercase placeholder:text-gray-300"
                        value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                     ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#0A4B7A] text-white rounded-xl font-bold text-xs tracking-[0.4em] shadow-xl shadow-[#0A4B7A]/20 hover:bg-gray-900 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 uppercase">
                     GỬI TIN NHẮN <FaPaperPlane />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden rounded-[3rem] shadow-2xl border-8 border-gray-50 bg-gray-100 flex items-center justify-center italic text-gray-400 text-sm"
          >
             <p className="uppercase tracking-widest">Google Maps Integration Placeholder</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <div className="text-center mb-16">
              <h3 className="text-3xl font-playfair font-bold text-gray-900 mb-4 uppercase italic">CÁC CÂU HỎI THƯỜNG GẶP</h3>
              <div className="w-16 h-1 bg-gold-primary mx-auto"></div>
           </div>

           <div className="space-y-4">
              {faqs.map((faq, idx) => (
                 <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                    >
                       <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{faq.q}</span>
                       <FaChevronDown className={`text-gold-primary transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                       {openFaq === idx && (
                          <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="overflow-hidden"
                          >
                             <p className="p-6 pt-0 text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic border-t border-gray-50">
                                {faq.a}
                             </p>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
