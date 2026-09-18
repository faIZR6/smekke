"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = { id: number; name: string; price: number; qty: number; size: string };
type CartDict = {
  empty: string; explore: string; title: string;
  size: string; each: string; total: string; remove: string; checkout: string;
};

export default function CartClient({ dict, locale }: { dict: CartDict; locale: string }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  function remove(id: number, size: string) {
    const updated = cart.filter((i) => !(i.id === id && i.size === size));
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  function updateQty(id: number, size: string, qty: number) {
    if (qty < 1) return;
    const updated = cart.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i));
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32 text-center">
        <p className="text-3xl mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
          {dict.empty}
        </p>
        <Link href={`/${locale}`} className="text-xs tracking-widest uppercase border-b border-[var(--text)] pb-0.5 hover:opacity-60 transition-opacity">
          {dict.explore}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl mb-12" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
        {dict.title}
      </h1>

      <div className="divide-y divide-[var(--border)]">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="py-6 flex items-start gap-6">
            <div className="flex-1">
              <p className="text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                {item.name}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {item.size && <span className="mr-3">{dict.size} {item.size}</span>}
                €{item.price.toFixed(2)} {dict.each}
              </p>
            </div>
            <div className="flex items-center border rounded-sm" style={{ borderColor: "var(--border)" }}>
              <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="px-3 py-1.5 text-base hover:opacity-50 transition-opacity">−</button>
              <span className="px-3 text-sm">{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="px-3 py-1.5 text-base hover:opacity-50 transition-opacity">+</button>
            </div>
            <p className="w-20 text-right" style={{ fontFamily: "var(--font-heading)" }}>
              €{(item.price * item.qty).toFixed(2)}
            </p>
            <button onClick={() => remove(item.id, item.size)} className="text-xs hover:text-red-500 transition-colors tracking-widest uppercase pt-1" style={{ color: "var(--text-muted)" }}>
              {dict.remove}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--text-muted)] tracking-widest uppercase mb-1">{dict.total}</p>
          <p className="text-3xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
            €{total.toFixed(2)}
          </p>
        </div>
        <Link href={`/${locale}/checkout`} className="py-3 px-8 text-xs tracking-widest uppercase bg-[var(--text)] text-[var(--background)] hover:opacity-80 transition-opacity rounded-sm">
          {dict.checkout}
        </Link>
      </div>
    </div>
  );
}
