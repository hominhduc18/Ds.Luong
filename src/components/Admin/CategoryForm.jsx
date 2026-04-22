import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import { X, Check, Palette, Layers, Eye, EyeOff, Tag, GitBranch } from 'lucide-react';
import { categoryService } from '../../services/categoryService';

const CategoryForm = ({ initialData, onSave, onCancel, parentCategories }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      parentId: null,
      description: '',
      icon: '📁',
      color: '#D4AF37',
      status: 'ACTIVE'
    }
  });

  const currentColor = watch('color');
  const currentStatus = watch('status');
  const watchedIcon = watch('icon');
  const isEditing = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
      {/* Form Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg shadow-inner"
            style={{ backgroundColor: `${currentColor}22`, border: `2px solid ${currentColor}44` }}
          >
            {watchedIcon || '📁'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800 leading-none">
              {isEditing ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
            </h3>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">
              {isEditing ? `ID: ${initialData.id}` : 'Điền thông tin bên dưới'}
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* Scrollable Form Body */}
      <form onSubmit={handleSubmit(onSave)} className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-6 space-y-6 flex-1">

          {/* Section A: Thông tin cơ bản */}
          <div className="space-y-4">
            <SectionLabel icon={<Tag size={13} />} title="Thông tin cơ bản" />

            {/* Tên danh mục */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Tên danh mục <span className="text-red-400">*</span>
              </label>
              <input
                {...register('name', { required: true })}
                placeholder="Vd: Chăm sóc chuyên sâu..."
                className={`w-full bg-gray-50 border rounded-xl py-3 px-4 text-sm font-medium text-gray-800 placeholder-gray-300 outline-none transition-all ${
                  errors.name
                    ? 'border-red-300 focus:ring-2 focus:ring-red-300/30'
                    : 'border-gray-200 focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 font-medium">Vui lòng nhập tên danh mục</p>
              )}
            </div>

            {/* Danh mục cha */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <GitBranch size={11} /> Danh mục cấp trên
              </label>
              <select
                {...register('parentId')}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all cursor-pointer"
              >
                <option value="">— Danh mục gốc —</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.id} disabled={cat.id === initialData?.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mô tả */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Mô tả</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Mô tả ngắn về nhóm sản phẩm này..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Section B: Giao diện */}
          <div className="space-y-4">
            <SectionLabel icon={<Palette size={13} />} title="Giao diện hiển thị" />

            {/* Icon Emoji */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Icon / Emoji
              </label>
              <div className="flex gap-3 items-center">
                <div
                  className="w-14 h-12 rounded-xl border-2 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner"
                  style={{ borderColor: `${currentColor}55`, backgroundColor: `${currentColor}11` }}
                >
                  {watchedIcon || '📁'}
                </div>
                <input
                  {...register('icon')}
                  placeholder="Nhập Emoji..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-base text-center outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Màu đặc trưng
              </label>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
                <HexColorPicker
                  color={currentColor}
                  onChange={(color) => setValue('color', color)}
                  className="!w-full !h-36 rounded-lg overflow-hidden"
                />
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shadow-md border-2 border-white flex-shrink-0"
                    style={{ backgroundColor: currentColor }}
                  />
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-mono font-bold text-gray-600">{currentColor}</span>
                  </div>
                  {/* Preset Colors */}
                  <div className="flex gap-2">
                    {['#D4AF37', '#6366f1', '#10b981', '#f43f5e', '#0ea5e9'].map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setValue('color', c)}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Section C: Trạng thái */}
          <div className="space-y-3">
            <SectionLabel icon={<Eye size={13} />} title="Trạng thái hiển thị" />

            <div
              onClick={() => setValue('status', currentStatus === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE')}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                currentStatus === 'ACTIVE'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {currentStatus === 'ACTIVE'
                  ? <Eye size={16} className="text-emerald-500" />
                  : <EyeOff size={16} className="text-gray-400" />}
                <div>
                  <p className={`text-xs font-bold ${currentStatus === 'ACTIVE' ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {currentStatus === 'ACTIVE' ? 'Đang hiển thị' : 'Đang ẩn'}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Quyết định xuất hiện trên Menu</p>
                </div>
              </div>
              {/* Toggle Switch */}
              <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${currentStatus === 'ACTIVE' ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${currentStatus === 'ACTIVE' ? 'translate-x-5' : ''}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all"
            >
              Hủy bỏ
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] transition-all duration-200"
          >
            <Check size={15} />
            {isEditing ? 'Lưu thay đổi' : 'Tạo danh mục'}
          </button>
        </div>
      </form>
    </div>
  );
};

const SectionLabel = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <span className="text-amber-500">{icon}</span>
    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{title}</span>
  </div>
);

export default CategoryForm;
