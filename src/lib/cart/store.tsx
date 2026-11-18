"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductData } from "@/lib/catalog/data";

export interface CartItem {
  id: string; // unique item key (productId + variantId)
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image: string;
  basePrice: number; // MRP / base price
  unitPrice: number; // after volume discount
  gstRate: number;
  quantity: number;
  requiresCustomFreight?: boolean;
  quantityDiscounts: {
    minQuantity: number;
    discountedPrice: number;
  }[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductData, variantId?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalQuantity: number;
  hasFreightItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("baba_cart_v1");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load cart from storage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("baba_cart_v1", JSON.stringify(items));
      } catch (e) {
        console.warn("Failed to save cart to storage", e);
      }
    }
  }, [items, isLoaded]);

  const calculateEffectiveUnitPrice = (
    basePrice: number,
    quantity: number,
    discounts: { minQuantity: number; discountedPrice: number }[]
  ) => {
    if (!discounts || discounts.length === 0) return basePrice;
    const slab = [...discounts].reverse().find((s) => quantity >= s.minQuantity);
    return slab ? slab.discountedPrice : basePrice;
  };

  const addItem = (product: ProductData, variantId?: string, quantity: number = 1) => {
    const itemKey = variantId ? `${product.id}-${variantId}` : product.id;
    const activeVariant = product.variants?.find((v) => v.id === variantId);

    const basePrice = activeVariant ? activeVariant.price : product.sellingPrice;
    const sku = activeVariant ? activeVariant.sku : product.sku;
    const name = activeVariant ? `${product.name} (${activeVariant.name})` : product.name;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      const newQty = existing ? existing.quantity + quantity : quantity;
      const unitPrice = calculateEffectiveUnitPrice(basePrice, newQty, product.quantityDiscounts);

      if (existing) {
        return prev.map((i) =>
          i.id === itemKey
            ? { ...i, quantity: newQty, unitPrice }
            : i
        );
      }

      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          variantId,
          name,
          sku,
          image: product.images[0],
          basePrice,
          unitPrice,
          gstRate: product.gstRate,
          quantity: newQty,
          requiresCustomFreight: product.requiresCustomFreight,
          quantityDiscounts: product.quantityDiscounts,
        },
      ];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          const unitPrice = calculateEffectiveUnitPrice(i.basePrice, quantity, i.quantityDiscounts);
          return { ...i, quantity, unitPrice };
        }
        return i;
      })
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const hasFreightItems = items.some((item) => item.requiresCustomFreight);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        totalQuantity,
        hasFreightItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
