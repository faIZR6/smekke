"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/lib/getDictionary";

export const LOCALE_STORAGE_KEY = "smekke-locale";

export default function LanguagePreference({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }

    // LanguageSwitcher writes the new choice to storage before navigating,
    // so by the time this runs storage already matches an explicit switch —
    // a mismatch here only means the visit's locale doesn't match a
    // previously remembered one (e.g. the domain default disagrees with it).
    if (saved && isLocale(saved) && saved !== locale) {
      const segments = pathname.split("/");
      segments[1] = saved;
      router.replace(segments.join("/") || "/");
      return;
    }

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale, pathname, router]);

  return null;
}
