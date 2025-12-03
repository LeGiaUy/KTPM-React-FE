// Mock API cho giỏ hàng: lưu trong sessionStorage và giả lập gọi mạng bằng setTimeout

const STORAGE_KEY = "ktpm_cart";

function readCart() {
  if (typeof sessionStorage === "undefined") return [];
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function writeCart(items) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getCartApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = readCart();
      resolve({ items });
    }, 200);
  });
}

export function addCartItemApi(book) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = readCart();
      const existing = items.find((it) => it.id === book.id);
      let next;
      if (existing) {
        next = items.map((it) =>
          it.id === book.id ? { ...it, quantity: (it.quantity || 0) + 1 } : it,
        );
      } else {
        next = [...items, { ...book, quantity: 1 }];
      }
      writeCart(next);
      resolve({ items: next });
    }, 200);
  });
}

export function updateCartItemApi(id, quantity) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = readCart();
      let next;
      if (quantity <= 0) {
        next = items.filter((it) => it.id !== id);
      } else {
        next = items.map((it) =>
          it.id === id ? { ...it, quantity } : it,
        );
      }
      writeCart(next);
      resolve({ items: next });
    }, 200);
  });
}

export function removeCartItemApi(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = readCart();
      const next = items.filter((it) => it.id !== id);
      writeCart(next);
      resolve({ items: next });
    }, 200);
  });
}

export function clearCartApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      writeCart([]);
      resolve({ items: [] });
    }, 200);
  });
}


