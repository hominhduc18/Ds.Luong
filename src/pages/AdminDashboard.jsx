import React from 'react';
import { storage } from '../utils/storage';
import { ShoppingBag, BookOpen, MessageSquare, Mail, Users, ArrowUpRight, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { label: 'Sản Phẩm', val: storage.products.getAll().length, icon: <ShoppingBag size={24} />, color: 'bg-blue-500', path: '/admin/products' },
    { label: 'Bài Viết', val: storage.posts.getAll().length, icon: <BookOpen size={24} />, color: 'bg-green-500', path: '/admin/posts' },
    { label: 'Đánh Giá', val: storage.reviews.getAll().length, icon: <MessageSquare size={24} />, color: 'bg-yellow-500', path: '/admin/reviews' },
    { label: 'Liên Hệ', val: storage.contacts.getAll().length, icon: <Mail size={24} />, color: 'bg-purple-500', path: '/admin/contacts' },
  ];

  const recentContacts = storage.get('beauty_contacts')?.slice(-5).reverse() || [];

  return (
    <div className="space-y-12" style={{display: 'flex', flexDirection: 'column', gap: '48px'}}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px'}}>
         {stats.map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group" style={{padding: '32px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <div className="space-y-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest" style={{fontSize: '12px', color: '#999', textTransform: 'uppercase', fontWeight: 'bold'}}>{item.label}</span>
                  <p className="text-4xl font-bold text-secondary" style={{fontSize: '36px', fontWeight: 'bold'}}>{item.val}</p>
                  <Link to={item.path} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline pt-2" style={{color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px'}}>
                     Quản lý <ArrowUpRight size={14} />
                  </Link>
               </div>
               <div className={`p-4 rounded-2xl text-white ${item.color} shadow-lg transition-transform group-hover:scale-110`} style={{padding: '16px', borderRadius: '16px', color: 'white', backgroundColor: item.color.includes('blue') ? '#3b82f6' : item.color.includes('green') ? '#22c55e' : item.color.includes('yellow') ? '#f59e0b' : '#a855f7'}}>
                  {item.icon}
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px'}}>
         {/* Recent Contacts Table */}
         <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden" style={{flex: 2, backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden'}}>
            <div className="p-8 border-b border-gray-50 flex justify-between items-center" style={{padding: '32px', borderBottom: '1px solid #f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <h4 className="text-xl font-bold flex items-center gap-2" style={{fontSize: '20px', fontWeight: 'bold'}}><TrendingUp size={24} className="text-primary" /> Liên Hệ Mới Nhất</h4>
               <Link to="/admin/contacts" className="text-sm text-primary font-bold hover:underline" style={{color: 'var(--primary)', fontSize: '14px', fontWeight: 'bold'}}>Xem tất cả</Link>
            </div>
            <div className="overflow-x-auto" style={{overflowX: 'auto'}}>
               <table className="w-full text-left" style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
                  <thead className="bg-bg text-gray-400 text-xs uppercase" style={{backgroundColor: '#f8f9fa', color: '#888', fontSize: '12px', textTransform: 'uppercase'}}>
                     <tr>
                        <th className="px-8 py-4">Khách Hàng</th>
                        <th className="px-8 py-4">Yêu Cầu</th>
                        <th className="px-8 py-4">Ngày Gửi</th>
                        <th className="px-8 py-4">Trạng Thái</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50" style={{fontSize: '14px'}}>
                     {recentContacts.length > 0 ? recentContacts.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-8 py-6 font-bold" style={{padding: '24px 32px', fontWeight: 'bold'}}>{c.name}</td>
                           <td className="px-8 py-6 text-gray-500" style={{padding: '24px 32px', color: '#666'}}>{c.subject}</td>
                           <td className="px-8 py-6 text-gray-400 flex items-center gap-2" style={{padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#888'}}>
                              <Clock size={14} /> {new Date(c.date).toLocaleDateString('vi-VN')}
                           </td>
                           <td className="px-8 py-6" style={{padding: '24px 32px'}}>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'unread' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`} style={{padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: c.status === 'unread' ? '#fee2e2' : '#dcfce7', color: c.status === 'unread' ? '#dc2626' : '#16a34a'}}>
                                 {c.status === 'unread' ? 'Chưa đọc' : 'Đã đọc'}
                              </span>
                           </td>
                        </tr>
                     )) : (
                        <tr><td colSpan="4" className="text-center py-20 text-gray-300">Chưa có liên hệ nào</td></tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Quick Actions / System Info */}
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8" style={{backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
            <h4 className="text-xl font-bold" style={{fontSize: '20px', fontWeight: 'bold'}}>Hệ Thống</h4>
            <div className="space-y-4" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
               <div className="flex justify-between items-center p-4 bg-bg rounded-2xl" style={{padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="text-gray-500 font-medium">Phiên bản</span>
                  <span className="font-bold">v2.0.1 (React)</span>
               </div>
               <div className="flex justify-between items-center p-4 bg-bg rounded-2xl" style={{padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="text-gray-500 font-medium">Dữ liệu</span>
                  <span className="font-bold text-success">Ổn định</span>
               </div>
               <div className="flex justify-between items-center p-4 bg-bg rounded-2xl" style={{padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="text-gray-500 font-medium">Lưu trữ</span>
                  <span className="font-bold">LocalStorage</span>
               </div>
            </div>
            <button className="btn btn-outline w-full py-4" style={{padding: '16px', width: '100%', border: '2px solid var(--primary)', borderRadius: '12px', color: 'var(--primary)', fontWeight: 'bold'}}>
               Kiểm Tra Cập Nhật
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
