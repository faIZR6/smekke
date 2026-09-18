"use client";

import { useEffect } from "react";

export default function ThemeProvider({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    const saved = localStorage.getItem("smekke-theme") || "noir";
    document.documentElement.dataset.theme = saved;
  }, [locale]);

  return null;
}
