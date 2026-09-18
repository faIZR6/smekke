import { getDictionary } from "@/lib/getDictionary";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <CheckoutClient checkoutDict={dict.checkout} cartDict={dict.cart} locale={locale} />;
}
