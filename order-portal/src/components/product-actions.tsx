"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "./cart-context";

export function ProductActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const decrement = () => setQuantity((qty) => Math.max(1, qty - 1));
  const increment = () =>
    setQuantity((qty) => Math.min(product.stock, qty + 1));

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink-muted">Quantity</span>
        <div className="flex items-center rounded-md border border-border">
          <button
            type="button"
            onClick={decrement}
            className="px-3 py-1.5 text-ink-muted hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            className="px-3 py-1.5 text-ink-muted hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => addToCart(product.id, quantity)}
        className="rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-800"
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={() => {
          addToCart(product.id, quantity);
          router.push("/checkout");
        }}
        className="rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600"
      >
        Buy now
      </button>
    </div>
  );
}
