"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProductById } from "@/lib/products";
import * as cartStore from "@/lib/cart-store";

export function useCart() {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = getProductById(line.productId);
        return sum + (product?.price ?? 0) * line.quantity;
      }, 0),
    [lines]
  );

  return {
    lines,
    itemCount,
    subtotal,
    addToCart: cartStore.addToCart,
    updateQuantity: cartStore.updateQuantity,
    removeFromCart: cartStore.removeFromCart,
    clearCart: cartStore.clearCart,
  };
}
