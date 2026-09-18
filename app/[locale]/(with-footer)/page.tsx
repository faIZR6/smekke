import { db } from "@/db";
import { products } from "@/db/schema";
import DressIcon from "@/components/DressIcon";
import { getDictionary } from "@/lib/getDictionary";
import Image from "next/image";
import HeroSlideshow from "@/components/HeroSlideshow";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [dict, items] = await Promise.all([
    getDictionary(locale),
    db.select().from(products).all(),
  ]);

  const headlineLines = dict.home.headline.split("\n");

  return (
    <>
      {/* Hero — full-bleed dining photo with text overlay */}
      <section className="hero-section relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
        {/* Animated background slideshow */}
        <HeroSlideshow />

        {/* Gradient overlay — dark at bottom, semi-dark left for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%), linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 70%, transparent 90%)",
          }}
        />

        {/* Text content */}
        <div
          className="relative z-10 flex flex-col gap-6 justify-end sm:justify-center h-full px-6 sm:px-16 pb-16 sm:pb-0 mx-auto max-w-6xl"
          style={{ minHeight: "85vh", textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 2px 12px rgba(0,0,0,0.35)" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/70">
            {dict.home.eyebrow}
          </p>
          <h1
            className="hero-headline leading-[1.05] max-w-2xl text-5xl sm:text-7xl text-white"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
          >
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="max-w-sm leading-relaxed text-white/75 text-sm sm:text-base">
            {dict.home.description}
          </p>
          <a
            href="#collection"
            className="self-start text-xs tracking-widest uppercase border-b border-white/60 pb-0.5 text-white hover:border-white transition-colors"
          >
            {dict.home.viewCollection}
          </a>
        </div>
      </section>

      {/* Product grid */}
      <section id="collection" className="mx-auto max-w-6xl px-6 py-20">
        <div className="product-grid grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8">
          {items.map((product, i) => (
            <Link
              key={product.id}
              href={`/${locale}/products/${product.id}`}
              className="group flex flex-col gap-3"
            >
              <div className="product-card-bg relative w-full aspect-[3/4] rounded-sm overflow-hidden" data-index={String(i)}>
                {product.imageUrl ? (
                  <Image
                    src={`${product.imageUrl}&width=600`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <DressIcon
                      index={i}
                      className="dress-icon h-4/5 w-auto transition-transform duration-500 group-hover:scale-105"
                      style={{ color: "var(--text)" } as React.CSSProperties}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="product-card-category text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }}>
                  {dict.home.categories[i % dict.home.categories.length]}
                </p>
                <h2
                  className="product-card-name text-lg leading-snug group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: "var(--text)" }}
                >
                  {product.name}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand strip */}
      <section className="brand-strip border-y py-16 my-8" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row gap-8 sm:gap-0 sm:divide-x brand-strip-divider" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {(["design", "materials", "quality"] as const).map((key) => (
            <div key={key} className="sm:px-10 first:pl-0 last:pr-0 flex flex-col gap-2" style={{ borderColor: "var(--border)" }}>
              <h3
                className="brand-strip-title text-lg"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: "var(--text)" }}
              >
                {dict.home.values[key].title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {dict.home.values[key].text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
