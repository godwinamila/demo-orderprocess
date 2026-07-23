export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "lg";
}) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = Math.min(1, Math.max(0, rating - index));
    return fill;
  });

  const starSize = size === "lg" ? "text-lg" : "text-sm";

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex text-accent-500 ${starSize}`} aria-hidden>
        {stars.map((fill, index) => (
          <span key={index} className="relative inline-block">
            <span className="text-border">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-accent-500"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        ))}
      </div>
      <span className="text-xs text-ink-muted">
        {rating.toFixed(1)}
        {typeof reviewCount === "number" && (
          <> &middot; {reviewCount.toLocaleString()} reviews</>
        )}
      </span>
    </div>
  );
}
