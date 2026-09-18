import { cache } from "react";

export type Dictionary = typeof import("@/dictionaries/nl.json");

const loaders = {
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default as Dictionary),
  en: () => import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
};

export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// cache() dedupes this across the nested [locale] and (with-footer) layouts,
// which both fetch the dictionary for the same request.
export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  const load = loaders[isLocale(locale) ? locale : "nl"];
  return load();
});
