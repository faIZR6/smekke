"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/lib/getDictionary";

export const LOCALE_STORAGE_KEY = "smekke-locale";

export default function LanguagePreference({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  // Runs once per page load only — otherwise this would immediately bounce
  // the user back after they deliberately click the language switcher.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }

    if (saved && isLocale(saved) && saved !== locale) {
      const segments = pathname.split("/");
      segments[1] = saved;
      router.replace(segments.join("/") || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persists the active locale on every change, including explicit switches.
  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  return null;
}
