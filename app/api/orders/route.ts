import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

type CartItem = { id: number; name: string; price: number; qty: number; size: string };

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, address, items } = body as {
    name: string;
    email: string;
    address: string;
    items: CartItem[];
  };

  if (!name || !email || !address || !items?.length) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const order = await db
    .insert(orders)
    .values({
      customerName: name,
      customerEmail: email,
      address,
      status: "pending",
      createdAt: new Date().toISOString(),
    })
    .returning()
    .get();

  for (const item of items) {
    const product = await db.select().from(products).where(eq(products.id, item.id)).get();

    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.id,
      productName: product?.name ?? item.name,
      price: product?.price ?? item.price,
      quantity: item.qty,
      size: item.size ?? "",
    });

    // Deduct stock
    if (product) {
      await db
        .update(products)
        .set({ stock: sql`max(0, ${products.stock} - ${item.qty})` })
        .where(eq(products.id, item.id));
    }
  }

  return NextResponse.json({ orderId: order.id });
}

export async function GET() {
  const allOrders = await db.select().from(orders).all();
  const allItems = await db.select().from(orderItems).all();

  const result = allOrders
    .map((o) => ({ ...o, items: allItems.filter((i) => i.orderId === o.id) }))
    .sort((a, b) => b.id - a.id);

  return NextResponse.json(result);
}
