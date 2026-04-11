import React from 'react';
import { Edit3, Trash2, Copy, AlertCircle, Package, ArrowUpRight } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, onClone }) => {
  const formatValue = (val) => val?.toLocaleString('vi-VN') + '₫';

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gold-primary text-[10px] font-black text-white uppercase tracking-[0.2em]">
              <th className="px-10 py-6">Danh mục & Sản phẩm</th>
              <th className="px-10 py-6">Giá nhập</th>
              <th className="px-10 py-6">Giá bán</th>
              <th className="px-10 py-6">Tồn kho</th>
              <th className="px-10 py-6">Tình trạng</th>
              <th className="px-10 py-6 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gold-light/20 transition-all group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500">
                       <img src={p.image || p.images?.[0]} className="w-full h-full object-cover rounded-lg" alt={p.name} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-black text-gray-900 tracking-tight leading-none">{p.name}</span>
                         <ArrowUpRight size={14} className="text-gray-200 group-hover:text-gold-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-gold-primary bg-gold-light/50 px-2 py-0.5 rounded-md uppercase">{p.sku || 'N/A'}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6 text-[11px] font-bold text-gray-400 italic">
                  {formatValue(p.buyPrice || 0)}
                </td>
                <td className="px-10 py-6 text-[13px] font-black text-gold-primary">
                  {formatValue(p.sellPrice || 0)}
                </td>
                <td className="px-10 py-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
                    <Package size={14} />
                    <span className="text-[11px] font-black tracking-widest">{p.stock || 0}</span>
                    {p.stock < 10 && <AlertCircle size={12} className="animate-pulse" />}
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${
                    p.status === 'CÒN HÀNG' ? 'bg-green-50 text-green-600' : 
                    p.status === 'HẾT HÀNG' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {p.status || 'LIÊN HỆ'}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button 
                      onClick={() => onClone(p)}
                      title="Nhân bản"
                      className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={() => onEdit(p)}
                      title="Chỉnh sửa"
                      className="w-10 h-10 flex items-center justify-center bg-gold-light text-gold-primary rounded-xl hover:bg-gold-primary hover:text-white transition-all shadow-sm"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(p.id)}
                      title="Xóa"
                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {products.length === 0 && (
        <div className="py-32 text-center flex flex-col items-center gap-6">
           <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center">
              <Package size={40} strokeWidth={1} className="text-gray-200" />
           </div>
           <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Không có sản phẩm nào được hiển thị</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
