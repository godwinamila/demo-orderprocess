import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  const filtered = products.filter((product) => {
    const matchesQuery = q
      ? product.name.toLowerCase().includes(q.toLowerCase())
      : true;
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {!q && !category && (
        <section className="mb-8 overflow-hidden rounded-xl bg-brand-900 px-8 py-12 text-white">
          <p className="text-sm font-medium uppercase tracking-wide text-accent-400">
            Summer restock
          </p>
          <h1 className="mt-2 max-w-lg text-3xl font-semibold sm:text-4xl">
            Everything you need, delivered to your door.
          </h1>
          <p className="mt-3 max-w-md text-white/70">
            Browse electronics, home goods, and more — with fast checkout and
            real-time order tracking.
          </p>
        </section>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">
          {q
            ? `Results for "${q}"`
            : category
              ? category
              : "Featured products"}
        </h2>
        <span className="text-sm text-ink-muted">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-8 text-center text-ink-muted">
          No products matched your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
