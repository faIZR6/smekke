import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import DressIcon from "@/components/DressIcon";
import AddToCartButton from "./AddToCartButton";
import { getDictionary } from "@/lib/getDictionary";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const CARD_COLORS = ["#EEE8E0", "#E8E4EC", "#E4EBE4", "#EDE6DC", "#DDE4EC", "#EDE8E0"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [dict, product] = await Promise.all([
    getDictionary(locale),
    db.select().from(products).where(eq(products.id, Number(id))).get(),
  ]);

  if (!product) notFound();

  const colorIndex = (product.id - 1) % CARD_COLORS.length;
  const category = dict.home.categories[colorIndex % dict.home.categories.length];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href={`/${locale}`}
        className="text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-12 inline-block"
      >
        {dict.product.back}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div
          className="relative aspect-[3/4] rounded-sm overflow-hidden"
          style={{ background: CARD_COLORS[colorIndex] }}
        >
          {product.imageUrl ? (
            <Image
              src={`${product.imageUrl}&width=900`}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <DressIcon index={colorIndex} className="h-4/5 w-auto text-stone-700" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-3">
            {category}
          </p>
          <h1
            className="text-4xl sm:text-5xl leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
          >
            {product.name}
          </h1>
          <p className="text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            €{product.price.toFixed(2)}
          </p>
          <div className="h-px bg-[var(--border)] mb-6" />
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            {product.description}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            {dict.product.available.replace("{n}", String(product.stock))}
          </p>

          <AddToCartButton
            productId={product.id}
            productName={product.name}
            price={product.price}
            stock={product.stock}
            sizes={product.sizes ? product.sizes.split(",").map((s) => s.trim()) : []}
            labels={{
              addToCart: dict.product.addToCart,
              added: dict.product.added,
              outOfStock: dict.product.outOfStock,
              selectSize: dict.product.selectSize,
              size: dict.product.size,
            }}
          />

          <p className="text-xs text-[var(--text-muted)] mt-6 leading-relaxed">
            {dict.product.delivery}
          </p>
        </div>
      </div>
    </div>
  );
}
