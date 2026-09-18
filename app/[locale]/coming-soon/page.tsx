import { getDictionary } from "@/lib/getDictionary";
import BreezeIllustration from "@/components/BreezeIllustration";

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <section
      className="relative h-full flex flex-col items-center justify-center gap-8 px-6 text-center overflow-hidden"
      style={{ background: "#0C0B0A" }}
    >
      <BreezeIllustration className="absolute inset-0 w-full h-full" style={{ zIndex: 0, transform: "scale(0.9)" }} />

      <div className="relative flex flex-col items-center gap-3 mt-16" style={{ zIndex: 1 }}>
        <div
          className="absolute rounded-full"
          style={{
            zIndex: -1,
            inset: "-25% -35%",
            background: "radial-gradient(closest-side, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, transparent 100%)",
            filter: "blur(20px)",
          }}
        />
        <h1
          className="coming-soon-glow relative text-5xl sm:text-7xl leading-none"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: "#F0EAE0" }}
        >
          {dict.comingSoon.title}
        </h1>
        <p className="coming-soon-glow relative max-w-sm text-sm sm:text-base leading-relaxed" style={{ color: "#8A837A" }}>
          {dict.comingSoon.text}
        </p>
      </div>
    </section>
  );
}
