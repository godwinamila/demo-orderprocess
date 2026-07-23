"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "./cart-context";
import { StarRating } from "./star-rating";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-surface p-4 transition-shadow hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative mb-3 block aspect-square overflow-hidden rounded-md bg-surface-muted"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>

      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {product.category}
      </span>
      <Link
        href={`/product/${product.id}`}
        className="mt-1 line-clamp-2 text-sm font-medium text-ink hover:underline"
      >
        {product.name}
      </Link>

      <div className="mt-2">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="mt-2 text-lg font-semibold text-ink">
        ${product.price.toFixed(2)}
      </div>

      <button
        type="button"
        onClick={() => addToCart(product.id)}
        className="mt-3 rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-800"
      >
        Add to cart
      </button>
    </div>
  );
}
