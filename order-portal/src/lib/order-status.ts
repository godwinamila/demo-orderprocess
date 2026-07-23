import { OrderStatus } from "./types";

const STEPS: { status: OrderStatus; label: string; afterMs: number }[] = [
  { status: "placed", label: "Order placed", afterMs: 0 },
  { status: "processing", label: "Processing", afterMs: 15_000 },
  { status: "shipped", label: "Shipped", afterMs: 45_000 },
  { status: "delivered", label: "Delivered", afterMs: 90_000 },
];

export function deriveStatus(placedAt: string, now: number): OrderStatus {
  const elapsed = now - new Date(placedAt).getTime();
  let current: OrderStatus = "placed";
  for (const step of STEPS) {
    if (elapsed >= step.afterMs) current = step.status;
  }
  return current;
}

export function getStatusSteps() {
  return STEPS;
}
