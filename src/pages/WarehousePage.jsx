import React, { useState, useMemo } from 'react';
import { INITIAL_WAREHOUSE_DATA } from '../data/warehouseData';
import WarehouseSidebar from '../components/Admin/WarehouseSidebar';
import WarehouseHeader from '../components/Admin/WarehouseHeader';
import WarehouseTable from '../components/Admin/WarehouseTable';
import { Package, Truck, Wallet, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';

const WarehousePage = () => {
  const [data, setData] = useState(INITIAL_WAREHOUSE_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc dữ liệu theo tìm kiếm
  const filteredData = useMemo(() => {
    return data.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Thống kê nhanh
  const stats = useMemo(() => {
    const totalValue = data.reduce((acc, p) => acc + (p.buyPrice * p.stock), 0);
    const totalStock = data.reduce((acc, p) => acc + p.stock, 0);
    return {
      totalProducts: data.length,
      totalStock: totalStock,
      totalValue: totalValue,
      lowStock: data.filter(p => p.stock > 0 && p.stock < 10).length,
      discontinued: data.filter(p => p.status === 'HẾT HÀNG').length
    };
  }, [data]);

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kho-hang-ds-luong-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KhoHang");
    XLSX.writeFile(wb, `kho-hang-ds-luong-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (Array.isArray(importedData)) {
            setData(importedData);
            alert('Nhập dữ liệu thành công!');
          }
        } catch (err) {
          alert('Lỗi định dạng file JSON!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-[calc(100vh-160px)] -m-8 lg:-m-12 bg-white font-inter overflow-hidden border border-gray-100 rounded-[3rem] shadow-xl">
      {/* SIDEBAR */}
      <WarehouseSidebar 
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onExportExcel={handleExportExcel}
        lowStockCount={stats.lowStock}
        discontinuedCount={stats.discontinued}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F9FAFB]">
        {/* HEADER */}
        <WarehouseHeader 
          totalProducts={stats.totalProducts} 
          onSearch={setSearchTerm} 
        />

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-10 py-10 no-scrollbar">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {[
              { label: 'Tổng sản phẩm', value: stats.totalProducts, icon: Package, color: 'text-blue-500', bg: 'bg-white' },
              { label: 'Tổng tồn kho', value: stats.totalStock.toLocaleString(), icon: Truck, color: 'text-indigo-500', bg: 'bg-white' },
              { label: 'Giá trị tồn kho', value: stats.totalValue.toLocaleString('vi-VN') + 'đ', icon: Wallet, color: 'text-gold-primary', bg: 'bg-white' },
              { label: 'Sản phẩm sắp hết', value: stats.lowStock, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-white', alert: stats.lowStock > 0 }
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 transition-all hover:scale-[1.02] hover:shadow-lg duration-500`}>
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-xl font-black ${stat.alert ? 'text-orange-600 animate-pulse' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN TABLE */}
          <WarehouseTable data={filteredData} onUpdate={(id, key, val) => {}} />
        </div>
      </div>
    </div>
  );
};

export default WarehousePage;
