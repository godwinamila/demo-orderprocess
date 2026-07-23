export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-brand-950 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-white">Norvia</p>
          <p className="mt-2 max-w-xs text-white/50">
            A demo storefront and order management experience. Not a real
            retailer — every product, price, and order shown here is
            simulated.
          </p>
        </div>
        <div>
          <p className="font-medium text-white">Customer service</p>
          <ul className="mt-2 space-y-1 text-white/50">
            <li>Track your order</li>
            <li>Returns &amp; refunds</li>
            <li>Shipping information</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-white">About Norvia</p>
          <ul className="mt-2 space-y-1 text-white/50">
            <li>Careers</li>
            <li>Press</li>
            <li>Sell on Norvia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Norvia Demo. For demonstration purposes only.
      </div>
    </footer>
  );
}
