import React, { useState } from 'react';
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';
import { 
  ArrowUpDown, ChevronLeft, ChevronRight, 
  CheckCircle2, AlertTriangle, AlertCircle, Edit2
} from 'lucide-react';
import * as XLSX from 'xlsx';

const WarehouseTable = ({ data, onUpdate }) => {
  const [sorting, setSorting] = useState([]);
  const [editingCell, setEditingCell] = useState(null);

  const columns = [
    {
      accessorKey: 'stt',
      header: 'STT',
      cell: info => <span className="font-mono text-[13px]">{info.getValue()}</span>,
    },
    {
      accessorKey: 'name',
      header: 'SẢN PHẨM',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-inter font-bold text-gray-900 group-hover:text-[#D4AF37] transition-colors">{row.original.name}</span>
          <span className="text-[12px] font-inter font-medium text-gray-400 uppercase tracking-widest">{row.original.sku}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'DANH MỤC',
      cell: info => <span className="text-[14px] font-inter font-semibold text-gray-500">{info.getValue()}</span>,
    },
    {
      accessorKey: 'buyPrice',
      header: () => <div className="text-right">GIÁ NHẬP</div>,
      cell: ({ row, getValue }) => (
        <div className="text-right font-mono text-[15px] text-gray-400 group-hover:text-gray-600 transition-colors">
          {getValue()?.toLocaleString('vi-VN')}
        </div>
      ),
    },
    {
      accessorKey: 'sellPrice',
      header: () => <div className="text-right">GIÁ BÁN</div>,
      cell: ({ row, getValue }) => (
        <div className="text-right font-mono text-[16px] font-bold text-[#B8860B]">
          {getValue()?.toLocaleString('vi-VN')}
        </div>
      ),
    },
    {
      accessorKey: 'stock',
      header: () => <div className="text-center">TỒN</div>,
      cell: ({ row, getValue }) => {
        const val = getValue();
        const colorClass = val < 10 ? 'text-red-600 font-bold' : val < 30 ? 'text-orange-500 font-semibold' : 'text-emerald-500 font-semibold';
        return (
          <div className={`text-center font-inter text-[14px] ${colorClass}`}>
            {val}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'TRẠNG THÁI',
      cell: ({ getValue }) => {
        const val = getValue();
        const styles = {
          'CÒN HÀNG': 'bg-[#D1FAE5] text-[#047857]',
          'SẮP HẾT': 'bg-[#FEF3C7] text-[#B45309]',
          'HẾT HÀNG': 'bg-[#FEE2E2] text-[#B91C1C]'
        };
        const icons = {
          'CÒN HÀNG': <CheckCircle2 size={12} />,
          'SẮP HẾT': <AlertTriangle size={12} />,
          'HẾT HÀNG': <AlertCircle size={12} />
        };
        return (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-inter font-black uppercase tracking-widest w-fit min-w-[100px] justify-center ${styles[val]}`}>
            {icons[val]}
            {val}
          </div>
        );
      },
    }
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 }
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto ring-1 ring-gray-50">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-[#FEF3C7] border-b border-[#FEF3C7]">
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-10 py-6 text-[11px] font-inter font-black text-[#B8860B] uppercase tracking-[0.2em] cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                         <ArrowUpDown size={12} className={header.column.getIsSorted() ? 'text-[#D4AF37]' : 'text-[#B8860B]/30'} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-[#FFFBEB] transition-all group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-10 py-7 border-none">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-8 py-4">
        <div className="text-[12px] font-inter font-semibold text-gray-400">
           Hiển thị 1-{table.getRowModel().rows.length} / {data.length} sản phẩm
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gold-light hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-400 shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-1">
             {table.getPageOptions().map((pageIdx) => (
                <button
                  key={pageIdx}
                  onClick={() => table.setPageIndex(pageIdx)}
                  className={`w-10 h-10 rounded-xl text-[12px] font-inter font-black transition-all ${
                    table.getState().pagination.pageIndex === pageIdx
                      ? 'bg-gold-primary text-white shadow-lg shadow-gold-primary/20'
                      : 'bg-white text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {pageIdx + 1}
                </button>
             ))}
          </div>

          <button 
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gold-light hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-400 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseTable;
