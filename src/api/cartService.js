// Service layer cho giỏ hàng: hiện tại dùng mockCart, sau này thay bằng API backend thật
import {
  getCartApi,
  addCartItemApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from "./mockCart.js";

export async function getCart() {
  // TODO: thay bằng fetch("/api/cart")
  return getCartApi();
}

export async function addCartItem(book) {
  // TODO: thay bằng fetch("/api/cart", { method: "POST", body: JSON.stringify(book) })
  return addCartItemApi(book);
}

export async function updateCartItem(id, quantity) {
  // TODO: thay bằng fetch(`/api/cart/${id}`, { method: "PATCH", body: JSON.stringify({ quantity }) })
  return updateCartItemApi(id, quantity);
}

export async function removeCartItem(id) {
  // TODO: thay bằng fetch(`/api/cart/${id}`, { method: "DELETE" })
  return removeCartItemApi(id);
}

export async function clearCart() {
  // TODO: thay bằng fetch("/api/cart/clear", { method: "POST" })
  return clearCartApi();
}


