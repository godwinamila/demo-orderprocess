import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { StarRating } from "@/components/star-rating";
import { ProductActions } from "@/components/product-actions";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            {product.category}
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-ink">
            {product.name}
          </h1>

          <div className="mt-2">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="lg"
            />
          </div>

          <p className="mt-4 text-3xl font-semibold text-ink">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {product.stock > 10
              ? "In stock"
              : product.stock > 0
                ? `Only ${product.stock} left in stock`
                : "Out of stock"}
          </p>

          <p className="mt-4 text-sm text-ink-muted">{product.description}</p>

          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink">
            {product.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <ProductActions product={product} />
        </div>
      </div>
    </main>
  );
}
