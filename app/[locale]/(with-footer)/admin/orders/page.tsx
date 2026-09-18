import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getDictionary } from "@/lib/getDictionary";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [dict, allOrders, allItems] = await Promise.all([
    getDictionary(locale),
    db.select().from(orders).all(),
    db.select().from(orderItems).all(),
  ]);

  const enriched = allOrders
    .map((o) => ({
      ...o,
      items: allItems.filter((i) => i.orderId === o.id),
      total: allItems.filter((i) => i.orderId === o.id).reduce((s, i) => s + i.price * i.quantity, 0),
    }))
    .sort((a, b) => b.id - a.id);

  const statusLabel = (s: string) =>
    dict.admin.status[s as keyof typeof dict.admin.status] ?? s;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl mb-12" style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}>
        {dict.admin.title}
      </h1>

      {enriched.length === 0 && (
        <p className="text-[var(--text-muted)]">{dict.admin.noOrders}</p>
      )}

      <div className="space-y-6">
        {enriched.map((order) => (
          <div key={order.id} className="rounded-sm border border-[var(--border)] bg-white p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  #{order.id} — {order.customerName}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{order.customerEmail}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1 whitespace-pre-wrap">{order.address}</p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                    order.status === "pending" ? "bg-amber-100 text-amber-800"
                    : order.status === "shipped" ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                  }`}
                >
                  {statusLabel(order.status)}
                </span>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {new Date(order.createdAt).toLocaleString(locale)}
                </p>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[var(--text-muted)] border-b border-[var(--border)]">
                  <th className="pb-2 font-normal text-xs tracking-widest uppercase">{dict.admin.product}</th>
                  <th className="pb-2 font-normal text-xs tracking-widest uppercase text-right">{dict.admin.qty}</th>
                  <th className="pb-2 font-normal text-xs tracking-widest uppercase text-right">{dict.admin.price}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2">
                      <span style={{ fontFamily: "var(--font-heading)" }}>{item.productName}</span>
                      {item.size && <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>{item.size}</span>}
                    </td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">€{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--border)]">
                  <td className="pt-3 text-xs tracking-widest uppercase text-[var(--text-muted)]" colSpan={2}>{dict.admin.total}</td>
                  <td className="pt-3 text-right" style={{ fontFamily: "var(--font-heading)" }}>€{order.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
