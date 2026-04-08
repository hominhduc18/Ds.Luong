import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaChevronRight, FaRegHeart, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Find product or fallback to a default one (SYL 100 SUN LUX)
  const product = products.all.find(p => p.id === parseInt(id)) || products.all[3];

  const highlights = [
    { title: "Chỉ số SPF 50+ PA++++", desc: "Bảo vệ da tối ưu trước tia UVA/UVB toàn diện." },
    { title: "Công nghệ chống nắng lai", desc: "Sự kết hợp hoàn hảo giữa Vật lý & Hóa học, mỏng nhẹ." },
    { title: "Công thức không dầu", desc: "Không nhờn rít, không gây mụn hay bít tắc lỗ chân lông." },
    { title: "Kháng nước & mồ hôi", desc: "Duy trì lớp bảo vệ bền bỉ ngay cả khi hoạt động ngoài trời." },
  ];

  const usageSteps = [
    { title: "Lắc đều", desc: "Lắc kỹ sản phẩm trước khi sử dụng để các thành phần được hòa trộn tối ưu." },
    { title: "Lấy lượng đủ", desc: "Lấy một lượng kem vừa đủ (khoảng 1 đồng xu cho toàn mặt)." },
    { title: "Thoa trước 20 phút", desc: "Thoa đều lên da ít nhất 20 phút trước khi tiếp xúc với ánh nắng." },
    { title: "Thoa lại", desc: "Nên thoa lại sau mỗi 2 giờ hoặc sau khi bơi lội, ra mồ hôi nhiều." },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-gray-600 leading-relaxed text-lg">
            <p className="mb-6">
              Mỹ phẩm Châu Âu đạt chuẩn GMP, {product?.name} được nghiên cứu và sản xuất tại Tây Ban Nha. 
              Đây không chỉ là một sản phẩm chăm sóc da thông thường, mà là một bước đột phá trong công nghệ 
              dermatology chuyên sâu.
            </p>
            <p>
              Sản phẩm sử dụng các thành phần thế hệ mới, kết hợp tinh hoa giữa các hoạt chất đặc trị 
              và màng lọc bảo vệ da, giúp cải thiện rõ rệt các vấn đề về {product?.descLine?.toLowerCase()}. 
              Công thức đã qua kiểm nghiệm lâm sàng, đảm bảo an toàn tuyệt đối ngay cả với làn da nhạy cảm nhất.
            </p>
          </motion.div>
        );
      case 'highlights':
        return (
          <motion.div key="high" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gold-primary/5 rounded-xl border border-gold-primary/10">
                  <FaCheckCircle className="text-gold-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-tight">{h.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'usage':
        return (
          <motion.div key="usage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {usageSteps.map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-white border-2 border-gold-primary flex items-center justify-center rounded-full mx-auto mb-6 text-gold-primary font-bold text-xl group-hover:bg-gold-primary group-hover:text-white transition-all duration-300">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-sm">{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-loose italic">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'technical':
        return (
          <motion.div key="tech" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {[
                { label: "DUNG TÍCH", value: "50ml" },
                { label: "BẢO QUẢN", value: "Nơi khô ráo, thoáng mát (dưới 30°C)" },
                { label: "LOẠI DA", value: "Mọi loại da (Kể cả da nhạy cảm)" },
                { label: "XUẤT XỨ", value: "Tây Ban Nha" },
                { label: "LIÊN QUAN", value: product?.descLine },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 italic">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
        <Link to="/shop" className="btn-gold-outline shadow-xl">QUAY LẠI CỬA HÀNG</Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 mb-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-gold-primary transition-colors">TRANG CHỦ</Link>
            <FaChevronRight size={8} />
            <Link to="/shop" className="hover:text-gold-primary transition-colors">SẢN PHẨM</Link>
            <FaChevronRight size={8} />
            <span className="text-gold-primary">{product?.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 gold-shadow p-8 flex items-center justify-center aspect-square">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600/F5F5F5/D4AF37?text=${product.name.replace(/\s/g, '+')}`;
                }}
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                 {product.badge && <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">{product.badge}</span>}
                 {product.isNew && <span className="bg-gold-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">NEW ENTRY</span>}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <div className="mb-10">
              <p className="text-[10px] font-bold text-gold-primary uppercase tracking-[0.4em] mb-6">DS LUONG DERMA COSMETICS</p>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight uppercase mb-6 tracking-tight italic">
                {product.name} <br />
                <span className="text-gray-400 font-light text-2xl lowercase mt-2 block">- {product.descLine}</span>
              </h1>
              
              <div className="flex items-center gap-8 mb-10">
                <span className="text-4xl font-bold text-[#C61A09] font-montserrat tracking-tight">{product.price}</span>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">TRẠNG THÁI</span>
                  <span className="text-xs font-bold text-green-600 uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Còn hàng
                  </span>
                </div>
              </div>

              <div className="text-gray-600 leading-relaxed italic mb-10 border-l-4 border-gold-primary pl-8 text-lg max-w-xl">
                 {product.name} là giải pháp nuôi dưỡng và phục hồi làn da chuyên sâu từ DS LUONG. 
                 Được chế tác với công nghệ tá dược độc quyền, sản phẩm cam kết mang lại hiệu quả 
                 tối ưu cho vấn đề {product.descLine.toLowerCase()}.
              </div>

              {/* Purchase Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 pb-12 border-b border-gray-100">
                <div className="flex items-center bg-gray-100 rounded-full h-14 px-6 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-gold-primary transition-colors p-2"><FaMinus size={14} /></button>
                  <span className="w-16 text-center font-bold text-xl text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-gold-primary transition-colors p-2"><FaPlus size={14} /></button>
                </div>
                <button className="flex-grow btn-gold-solid h-14 flex items-center justify-center gap-3 w-full sm:w-auto shadow-2xl shadow-gold-primary/30 text-base">
                  <FaShoppingCart /> THÊM VÀO GIỎ HÀNG
                </button>
                <button className="w-14 h-14 flex items-center justify-center border-2 border-gray-100 rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-all duration-300">
                  <FaRegHeart size={20} />
                </button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex flex-col gap-3">
                  <span className="text-gray-900 border-b border-gray-100 pb-1">MÃ SẢN PHẨM</span>
                  <span>DSL-{product.id}00-PRO</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-gray-900 border-b border-gray-100 pb-1">DANH MỤC</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Tabs */}
        <div className="mb-24">
          <div className="flex justify-center border-b border-gray-100 mb-16 overflow-x-auto no-scrollbar scroll-smooth">
            {['description', 'highlights', 'usage', 'technical'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-10 py-6 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-gold-primary' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {tab === 'description' ? 'Mô tả chi tiết' : tab === 'highlights' ? 'Công dụng nổi bật' : tab === 'usage' ? 'Hướng dẫn sử dụng' : 'Thông tin bổ sung'}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-gold-primary" />}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto min-h-[400px]">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
