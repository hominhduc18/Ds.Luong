import React, { useState } from 'react';
import { storage } from '../utils/storage';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Tư vấn sản phẩm', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
       alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
       return;
    }
    storage.contacts.add(form);
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', subject: 'Tư vấn sản phẩm', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: <Phone size={24} />, label: 'Điện thoại', val: '0901 234 567', sub: 'Hỗ trợ 24/7' },
    { icon: <Mail size={24} />, label: 'Email', val: 'contact@dsluong.vn', sub: 'Phản hồi trong 24h' },
    { icon: <MapPin size={24} />, label: 'Địa chỉ', val: '123 Đường Sắc Đẹp, Quận 1, TP.HCM', sub: 'Thứ 2 - Chủ Nhật' },
    { icon: <Clock size={24} />, label: 'Giờ mở cửa', val: '08:00 - 21:00', sub: 'Kể cả ngày lễ' }
  ];

  return (
    <div className="pt-32 pb-20 bg-white" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'white'}}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16" style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '64px'}}>
           <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '24px'}}>Liên Hệ Với Chúng Tôi</h1>
           <p className="text-gray-500 text-lg" style={{fontSize: '18px', color: '#666'}}>Đừng ngần ngại để lại lời nhắn, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn cho bạn sớm nhất có thể.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '80px'}}>
           {contactInfo.map((item, i) => (
              <div key={i} className="p-8 bg-accent rounded-3xl border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-all group" style={{padding: '32px', backgroundColor: 'var(--accent)', borderRadius: '24px', border: '1px solid #f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                 <div className="mb-6 p-4 bg-white text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-sm" style={{marginBottom: '24px', padding: '16px', backgroundColor: 'white', color: 'var(--primary)', borderRadius: '50%'}}>
                    {item.icon}
                 </div>
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2" style={{fontSize: '12px', color: '#aaa', textTransform: 'uppercase', marginBottom: '8px'}}>{item.label}</h4>
                 <p className="text-xl font-bold text-secondary mb-1" style={{fontSize: '20px', fontWeight: 'bold'}}>{item.val}</p>
                 <span className="text-sm text-gray-400 font-medium" style={{fontSize: '14px', color: '#888'}}>{item.sub}</span>
              </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px'}}>
           {/* Map */}
           <div className="h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100" style={{height: '500px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4602324283526!2d106.702!3d10.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4400000001%3A0x69ba43f380536!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
           </div>

           {/* Form */}
           <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl" style={{backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 10px 40px rgba(0,0,0,0.08)'}}>
              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500" style={{textAlign: 'center', padding: '80px 0'}}>
                   <CheckCircle2 size={80} className="mx-auto text-success mb-6" style={{color: 'var(--success)', marginBottom: '24px'}} />
                   <h3 className="text-2xl font-bold mb-4" style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>Gửi Thành Công!</h3>
                   <p className="text-gray-500">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ trả lời bạn sớm nhất có thể qua SĐT hoặc Email.</p>
                   <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-bold hover:underline" style={{marginTop: '32px', color: 'var(--primary)', fontWeight: 'bold'}}>Gửi một lời nhắn khác</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-gray-500" style={{fontSize: '14px', fontWeight: 'bold', color: '#888'}}>Họ Tên *</label>
                         <input 
                            required type="text" placeholder="Nguyễn Văn A" 
                            className="w-full p-4 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                            style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: 'none', outline: 'none'}}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-gray-500" style={{fontSize: '14px', fontWeight: 'bold', color: '#888'}}>Số Điện Thoại *</label>
                         <input 
                            required type="tel" placeholder="090 123 4567" 
                            className="w-full p-4 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                            style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: 'none', outline: 'none'}}
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500" style={{fontSize: '14px', fontWeight: 'bold', color: '#888'}}>Địa chỉ Email</label>
                      <input 
                        type="email" placeholder="email@example.com" 
                        className="w-full p-4 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                        value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                        style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: 'none', outline: 'none'}}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500" style={{fontSize: '14px', fontWeight: 'bold', color: '#888'}}>Sản phẩm quan tâm</label>
                      <select 
                        className="w-full p-4 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                        value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                        style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: 'none', outline: 'none'}}
                      >
                         <option>Tư vấn sản phẩm</option>
                         <option>Chăm sóc sắc đẹp</option>
                         <option>Hợp tác kinh doanh</option>
                         <option>Góp ý dịch vụ</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500" style={{fontSize: '14px', fontWeight: 'bold', color: '#888'}}>Nội Dung</label>
                      <textarea 
                        rows="5" placeholder="Bạn có thắc mắc gì cho chúng tôi?" 
                        className="w-full p-4 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                        value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                        style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: 'none', outline: 'none'}}
                      ></textarea>
                   </div>
                   <button type="submit" className="btn btn-primary w-full py-5 text-xl">
                      Gửi Lời Nhắn <Send size={24} className="ml-2" />
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
