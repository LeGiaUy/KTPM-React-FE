import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../api/cartService.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCart().then((res) => setItems(res.items));
  }, []);

  const addToCart = async (book) => {
    setLoading(true);
    try {
      const res = await addCartItem(book);
      setItems(res.items);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    setLoading(true);
    try {
      const res = await removeCartItem(id);
      setItems(res.items);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    setLoading(true);
    try {
      const res = await updateCartItem(id, quantity);
      setItems(res.items);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const res = await clearCartApi();
      setItems(res.items);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const totalPrice = items.reduce(
    (sum, it) => sum + Number(it.price || 0) * (it.quantity || 0),
    0,
  );

  const value = {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}


