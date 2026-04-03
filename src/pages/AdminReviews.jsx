import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Trash2, CheckCircle, Clock, Star, User, MessageCircle, Mail } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(storage.get('beauty_reviews') || []);
  }, []);

  const handleApprove = (id) => {
    const all = reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    setReviews(all);
    storage.set('beauty_reviews', all);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xóa đánh giá này?')) {
      const all = reviews.filter(r => r.id !== id);
      setReviews(all);
      storage.set('beauty_reviews', all);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-bg text-gray-400 text-xs uppercase font-bold">
            <tr>
              <th className="px-8 py-5">Khách Hàng</th>
              <th className="px-8 py-5">Nội Dung</th>
              <th className="px-8 py-5">Sao</th>
              <th className="px-8 py-5">Trạng Thái</th>
              <th className="px-8 py-5 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reviews.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{r.name}</p>
                        <span className="text-xs text-gray-400">{r.email}</span>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 max-w-sm truncate text-gray-600 italic">"{r.content}"</td>
                <td className="px-8 py-6">
                   <div className="flex text-primary gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? 'text-primary' : 'text-gray-200'} />)}
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {r.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center justify-center gap-3">
                      {r.status === 'pending' && (
                        <button onClick={() => handleApprove(r.id)} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={18} /></button>
                      )}
                      <button onClick={() => handleDelete(r.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
