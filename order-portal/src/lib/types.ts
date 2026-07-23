export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  bullets: string[];
  stock: number;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type OrderStatus = "placed" | "processing" | "shipped" | "delivered";

export type OrderLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  placedAt: string;
  status: OrderStatus;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
};
