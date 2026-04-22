import React from 'react';
import { Tree } from 'react-arborist';
import {
  ChevronDown, ChevronRight, Edit3, Trash2,
  Folder, FolderOpen, Plus, GripVertical, Eye, EyeOff
} from 'lucide-react';

const DEPTH_STYLES = [
  { dot: 'bg-violet-400', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-600', selected: 'bg-violet-50 border-violet-200', hover: 'hover:bg-violet-50/60', label: 'Gốc' },
  { dot: 'bg-blue-400',   text: 'text-blue-600',   badge: 'bg-blue-100 text-blue-600',     selected: 'bg-blue-50 border-blue-200',     hover: 'hover:bg-blue-50/60',   label: 'Cấp 2' },
  { dot: 'bg-teal-400',   text: 'text-teal-600',   badge: 'bg-teal-100 text-teal-600',     selected: 'bg-teal-50 border-teal-200',     hover: 'hover:bg-teal-50/60',   label: 'Cấp 3' },
];

const CategoryTree = ({ data, onSelect, onEdit, onDelete, onAddSub, onMove, fullWidth }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <Folder size={28} className="text-gray-300" />
        </div>
        <p className="text-sm font-semibold text-gray-400">Chưa có danh mục nào</p>
        <p className="text-xs text-gray-300 mt-1">Bấm nút "+ Thêm danh mục" để bắt đầu</p>
      </div>
    );
  }

  return (
    <Tree
      data={data}
      rowHeight={60}
      width="100%"
      height={520}
      indent={32}
      onMove={onMove}
      idAccessor="id"
      childrenAccessor="children"
    >
      {NodeRenderer({ onEdit, onDelete, onAddSub, onSelect })}
    </Tree>
  );
};

const NodeRenderer = ({ onEdit, onDelete, onAddSub, onSelect }) => ({ node, style, dragHandle }) => {
  const depth = Math.min(node.level || 0, 2);
  const ds = DEPTH_STYLES[depth];
  const isActive = node.data.status === 'ACTIVE';
  const childCount = node.data.children?.length || 0;

  return (
    <div style={style} className="px-2 py-1">
      <div
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 cursor-pointer border ${
          node.isSelected
            ? `${ds.selected} border shadow-sm`
            : `border-transparent ${ds.hover}`
        }`}
        onClick={() => onSelect(node.data)}
      >
        {/* ── Drag Handle ── */}
        <div
          {...dragHandle}
          className="cursor-grab text-gray-200 hover:text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={e => e.stopPropagation()}
        >
          <GripVertical size={14} />
        </div>

        {/* ── Depth indicator dot ── */}
        <div className="flex-shrink-0">
          <div className={`w-2.5 h-2.5 rounded-full ${ds.dot} ${depth > 0 ? 'opacity-60' : ''}`} />
        </div>

        {/* ── Expand / Collapse ── */}
        <div
          onClick={e => { e.stopPropagation(); node.toggle(); }}
          className={`flex-shrink-0 transition-colors ${ds.text} opacity-70 hover:opacity-100`}
        >
          {node.isLeaf ? (
            <div className="w-5" />
          ) : (
            node.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </div>

        {/* ── Icon ── */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
          style={{
            backgroundColor: node.data.color ? `${node.data.color}18` : '#f5f5f5',
            border: node.data.color ? `1.5px solid ${node.data.color}35` : '1.5px solid #e5e7eb',
          }}
        >
          {node.data.icon || (node.isOpen ? '📂' : '📁')}
        </div>

        {/* ── Name + Meta ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-800 truncate leading-none">
              {node.data.name}
            </span>
            {/* Depth badge */}
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${ds.badge} flex-shrink-0`}>
              {ds.label}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {/* Description snippet */}
            {node.data.description && (
              <span className="text-[11px] text-gray-400 truncate max-w-[200px]">
                {node.data.description}
              </span>
            )}
            {/* Sub count */}
            {childCount > 0 && (
              <span className="text-[10px] font-semibold text-gray-400">
                {childCount} mục con
              </span>
            )}
          </div>
        </div>

        {/* ── Color swatch ── */}
        {node.data.color && (
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0 opacity-70"
            style={{ backgroundColor: node.data.color }}
            title={node.data.color}
          />
        )}

        {/* ── Status ── */}
        <div className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full ${
          isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {isActive ? <Eye size={10} /> : <EyeOff size={10} />}
          {isActive ? 'Hiện' : 'Ẩn'}
        </div>

        {/* ── Actions (hover) ── */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onAddSub(node.data.id); }}
            className="w-7 h-7 flex items-center justify-center text-amber-500 hover:bg-amber-100 rounded-lg transition-all"
            title="Thêm cấp con"
          >
            <Plus size={13} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onEdit(node.data); }}
            className="w-7 h-7 flex items-center justify-center text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
            title="Chỉnh sửa"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(node.data.id); }}
            className="w-7 h-7 flex items-center justify-center text-red-400 hover:bg-red-100 rounded-lg transition-all"
            title="Xóa"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTree;
