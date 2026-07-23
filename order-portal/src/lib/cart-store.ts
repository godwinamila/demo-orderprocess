"use client";

import { CartLine } from "./types";

const CART_KEY = "norvia:cart";

type Listener = () => void;

let lines: CartLine[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function readFromStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
}

function notify() {
  for (const listener of listeners) listener();
}

function ensureHydrated() {
  if (!hydrated && typeof window !== "undefined") {
    lines = readFromStorage();
    hydrated = true;
  }
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartLine[] {
  ensureHydrated();
  return lines;
}

const EMPTY_SNAPSHOT: CartLine[] = [];

export function getServerSnapshot(): CartLine[] {
  return EMPTY_SNAPSHOT;
}

export function addToCart(productId: string, quantity = 1) {
  ensureHydrated();
  const existing = lines.find((line) => line.productId === productId);
  lines = existing
    ? lines.map((line) =>
        line.productId === productId
          ? { ...line, quantity: line.quantity + quantity }
          : line
      )
    : [...lines, { productId, quantity }];
  persist();
  notify();
}

export function updateQuantity(productId: string, quantity: number) {
  ensureHydrated();
  lines =
    quantity <= 0
      ? lines.filter((line) => line.productId !== productId)
      : lines.map((line) =>
          line.productId === productId ? { ...line, quantity } : line
        );
  persist();
  notify();
}

export function removeFromCart(productId: string) {
  ensureHydrated();
  lines = lines.filter((line) => line.productId !== productId);
  persist();
  notify();
}

export function clearCart() {
  ensureHydrated();
  lines = [];
  persist();
  notify();
}
