"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@asgardeo/nextjs";
import { getCategories } from "@/lib/products";
import { useCart } from "./cart-context";

export function SiteHeader() {
  const { itemCount } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const categories = getCategories();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/${params}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="rounded bg-accent-500 px-1.5 py-0.5 text-white">N</span>
          Norvia
        </Link>

        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex overflow-hidden rounded-md border border-transparent bg-white">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands, and categories"
              className="w-full px-3 py-2 text-sm text-ink outline-none"
            />
            <button
              type="submit"
              className="flex items-center bg-accent-500 px-4 text-sm font-medium text-white hover:bg-accent-600"
            >
              Search
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/orders" className="hover:text-accent-400">
            Orders
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1.5 hover:text-accent-400">
            Cart
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          </Link>
          <SignedOut>
            <SignInButton className="rounded bg-accent-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-600">
              Sign in
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/profile" className="hover:text-accent-400">
              My Profile
            </Link>
            <SignOutButton className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10">
              Sign out
            </SignOutButton>
          </SignedIn>
        </nav>
      </div>

      <div className="border-t border-white/10 bg-brand-900">
        <nav className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-2 text-xs font-medium text-white/80">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
              className="whitespace-nowrap hover:text-white"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
