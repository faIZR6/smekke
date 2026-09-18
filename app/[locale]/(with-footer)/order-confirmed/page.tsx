import { getDictionary } from "@/lib/getDictionary";
import ConfirmedClient from "./ConfirmedClient";

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <ConfirmedClient dict={dict.confirmed} locale={locale} />;
}
