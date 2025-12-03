// Mock API CRUD sản phẩm cho admin
// Dữ liệu được lưu trong sessionStorage để mô phỏng backend

const STORAGE_KEY = "ktpm_products";

function readProducts() {
  if (typeof sessionStorage === "undefined") return [];
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function writeProducts(products) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Lấy toàn bộ sản phẩm
export function getProductsApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = readProducts();
      resolve({ products });
    }, 200);
  });
}

// Tạo mới sản phẩm
export function createProductApi(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = readProducts();
      const nextId =
        products.length > 0 ? Math.max(...products.map((p) => p.id || 0)) + 1 : 1;

      const newProduct = {
        id: nextId,
        is_active: 1,
        stock_qty: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...payload,
      };

      const next = [...products, newProduct];
      writeProducts(next);
      resolve({ product: newProduct, products: next });
    }, 300);
  });
}

// Cập nhật sản phẩm theo id
export function updateProductApi(id, changes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = readProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        reject(new Error("Product not found"));
        return;
      }

      const updated = {
        ...products[index],
        ...changes,
        updated_at: new Date().toISOString(),
      };

      const next = [...products];
      next[index] = updated;
      writeProducts(next);
      resolve({ product: updated, products: next });
    }, 300);
  });
}

// Xoá sản phẩm theo id
export function deleteProductApi(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = readProducts();
      const next = products.filter((p) => p.id !== id);
      writeProducts(next);
      resolve({ products: next });
    }, 250);
  });
}


