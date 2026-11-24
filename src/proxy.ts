import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "es", "ar"] as const;
type Locale = (typeof LOCALES)[number];

function getLocaleFromAcceptLanguage(acceptLanguage: string): Locale {
  if (!acceptLanguage) return "en";
  const parts = acceptLanguage.split(",");
  for (const part of parts) {
    const lang = part.split(";")[0].trim().toLowerCase();
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("ar")) return "ar";
  }
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".") // any file with an extension (images, fonts, manifests)
  ) {
    return undefined;
  }

  // Check if pathname already starts with a locale
  const pathnameParts = pathname.split("/");
  const firstSegment = pathnameParts[1];
  if (LOCALES.includes(firstSegment as Locale)) {
    return undefined;
  }

  // Determine target locale
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const targetLocale = getLocaleFromAcceptLanguage(acceptLanguage);

  // Build redirect URL
  const targetUrl = new URL(
    `/${targetLocale}${pathname}`,
    request.url
  );
  targetUrl.search = request.nextUrl.search;

  return NextResponse.redirect(targetUrl, 302);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|images|assets|.*\\..*).*)",
  ],
};
