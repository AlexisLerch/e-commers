import { create } from "zustand";
import { CartItem, Product } from "@/types/product";

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        newCart = [...state.cart, { ...product, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () => {
    localStorage.setItem("cart", "[]");
    return { cart: [] };
  },
}));
