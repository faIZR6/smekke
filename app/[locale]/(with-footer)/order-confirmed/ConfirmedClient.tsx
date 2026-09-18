"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

type ConfirmedDict = { title: string; order: string; text: string; back: string };

function Confirmed({ dict, locale }: { dict: ConfirmedDict; locale: string }) {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 text-center flex flex-col items-center gap-6">
      <div className="text-6xl mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
        ✦
      </div>
      <h1 className="text-4xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
        {dict.title}
      </h1>
      {id && (
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)]">
          {dict.order}{id}
        </p>
      )}
      <p className="text-[var(--text-muted)] max-w-sm leading-relaxed text-sm">{dict.text}</p>
      <Link
        href={`/${locale}`}
        className="mt-4 text-xs tracking-widest uppercase border-b border-[var(--text)] pb-0.5 hover:opacity-60 transition-opacity"
      >
        {dict.back}
      </Link>
    </div>
  );
}

export default function ConfirmedClient({ dict, locale }: { dict: ConfirmedDict; locale: string }) {
  return (
    <Suspense>
      <Confirmed dict={dict} locale={locale} />
    </Suspense>
  );
}
