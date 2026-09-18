"use client";

import { useEffect, useState } from "react";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function update() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((s: number, i: { qty: number }) => s + i.qty, 0));
    }
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  if (count === 0) return null;
  return (
    <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-white text-[10px] font-medium">
      {count}
    </span>
  );
}
