"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/getDictionary";
import { LOCALE_STORAGE_KEY } from "@/components/LanguagePreference";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchTo(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || "/";
  }

  // Written synchronously, before navigation starts, so LanguagePreference
  // sees the new choice already stored once the destination page mounts —
  // otherwise it would read the stale value and bounce the switch back.
  function remember(next: Locale) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <span className="flex items-center gap-2 text-xs tracking-widest">
      <Link
        href={switchTo("nl")}
        onClick={() => remember("nl")}
        className={locale === "nl" ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"}
      >
        NL
      </Link>
      <span className="text-[var(--border)]">/</span>
      <Link
        href={switchTo("en")}
        onClick={() => remember("en")}
        className={locale === "en" ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"}
      >
        EN
      </Link>
    </span>
  );
}
