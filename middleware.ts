import { NextRequest, NextResponse } from "next/server";
import { protectedPaths } from "./app/data/protectedPaths";

export function middleware(request: NextRequest): NextResponse {
  const url = new URL(request.url);
  const pathname = request.nextUrl.pathname;
  const startUrl = new URL("/", request.url);
  const homeUrl = new URL("/home", request.url);
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const queryToken = url.searchParams.get("token");

  if (queryToken && !isProtectedPath) {
    const redirectResponse = NextResponse.redirect(homeUrl.toString(), 302);
    redirectResponse.cookies.set("token", queryToken, {
      maxAge: 3600,
    });
    url.searchParams.delete("token");
    return redirectResponse;
  }

  const cookieToken = request.cookies.get("token");

  switch (true) {
    case cookieToken && !isProtectedPath:
      return NextResponse.redirect(homeUrl);
    case !cookieToken && isProtectedPath:
      return NextResponse.redirect(startUrl);
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
