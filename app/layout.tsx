import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, DM_Serif_Display } from "next/font/google";
import { THEME_STORAGE_KEY, DEFAULT_THEME } from "@/components/ThemeProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Smekke",
  description: "Elegantie zonder compromis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${playfair.variable} ${dmSerif.variable}`}>
      <head>
        {/* Set theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('${THEME_STORAGE_KEY}')||'${DEFAULT_THEME}'}catch(e){}`,
          }}
        />
      </head>
      <body className="h-dvh flex flex-col">
        {children}
      </body>
    </html>
  );
}
