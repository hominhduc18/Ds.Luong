// LocalStorage Keys
const KEYS = {
  PRODUCTS: 'beauty_products',
  POSTS: 'beauty_posts',
  REVIEWS: 'beauty_reviews',
  CONTACTS: 'beauty_contacts',
  EMAILS: 'beauty_emails',
  SETTINGS: 'beauty_settings',
  CONTENTS: 'beauty_page_contents',
  CATEGORIES: 'beauty_categories',
  AUTH: 'beauty_is_logged_in'
};

// Initial Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: "SYL 100 SUN LUX", description: "Kem chống nắng phổ rộng SPF 50+", brand: "DS Luong", price: 2517500, originalPrice: null, badge: ["50+", "NEW"], category: "CHỐNG NẮNG", image: "https://placehold.co/400x400?text=Sun+Lux", stock: 50 },
  { id: 2, name: "BIOCELMASK CALM EFFECT", description: "Mặt nạ phục hồi và làm dịu da", brand: "SkinClinic", price: 1141250, originalPrice: null, badge: ["BEST SELLER"], category: "MẶT NẠ", image: "https://placehold.co/400x400?text=Biocelmask", stock: 30 },
  { id: 3, name: "HAIR MASK", description: "Mặt nạ cấp ẩm và chăm sóc tóc", brand: "SkinClinic", price: 2181250, originalPrice: null, badge: [], category: "CHĂM SÓC TÓC", image: "https://placehold.co/400x400?text=Hair+Mask", stock: 25 },
  { id: 4, name: "FREQUENT USE SHAMPOO", description: "Dầu gội dịu nhẹ dùng hàng ngày", brand: "SkinClinic", price: 1141250, originalPrice: null, badge: [], category: "CHĂM SÓC TÓC", image: "https://placehold.co/400x400?text=Shampoo", stock: 40 },
  { id: 5, name: "REFRESH TONER", description: "Nước cân bằng dịu nhẹ", brand: "SkinClinic", price: 1593750, originalPrice: null, badge: [], category: "LÀM SẠCH DA", image: "https://placehold.co/400x400?text=Toner", stock: 60 },
  { id: 6, name: "BALANCE LOTION", description: "Nước dưỡng cân bằng kiểm soát dầu", brand: "SkinClinic", price: 352500, originalPrice: null, badge: ["NEW"], category: "DƯỠNG ẨM", image: "https://placehold.co/400x400?text=Lotion", stock: 100 },
  { id: 7, name: "BUST FIRMING GEL", description: "Gel hỗ trợ cải thiện độ săn chắc vùng ngực", brand: "SkinClinic", price: 3020000, originalPrice: null, badge: [], category: "CHĂM SÓC BODY", image: "https://placehold.co/400x400?text=Bust+Gel", stock: 20 },
  { id: 8, name: "BODY GLYCOLIC CREAM", description: "Kem dưỡng body săn chắc", brand: "SkinClinic", price: 2181250, originalPrice: 2725000, badge: ["SALE"], category: "CHĂM SÓC BODY", image: "https://placehold.co/400x400?text=Glycolic", stock: 35 },
  { id: 9, name: "ANTI DANDRUFF SHAMPOO", description: "Dầu gội cho da gàu", brand: "SkinClinic", price: 1645000, originalPrice: null, badge: [], category: "CHĂM SÓC TÓC", image: "https://placehold.co/400x400?text=Anti+Dandruff", stock: 45 },
  { id: 10, name: "ANTI HAIR LOSS SHAMPOO", description: "Dầu gội chống rụng tóc", brand: "SkinClinic", price: 1762500, originalPrice: null, badge: ["BEST SELLER"], category: "CHĂM SÓC TÓC", image: "https://placehold.co/400x400?text=Anti+Hair+Loss", stock: 38 },
  { id: 11, name: "GREASY HAIR SHAMPOO", description: "Dầu gội cho tóc nhờn", brand: "SkinClinic", price: 1645000, originalPrice: null, badge: [], category: "CHĂM SÓC TÓC", image: "https://placehold.co/400x400?text=Greasy+Hair", stock: 42 },
  { id: 12, name: "ANTIAGING LIPOSOME CREAM", description: "Kem dưỡng chống lão hóa", brand: "SkinClinic", price: 3188750, originalPrice: 3985000, badge: ["SALE"], category: "CHỐNG LÃO HOÁ", image: "https://placehold.co/400x400?text=Liposome", stock: 15 }
];

const MOCK_POSTS = [
  { id: 1, title: "Top 5 thành phần chống lão hóa được bác sĩ khuyên dùng", summary: "Retinol, Vitamin C, Niacinamide, Peptide, Hyaluronic Acid - những thành phần vàng trong skincare", content: "<p>Nội dung chi tiết đang cập nhật...</p>", category: "CHỐNG LÃO HOÁ", image: "https://placehold.co/600x400?text=AntiAging", date: "2025-01-15", author: "Bác sĩ Nguyễn Thị A" },
  { id: 2, title: "Cách chọn kem chống nắng cho da dầu mụn", summary: "Bí quyết chọn kem chống nắng không gây bít tắc lỗ chân lông, kiểm soát dầu hiệu quả", content: "...", category: "CHỐNG NẮNG", image: "https://placehold.co/600x400?text=Sunscreen", date: "2025-01-10", author: "Bác sĩ Trần Văn B" },
  { id: 3, title: "Retinol có thực sự làm mỏng da? Góc nhìn khoa học", summary: "Giải đáp thắc mắc về retinol - liệu có an toàn cho làn da nhạy cảm?", content: "...", category: "CHỐNG LÃO HOÁ", image: "https://placehold.co/600x400?text=Retinol", date: "2025-01-05", author: "Bác sĩ Lê Thị C" },
  { id: 4, title: "Quy trình chăm sóc da cơ bản cho người mới bắt đầu", summary: "4 bước đơn giản để có làn da khỏe đẹp mỗi ngày", content: "...", category: "CHĂM SÓC DA", image: "https://placehold.co/600x400?text=Skincare+Routine", date: "2024-12-28", author: "Bác sĩ Phạm Văn D" },
  { id: 5, title: "Nám da và cách điều trị hiệu quả", summary: "Nguyên nhân và giải pháp cho làn da bị nám, tàn nhang", content: "...", category: "TRỊ NÁM", image: "https://placehold.co/600x400?text=Melasma", date: "2024-12-20", author: "Bác sĩ Hoàng Thị E" },
  { id: 6, title: "Review sản phẩm SYL 100 SUN LUX sau 30 ngày sử dụng", summary: "Trải nghiệm thực tế từ khách hàng về kem chống nắng số 1 hiện nay", content: "...", category: "REVIEW", image: "https://placehold.co/600x400?text=Review", date: "2024-12-15", author: "Khách hàng VIP" }
];

const MOCK_PAGE_CONTENTS = {
  home: {
    heroTitle: "DS LUONG",
    heroSubtitle: "Khoa học - An toàn - Hiệu quả",
    introText: "SkinClinic mang đến các giải pháp chăm sóc da chuyên nghiệp, kết hợp giữa tinh hoa thiên nhiên và công nghệ tá dược hiện đại."
  },
  about: {
    mission: "Mang lại làn da khỏe đẹp bền vững cho phụ nữ Việt.",
    vision: "Trở thành dược mỹ phẩm số 1 tại Việt Nam.",
    story: "Khởi đầu từ khát vọng mang đến những sản phẩm skincare chuẩn y khoa...",
    team: [
      { name: "BS Nguyễn Thị A", role: "Chuyên gia Da liễu", image: "https://placehold.co/300x400?text=BS+A" },
      { name: "BS Trần Văn B", role: "Cố vấn chuyên môn", image: "https://placehold.co/300x400?text=BS+B" }
    ]
  },
  contact: {
    address: "123 Đường Sắc Đẹp, Quận 1, TP.HCM",
    phone: "1900 XXXX",
    email: "info@dsluong.vn",
    workingHours: "Thứ 2 - Thứ 7 (8:00 - 20:00)"
  }
};

const MOCK_CATEGORIES = [
  { name: "TÌNH TRẠNG DA", children: ["DA LÃO HOÁ", "DA MỤN", "DA THÂM NÁM", "DA THIẾU ẨM", "DA MẪN ĐỎ", "DA SAU THẨM MỸ"] },
  { name: "DÒNG SẢN PHẨM", children: ["ĐIỆN DI", "VIAL", "CÔNG NGHỆ MÁY"] },
  { name: "CHĂM SÓC MẮT & MÔI", children: ["DƯỠNG MÔI", "CHĂM SÓC MẮT"] },
  { name: "CHĂM SÓC BODY", children: ["DƯỠNG ẨM", "SĂN CHẮC"] },
  { name: "CHĂM SÓC TÓC", children: ["DẦU GỘI", "MẶT NẠ TÓC"] },
  { name: "THỰC PHẨM THẨM MỸ", children: ["CHỐNG LÃO HOÁ", "KIỂM SOÁT CÂN NẶNG"] }
];

const MOCK_SETTINGS = {
  siteName: 'DS Luong',
  slogan: 'Khoa học - An toàn - Hiệu quả',
  logo: null,
  favicon: null,
  email: 'info@skinclinic.vn',
  phone: '1900 XXXX',
  address: '123 Đường Sắc Đẹp, Quận 1, TP.HCM',
  seoTitle: 'DS Luong - Chuyên gia chăm sóc da',
  seoDesc: 'Dược mỹ phẩm cao cấp chuẩn y khoa.',
  socialLinks: { facebook: '#', instagram: '#', tiktok: '#', zalo: '1900 XXXX' }
};

// Storage Functions
export const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent('beauty_data_changed', { detail: { key } }));
  },

  init: () => {
    if (!storage.get(KEYS.PRODUCTS)) storage.set(KEYS.PRODUCTS, MOCK_PRODUCTS);
    if (!storage.get(KEYS.POSTS)) storage.set(KEYS.POSTS, MOCK_POSTS);
    if (!storage.get(KEYS.CONTENTS)) storage.set(KEYS.CONTENTS, MOCK_PAGE_CONTENTS);
    if (!storage.get(KEYS.CATEGORIES)) storage.set(KEYS.CATEGORIES, MOCK_CATEGORIES);
    
    const existingSettings = storage.get(KEYS.SETTINGS);
    storage.set(KEYS.SETTINGS, { ...MOCK_SETTINGS, ...(existingSettings || {}) });
    
    if (!storage.get(KEYS.REVIEWS)) storage.set(KEYS.REVIEWS, []);
    if (!storage.get(KEYS.CONTACTS)) storage.set(KEYS.CONTACTS, []);
    if (!storage.get(KEYS.EMAILS)) storage.set(KEYS.EMAILS, []);
  },

  auth: {
    login: (u, p) => {
      if (u === 'admin' && p === 'admin123') {
        storage.set(KEYS.AUTH, true);
        return true;
      }
      return false;
    },
    logout: () => storage.set(KEYS.AUTH, false),
    isLoggedIn: () => !!storage.get(KEYS.AUTH)
  },

  products: {
    getAll: () => storage.get(KEYS.PRODUCTS) || [],
    getFeatured: () => (storage.get(KEYS.PRODUCTS) || []).filter(p => p.badge && p.badge.includes('BEST SELLER')),
    getNew: () => (storage.get(KEYS.PRODUCTS) || []).filter(p => p.badge && p.badge.includes('NEW')),
    getById: (id) => (storage.get(KEYS.PRODUCTS) || []).find(p => p.id === Number(id)),
    save: (items) => storage.set(KEYS.PRODUCTS, items)
  },

  posts: {
    getAll: () => storage.get(KEYS.POSTS) || [],
    getLatest: (limit = 3) => (storage.get(KEYS.POSTS) || []).slice(0, limit),
    getById: (id) => (storage.get(KEYS.POSTS) || []).find(p => p.id === Number(id)),
    save: (items) => storage.set(KEYS.POSTS, items)
  },

  contents: {
    get: () => storage.get(KEYS.CONTENTS) || MOCK_PAGE_CONTENTS,
    save: (data) => storage.set(KEYS.CONTENTS, data)
  },

  categories: {
    get: () => storage.get(KEYS.CATEGORIES) || MOCK_CATEGORIES,
    save: (data) => storage.set(KEYS.CATEGORIES, data)
  },

  reviews: {
    getAll: (productId) => {
      const all = storage.get(KEYS.REVIEWS) || [];
      return productId ? all.filter(r => r.productId === Number(productId)) : all;
    },
    add: (review) => {
      const all = storage.get(KEYS.REVIEWS) || [];
      all.push({ ...review, id: Date.now(), date: new Date().toISOString() });
      storage.set(KEYS.REVIEWS, all);
    }
  },

  contacts: {
    getAll: () => storage.get(KEYS.CONTACTS) || [],
    add: (contact) => {
      const all = storage.get(KEYS.CONTACTS) || [];
      all.push({ ...contact, id: Date.now(), date: new Date().toISOString() });
      storage.set(KEYS.CONTACTS, all);
    }
  }
};
