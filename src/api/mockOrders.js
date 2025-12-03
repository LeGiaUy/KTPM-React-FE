// Mock API cho đơn hàng / thanh toán

const STORAGE_KEY = "ktpm_orders";

function readOrders() {
  if (typeof sessionStorage === "undefined") return [];
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrderApi(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = readOrders();
      const newOrder = {
        id: orders.length + 1,
        code: `KTPM-${String(orders.length + 1).padStart(4, "0")}`,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        ...payload,
      };
      const next = [...orders, newOrder];
      writeOrders(next);
      resolve({ order: newOrder });
    }, 400);
  });
}

export function getOrdersApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ orders: readOrders() });
    }, 200);
  });
}


