/**
 * Dữ liệu mẫu quản lý kho hàng - DS Luong
 */

export const INITIAL_WAREHOUSE_DATA = [
  { 
    id: 1, 
    stt: 1,
    name: "SYL 100 SUN LUX", 
    sku: "SH - NEW", 
    category: "Chống nắng", 
    buyPrice: 2000000, 
    sellPrice: 2517500, 
    stock: 50,
    status: "CÒN HÀNG",
    brand: "DS LUONG"
  },
  { 
    id: 2, 
    stt: 2,
    name: "BIOCELMASK CALM EFFECT", 
    sku: "BIOCE BEST SELLER", 
    category: "Mặt nạ", 
    buyPrice: 900000, 
    sellPrice: 1141250, 
    stock: 30,
    status: "CÒN HÀNG",
    brand: "DS LUONG"
  },
  { 
    id: 3, 
    stt: 3,
    name: "HAIR MASK", 
    sku: "HAIR", 
    category: "Chăm sóc tóc", 
    buyPrice: 1800000, 
    sellPrice: 2181250, 
    stock: 25,
    status: "CÒN HÀNG",
    brand: "DS LUONG"
  },
  { 
    id: 4, 
    stt: 4,
    name: "FREQUENT USE SHAMPOO", 
    sku: "FREQ", 
    category: "Chăm sóc tóc", 
    buyPrice: 900000, 
    sellPrice: 1141250, 
    stock: 40,
    status: "CÒN HÀNG",
    brand: "DS LUONG"
  },
  { 
    id: 5, 
    stt: 5,
    name: "REFRESH TONER", 
    sku: "REFRESH", 
    category: "Làm sạch da", 
    buyPrice: 1200000, 
    sellPrice: 1593750, 
    stock: 8,
    status: "SẮP HẾT",
    brand: "DS LUONG"
  },
  { 
    id: 6, 
    stt: 6,
    name: "BALANCE LOTION", 
    sku: "BALAN NEW", 
    category: "Dưỡng ẩm", 
    buyPrice: 280000, 
    sellPrice: 352500, 
    stock: 100,
    status: "CÒN HÀNG",
    brand: "DS LUONG"
  },
  { 
    id: 7, 
    stt: 7,
    name: "BUST FIRMING GEL", 
    sku: "BUST", 
    category: "Chăm sóc body", 
    buyPrice: 2500000, 
    sellPrice: 3020000, 
    stock: 0,
    status: "HẾT HÀNG",
    brand: "DS LUONG"
  }
];

export const WAREHOUSE_CATEGORIES = [
  { 
    name: "TÌNH TRẠNG DA", 
    children: [
      { name: "DA LÃO HOÁ", count: 12 },
      { name: "DA MỤN", count: 8 },
      { name: "DA THÂM NÁM", count: 15 },
      { name: "DA THIẾU ẨM", count: 10 },
      { name: "DA MẪN ĐỎ", count: 5 },
      { name: "DA SAU THẨM MỸ", count: 7 }
    ]
  },
  { 
    name: "DÒNG SẢN PHẨM", 
    children: [
      { name: "ĐIỆN DI", count: 6 },
      { name: "VIAL", count: 9 },
      { name: "CÔNG NGHỆ MỚI", count: 4 }
    ]
  },
  { 
    name: "CHĂM SÓC MẶT & MÔI", 
    children: [
      { name: "DƯỠNG MÔI", count: 5 },
      { name: "CHĂM SÓC MẶT", count: 18 },
      { name: "CHĂM SÓC BODY", count: 12 },
      { name: "DƯỠNG ẨM", count: 20 },
      { name: "SĂN CHẮC", count: 8 }
    ]
  }
];
