import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const COMMITMENTS = [
  {
    icon: <Truck size={40} className="text-primary" />,
    title: 'Miễn Phí Vận Chuyển',
    desc: 'Cho mọi đơn hàng trên 500k toàn quốc.'
  },
  {
    icon: <ShieldCheck size={40} className="text-primary" />,
    title: 'Chính Hãng 100%',
    desc: 'Cam kết hàng thật, nguồn gốc rõ ràng.'
  },
  {
    icon: <RefreshCw size={40} className="text-primary" />,
    title: 'Đổi Trả 7 Ngày',
    desc: 'Hoàn lại tiền nếu khách hàng không hài lòng.'
  },
  {
    icon: <Headphones size={40} className="text-primary" />,
    title: 'Hỗ Trợ 24/7',
    desc: 'Luôn sẵn sàng giải đáp mọi thắc mắc.'
  }
];

const Commitments = () => {
  return (
    <section className="py-20 bg-white" style={{padding: '80px 0', backgroundColor: 'white'}}>
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px'}}>
        {COMMITMENTS.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-2 group"
            style={{padding: '32px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}
          >
            <div className="mb-6 p-4 bg-accent rounded-full group-hover:bg-primary group-hover:text-white transition-colors" style={{marginBottom: '24px', padding: '16px', backgroundColor: 'var(--accent)', borderRadius: '50%'}}>
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-3" style={{fontSize: '20px', fontWeight: 'bold'}}>{item.title}</h4>
            <p className="text-gray-500 leading-relaxed" style={{color: '#666'}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Commitments;
