import React from 'react';
import { Tree } from 'react-arborist';
import { 
  ChevronDown, ChevronRight, Edit3, Trash2, 
  Folder, FolderOpen, Tag, Plus, GripVertical
} from 'lucide-react';

const CategoryTree = ({ data, onSelect, onEdit, onDelete, onAddSub, onMove }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-10 h-full overflow-hidden flex flex-col">
       <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Bộ khung danh mục</h2>
          <button 
             onClick={() => onAddSub(null)}
             className="w-10 h-10 flex items-center justify-center bg-gold-light text-gold-primary rounded-xl hover:bg-gold-primary hover:text-white transition-all shadow-sm"
          >
             <Plus size={18} />
          </button>
       </div>

       <div className="flex-1 min-h-[500px]">
          <Tree
            data={data}
            className="no-scrollbar"
            rowHeight={64}
            width="100%"
            height={600}
            indent={24}
            onMove={onMove}
            idAccessor="id"
            childrenAccessor="children"
          >
            {NodeRenderer({ onEdit, onDelete, onAddSub, onSelect })}
          </Tree>
       </div>
    </div>
  );
};

const NodeRenderer = ({ onEdit, onDelete, onAddSub, onSelect }) => ({ node, style, dragHandle }) => {
  return (
    <div 
      style={style} 
      className={`group flex items-center gap-4 px-4 py-2 rounded-2xl transition-all cursor-pointer ${node.isSelected ? 'bg-gold-light/50' : 'hover:bg-gray-50'}`}
      onClick={() => onSelect(node.data)}
    >
      <div {...dragHandle} className="cursor-grab text-gray-200 group-hover:text-gray-400 transition-colors">
         <GripVertical size={16} />
      </div>

      <div 
        onClick={(e) => { e.stopPropagation(); node.toggle(); }}
        className="text-gray-400 hover:text-gold-primary transition-colors"
      >
        {node.isLeaf ? (
          <div className="w-5 h-5 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-gold-primary/30" />
          </div>
        ) : (
          node.isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
        )}
      </div>

      <div className="flex-1 flex items-center gap-3">
         <span className="text-xl leading-none">{node.data.icon || '📁'}</span>
         <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 tracking-tight leading-none uppercase">{node.data.name}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
               {node.data.children?.length || 0} mục con
            </span>
         </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <button 
            onClick={(e) => { e.stopPropagation(); onAddSub(node.data.id); }}
            className="p-2 text-gold-primary hover:bg-gold-light rounded-lg transition-all"
            title="Thêm cấp dưới"
         >
            <Plus size={14} />
         </button>
         <button 
            onClick={(e) => { e.stopPropagation(); onEdit(node.data); }}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            title="Sửa"
         >
            <Edit3 size={14} />
         </button>
         <button 
            onClick={(e) => { e.stopPropagation(); onDelete(node.data.id); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Xóa"
         >
            <Trash2 size={14} />
         </button>
      </div>
    </div>
  );
};

export default CategoryTree;
