// Service layer cho đơn hàng / thanh toán: hiện tại dùng mockOrders,
// sau này thay bằng API backend thật.
import { createOrderApi, getOrdersApi } from "./mockOrders.js";

export async function createOrder(payload) {
  // TODO: POST /api/orders
  return createOrderApi(payload);
}

export async function getOrders() {
  // TODO: GET /api/orders
  return getOrdersApi();
}


