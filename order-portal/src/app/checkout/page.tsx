"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { getProductById } from "@/lib/products";
import { createOrderId, saveOrder } from "@/lib/orders-store";
import Link from "next/link";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">Nothing to check out</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Your cart is empty, so there&apos;s nothing to place an order for.
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlacing(true);

    const form = new FormData(event.currentTarget);
    const order = {
      id: createOrderId(),
      placedAt: new Date().toISOString(),
      status: "placed" as const,
      lines: lines
        .map((line) => {
          const product = getProductById(line.productId);
          if (!product) return null;
          return {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: line.quantity,
            image: product.image,
          };
        })
        .filter((line): line is NonNullable<typeof line> => line !== null),
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: {
        fullName: String(form.get("fullName") ?? ""),
        line1: String(form.get("line1") ?? ""),
        city: String(form.get("city") ?? ""),
        state: String(form.get("state") ?? ""),
        zip: String(form.get("zip") ?? ""),
      },
    };

    saveOrder(order);
    clearCart();
    router.push(`/orders/${order.id}`);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold text-ink">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-ink">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2 text-sm text-ink-muted">
                Full name
                <input
                  name="fullName"
                  required
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="sm:col-span-2 text-sm text-ink-muted">
                Address
                <input
                  name="line1"
                  required
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="text-sm text-ink-muted">
                City
                <input
                  name="city"
                  required
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="text-sm text-ink-muted">
                State
                <input
                  name="state"
                  required
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="text-sm text-ink-muted">
                ZIP code
                <input
                  name="zip"
                  required
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-ink">Payment</h2>
            <p className="mt-1 text-xs text-ink-muted">
              This is a demo — no real payment is processed.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2 text-sm text-ink-muted">
                Card number
                <input
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="text-sm text-ink-muted">
                Expiry
                <input
                  required
                  placeholder="MM/YY"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
              <label className="text-sm text-ink-muted">
                CVC
                <input
                  required
                  inputMode="numeric"
                  placeholder="123"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                />
              </label>
            </div>
          </section>
        </div>

        <div className="h-fit rounded-lg border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-ink">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {lines.map((line) => {
              const product = getProductById(line.productId);
              if (!product) return null;
              return (
                <li key={line.productId} className="flex justify-between">
                  <span className="line-clamp-1">
                    {product.name} &times; {line.quantity}
                  </span>
                  <span className="shrink-0 text-ink">
                    ${(product.price * line.quantity).toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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
          <button
            type="submit"
            disabled={placing}
            className="mt-4 w-full rounded-full bg-accent-500 px-4 py-3 text-sm font-medium text-white hover:bg-accent-600 disabled:opacity-60"
          >
            {placing ? "Placing order..." : "Place order"}
          </button>
        </div>
      </form>
    </main>
  );
}
