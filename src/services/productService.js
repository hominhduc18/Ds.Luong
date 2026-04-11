/**
 * Dịch vụ quản lý dữ liệu Sản phẩm
 * Hỗ trợ CRUD, Lọc, Tìm kiếm và Sao lưu dữ liệu
 */

const STORAGE_KEY = 'ds_luong_products';

const DEFAULT_PRODUCTS = [
  { id: 1, name: "SYL 100 SUN LUX", sku: "SH - NEW", category: "CHỐNG NẮNG", buyPrice: 2000000, sellPrice: 2517500, stock: 50, unit: "Tuýp", brand: "DS LUONG", description: "BẢO VỆ DA TỐI ƯU", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/syl-100-sun-lux-1.png" },
  { id: 2, name: "BIOCELMASK CALM EFFECT", sku: "BIOCE BEST SELLER", category: "MẶT NẠ", buyPrice: 900000, sellPrice: 1141250, stock: 30, unit: "Hộp", brand: "DS LUONG", description: "PHỤC HỒI CHUYÊN SÂU", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/biocelmask-calm-effect-1.png" },
  { id: 3, name: "HAIR MASK", sku: "HAIR", category: "CHĂM SÓC TÓC", buyPrice: 1800000, sellPrice: 2181250, stock: 25, unit: "Hộp", brand: "DS LUONG", description: "DƯỠNG TÓC MỀM MƯỢT", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/hair-mask-1.png" },
  { id: 4, name: "FREQUENT USE SHAMPOO", sku: "FREQ", category: "CHĂM SÓC TÓC", buyPrice: 900000, sellPrice: 1141250, stock: 40, unit: "Chai", brand: "DS LUONG", description: "LÀM SẠCH DỊU NHẸ", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/frequent-use-shampoo-1.png" },
  { id: 5, name: "REFRESH TONER", sku: "REFRESH", category: "LÀM SẠCH DA", buyPrice: 1200000, sellPrice: 1593750, stock: 60, unit: "Chai", brand: "DS LUONG", description: "CÂN BẰNG PH", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/refresh-toner-1.png" },
  { id: 6, name: "BALANCE LOTION", sku: "BALAN NEW", category: "DƯỠNG ẨM", buyPrice: 280000, sellPrice: 352500, stock: 100, unit: "Chai", brand: "DS LUONG", description: "KIỂM SOÁT BÃ NHỜN", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/balance-lotion-1.png" },
  { id: 7, name: "BUST FIRMING GEL", sku: "BUST", category: "CHĂM SÓC BODY", buyPrice: 2500000, sellPrice: 3020000, stock: 20, unit: "Chai", brand: "DS LUONG", description: "SĂN CHẮC CƠ THỂ", status: "CÒN HÀNG", image: "https://skinclinic.vn/storage/products/bust-firming-gel-1.png" },
];

export const productService = {
  // Lấy toàn bộ sản phẩm
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
  },

  // Lưu danh sách sản phẩm
  saveAll: (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('ds_luong_data_changed'));
  },

  // Thêm sản phẩm
  add: (product) => {
    const products = productService.getAll();
    const newProduct = { 
      ...product, 
      id: Date.now(), 
      brand: product.brand || "DS LUONG" 
    };
    productService.saveAll([...products, newProduct]);
    return newProduct;
  },

  // Cập nhật sản phẩm
  update: (id, updatedData) => {
    const products = productService.getAll();
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedData };
      productService.saveAll(products);
      return products[index];
    }
    return null;
  },

  // Xóa sản phẩm
  delete: (id) => {
    const products = productService.getAll();
    productService.saveAll(products.filter(p => p.id !== Number(id)));
  },

  // Xuất file JSON
  exportJSON: () => {
    const data = JSON.stringify(productService.getAll(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ds_luong_products_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  },

  // Nhập file JSON
  importJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const products = JSON.parse(e.target.result);
          if (Array.isArray(products)) {
            productService.saveAll(products);
            resolve(products);
          } else {
            reject('Định dạng file không hợp lệ');
          }
        } catch (err) {
          reject('Lỗi đọc file JSON');
        }
      };
      reader.readAsText(file);
    });
  }
};
