import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";

export default async function WithFooterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">{children}</div>

      <footer className="border-t py-10 mt-24" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <span className="brand-mark text-lg">Smekke</span>
          <span>© {new Date().getFullYear()} Smekke.</span>
          <Link
            href={`/${locale}/admin/orders`}
            className="text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            {dict.nav.admin}
          </Link>
        </div>
      </footer>
    </div>
  );
}
