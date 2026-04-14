import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, RefreshCw, ShieldCheck, HelpCircle } from 'lucide-react';

const Policies = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const policyItems = [
    {
      icon: <Truck size={24} className="text-primary" />,
      title: 'Chính Sách Vận Chuyển',
      content: `
        <ul>
          <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên trên toàn quốc.</li>
          <li>Đơn hàng nội thành TP.HCM: Giao hàng trong vòng 24h - 48h.</li>
          <li>Đơn hàng tỉnh thành khác: Giao hàng từ 3 - 5 ngày làm việc.</li>
          <li>Chúng tôi hợp tác với các đơn vị vận chuyển uy tín như Giao Hàng Tiết Kiệm, VNPost, Viettel Post.</li>
        </ul>
      `
    },
    {
      icon: <RefreshCw size={24} className="text-primary" />,
      title: 'Chính Sách Đổi Trả & Hoàn Tiền',
      content: `
        <ul>
          <li>Hỗ trợ đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng.</li>
          <li>Sản phẩm đổi trả phải còn nguyên tem mác, hộp và chưa qua sử dụng.</li>
          <li>Trường hợp lỗi do nhà sản xuất hoặc giao sai hàng: Miễn phí 100% phí đổi trả.</li>
          <li>Các sản phẩm khuyến mãi sâu hoặc quà tặng kèm không áp dụng chính sách đổi trả.</li>
        </ul>
      `
    },
    {
      icon: <ShieldCheck size={24} className="text-primary" />,
      title: 'Chính Sách Bảo Mật',
      content: `
        <ul>
          <li>Mọi thông tin cá nhân của khách hàng chỉ được sử dụng cho mục đích xử lý đơn hàng và chăm sóc khách hàng.</li>
          <li>Chúng tôi cam kết không bán, không chia sẻ thông tin khách hàng cho bên thứ ba vì mục đích thương mại.</li>
          <li>Hệ thống thanh toán được mã hóa và bảo mật tuyệt đối.</li>
        </ul>
      `
    },
    {
      icon: <HelpCircle size={24} className="text-primary" />,
      title: 'Điều Khoản Dịch Vụ',
      content: `
        <ul>
          <li>Bằng cách đặt hàng tại website, quý khách đồng ý cung cấp thông tin liên hệ chính xác.</li>
          <li>Chúng tôi có quyền từ chối các đơn hàng có dấu hiệu giả mạo hoặc vi phạm điều khoản công ty.</li>
          <li>Giá cả sản phẩm có thể thay đổi tùy thời điểm chương trình khuyến mãi mà không cần báo trước.</li>
        </ul>
      `
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen" style={{ paddingTop: '128px', paddingBottom: '80px', backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div className="container max-w-4xl" style={{ maxWidth: '800px' }}>
        <h1 className="text-4xl font-bold text-center mb-16" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '64px' }}>Chính Sách & Điều Khoản</h1>

        <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {policyItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-all"
              style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f0f0f0' }}
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                style={{ width: '100%', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', outline: 'none' }}
              >
                <div className="flex items-center gap-6" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div className="p-3 bg-accent rounded-2xl" style={{ padding: '12px', backgroundColor: 'var(--accent)', borderRadius: '16px' }}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-secondary" style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</h4>
                </div>
                {activeAccordion === index ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out px-8 lg:px-24 overflow-hidden ${activeAccordion === index ? 'pb-10 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                  maxHeight: activeAccordion === index ? '500px' : '0',
                  opacity: activeAccordion === index ? 1 : 0,
                  paddingLeft: '80px', paddingRight: '80px', paddingBottom: activeAccordion === index ? '40px' : '0'
                }}
              >
                <div
                  className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-primary pl-8"
                  style={{ fontSize: '18px', color: '#555', lineHeight: '1.8', fontStyle: 'italic', borderLeft: '4px solid var(--primary)', paddingLeft: '32px' }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-white rounded-3xl border border-gray-100 text-center" style={{ marginTop: '80px', padding: '40px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f0f0f0', textAlign: 'center' }}>
          <p className="text-gray-500 mb-6" style={{ color: '#888', marginBottom: '24px' }}>Nếu quý khách có bất kỳ câu hỏi nào về các chính sách của chúng tôi, vui lòng liên hệ:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8" style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <a href="tel:0335046737" className="text-primary font-bold text-xl" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '20px' }}>Hotline: 0335046737</a>
            <a href="mailto:luongho980@gmail.com" className="text-primary font-bold text-xl" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '20px' }}>Email: luongho980@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
