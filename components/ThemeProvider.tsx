"use client";

import { useEffect } from "react";

export const THEME_STORAGE_KEY = "smekke-theme";
export const DEFAULT_THEME = "noir";

export default function ThemeProvider({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    document.documentElement.dataset.theme = saved;
  }, [locale]);

  return null;
}
