"use client";

import { Order } from "./types";

const ORDERS_KEY = "norvia:orders";

type Listener = () => void;

let orders: Order[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function ensureHydrated() {
  if (!hydrated && typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(ORDERS_KEY);
      orders = raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      orders = [];
    }
    hydrated = true;
  }
}

function notify() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Order[] {
  ensureHydrated();
  return orders;
}

export function getServerSnapshot(): Order[] {
  return [];
}

export function saveOrder(order: Order) {
  ensureHydrated();
  orders = [order, ...orders];
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  notify();
}

export function createOrderId(): string {
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return `NRV-${random}`;
}
