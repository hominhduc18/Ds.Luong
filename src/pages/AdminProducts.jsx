import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Plus, Search, Edit3, Trash2, X, Check, Star } from 'lucide-react';

const EMPTY_FORM = {
  name: '', price: '', oldPrice: '', category: 'Chăm sóc da',
  image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&h=300&auto=format&fit=crop',
  status: 'in_stock', isFeatured: false,
  shortDesc: '', desc: '', ingredients: '', usage: ''
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    setProducts(storage.products.getAll());
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (p = null) => {
    if (p) {
      setEditingProduct(p);
      setFormData({ ...EMPTY_FORM, ...p });
    } else {
      setEditingProduct(null);
      setFormData(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let all = storage.products.getAll();
    if (editingProduct) {
      all = all.map(p => p.id === editingProduct.id ? { ...formData, id: p.id, gallery: p.gallery || [formData.image] } : p);
    } else {
      all.push({ ...formData, id: Date.now(), gallery: [formData.image] });
    }
    storage.set('beauty_products', all);
    setProducts(all);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const all = products.filter(p => p.id !== id);
      storage.set('beauty_products', all);
      setProducts(all);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
      {/* Top Bar */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap'}}>
        <div style={{position: 'relative', flex: 1, minWidth: '250px'}}>
          <Search style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa'}} size={20} />
          <input
            type="text" placeholder="Tìm tên hoặc danh mục..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '16px', outline: 'none'}}
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{padding: '16px 32px', fontWeight: 'bold', borderRadius: '16px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px'}}
        >
          <Plus size={24} /> Thêm Sản Phẩm
        </button>
      </div>

      {/* Table */}
      <div style={{backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden'}}>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#f8f9fa', color: '#888', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold'}}>
              <tr>
                <th style={{padding: '16px 32px'}}>Ảnh</th>
                <th style={{padding: '16px 32px'}}>Tên Sản Phẩm</th>
                <th style={{padding: '16px 32px'}}>Danh Mục</th>
                <th style={{padding: '16px 32px'}}>Giá</th>
                <th style={{padding: '16px 32px'}}>Nổi Bật</th>
                <th style={{padding: '16px 32px', textAlign: 'center'}}>Thao Tác</th>
              </tr>
            </thead>
            <tbody style={{fontSize: '14px'}}>
              {filteredProducts.length > 0 ? filteredProducts.map(p => (
                <tr key={p.id} style={{borderTop: '1px solid #f9f9f9'}}>
                  <td style={{padding: '16px 32px'}}>
                    <img src={p.image} style={{width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #eee'}} alt={p.name} />
                  </td>
                  <td style={{padding: '16px 32px', fontWeight: 'bold', maxWidth: '250px'}}>
                    <p style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{p.name}</p>
                  </td>
                  <td style={{padding: '16px 32px'}}>
                    <span style={{backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold'}}>{p.category}</span>
                  </td>
                  <td style={{padding: '16px 32px', fontWeight: 'bold'}}>{Number(p.price).toLocaleString()}đ</td>
                  <td style={{padding: '16px 32px', textAlign: 'center'}}>
                    {p.isFeatured
                      ? <span style={{color: '#f59e0b', fontSize: '20px'}}>⭐</span>
                      : <span style={{color: '#ddd', fontSize: '14px'}}>—</span>}
                  </td>
                  <td style={{padding: '16px 32px'}}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '12px'}}>
                      <button onClick={() => handleOpenModal(p)} style={{padding: '12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '12px', border: 'none', cursor: 'pointer'}}><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(p.id)} style={{padding: '12px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '12px', border: 'none', cursor: 'pointer'}}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" style={{textAlign: 'center', padding: '80px', color: '#ccc'}}>Chưa có sản phẩm nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '24px'}}>
          <div style={{backgroundColor: 'white', width: '100%', maxWidth: '860px', borderRadius: '40px', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}}>
            <div style={{padding: '32px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{fontSize: '24px', fontWeight: 'bold'}}>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{padding: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: '#f9f9f9'}}><X size={24} /></button>
            </div>

            <form onSubmit={handleSave} style={{flex: 1, overflowY: 'auto', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
              {/* Row 1: Tên + Giá */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Tên Sản Phẩm *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}} />
                </div>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Giá Bán (VNĐ) *</label>
                  <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}} />
                </div>
              </div>

              {/* Row 2: Giá cũ + Danh mục */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Giá Gốc (VNĐ) - Nếu có</label>
                  <input type="number" placeholder="Để trống nếu không giảm giá" value={formData.oldPrice || ''} onChange={(e) => setFormData({...formData, oldPrice: e.target.value ? Number(e.target.value) : null})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}} />
                </div>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Danh Mục</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}}>
                    <option>Chăm sóc da</option>
                    <option>Trang điểm</option>
                    <option>Chống nắng</option>
                    <option>Nước hoa</option>
                  </select>
                </div>
              </div>

              {/* URL Ảnh */}
              <div>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>URL Ảnh Đại Diện *</label>
                <input required type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                  style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}} />
              </div>

              {/* Status + isFeatured */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center'}}>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Trạng Thái Kho</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none'}}>
                    <option value="in_stock">✅ Còn hàng</option>
                    <option value="out_of_stock">❌ Hết hàng</option>
                  </select>
                </div>
                <div style={{padding: '16px', backgroundColor: '#fffbf0', borderRadius: '14px', border: '2px solid ' + (formData.isFeatured ? '#f59e0b' : '#eee'), display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'}}
                  onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}>
                  <input type="checkbox" id="isFeatured" checked={formData.isFeatured || false}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    style={{width: '20px', height: '20px', accentColor: '#f59e0b', cursor: 'pointer'}} />
                  <label htmlFor="isFeatured" style={{fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', color: formData.isFeatured ? '#d97706' : '#555'}}>
                    ⭐ Hiển thị Trang Chủ
                  </label>
                </div>
              </div>

              {/* Mô tả ngắn */}
              <div>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Mô Tả Ngắn</label>
                <textarea rows="2" value={formData.shortDesc} onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                  style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none', resize: 'vertical'}}></textarea>
              </div>

              {/* Mô tả chi tiết */}
              <div>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Mô Tả Chi Tiết</label>
                <textarea rows="4" value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none', resize: 'vertical'}}></textarea>
              </div>

              {/* Thành phần + Hướng dẫn */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Thành Phần</label>
                  <textarea rows="3" placeholder="Vitamin C, Hyaluronic Acid..." value={formData.ingredients || ''} onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none', resize: 'vertical'}}></textarea>
                </div>
                <div>
                  <label style={{fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Hướng Dẫn Sử Dụng</label>
                  <textarea rows="3" placeholder="Thoa 2-3 giọt lên mặt..." value={formData.usage || ''} onChange={(e) => setFormData({...formData, usage: e.target.value})}
                    style={{width: '100%', padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '14px', border: 'none', outline: 'none', resize: 'vertical'}}></textarea>
                </div>
              </div>

              <button type="submit" style={{padding: '20px', fontSize: '18px', fontWeight: 'bold', width: '100%', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                <Check size={28} /> Lưu Sản Phẩm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
