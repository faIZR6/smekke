"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = { id: number; name: string; price: number; qty: number; size: string };
type CheckoutDict = {
  summary: string; delivery: string; name: string; email: string;
  address: string; place: string; placing: string; error: string;
};
type CartDict = { total: string };

function Field({
  label, type = "text", value, onChange, multiline,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; multiline?: boolean;
}) {
  const base = "w-full border-b border-[var(--border)] bg-transparent py-2 text-sm focus:outline-none focus:border-[var(--text)] transition-colors";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">{label}</label>
      {multiline
        ? <textarea required rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
        : <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className={base} />}
    </div>
  );
}

export default function CheckoutClient({
  checkoutDict, cartDict, locale,
}: {
  checkoutDict: CheckoutDict; cartDict: CartDict; locale: string;
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    if (stored.length === 0) router.replace(`/${locale}/cart`);
    setCart(stored);
  }, [router, locale]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cart }),
      });
      if (!res.ok) throw new Error();
      const { orderId } = await res.json();
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
      router.push(`/${locale}/order-confirmed?id=${orderId}`);
    } catch {
      setError(checkoutDict.error);
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-[var(--text-muted)] mb-6">
          {checkoutDict.summary}
        </p>
        <div className="divide-y divide-[var(--border)]">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-4 text-sm">
              <span>
                <span style={{ fontFamily: "var(--font-heading)" }}>{item.name}</span>
                {item.size && <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>{item.size}</span>}
                <span className="ml-2" style={{ color: "var(--text-muted)" }}>× {item.qty}</span>
              </span>
              <span>€{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between">
          <p className="text-xs tracking-widest uppercase text-[var(--text-muted)]">{cartDict.total}</p>
          <p className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>€{total.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-[var(--text-muted)] mb-6">
          {checkoutDict.delivery}
        </p>
        <form onSubmit={submit} className="flex flex-col gap-6">
          <Field label={checkoutDict.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label={checkoutDict.email} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label={checkoutDict.address} value={form.address} onChange={(v) => setForm({ ...form, address: v })} multiline />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 py-3 px-6 text-xs tracking-widest uppercase bg-[var(--text)] text-[var(--background)] hover:opacity-80 disabled:opacity-40 transition-opacity rounded-sm"
          >
            {submitting ? checkoutDict.placing : checkoutDict.place}
          </button>
        </form>
      </div>
    </div>
  );
}
