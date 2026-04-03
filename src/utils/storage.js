// LocalStorage Keys
const KEYS = {
  PRODUCTS: 'beauty_products',
  POSTS: 'beauty_posts',
  REVIEWS: 'beauty_reviews',
  CONTACTS: 'beauty_contacts',
  EMAILS: 'beauty_emails',
  SETTINGS: 'beauty_settings',
  AUTH: 'beauty_is_logged_in'
};

// Initial Mock Data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Sữa rửa mặt Dịu nhẹ Lavender',
    price: 250000,
    oldPrice: 320000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&h=300&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8d5a106fac70?q=80&w=600&h=600&auto=format&fit=crop'
    ],
    category: 'Chăm sóc da',
    shortDesc: 'Sữa rửa mặt chiết xuất oải hương giúp làm sạch sâu mà không khô da.',
    desc: 'Làm sạch bụi bẩn và bã nhờn, đồng thời cân bằng độ ẩm tự nhiên cho da nhờ tinh chất oải hương vùng Provence.',
    ingredients: 'Nước khoáng, Tinh dầu Lavender, Glycerin, Vitamin E.',
    usage: 'Làm ướt mặt, lấy một lượng vừa đủ, massage nhẹ nhàng trong 60 giây rồi rửa sạch.',
    status: 'in_stock',
    isFeatured: true
  },
  {
    id: 2,
    name: 'Serum Vitamin C Sáng da',
    price: 480000,
    oldPrice: 600000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&h=300&auto=format&fit=crop',
    gallery: [
       'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&h=600&auto=format&fit=crop'
    ],
    category: 'Chăm sóc da',
    shortDesc: 'Giúp mờ thâm, sáng da và chống oxy hóa hiệu quả.',
    desc: 'Serum chứa 15% Vitamin C tinh khiết giúp cải thiện sắc tố da, mang lại vẻ rạng rỡ tức thì.',
    ingredients: 'Vitamin C, Ferulic Acid, Hyaluronic Acid.',
    usage: 'Dùng sau bước toner, thoa 3-5 giọt lên mặt và cổ mỗi sáng.',
    status: 'in_stock',
    isFeatured: true
  },
  {
    id: 3,
    name: 'Son môi Nhung lụa Đỏ Ruby',
    price: 350000,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8616a?q=80&w=300&h=300&auto=format&fit=crop',
    gallery: [
       'https://images.unsplash.com/photo-1586773860418-d37222d8616a?q=80&w=600&h=600&auto=format&fit=crop'
    ],
    category: 'Trang điểm',
    shortDesc: 'Màu đỏ quyến rũ, chất son mịn mượt lâu trôi.',
    desc: 'Son thỏi với công nghệ hạt màu siêu mịn, giữ màu lên đến 8 giờ mà vẫn giữ ẩm cho môi.',
    ingredients: 'Sáp ong, Dầu hạt Jojoba, Vitamin E.',
    usage: 'Thoa trực tiếp lên môi hoặc dùng cọ để có đường viền sắc nét.',
    status: 'in_stock',
    isFeatured: true
  }
];

const MOCK_POSTS = [
  {
    id: 1,
    title: '5 Bước chăm sóc da cơ bản cho người mới bắt đầu',
    excerpt: 'Làm thế nào để có làn da khỏe mạnh? Hãy cùng khám phá quy trình 5 bước đơn giản này...',
    content: '<p>Chăm sóc da không cần quá phức tạp. Chỉ cần 5 bước cơ bản này mỗi ngày...</p><h2>1. Làm sạch</h2><p>Bước quan trọng nhất là loại bỏ bụi bẩn...</p>',
    image: 'https://images.unsplash.com/photo-1570172619380-212643a6d71b?q=80&w=800&h=500&auto=format&fit=crop',
    category: 'Làm đẹp',
    date: '2026-03-20',
    author: 'Admin',
    status: 'published'
  }
];

const MOCK_SETTINGS = {
  siteName: 'Antigravity Beauty',
  slogan: 'Nâng niu vẻ đẹp tự nhiên của bạn',
  logo: null,
  favicon: null,
  email: 'contact@antigravity.beauty',
  phone: '0901234567',
  address: '123 Đường Sắc Đẹp, Quận 1, TP.HCM',
  seoTitle: 'Antigravity Beauty - Mỹ phẩm cao cấp',
  seoDesc: 'Chuyên cung cấp các dòng mỹ phẩm thiên nhiên chính hãng.',
  socialLinks: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
    zalo: '0901234567'
  }
};

// Storage Functions
export const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),

  init: () => {
    if (!storage.get(KEYS.PRODUCTS)) storage.set(KEYS.PRODUCTS, MOCK_PRODUCTS);
    if (!storage.get(KEYS.POSTS)) storage.set(KEYS.POSTS, MOCK_POSTS);
    if (!storage.get(KEYS.SETTINGS)) storage.set(KEYS.SETTINGS, MOCK_SETTINGS);
    if (!storage.get(KEYS.REVIEWS)) storage.set(KEYS.REVIEWS, []);
    if (!storage.get(KEYS.CONTACTS)) storage.set(KEYS.CONTACTS, []);
    if (!storage.get(KEYS.EMAILS)) storage.set(KEYS.EMAILS, []);
  },

  products: {
    getAll: () => storage.get(KEYS.PRODUCTS) || [],
    getFeatured: () => (storage.get(KEYS.PRODUCTS) || []).filter(p => p.isFeatured),
    getById: (id) => (storage.get(KEYS.PRODUCTS) || []).find(p => p.id === Number(id))
  },

  posts: {
    getAll: () => storage.get(KEYS.POSTS) || [],
    getPublished: () => (storage.get(KEYS.POSTS) || []).filter(p => p.status === 'published'),
    getById: (id) => (storage.get(KEYS.POSTS) || []).find(p => p.id === Number(id))
  },

  reviews: {
    getAll: (productId) => {
      const all = storage.get(KEYS.REVIEWS) || [];
      return productId ? all.filter(r => r.productId === Number(productId) && r.status === 'approved') : all;
    },
    add: (review) => {
      const all = storage.get(KEYS.REVIEWS) || [];
      all.push({ ...review, id: Date.now(), status: 'pending', date: new Date().toISOString() });
      storage.set(KEYS.REVIEWS, all);
    }
  },

  contacts: {
    getAll: () => storage.get(KEYS.CONTACTS) || [],
    add: (contact) => {
      const all = storage.get(KEYS.CONTACTS) || [];
      all.push({ ...contact, id: Date.now(), date: new Date().toISOString(), status: 'unread' });
      storage.set(KEYS.CONTACTS, all);
    }
  },

  emails: {
    getAll: () => storage.get(KEYS.EMAILS) || [],
    add: (email) => {
      const all = storage.get(KEYS.EMAILS) || [];
      all.push({ email, date: new Date().toISOString() });
      storage.set(KEYS.EMAILS, all);
    }
  }
};
