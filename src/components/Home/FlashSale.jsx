import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const FlashSale = ({ targetDate = '2026-12-31T23:59:59' }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        ngay: Math.floor(difference / (1000 * 60 * 60 * 24)),
        gio: Math.floor((difference / (1000 * 60 * 60)) % 24),
        phut: Math.floor((difference / 1000 / 60) % 60),
        giay: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([unit, value]) => (
    <div key={unit} className="flex flex-col items-center p-3 bg-white text-secondary rounded-lg shadow-sm min-w-[80px]" style={{backgroundColor: 'white', padding: '12px', borderRadius: '8px', minWidth: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <span className="text-2xl font-bold font-mono" style={{fontSize: '24px', fontWeight: 'bold'}}>{value < 10 ? `0${value}` : value}</span>
      <span className="text-xs uppercase text-gray-500 font-bold" style={{fontSize: '11px', textTransform: 'uppercase', color: '#888'}}>{unit}</span>
    </div>
  ));

  return (
    <section className="bg-primary py-8" style={{backgroundColor: 'var(--primary)', padding: '30px 0'}}>
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px'}}>
        <div className="flex items-center gap-4 text-white">
          <Timer size={40} className="animate-pulse" />
          <div>
            <h3 className="text-2xl font-bold" style={{fontSize: '24px', color: 'white'}}>FLASH SALE CUỐI NĂM</h3>
            <p className="text-white/80" style={{color: 'rgba(255,255,255,0.8)'}}>Nhanh tay nhận ngay ưu đãi 50%!</p>
          </div>
        </div>

        <div className="flex gap-4" style={{display: 'flex', gap: '16px'}}>
          {timerComponents.length ? timerComponents : <span className="text-white font-bold text-xl">ĐÃ KẾT THÚC!</span>}
        </div>

        <button className="btn btn-secondary px-8 bg-white text-primary border-none hover:bg-gray-100" style={{backgroundColor: 'white', color: 'var(--primary)', padding: '12px 32px'}}>
          Mua Sắm Ngay
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
