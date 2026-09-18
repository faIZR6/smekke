import { getDictionary } from "@/lib/getDictionary";
import CartClient from "./CartClient";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <CartClient dict={dict.cart} locale={locale} />;
}
