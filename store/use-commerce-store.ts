"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartLine = {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  configuration?: Record<string, unknown>;
};

type CommerceState = {
  cart: CartLine[];
  wishlist: string[];
  comparison: string[];
  addToCart: (item: CartLine) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  toggleComparison: (id: string) => void;
  clearCart: () => void;
};

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      comparison: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((line) => line.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((line) =>
                line.id === item.id ? { ...line, quantity: line.quantity + item.quantity } : line
              )
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((line) => line.id !== id) })),
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id]
        })),
      toggleComparison: (id) =>
        set((state) => ({
          comparison: state.comparison.includes(id)
            ? state.comparison.filter((item) => item !== id)
            : [...state.comparison, id]
        })),
      clearCart: () => set({ cart: [] })
    }),
    {
      name: "aurex-commerce-store"
    }
  )
);
