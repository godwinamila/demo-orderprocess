"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import * as ordersStore from "@/lib/orders-store";
import * as clockStore from "@/lib/clock-store";
import { deriveStatus, getStatusSteps } from "@/lib/order-status";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot
  );
  const now = useSyncExternalStore(
    clockStore.subscribe,
    clockStore.getSnapshot,
    clockStore.getServerSnapshot
  );

  const order = orders.find((candidate) => candidate.id === params.id);

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">Order not found</h1>
        <p className="mt-2 text-sm text-ink-muted">
          We couldn&apos;t find an order with that ID on this device.
        </p>
        <Link
          href="/orders"
          className="mt-6 inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Back to orders
        </Link>
      </main>
    );
  }

  const status = deriveStatus(order.placedAt, now);
  const steps = getStatusSteps();
  const currentIndex = steps.findIndex((step) => step.status === status);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-semibold text-ink">Order {order.id}</h1>
        <span className="text-sm text-ink-muted">
          Placed {new Date(order.placedAt).toLocaleString()}
        </span>
      </div>

      <section className="mt-6 rounded-lg border border-border bg-surface p-5">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li key={step.status} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    index <= currentIndex
                      ? "bg-accent-500 text-white"
                      : "bg-surface-muted text-ink-muted"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs ${
                    index <= currentIndex ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    index < currentIndex ? "bg-accent-500" : "bg-border"
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {order.lines.map((line) => (
            <li key={line.productId} className="flex gap-4 p-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface-muted">
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm font-medium text-ink">{line.name}</p>
                <p className="text-sm text-ink-muted">Qty {line.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-ink">
                ${(line.price * line.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-ink">Shipping address</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.line1}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-ink">Order total</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Subtotal</dt>
                <dd>${order.subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Shipping</dt>
                <dd>
                  {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Tax</dt>
                <dd>${order.tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-ink">
                <dt>Total</dt>
                <dd>${order.total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
