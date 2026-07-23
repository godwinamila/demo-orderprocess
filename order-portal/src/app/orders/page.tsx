"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import * as ordersStore from "@/lib/orders-store";

export default function OrdersPage() {
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot
  );

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">No orders yet</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Orders you place will show up here so you can track them.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Start shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-xl font-semibold text-ink">Your orders</h1>

      <ul className="mt-6 space-y-4">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/orders/${order.id}`}
              className="block rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Order {order.id}
                  </p>
                  <p className="text-xs text-ink-muted">
                    Placed {new Date(order.placedAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-ink">
                  ${order.total.toFixed(2)}
                </p>
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                {order.lines.length} {order.lines.length === 1 ? "item" : "items"}
                {" · "}
                {order.lines.map((line) => line.name).join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
