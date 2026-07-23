"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const { lines, subtotal, updateQuantity, removeFromCart } = useCart();

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Browse the catalog and add something you like.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold text-ink">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <li key={line.productId} className="flex gap-4 p-4">
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-muted"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${product.id}`}
                      className="text-sm font-medium text-ink hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-ink-muted">
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity - 1)
                        }
                        className="px-2.5 py-1 text-ink-muted hover:text-ink"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity + 1)
                        }
                        className="px-2.5 py-1 text-ink-muted hover:text-ink"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId)}
                      className="text-sm text-ink-muted hover:text-accent-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="w-20 shrink-0 text-right text-sm font-semibold text-ink">
                  ${(product.price * line.quantity).toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="h-fit rounded-lg border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-ink">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Estimated tax</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-ink">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-4 block rounded-full bg-accent-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-accent-600"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
