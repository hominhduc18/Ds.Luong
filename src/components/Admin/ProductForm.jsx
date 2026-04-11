import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Check, Package, DollarSign, Tag, Info, LayoutGrid } from 'lucide-react';
import ImageUploader from './ImageUploader';
import CategorySelect from './CategorySelect';

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      status: 'CÒN HÀNG',
      unit: 'Hộp',
      brand: 'DS LUONG',
      category: 'TẤT CẢ',
      images: []
    }
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  const handleImagesProcessed = (images) => {
    setValue('images', images);
  };

  const currentImages = watch('images') || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      <div 
        className="absolute inset-0 bg-[#0A1629]/90 backdrop-blur-xl" 
        onClick={onCancel}
      />
      
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[4rem] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-white z-10 shrink-0">
          <div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
              {initialData?.id ? 'Hiệu chỉnh' : 'Thiết lập'} sản phẩm
            </h3>
            <p className="text-[10px] font-black text-gold-primary uppercase tracking-[0.4em] pl-1 flex items-center gap-2">
              <Package size={14} /> DS LUONG Administration Panel
            </p>
          </div>
          <button onClick={onCancel} className="p-4 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-500">
            <X size={28} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-12 lg:p-16 scrollbar-hide space-y-16">
          
          {/* Section 1: Thông tin cơ bản */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-gold-primary">
              <div className="w-10 h-10 bg-gold-light/50 rounded-2xl flex items-center justify-center">
                <Info size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em]">Thông tin định danh</h4>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tên sản phẩm *</label>
                <input 
                  {...register('name', { required: true })}
                  placeholder="Nhập tên sản phẩm..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-lg font-bold tracking-tight outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all" 
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Mã SKU / Barcode</label>
                  <input 
                    {...register('sku')}
                    placeholder="DS-..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-xs font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-widest" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Đơn vị tính</label>
                  <select 
                    {...register('unit')}
                    className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-xs font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-widest"
                  >
                    <option>Hộp</option>
                    <option>Tuýp</option>
                    <option>Chai</option>
                    <option>Lọ</option>
                    <option>Miếng</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Thương hiệu</label>
                <input 
                  {...register('brand')}
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-xs font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all uppercase tracking-widest" 
                />
              </div>
              <div className="space-y-4">
                 <CategorySelect 
                    value={watch('category')} 
                    onChange={(val) => setValue('category', val)} 
                 />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Mô tả ngắn</label>
                <input 
                  {...register('description')}
                  placeholder="Vd: Bảo vệ da tối ưu..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-xs font-bold outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all italic" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Giá & Kho */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-emerald-600">
              <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em]">Tài chính & Kho vận</h4>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Giá nhập vào (VNĐ) *</label>
                <input 
                  type="number"
                  {...register('buyPrice', { required: true, valueAsNumber: true })}
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-lg font-black outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-emerald-600" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Giá bán ra (VNĐ) *</label>
                <input 
                  type="number"
                  {...register('sellPrice', { required: true, valueAsNumber: true })}
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-lg font-black outline-none focus:ring-4 focus:ring-gold-primary/5 transition-all text-gold-primary" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Số lượng tồn kho *</label>
                <input 
                  type="number"
                  {...register('stock', { required: true, valueAsNumber: true })}
                  className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 text-lg font-black outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-blue-600" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Hình ảnh */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-purple-600">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center">
                <LayoutGrid size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em]">Thư viện hình ảnh</h4>
            </div>
            
            <ImageUploader 
              onImagesProcessed={handleImagesProcessed}
              initialImages={initialData?.images || (initialData?.image ? [initialData.image] : [])}
            />
          </div>

          {/* Section 4: Trạng thái & Tùy chọn */}
          <div className="space-y-10">
             <div className="flex items-center gap-4 text-orange-600">
              <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Tag size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em]">Trạng thái hiển thị</h4>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tình trạng kho</label>
                <select 
                   {...register('status')}
                  className="w-full bg-white border-none rounded-2xl py-6 px-8 text-xs font-black outline-none shadow-sm uppercase tracking-widest"
                >
                  <option>CÒN HÀNG</option>
                  <option>HẾT HÀNG</option>
                  <option>SẮP VỀ HÀNG</option>
                </select>
              </div>
              
              <div className="flex flex-col justify-center gap-6">
                 <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative w-14 h-8 bg-gray-200 rounded-full transition-colors group-has-[:checked]:bg-gold-primary">
                       <input type="checkbox" {...register('isFeatured')} className="sr-only peer" />
                       <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-has-[:checked]:text-gray-900">Sản phẩm nổi bật</span>
                 </label>
                 
                 <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative w-14 h-8 bg-gray-200 rounded-full transition-colors group-has-[:checked]:bg-emerald-500">
                       <input type="checkbox" {...register('isVisible')} defaultChecked={true} className="sr-only peer" />
                       <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-has-[:checked]:text-gray-900">Hiển thị trên Web</span>
                 </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 pt-12 border-t border-gray-100">
            <button 
              type="button"
              onClick={onCancel}
              className="px-12 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] hover:text-gray-900 transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="px-20 py-6 bg-gold-primary text-white rounded-[2.5rem] text-[12px] font-black tracking-[0.4em] uppercase shadow-2xl shadow-gold-primary/30 hover:bg-gray-900 hover:scale-[1.05] transition-all duration-500 flex items-center gap-4"
            >
              <Check size={20} />
              {initialData?.id ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
