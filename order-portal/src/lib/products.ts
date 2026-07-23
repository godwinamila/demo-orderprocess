import { Product } from "./types";

export const products: Product[] = [
  {
    id: "p-wireless-headphones",
    name: "Aurora Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 129.99,
    rating: 4.5,
    reviewCount: 2318,
    image: "https://picsum.photos/seed/headphones-aurora/600/600",
    description:
      "Over-ear wireless headphones with active noise cancellation, 30-hour battery life, and plush memory-foam ear cushions.",
    bullets: [
      "Active noise cancellation with transparency mode",
      "Up to 30 hours of playback on a single charge",
      "Bluetooth 5.3 with multipoint pairing",
    ],
    stock: 48,
  },
  {
    id: "p-mechanical-keyboard",
    name: "Quiet Ridge 75% Mechanical Keyboard",
    category: "Electronics",
    price: 89.0,
    rating: 4.7,
    reviewCount: 954,
    image: "https://picsum.photos/seed/keyboard-quietridge/600/600",
    description:
      "Hot-swappable mechanical keyboard with a compact 75% layout, PBT keycaps, and a sound-dampened case.",
    bullets: [
      "Hot-swappable switches, no soldering required",
      "USB-C wired and 2.4GHz wireless modes",
      "Per-key RGB backlighting",
    ],
    stock: 21,
  },
  {
    id: "p-espresso-machine",
    name: "Marchetti Compact Espresso Machine",
    category: "Home & Kitchen",
    price: 219.5,
    rating: 4.3,
    reviewCount: 1203,
    image: "https://picsum.photos/seed/espresso-marchetti/600/600",
    description:
      "15-bar pump espresso machine with a built-in milk frother, sized for small kitchens and countertops.",
    bullets: [
      "15-bar pressure pump for authentic espresso crema",
      "Integrated steam wand for lattes and cappuccinos",
      "Removable water tank and drip tray for easy cleaning",
    ],
    stock: 14,
  },
  {
    id: "p-chef-knife",
    name: "Foundry 8-inch Forged Chef's Knife",
    category: "Home & Kitchen",
    price: 54.99,
    rating: 4.8,
    reviewCount: 3021,
    image: "https://picsum.photos/seed/chefknife-foundry/600/600",
    description:
      "A full-tang, forged high-carbon steel chef's knife balanced for all-day prep work.",
    bullets: [
      "High-carbon stainless steel blade",
      "Full-tang construction for balance",
      "Comes with a protective sheath",
    ],
    stock: 63,
  },
  {
    id: "p-running-shoes",
    name: "Pacefield Trail Runner Shoes",
    category: "Sports & Outdoors",
    price: 96.0,
    rating: 4.4,
    reviewCount: 1740,
    image: "https://picsum.photos/seed/runningshoes-pacefield/600/600",
    description:
      "Lightweight trail running shoes with a grippy rubber outsole and breathable knit upper.",
    bullets: [
      "Breathable engineered knit upper",
      "Multi-directional lugs for trail grip",
      "Cushioned EVA midsole",
    ],
    stock: 37,
  },
  {
    id: "p-yoga-mat",
    name: "Driftline Non-Slip Yoga Mat",
    category: "Sports & Outdoors",
    price: 34.99,
    rating: 4.6,
    reviewCount: 2650,
    image: "https://picsum.photos/seed/yogamat-driftline/600/600",
    description:
      "Extra-thick 6mm yoga mat with a non-slip textured surface on both sides, includes carry strap.",
    bullets: [
      "6mm thickness for joint comfort",
      "Double-sided non-slip texture",
      "Lightweight with included carry strap",
    ],
    stock: 82,
  },
  {
    id: "p-novel-set",
    name: "The Lighthouse Keeper's Notebook (Hardcover)",
    category: "Books",
    price: 22.0,
    rating: 4.9,
    reviewCount: 512,
    image: "https://picsum.photos/seed/novel-lighthouse/600/600",
    description:
      "A hardcover literary novel following three generations of a family running a coastal lighthouse.",
    bullets: [
      "Hardcover with dust jacket",
      "352 pages",
      "Signed first-edition run",
    ],
    stock: 29,
  },
  {
    id: "p-desk-lamp",
    name: "Halcyon Adjustable LED Desk Lamp",
    category: "Home & Kitchen",
    price: 41.5,
    rating: 4.5,
    reviewCount: 876,
    image: "https://picsum.photos/seed/desklamp-halcyon/600/600",
    description:
      "Dimmable LED desk lamp with adjustable color temperature and a USB charging port on the base.",
    bullets: [
      "5 brightness levels, 3 color temperatures",
      "Built-in USB-A charging port",
      "Foldable, space-saving design",
    ],
    stock: 55,
  },
  {
    id: "p-skincare-set",
    name: "Fernwell Daily Skincare Trio",
    category: "Beauty",
    price: 48.0,
    rating: 4.2,
    reviewCount: 1988,
    image: "https://picsum.photos/seed/skincare-fernwell/600/600",
    description:
      "A cleanser, serum, and moisturizer set formulated with vitamin C and hyaluronic acid.",
    bullets: [
      "Vitamin C brightening serum",
      "Fragrance-free, dermatologist tested",
      "Suitable for all skin types",
    ],
    stock: 40,
  },
  {
    id: "p-building-blocks",
    name: "Kinetic Builder 500-Piece Block Set",
    category: "Toys",
    price: 39.99,
    rating: 4.7,
    reviewCount: 1345,
    image: "https://picsum.photos/seed/blocks-kinetic/600/600",
    description:
      "500-piece interlocking building block set compatible with most major brands, includes a storage bin.",
    bullets: [
      "500 pieces across 12 colors",
      "Compatible with major building block brands",
      "Includes reusable storage bin",
    ],
    stock: 68,
  },
  {
    id: "p-smartwatch",
    name: "Pulsewave Fitness Smartwatch",
    category: "Electronics",
    price: 159.0,
    rating: 4.3,
    reviewCount: 2107,
    image: "https://picsum.photos/seed/smartwatch-pulsewave/600/600",
    description:
      "Fitness smartwatch with heart-rate tracking, GPS, and up to 7 days of battery life.",
    bullets: [
      "Built-in GPS and heart-rate monitor",
      "7-day battery life",
      "5 ATM water resistance",
    ],
    stock: 33,
  },
  {
    id: "p-backpack",
    name: "Overland 30L Travel Backpack",
    category: "Sports & Outdoors",
    price: 74.0,
    rating: 4.6,
    reviewCount: 1622,
    image: "https://picsum.photos/seed/backpack-overland/600/600",
    description:
      "Weatherproof 30L travel backpack with a padded laptop sleeve and lockable zippers.",
    bullets: [
      "30L capacity with padded 16-inch laptop sleeve",
      "Weatherproof recycled fabric shell",
      "Lockable, anti-theft zippers",
    ],
    stock: 46,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((product) => product.category)));
}
