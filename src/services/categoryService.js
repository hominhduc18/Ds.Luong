/**
 * Dịch vụ quản lý danh mục sản phẩm (CRUD) - DS Luong
 */

const STORAGE_KEY = 'ds_luong_categories';
const PRODUCTS_KEY = 'ds_luong_products';

const INITIAL_CATEGORIES = [
  // Cấp 1
  { id: 'cat-tinh-trang-da', name: 'TÌNH TRẠNG DA', parentId: null, description: 'Sản phẩm theo tình trạng da', icon: '💆', color: '#D4AF37', status: 'ACTIVE' },
  { id: 'cat-dong-san-pham', name: 'DÒNG SẢN PHẨM', parentId: null, description: 'Các dòng sản phẩm chuyên biệt', icon: '✨', color: '#D4AF37', status: 'ACTIVE' },
  { id: 'cat-cham-soc-mat-moi', name: 'CHĂM SÓC MẶT & MÔI', parentId: null, description: 'Chăm sóc chuyên sâu mặt và môi', icon: '👄', color: '#D4AF37', status: 'ACTIVE' },
  { id: 'cat-thuc-pham-tham-my', name: 'THỰC PHẨM THẨM MỸ', parentId: null, description: 'Dinh dưỡng bổ trợ thẩm mỹ', icon: '💊', color: '#D4AF37', status: 'ACTIVE' },

  // Cấp 2 - Tình trạng da
  { id: 'sub-da-lao-hoa', name: 'DA LÃO HOÁ', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },
  { id: 'sub-da-mun', name: 'DA MỤN', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },
  { id: 'sub-da-tham-nam', name: 'DA THÂM NÁM', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },
  { id: 'sub-da-thieu-am', name: 'DA THIẾU ẨM', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },
  { id: 'sub-da-man-do', name: 'DA MẪN ĐỎ', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },
  { id: 'sub-da-sau-tham-my', name: 'DA SAU THẨM MỸ', parentId: 'cat-tinh-trang-da', status: 'ACTIVE' },

  // Cấp 2 - Dòng sản phẩm
  { id: 'sub-dien-di', name: 'ĐIỆN DI', parentId: 'cat-dong-san-pham', status: 'ACTIVE' },
  { id: 'sub-vial', name: 'VIAL', parentId: 'cat-dong-san-pham', status: 'ACTIVE' },
  { id: 'sub-cong-nghe-moi', name: 'CÔNG NGHỆ MỚI', parentId: 'cat-dong-san-pham', status: 'ACTIVE' },

  // Cấp 2 - Chăm sóc mặt & môi
  { id: 'sub-duong-moi', name: 'DƯỠNG MÔI', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },
  { id: 'sub-cham-soc-mat', name: 'CHĂM SÓC MẶT', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },
  { id: 'sub-cham-soc-body', name: 'CHĂM SÓC BODY', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },
  { id: 'sub-duong-am', name: 'DƯỠNG ẨM', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },
  { id: 'sub-san-chac', name: 'SĂN CHẮC', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },
  { id: 'sub-cham-soc-toc', name: 'CHĂM SÓC TÓC', parentId: 'cat-cham-soc-mat-moi', status: 'ACTIVE' },

  // Cấp 2 - Thực phẩm thẩm mỹ
  { id: 'sub-chong-lao-hoa', name: 'CHỐNG LÃO HOÁ', parentId: 'cat-thuc-pham-tham-my', status: 'ACTIVE' },
  { id: 'sub-kiem-soat-can-nang', name: 'KIỂM SOÁT CÂN NẦNG', parentId: 'cat-thuc-pham-tham-my', status: 'ACTIVE' },
];

export const categoryService = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  },

  getTree: () => {
    const list = categoryService.getAll();
    const map = {};
    const tree = [];

    list.forEach(node => {
      map[node.id] = { ...node, children: [] };
    });

    list.forEach(node => {
      if (node.parentId && map[node.parentId]) {
        map[node.parentId].children.push(map[node.id]);
      } else {
        tree.push(map[node.id]);
      }
    });

    return tree;
  },

  save: (categories) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event('ds_luong_categories_changed'));
  },

  add: (category) => {
    const list = categoryService.getAll();
    const newCategory = {
      ...category,
      id: `cat-${Date.now()}`,
      status: category.status || 'ACTIVE'
    };
    list.push(newCategory);
    categoryService.save(list);
    return newCategory;
  },

  update: (id, data) => {
    const list = categoryService.getAll();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data };
      categoryService.save(list);
    }
  },

  delete: (id) => {
    const list = categoryService.getAll();
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    
    // Tìm các danh mục con
    const getChildrenIds = (parentId) => {
      return list.filter(c => c.parentId === parentId).flatMap(c => [c.id, ...getChildrenIds(c.id)]);
    };
    const idsToDelete = [id, ...getChildrenIds(id)];

    // Kiểm tra ràng buộc sản phẩm
    const hasProducts = products.some(p => idsToDelete.includes(p.category) || idsToDelete.includes(p.categoryId));
    if (hasProducts) {
      throw new Error('Không thể xóa danh mục đang có sản phẩm liên kết!');
    }

    const newList = list.filter(c => !idsToDelete.includes(c.id));
    categoryService.save(newList);
  },

  getProductCount: (categoryId) => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    return products.filter(p => p.category === categoryId || p.categoryName === categoryId).length;
  },

  // Helper to get flat list of categories with proper labels for dropdowns
  getDropdownOptions: () => {
    const tree = categoryService.getTree();
    const options = [];
    
    const recurse = (nodes, level = 0) => {
      nodes.forEach(node => {
        options.push({
          id: node.id,
          name: node.name,
          label: `${'—'.repeat(level)} ${node.name}`,
          level
        });
        if (node.children?.length > 0) {
          recurse(node.children, level + 1);
        }
      });
    };
    
    recurse(tree);
    return options;
  }
};
