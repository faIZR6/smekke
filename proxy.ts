import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, isLocale } from "@/lib/getDictionary";

const DEFAULT_LOCALE = "nl";

// Pre-launch gate: until SITE_IS_LIVE=true is set (in Vercel project settings),
// every page except /coming-soon is rewritten to serve it (URL bar stays put).
// Flip the env var and redeploy to open up the rest of the site — no code changes needed.
const SITE_IS_LIVE = process.env.SITE_IS_LIVE === "true";
const ALLOWED_PATH_WHEN_NOT_LIVE = "coming-soon";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    if (!SITE_IS_LIVE && pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Not available yet" }, { status: 404 });
    }
    return NextResponse.next();
  }

  // Already has a valid locale prefix
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    const rest = pathname.split("/").slice(2).join("/");
    if (!SITE_IS_LIVE && rest !== ALLOWED_PATH_WHEN_NOT_LIVE) {
      return NextResponse.rewrite(new URL(`/${firstSegment}/${ALLOWED_PATH_WHEN_NOT_LIVE}`, request.url));
    }
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = locales.find((l) => acceptLang.toLowerCase().startsWith(l)) ?? DEFAULT_LOCALE;

  if (!SITE_IS_LIVE) {
    return NextResponse.rewrite(new URL(`/${preferred}/${ALLOWED_PATH_WHEN_NOT_LIVE}`, request.url));
  }

  return NextResponse.redirect(
    new URL(`/${preferred}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
