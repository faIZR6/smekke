"use client";

import { useState } from "react";

type Labels = {
  addToCart: string;
  added: string;
  outOfStock: string;
  selectSize: string;
  size: string;
};

type Props = {
  productId: number;
  productName: string;
  price: number;
  stock: number;
  sizes: string[];
  labels: Labels;
};

export default function AddToCartButton({
  productId,
  productName,
  price,
  stock,
  sizes,
  labels,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length === 1 ? sizes[0] : null
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  function addToCart() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1500);
      return;
    }

    const cart: { id: number; name: string; price: number; qty: number; size: string }[] =
      JSON.parse(localStorage.getItem("cart") || "[]");

    const key = `${productId}-${selectedSize}`;
    const existing = cart.find((i) => `${i.id}-${i.size}` === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, name: productName, price, qty, size: selectedSize });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-2"
            style={{ color: sizeError ? "var(--accent)" : "var(--text-muted)" }}
          >
            {sizeError ? labels.selectSize : labels.size}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className="px-4 py-1.5 text-sm tracking-wide border transition-colors rounded-sm"
                style={{
                  borderColor: selectedSize === s ? "var(--text)" : sizeError ? "var(--accent)" : "var(--border)",
                  background: selectedSize === s ? "var(--text)" : "transparent",
                  color: selectedSize === s ? "var(--background)" : "var(--text)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + Add to cart */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-sm" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 text-lg leading-none transition-opacity hover:opacity-50"
          >
            −
          </button>
          <span className="px-4 py-2 text-sm w-10 text-center">{qty}</span>
          <button
            onClick={() => setQty(Math.min(stock, qty + 1))}
            className="px-3 py-2 text-lg leading-none transition-opacity hover:opacity-50"
          >
            +
          </button>
        </div>
        <button
          onClick={addToCart}
          disabled={stock === 0}
          className="flex-1 py-3 px-6 text-xs tracking-widest uppercase transition-opacity rounded-sm"
          style={{
            background: "var(--text)",
            color: "var(--background)",
            opacity: stock === 0 ? 0.3 : 1,
          }}
        >
          {added ? labels.added : stock === 0 ? labels.outOfStock : labels.addToCart}
        </button>
      </div>
    </div>
  );
}
