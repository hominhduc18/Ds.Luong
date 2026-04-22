import React from 'react';
import { motion } from 'framer-motion';

const ZaloButton = () => {
  const zaloNumber = "0335046737";
  const zaloUrl = `https://zalo.me/${zaloNumber}`;

  return (
    <motion.a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center justify-center group"
    >
      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Label (Slide out on hover) */}
      <div className="mr-3 bg-white px-4 py-2 rounded-full shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-widest whitespace-nowrap">
          Chat Zalo
        </span>
      </div>

      {/* Zalo Icon Button */}
      <div className="w-14 h-14 bg-[#0068FF] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 border-white">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
          alt="Zalo"
          className="w-8 h-8 object-contain"
        />
      </div>
    </motion.a>
  );
};

export default ZaloButton;
