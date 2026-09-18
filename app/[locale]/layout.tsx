import CartCount from "@/components/CartCount";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeProvider from "@/components/ThemeProvider";
import { getDictionary, locales, type Locale } from "@/lib/getDictionary";
import Link from "next/link";

// Every route serves coming-soon content while the pre-launch gate in
// proxy.ts is active, so the shop links in the header stay hidden too.
const SITE_IS_LIVE = process.env.SITE_IS_LIVE === "true";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  return (
    <>
      <ThemeProvider locale={locale} />

      <header
        className="sticky top-0 z-10 backdrop-blur-sm border-b"
        style={{ background: "color-mix(in srgb, var(--background) 92%, transparent)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            className="text-2xl tracking-[0.2em] uppercase shrink-0"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: "var(--text)" }}
          >
            Smekke
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8 text-xs tracking-widest uppercase">
            {SITE_IS_LIVE && (
              <>
                <Link
                  href={`/${locale}`}
                  className="hidden sm:block transition-opacity hover:opacity-60"
                  style={{ color: "var(--text)" }}
                >
                  {dict.nav.collection}
                </Link>
                <Link
                  href={`/${locale}/cart`}
                  className="flex items-center gap-1 transition-opacity hover:opacity-60"
                  style={{ color: "var(--text)" }}
                >
                  {dict.nav.cart}
                  <CartCount />
                </Link>
              </>
            )}
            <LanguageSwitcher locale={l} />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </>
  );
}
