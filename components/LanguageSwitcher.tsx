"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/getDictionary";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchTo(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || "/";
  }

  return (
    <span className="flex items-center gap-2 text-xs tracking-widest">
      <Link
        href={switchTo("nl")}
        className={locale === "nl" ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"}
      >
        NL
      </Link>
      <span className="text-[var(--border)]">/</span>
      <Link
        href={switchTo("en")}
        className={locale === "en" ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"}
      >
        EN
      </Link>
    </span>
  );
}
