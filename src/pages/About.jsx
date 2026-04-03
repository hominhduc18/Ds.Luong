import React from 'react';
import { Target, Eye, Heart, Award, Sparkles, Users } from 'lucide-react';

const About = () => {
  const values = [
    { icon: <Heart size={32} />, title: 'Tận Tâm', desc: 'Luôn lắng nghe và thấu hiểu nhu cầu của từng khách hàng.' },
    { icon: <Sparkles size={32} />, title: 'Chất Lượng', desc: 'Cam kết mang đến những sản phẩm tốt nhất từ thiên nhiên.' },
    { icon: <Users size={32} />, title: 'Cộng Đồng', desc: 'Lan tỏa giá trị tích cực và yêu thương bản thân.' },
    { icon: <Award size={32} />, title: 'Chính Trực', desc: 'Làm việc minh bạch, trung thực trong mọi quy trình.' }
  ];

  return (
    <div className="pt-32 pb-20 bg-white" style={{paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'white'}}>
      {/* Intro */}
      <section className="mb-24" style={{marginBottom: '96px'}}>
         <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', alignItems: 'center'}}>
               <div className="space-y-8" style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
                  <h1 className="text-5xl font-bold text-secondary leading-tight" style={{fontSize: '48px', fontWeight: 'bold', lineHeight: 1.2}}>Câu Chuyện Của <span className="text-primary" style={{color: 'var(--primary)'}}>ANTIGRAVITY</span></h1>
                  <p className="text-gray-600 text-lg leading-relaxed" style={{fontSize: '18px', color: '#555', lineHeight: '1.8'}}>
                     Được thành lập từ năm 2020, Antigravity khởi đầu từ niềm đam mê với những nguyên liệu làm đẹp thuần khiết nhất. Chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp riêng biệt và nhiệm vụ của chúng tôi là giúp bạn tự tin tỏa sáng vẻ đẹp đó.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed" style={{fontSize: '18px', color: '#555', lineHeight: '1.8'}}>
                     Từ một cửa hàng nhỏ chuyên doanh các dòng serum thảo mộc, Antigravity đã không ngừng phát triển để trở thành điểm đến tin cậy của hàng nghìn phụ nữ Việt Nam trên hành trình chăm sóc sắc đẹp toàn diện.
                  </p>
                  <div className="flex gap-12 pt-4" style={{display: 'flex', gap: '48px', paddingTop: '16px'}}>
                     <div>
                        <span className="text-4xl font-bold text-primary block" style={{fontSize: '36px', fontWeight: 'bold', color: 'var(--primary)', display: 'block'}}>5,000+</span>
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest" style={{fontSize: '12px', color: '#aaa', textTransform: 'uppercase', fontWeight: 'bold'}}>Khách Hàng</span>
                     </div>
                     <div>
                        <span className="text-4xl font-bold text-primary block" style={{fontSize: '36px', fontWeight: 'bold', color: 'var(--primary)', display: 'block'}}>100%</span>
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest" style={{fontSize: '12px', color: '#aaa', textTransform: 'uppercase', fontWeight: 'bold'}}>Chính Hãng</span>
                     </div>
                  </div>
               </div>
               <div className="relative" style={{position: 'relative'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&h=1000&auto=format&fit=crop" 
                    className="rounded-[40px] shadow-2xl relative z-10" 
                    style={{width: '100%', borderRadius: '40px'}}
                  />
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent rounded-full -z-0" style={{position: 'absolute', bottom: '-32px', right: '-32px', width: '256px', height: '256px', backgroundColor: 'var(--accent)', borderRadius: '50%', zIndex: -1}}></div>
               </div>
            </div>
         </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-bg rounded-[60px]" style={{padding: '96px 0', backgroundColor: 'var(--bg)', borderRadius: '60px'}}>
         <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px'}}>
               <div className="p-12 bg-white rounded-3xl space-y-6 shadow-sm" style={{padding: '48px', backgroundColor: 'white', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center" style={{width: '64px', height: '64px', backgroundColor: 'rgba(212, 163, 115, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     <Target size={32} />
                  </div>
                  <h3 className="text-3xl font-bold" style={{fontSize: '28px', fontWeight: 'bold'}}>Sứ Mệnh</h3>
                  <p className="text-gray-600 text-lg leading-relaxed" style={{fontSize: '18px', color: '#555', lineHeight: 1.6}}>
                     Cung cấp các sản phẩm làm đẹp an toàn, hiệu quả và thân thiện với môi trường, góp phần nâng tầm kiến thức và thói quen chăm sóc da của người tiêu dùng Việt.
                  </p>
               </div>
               <div className="p-12 bg-white rounded-3xl space-y-6 shadow-sm" style={{padding: '48px', backgroundColor: 'white', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center" style={{width: '64px', height: '64px', backgroundColor: 'rgba(212, 163, 115, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     <Eye size={32} />
                  </div>
                  <h3 className="text-3xl font-bold" style={{fontSize: '28px', fontWeight: 'bold'}}>Tầm Nhìn</h3>
                  <p className="text-gray-600 text-lg leading-relaxed" style={{fontSize: '18px', color: '#555', lineHeight: 1.6}}>
                     Trở thành hệ thống phân phối mỹ phẩm và tư vấn làm đẹp hàng đầu cả nước, dẫn đầu xu hướng làm đẹp bền vững và cá nhân hóa.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{padding: '96px 0'}}>
         <div className="container">
            <h2 className="text-center text-4xl font-bold mb-16" style={{textAlign: 'center', fontSize: '36px', marginBottom: '64px'}}>Giá Trị Cốt Lõi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px'}}>
               {values.map((v, i) => (
                  <div key={i} className="text-center space-y-4" style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                     <div className="mx-auto text-primary" style={{margin: '0 auto', color: 'var(--primary)'}}>{v.icon}</div>
                     <h4 className="text-xl font-bold" style={{fontSize: '20px', fontWeight: 'bold'}}>{v.title}</h4>
                     <p className="text-gray-500" style={{color: '#777'}}>{v.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Gallery / Certificates placeholder */}
      <section className="py-24 border-t border-gray-100" style={{padding: '96px 0', borderTop: '1px solid #f0f0f0'}}>
         <div className="container">
            <h3 className="text-center text-2xl font-bold mb-12 text-gray-400" style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#bbb', marginBottom: '48px'}}>ĐỐI TÁC VÀ CHỨNG NHẬN</h3>
            <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '64px', opacity: 0.5, filter: 'grayscale(100%)'}}>
               <span className="text-2xl font-bold italic" style={{fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic'}}>SKINCEUTICALS</span>
               <span className="text-2xl font-bold italic" style={{fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic'}}>LA ROCHE-POSAY</span>
               <span className="text-2xl font-bold italic" style={{fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic'}}>OBAGI MEDICAL</span>
               <span className="text-2xl font-bold italic" style={{fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic'}}>PAULA'S CHOICE</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
