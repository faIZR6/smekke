import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/getDictionary";
import { SITE_IS_LIVE } from "@/lib/siteIsLive";

const ALLOWED_PATH_WHEN_NOT_LIVE = "coming-soon";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    return SITE_IS_LIVE
      ? NextResponse.next()
      : NextResponse.json({ error: "Not available yet" }, { status: 404 });
  }

  // Skip static assets
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Already has a valid locale prefix
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  if (isLocale(firstSegment)) {
    const rest = segments.slice(2).join("/");
    if (!SITE_IS_LIVE && rest !== ALLOWED_PATH_WHEN_NOT_LIVE) {
      return NextResponse.rewrite(new URL(`/${firstSegment}/${ALLOWED_PATH_WHEN_NOT_LIVE}`, request.url));
    }
    return NextResponse.next();
  }

  // No stored preference to read here (localStorage is client-only — see
  // LanguagePreference), so default by domain: .nl visitors get Dutch.
  // Use the Host header directly — nextUrl.hostname reflects the bind
  // address, not necessarily the requested host.
  const host = request.headers.get("host") ?? request.nextUrl.hostname;
  const preferred = host.endsWith(".nl") ? "nl" : "en";

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
