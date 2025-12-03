// Service layer cho sản phẩm (admin): hiện tại dùng mockProducts,
// sau này chỉ cần đổi sang gọi API backend thật.
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "./mockProducts.js";

export async function getProducts() {
  // TODO: thay bằng fetch("/api/products")
  return getProductsApi();
}

export async function createProduct(payload) {
  // TODO: thay bằng POST /api/products
  return createProductApi(payload);
}

export async function updateProduct(id, changes) {
  // TODO: thay bằng PATCH /api/products/:id
  return updateProductApi(id, changes);
}

export async function deleteProduct(id) {
  // TODO: thay bằng DELETE /api/products/:id
  return deleteProductApi(id);
}


