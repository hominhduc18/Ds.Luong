import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { processImage } from '../../utils/imageUtils';

const ImageUploader = ({ onImagesProcessed, initialImages = [] }) => {
  const [previews, setPreviews] = useState(initialImages);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || e.target.files);
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const processed = await Promise.all(
        files.map(file => processImage(file, { width: 800, height: 800, quality: 0.8 }))
      );
      
      const newPreviews = [...previews, ...processed];
      setPreviews(newPreviews);
      onImagesProcessed(newPreviews);
    } catch (err) {
      console.error("Lỗi xử lý ảnh:", err);
      alert("Đã có lỗi xảy ra khi xử lý hình ảnh.");
    } finally {
      setIsProcessing(false);
    }
  }, [previews, onImagesProcessed]);

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onImagesProcessed(updated);
  };

  return (
    <div className="space-y-4">
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="relative group border-2 border-dashed border-gray-100 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gold-light/10 hover:border-gold-primary/30 transition-all duration-500 cursor-pointer"
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={onDrop} 
          className="absolute inset-0 opacity-0 cursor-pointer" 
        />
        
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6">
          {isProcessing ? (
            <Loader2 className="animate-spin text-gold-primary" size={24} />
          ) : (
            <Upload className="text-gold-primary" size={24} />
          )}
        </div>
        
        <p className="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">
          {isProcessing ? "Đang xử lý ảnh..." : "Chọn ảnh hoặc kéo thả vào đây"}
        </p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Tự động Resize, Crop vuông và Nén {`<`} 200KB
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {previews.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50">
              <img src={src} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
              <button 
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X size={12} />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-black/40 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[8px] font-bold text-white uppercase tracking-tighter">800x800</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
